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
  gap: 30px;
  margin-top: auto;
  padding-bottom: 10px;
}

.status-badge {
  background: rgba(12, 26, 56, 0.8);
  border: 1px solid var(--border-cyan);
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
  padding: 10px 25px;
  border-radius: 8px; /* 取消倾斜，改为普通圆角 */
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e0eaff;
}

.status-badge .icon {
  font-size: 1.2rem;
  /* 如果有对应的 SVG 图标可以直接替换这些 emoji */
}
</style>