<template>
  <section class="data-panels">
    <div class="data-card">
      <h3>| 服务运行状态</h3>
      <div class="data-content">
        <div class="data-item">
          <span>服务在线率</span>
          <strong class="highlight">99.9%</strong>
        </div>
        <div class="data-item">
          <span>今日标注</span>
          <strong>1650条</strong>
        </div>
      </div>
    </div>

    <div class="data-card">
      <h3>| 硬件资源</h3>
      <div class="data-content">
        <div class="data-item">
          <strong class="highlight">96.50%</strong>
          <span>注</span>
        </div>
        <div class="data-item">
          <strong>1650条</strong>
        </div>
      </div>
      <div class="chart-placeholder">（折线图占位）</div>
    </div>

    <div class="data-card">
      <h3>| 活跃项目</h3>
      <div class="data-content">
        <div class="data-item">
          <strong class="highlight">18</strong><span>项目</span>
        </div>
        <div class="data-item">
          <strong>18</strong><span>个</span>
        </div>
      </div>
      <div class="chart-placeholder">（折线图占位）</div>
    </div>

    <div class="data-card">
      <h3>| 业务运营</h3>
      <div class="data-content">
        <div class="data-item">
          <span>推理调用</span>
          <strong class="highlight">128次</strong>
        </div>
        <div class="data-item">
          <span>推理调用</span>
          <strong>128万次</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.data-panels {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.data-card {
  flex: 1;
  background: var(--panel-bg);
  /* 使用变量和 color-mix 替换 rgba */
  border: 1px solid color-mix(in srgb, var(--primary-cyan) 30%, transparent);
  box-shadow: inset 0 0 20px color-mix(in srgb, var(--primary-cyan) 15%, transparent);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.data-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 30px; height: 30px;
  border-top: 2px solid var(--primary-cyan);
  border-left: 2px solid var(--primary-cyan);
  border-top-left-radius: 12px;
}
.data-card::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 30px; height: 30px;
  border-bottom: 2px solid var(--primary-cyan);
  border-right: 2px solid var(--primary-cyan);
  border-bottom-right-radius: 12px;
}

.data-card h3 {
  font-size: 1rem;
  margin: 0 0 20px 0;
  color: var(--text-main);
  border-left: 4px solid var(--primary-cyan);
  padding-left: 10px;
  text-shadow: 0 0 5px color-mix(in srgb, var(--primary-cyan) 60%, transparent);
  transition: color 0.3s ease;
}

.data-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.data-item {
  display: flex;
  flex-direction: column;
}

.data-item span {
  font-size: 0.85rem;
  /* 副标题/单位使用混入背景色的弱化文字 */
  color: color-mix(in srgb, var(--text-main) 70%, transparent);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.data-item strong {
  font-size: 1.3rem;
  color: var(--text-main);
  transition: color 0.3s ease;
}

.highlight {
  color: var(--primary-cyan) !important;
  font-size: 1.8rem !important;
  font-weight: bold;
  text-shadow: 0 0 10px color-mix(in srgb, var(--primary-cyan) 50%, transparent);
}

.chart-placeholder {
  height: 40px;
  border-bottom: 1px dashed color-mix(in srgb, var(--primary-cyan) 30%, transparent);
  color: color-mix(in srgb, var(--text-main) 30%, transparent);
  text-align: center;
  line-height: 40px;
  font-size: 0.8rem;
  margin-top: auto;
}
</style>