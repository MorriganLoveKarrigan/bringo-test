<template>
  <div class="clients-modal" @click="emit('close', false)">
    <div class="clients-modal-content" @click.stop>
      <div class="clients-modal-content-header">
        <div class="clients-modal-content-header-title">{{ modalHeaderText }}</div>
        <button class="clients-modal-content-header-button" @click="emit('close', false)">
          <img :src="CloseIcon" alt="close icon" />
        </button>
      </div>
      <form @submit.prevent="submitForm" class="clients-modal-form">
        <div>
          <label for="fullName">ФИО:</label>
          <input type="text" id="fullName" v-model="fields.full_name" />
          <p v-if="$v.full_name.$error">Поле обязательно для заполнения.</p>
        </div>
        <div>
          <label for="birthDate">Дата рождения:</label>
          <input type="date" id="birthDate" v-model="fields.birth_date" />
          <p v-if="$v.birth_date.$error">Поле обязательно для заполнения.</p>
        </div>
        <div>
          <label for="address">Адрес:</label>
          <input type="text" id="address" v-model="fields.address" />
          <p v-if="$v.address.$error">Поле обязательно для заполнения.</p>
        </div>
        <div>
          <label for="phone">Телефон:</label>
          <input type="tel" id="phone" v-model="fields.phone" />
          <p v-if="$v.phone.$error">Поле обязательно для заполнения.</p>
        </div>
        <div class="clients-modal-footer">
          <button class="clients-modal-footer-button app-button" type="submit" :disabled="loading">
            {{ modalFooterButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, watch } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';

  import './ClientsModal.scss';

  import CloseIcon from '@/assets/icons/close-svgrepo-com.svg';
  import { ClientsModalEmits, ClientsModalFields, ClientsModalProps } from './types.ts';
  import generateUniqueId from '@/helpers/generateUniqueId.ts';
  import { useClientStore } from '@/store/clients.store.ts';
  import { Client } from '@/types/clients.types.ts';

  const clientsStore = useClientStore();

  const loading = computed<boolean>(() => {
    return clientsStore.clientsState.loading;
  });

  const emit = defineEmits<ClientsModalEmits>();
  const props = defineProps<ClientsModalProps>();

  const fields = reactive<ClientsModalFields>({
    id: '',
    full_name: '',
    address: '',
    birth_date: '',
    phone: '',
  });

  const rules = {
    full_name: { required },
    birth_date: { required },
    address: { required },
    phone: { required },
  };

  const $v = useVuelidate(rules, fields);

  const modalEditMode = computed<boolean>(() => {
    return props.client ? true : false;
  });

  const modalFooterButtonText = computed<string>(() => {
    return modalEditMode.value ? 'Редактировать' : 'Создать';
  });

  const modalHeaderText = computed<string>(() => {
    return modalEditMode.value ? 'Редактировать клиента' : 'Создать клиента';
  });
  const submitForm = async (): Promise<void> => {
    if (!(await $v.value.$validate())) return;
    const client: Client = {
      ...fields,
      id: modalEditMode.value ? props.client!.id : generateUniqueId,
    };
    emit('submit', client);
    resetFields();
  };

  const resetFields = (): void => {
    fields.id = '';
    fields.address = '';
    fields.birth_date = '';
    fields.full_name = '';
    fields.phone = '';
  };

  watch(
    () => props.client,
    client => {
      Object.assign(fields, client);
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped>
  @import 'ClientsModal.scss';
</style>
