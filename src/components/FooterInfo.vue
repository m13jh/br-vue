<template>
  <footer class="status-footer">
    <div class="status-badge">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
      CPU 72%
    </div>
    <div class="status-badge">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4M10 10v4M14 10v4M18 10v4"/></svg>
      内存 68%
    </div>
    <div class="status-badge">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      硬盘 42%
    </div>
    <div class="status-badge success">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      数据库 已连接
    </div>
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
  /* 使用全局面板背景变量 */
  background: var(--panel-bg);
  /* 使用 color-mix 为边框和阴影增加透明度 */
  border: 1px solid color-mix(in srgb, var(--primary-cyan) 40%, transparent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--primary-cyan) 20%, transparent);
  padding: 8px 25px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  /* 文字颜色跟随主题 */
  color: var(--text-main);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

/* 数据库连接成功的特殊高亮 */
.status-badge.success {
  border-color: color-mix(in srgb, var(--primary-cyan) 70%, transparent);
  box-shadow: 0 0 15px color-mix(in srgb, var(--primary-cyan) 30%, transparent);
}

.status-badge .icon {
  width: 18px;
  height: 18px;
  color: var(--primary-cyan); /* 图标保持主题高亮色 */
  filter: drop-shadow(0 0 5px color-mix(in srgb, var(--primary-cyan) 50%, transparent));
}
</style>