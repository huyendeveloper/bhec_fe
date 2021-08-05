import React from 'react';

import {ArticleItem, ArticleDetail} from '~/components/Article';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ArticleItem',
  component: ArticleItem,
};

const article = {
  id: 2,
  image: 'https://picsum.photos/200/300',
  title: '伊万里焼・有田焼',
  tags: ['タグ1', 'タグ2', 'タグ3'],
  description: '伊万里焼（いまりやき）・有田焼（ありたやき）は、佐賀県有田町周辺で作られている磁器です。薄く華奢な印象の伊万里焼・有田焼ですが、どちらも陶石から作られた磁器のために耐久性に優れています。伊万里焼・有田焼の特徴は、キメが細かくなめらかな手触り、透明感のある白磁に染め付け呉須の藍と鮮やかな赤の配色です。',
};

const blog = {
  id: 1,
  image: 'https://picsum.photos/400/800',
  title: 'タイトルタイトルタイトルタイトル',
  listProducts: [
    {
      id: 1,
      image: 'https://picsum.photos/200/300',
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: '¥4,321',
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300',
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: '¥4,321',
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/300',
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: '¥4,321',
    },
  ],
  description: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキ',
};

const ArticleStory = (args) => <ArticleItem {...args}/>;

export const Article = ArticleStory.bind({});

Article.args = {
  ...article,
};

const ArticleBlogColumnStr = (args) => <ArticleDetail {...args}/>;

export const ArticleBlogColumn = ArticleBlogColumnStr.bind({});

ArticleBlogColumn.args = {
  ...blog,
};
