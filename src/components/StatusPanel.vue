<template>
  <section class="data-panels">
    <div class="data-card">
      <h3>服务运行状态</h3>
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
      <h3>硬件资源</h3>
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
      <h3>活跃项目</h3>
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
      <h3>业务运营</h3>
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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 160px; /* 给一个最小高度，撑开背景图 */
  
  /* 👇 引入全新的科幻背景图 👇 */
  background-image: url('@/assets/panel-bg.png'); 
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 调整内边距：把文字往中间挤一点，避免压到背景图自带的发光边框 */
  padding: 25px 25px 20px 25px; 
  transition: transform 0.3s ease, filter 0.3s ease;
  
  /* 👇 核心魔法：和上方入口卡片完全一致的多边形物理切角 👇 */
  clip-path: polygon(
    6px 0px,                  /* 1. 左上角切角变小 (15px -> 6px) */
    calc(50% - 70px) 0px,     /* 2. 顶部平边 */
    calc(50% - 50px) 12px,    /* 3. 凹槽变浅 (16px -> 12px) */
    calc(50% + 50px) 12px,    /* 4. 凹槽平底 */
    calc(50% + 70px) 0px,     /* 5. 凹槽右侧 */
    calc(100% - 6px) 0px,     /* 6. 顶部平边 */
    100% 6px,                 /* 7. 右上角切角 */
    100% calc(100% - 6px),    /* 8. 右边平边往下 */
    calc(100% - 6px) 100%,    /* 9. 右下切角 */
    6px 100%,                 /* 10. 底部平边 */
    0px calc(100% - 6px),     /* 11. 左下角切角 */
    0px 6px                   /* 12. 回到起点 */
  );
}

/* 悬停时的呼吸发光感 */
.data-card:hover {
  transform: translateY(-3px);
  filter: brightness(1.15);
}

/* 标题样式保留，左侧的竖线装饰很好看 */
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