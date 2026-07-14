<template>
  <footer class="status-footer">
    <div class="status-badge"><span class="icon">🛡️</span> CPU 72%</div>
    <div class="status-badge"><span class="icon">⚙️</span> 内存 68%</div>
    <div class="status-badge"><span class="icon">💾</span> 硬盘 42%</div>
    <div class="status-badge"><span class="icon">✅</span> 数据库 已连接</div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.status-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: auto;
}
.status-badge {
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.4);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: skewX(-15deg);
}
.status-badge > * {
  transform: skewX(15deg);
}
</style>