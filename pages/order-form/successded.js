/* eslint-disable no-useless-escape */
import {
  Grid, Typography, useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Image from 'next/image';
import {useState} from 'react';

import {Button, ContentBlock, DeliveryForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, DialogWidget, ProductWidget} from '~/components/Widgets';

const useStyles = makeStyles((theme) => ({
  orderSuccess: {
    textAlign: 'center',
  },
  thanks: {
    fontWeight: 'bold',
    lineHeight: '2.25rem',
    color: '#54C0C0',
    margin: '3rem 0 2.75rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      margin: '1.5rem 0',
    },
  },
  recommendedProducts: {
    marginTop: '2rem',
  },
  ads: {
    paddingTop: '3rem !important',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem !important',
    },
  },
  buttons: {
    '& button': {
      margin: '0.75rem',
      [theme.breakpoints.down('xs')]: {
        margin: '0.5rem',
        width: '100%',
      },
    },
  },
}));

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
  {
    productId: 4,
    name: '『大好評』江戸節句人形についてご紹介しています。',
    productThumb: '/img/products/product-04.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}],
    price: 184750,
    is_favorite_product: false,
    seller_info: {
      name: '松崎光正',
      catch_phrase: '木地部門　伝統工芸士',
      avatar: '/img/sellers/seller-04.png',
      introduction: '松崎人形',
    },
    tags: [
      {
        id: 2,
        name: '農薬節約栽培',
      },
    ],
  },
];

export default function OrderForm() {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [editMode] = useState(false);
  const [editData] = useState({});

  return (
    <DefaultLayout title='Order successded - BH_EC'>
      <ContentBlock
        title={'ご注文フォーム'}
        bgImage='/img/noise.png'
      >
        <div className={classes.orderSuccess}>
          <Image
            src={'/order-succes.png'}
            width={181}
            height={320}
            alt={'icon'}
          />

          <Typography
            variant={'h5'}
            className={classes.thanks}
          >{'ご購入ありがとうございます。'}</Typography>

          <div className={classes.buttons}>
            <Button
              variant={'pill'}
              customColor={'white'}
              customBorder={'bdGray'}
              customSize={'extraLarge'}
            >
              {'ホームページに戻る'}
            </Button>

            <Button
              variant={'pill'}
              customColor={'red'}
              customSize={'extraLarge'}
            >
              {'注文一覧へ'}
            </Button>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock
        title={'あなたにオススメの商品'}
        bgColor='#faf6ef'
        bgImage='/img/noise.png'
      >
        <Grid
          container={true}
          spacing={3}
          className={classes.recommendedProducts}
        >
          {recommendProducts.map((product) => (
            <Grid
              key={product.productId}
              item={true}
              sm={4}
            >
              <ProductWidget
                data={product}
                heart={true}
                border={'borderNone'}
              />
            </Grid>
          ))}

          <Grid
            item={true}
            xs={12}
            className={classes.ads}
          >
            <AdsWidget
              imgSrc={'/img/ad/ad6.png'}
              imgWidth={'1140'}
              imgHeight={'192'}
            />
          </Grid>

          <Grid
            item={true}
            xs={12}
            className={classes.ads}
          >
            <AdsWidget
              imgSrc={'/img/ad/ad7.png'}
              imgWidth={'1140'}
              imgHeight={'192'}
            />
          </Grid>
        </Grid>

        <DialogWidget
          open={openAddAddress}
          handleClose={() => setOpenAddAddress(false)}
          size={isTablet ? 'sm' : 'md'}
          title={'新しい住所を追加する'}
        >
          <DeliveryForm
            dataEdit={editData}
            editMode={editMode}
          />
        </DialogWidget>
      </ContentBlock>
    </DefaultLayout>
  );
}
