import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {signOut} from 'next-auth/client';
import Router from 'next/router';

import {BoxLink, ButtonLink, ContentBlock, Notifications, UserAccount} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductWidget} from '~/components/Widgets';

const useStyles = makeStyles(() => ({
  userInfo: {
    padding: '1.875rem 0 3rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxLink: {
    marginTop: '0',
    '& .MuiGrid-item': {
      paddingTop: '0',
      paddingBottom: '0',
    },
  },
  buttonLink: {
    marginTop: '0.75rem',
    '& .MuiGrid-item': {
      paddingTop: '0',
      paddingBottom: '1rem',
    },
  },
  recommendedProducts: {
    marginTop: '2rem',
    '& .MuiGrid-item': {
      paddingTop: '0',
      paddingBottom: '0',
    },
  },
}));

const notifications = [
  {
    id: 1,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１',
    dateTime: '2021.06.11',
  },
  {
    id: 2,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知2テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    dateTime: '2021.06.11',
  },
  {
    id: 3,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知3テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    dateTime: '2021.06.11',
  },
  {
    id: 4,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知4テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    dateTime: '2021.06.11',
  },
  {
    id: 5,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知5テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    dateTime: '2021.06.11',
  },
];

const buttonLinks = [
  {id: 1, label: '基本情報', url: '/basic-information'},
  {id: 2, label: 'お届け先情報', url: '/delivery-info'},
  {id: 3, label: '決済方法', url: '/payment-method'},
  {id: 4, label: '割引クーポン', url: '/'},
  {id: 5, label: 'お問い合わせ一覧', url: '/contact'},
  {id: 6, label: 'フォロー中の出品者一覧', url: '/'},
  {id: 7, label: '返品/交換申請', url: '/'},
  {id: 8, label: '返品/交換一覧', url: '/'},
  {id: 9, label: 'パスワードを変更', url: '/'},
  {id: 10, label: 'ログアウト', url: '/'},
];

const boxLinks = [
  {
    image: '/img/icons/bill.png',
    content: '注文確認',
    url: '/orders',
    colorLabel: '#54c0c0',
  },
  {
    image: '/img/icons/heart_fill.png',
    content: 'お気に入り商品',
    url: '/',
    colorLabel: '#ba2636',
  },
];

const recommendProducts = [
  {
    productId: 1,
    name: '『大好評』小田原漆器についてご紹介しています。',
    productThumb: '/img/products/product-01.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    price: 26600,
    is_favorite_product: true,
    seller_info: {
      name: '小田原漆器',
      catch_phrase: '木地部門　伝統工芸士',
      avatar: '/img/sellers/seller-01.png',
      introduction: '木地部門　伝統工芸士',
    },
    tags: [
      {
        id: 2,
        name: '農薬節約栽培',
      },
    ],
  },
  {
    productId: 2,
    name: '『大好評』江戸べっ甲についてご紹介しています。',
    productThumb: '/img/products/product-02.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
    price: 32800,
    is_favorite_product: false,
    seller_info: {
      name: '磯貝 剛',
      catch_phrase: '木地部門　伝統工芸士',
      avatar: '/img/sellers/seller-02.png',
      introduction: 'ベッ甲イソガイ　統括',
    },
    tags: [
      {
        id: 2,
        name: '農薬節約栽培',
      },
    ],
  },
  {
    productId: 3,
    name: '『大好評』東京アンチモニー工芸品についてご紹介しています。',
    productThumb: '/img/products/product-03.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    price: 149300,
    is_favorite_product: false,
    seller_info: {
      name: '林　文雄',
      catch_phrase: '木地部門　伝統工芸士',
      avatar: '/img/sellers/seller-03.png',
      introduction: 'アートランド',
    },
    tags: [
      {
        id: 2,
        name: '農薬節約栽培',
      },
    ],
  },
];

export default function MyPage() {
  const classes = useStyles();

  const actionButton = (item) => {
    if (item.id === 10) {
      signOut({redirect: true, callbackUrl: '/'});
    } else {
      Router.push({
        pathname: item.url,
      });
    }
  };

  return (
    <DefaultLayout title={'MyPage - BH_EC'}>
      <ContentBlock
        title='マイページ'
        bgImage='/img/noise.png'
      >
        <div className={classes.userInfo}>
          <UserAccount/>

          <Notifications notifications={notifications}/>
        </div>

        <Grid
          container={true}
          spacing={3}
          className={classes.boxLink}
        >
          {boxLinks.map((item) => (
            <Grid
              key={item.url}
              item={true}
              md={4}
            >
              <BoxLink
                link={item}
                colorLabel={item.colorLabel}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container={true}
          spacing={3}
          className={classes.buttonLink}
        >
          {buttonLinks.map((item) => (
            <Grid
              key={item.id}
              item={true}
              md={4}
            >
              <ButtonLink
                item={item}
                actionButton={actionButton}
              />
            </Grid>
          ))}
        </Grid>
      </ContentBlock>

      <ContentBlock
        title={'あなたにオススメの商品'}
        bgColor='#faf6ef'
        bgImage='/img/noise.png'
      >
        <Grid
          container={true}
          spacing={4}
          className={classes.recommendedProducts}
        >
          {recommendProducts.map((product) => (
            <Grid
              key={product.productId}
              item={true}
              md={4}
            >
              <ProductWidget
                data={product}
                heart={true}
                border={'borderNone'}
              />
            </Grid>
          ))}
        </Grid>
      </ContentBlock>
    </DefaultLayout>
  );
}
