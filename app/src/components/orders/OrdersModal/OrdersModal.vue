<template>
  <div class="orders-modal" @click="emit('close', false)">
    <div class="orders-modal-content" @click.stop>
      <div class="orders-modal-content-header">
        <div class="orders-modal-content-header-title">Создание заказа</div>
        <button class="orders-modal-content-header-button" @click="emit('close', false)">
          <img :src="CloseIcon" alt="close icon" />
        </button>
      </div>
      <form @submit.prevent="submitForm" class="orders-modal-form">
        <div>
          <label for="clientSelect">Заказчик:</label>
          <select id="clientSelect" v-model="fields.client">
            <option value="" disabled>Выберите заказчика</option>
            <option v-for="client in clients" :key="client.id" :value="client.full_name">
              {{ client.full_name }}
            </option>
          </select>
          <p v-if="$v.client.$error">Поле обязательно для заполнения.</p>
        </div>
        <div>
          <label for="orderDate">Дата заказа:</label>
          <input type="date" id="orderDate" v-model="fields.order_date" />
        </div>
        <div class="orders-modal-content-goods" v-for="(good, index) in fields.goods" :key="index">
          <div class="orders-modal-content-goods-title">
            <h3>Товар№ {{ index + 1 }}</h3>
            <button @click="removeGood(index)"><img :src="RemoveIcon" alt="remove icon" /></button>
          </div>
          <div>
            <label :for="`good-${index}`">Товар:</label>
            <input type="text" :id="`good-${index}`" v-model="good.good" />
          </div>
          <div>
            <label :for="`price-${index}`">Цена:</label>
            <input type="number" :id="`price-${index}`" v-model="good.price" />
          </div>
        </div>
        <div>
          <button class="app-button" type="button" @click="addGood">Добавить товар</button>
        </div>
        <div class="orders-modal-footer">
          <div class="orders-modal-footer-total">
            <span>Сумма :</span>
            <span>{{ totalAmount }}</span>
          </div>
          <button class="orders-modal-footer-button app-button" type="submit" :disabled="loading">
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

  import './OrdersModal.scss';

  import RemoveIcon from '@/assets/icons/remove-minus-svgrepo-com.svg';
  import CloseIcon from '@/assets/icons/close-svgrepo-com.svg';
  import { OrdersModalEmits, OrdersModalProps, ModalOrderFields } from './types.ts';
  import generateUniqueId from '@/helpers/generateUniqueId.ts';
  import { Order } from '@/types/orders.types.ts';
  import { useOrdersStore } from '@/store/orders.store.ts';

  const ordersStore = useOrdersStore();

  const loading = computed(() => {
    return ordersStore.ordersState.loading;
  });

  const emit = defineEmits<OrdersModalEmits>();
  const props = defineProps<OrdersModalProps>();

  const fields = reactive<ModalOrderFields>({
    client: '',
    order_date: new Date().toISOString().slice(0, 10),
    goods: [
      {
        price: null,
        good: null,
      },
    ],
  });

  const rules = {
    client: { required },
  };

  const totalAmount = computed(() => {
    return fields.goods.reduce((sum, good) => {
      const price = good.price ? good.price : 0;
      return sum + price;
    }, 0);
  });

  const $v = useVuelidate(rules, fields);

  const addGood = () => {
    fields.goods.push({
      good: null,
      price: null,
    });
  };

  const modalEditMode = computed(() => {
    return props.order ? true : false;
  });

  const modalFooterButtonText = computed<string>(() => {
    return modalEditMode.value ? 'Редактировать' : 'Создать';
  });
  const removeGood = (index: number) => {
    fields.goods.splice(index, 1);
  };
  const submitForm = async () => {
    if (!(await $v.value.$validate())) return;
    const order: Order = {
      ...fields,
      id: modalEditMode.value ? props.order!.id : generateUniqueId,
      total_amount: totalAmount.value,
    };
    emit('submit', order);
    resetFields();
  };

  const resetFields = (): void => {
    fields.goods = [
      {
        good: null,
        price: null,
      },
    ];
    fields.client = '';
    fields.order_date = new Date().toISOString().slice(0, 10);
  };

  watch(
    () => props.order,
    order => {
      Object.assign(fields, order);
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped>
  @import 'OrdersModal.scss';
</style>
