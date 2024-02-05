<template>
  <table class="app-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <TransitionGroup name="rows">
        <Transition v-for="item in tableData" :key="item.id">
          <slot name="row" :item="item"></slot>
        </Transition>
      </TransitionGroup>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { AppTableProps } from '@/components/app/AppTable/types.ts';

  defineProps<AppTableProps>();
</script>

<style scoped>
  @import 'AppTable.scss';
</style>
