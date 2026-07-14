<template>
  <div class="module-card">
    <div class="icon-placeholder"></div>
    <h2>{{ title }}</h2>
    <button class="enter-btn">进入平台</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.module-card {
  flex: 1;
  background: linear-gradient(180deg, rgba(16,33,74,0.7) 0%, rgba(10,21,50,0.8) 100%);
  border: 1px solid rgba(0, 229, 255, 0.4);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.2) inset, 0 0 20px rgba(176, 98, 255, 0.1);
}
.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border: 2px solid transparent;
  border-radius: 12px;
  background: linear-gradient(45deg, #00e5ff, #b062ff) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
}
.module-card h2 {
  font-size: 1.5rem;
  margin: 20px 0;
}
.enter-btn {
  background: linear-gradient(90deg, #00e5ff, #0088ff);
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.enter-btn:hover {
  box-shadow: 0 0 15px #00e5ff;
}
</style>