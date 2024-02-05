<template>
  <div class="app-layout">
    <AppNavbar />
    <main>
      <div class="app-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { AppNavbar } from '@/components';
</script>
