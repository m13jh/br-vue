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
  gap: 15px;
  margin-bottom: 30px;
}
.data-card {
  flex: 1;
  background: rgba(13, 27, 62, 0.6);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.data-card h3 {
  font-size: 1rem;
  margin: 0 0 15px 0;
  color: #00e5ff;
  border-left: 3px solid #00e5ff;
  padding-left: 8px;
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
  font-size: 0.8rem;
  color: #a0b6d4;
  margin-bottom: 5px;
}
.data-item strong {
  font-size: 1.2rem;
}
.highlight {
  color: #00e5ff;
  font-size: 1.5rem !important;
}
.chart-placeholder {
  height: 40px;
  border-bottom: 1px dashed rgba(0,229,255,0.3);
  color: rgba(255,255,255,0.2);
  text-align: center;
  line-height: 40px;
  font-size: 0.8rem;
}
</style>