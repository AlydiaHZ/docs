import { defineConfig } from 'vitepress';
import AutoNav from 'vite-plugin-vitepress-auto-nav';
import { searchOptions, markdown, socialLinks } from './configs';
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons';

export default defineConfig({
  base: '/docs/',
  lang: 'zh-Hans',
  title: 'zrjhzDocs',
  description: '个人前端技术文档',
  srcDir: 'content',
  lastUpdated: true,
  markdown,

  vite: {
    plugins: [AutoNav(), groupIconVitePlugin()],
  },

  vue: {},

  themeConfig: {
    siteTitle: 'zrjhzDocs',
    search: { provider: 'local', options: searchOptions },
    socialLinks,
    outline: {
      level: [2, 3],
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'full',
        hourCycle: 'h24',
      },
    },

    editLink: {
      pattern: 'https://github.com/zrjhz/docs/edit/main/:path',
      text: '修改本文',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    notFound: {
      title: '找不到页面',
      quote: '页面不见了，也许它去找寻新的冒险了！',
      linkLabel: '返回首页重新探索',
      linkText: '返回首页',
      code: '404',
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
  },
});
