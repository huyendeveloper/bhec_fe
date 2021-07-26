import React from 'react';

import ArticleItem from '../components/Article/ArticleItem';
import ArticleDetail from '../components/Article/ArticleDetail';
import ArticleDetailProduct from '../components/Article/ArticleDetailProduct';

export default {
  title: 'ArticleItem',
  component: ArticleItem,
}

const article = {
  id: 2,
  image: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
  article_title: "伊万里焼・有田焼",
  tags: ["タグ1", "タグ2", "タグ3"],
  description: "伊万里焼（いまりやき）・有田焼（ありたやき）は、佐賀県有田町周辺で作られている磁器です。薄く華奢な印象の伊万里焼・有田焼ですが、どちらも陶石から作られた磁器のために耐久性に優れています。伊万里焼・有田焼の特徴は、キメが細かくなめらかな手触り、透明感のある白磁に染め付け呉須の藍と鮮やかな赤の配色です。"
}

const blog = {
  id: 1,
  image: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
  title: 'タイトルタイトルタイトルタイトル',
  listProduct: [
    {
      id: 1,
      image: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: "¥4,321",
    },
    {
      id: 2,
      image: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: "¥4,321",
    },
    {
      id: 3,
      image: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
      name: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
      price: "¥4,321",
    }
  ],
  description: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキ"
}

const ArticleStory = (args) => <ArticleItem article={args}></ArticleItem>

export const Article = ArticleStory.bind({});

Article.args = {
  ...article
};

const ArticleBlogColumnStr = (args) => <ArticleDetail blog={args}></ArticleDetail>

export const ArticleBlogColumn = ArticleBlogColumnStr.bind({});

ArticleBlogColumn.args = {
  ...blog
};

const ArticleBlogRowStr = (args) => <ArticleDetailProduct blog={args}></ArticleDetailProduct>

export const ArticleBlogRow = ArticleBlogRowStr.bind({});

ArticleBlogRow.args = {
  ...blog
};