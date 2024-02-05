<template>
  <div class="app-container">
    <header class="app-header">
      <nav class="app-navbar">
        <div class="app-navbar-brand">Delivery</div>
        <ul class="app-navbar-links">
          <li v-for="(link, index) in navLinks" :key="index">
            <router-link :to="link.to">{{ link.title }}</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const navLinks = ref([
    { title: 'Заказы', to: { name: 'app.Orders' } },
    { title: 'Клиенты', to: { name: 'app.Clients' } },
  ]);
</script>

<style scoped>
  @import 'AppNavbar.scss';
</style>
