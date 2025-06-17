import { MarkdownOptions } from 'vitepress';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';

export const markdown: MarkdownOptions = {
  config(md) {
    md.use(groupIconMdPlugin);
  },
  image: {
    lazyLoading: true,
  },
  math: true,
};
