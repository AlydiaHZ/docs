<template>
  <VPHero name="zrjhzDocs" text="个人技术文档" :actions="actions" :image="image" />
  <VPFeatures :features="pages" />
  <div class="add">
    <div class="container">
      {{ tagline }}
    </div>
  </div>
</template>

<script setup lang="ts">
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'
import VPFeatures from './VPFeatures.vue'
import { data as pages } from '../../.vitepress/create.data'

const tagline = `累计更新${pages.length}篇文章`
const image = { light: './assert/mew.png', dark: 'assert/ooh.png' }
const actions = [
  {
    text: '随便逛逛',
    link: randomPage(),
  },
]

function randomPage(): string {
  const length = pages.length - 1;
  
  pages.forEach(page => {
    page.updatedTime = formatTimeDiff(page.fileTimeInfo[1], +new Date())
  })

  return pages[Math.floor(Math.random() * length)]!.link!
}


function formatTimeDiff(startTimestamp: number, endTimestamp: number): string {
  const diff = Math.abs(endTimestamp - startTimestamp); // 毫秒差值

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const second = 1000;

  if (diff >= day) {
    return Math.floor(diff / day) + " 天";
  } else if (diff >= hour) {
    return Math.floor(diff / hour) + " 小时";
  } else if (diff >= minute) {
    return Math.floor(diff / minute) + " 分钟";
  } else if (diff >= second) {
    return Math.floor(diff / second) + " 秒";
  } else {
    return diff + " 毫秒";
  }
}

</script>

<style lang="scss">
@media (min-width: 960px) {
  .add {
    padding: 20px 64px;
    text-align: right;
  }
}
</style>
