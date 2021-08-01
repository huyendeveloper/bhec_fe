import {makeStyles} from '@material-ui/core/styles';
import Head from 'next/head';

import {Footer} from '../../../components/Layout/Footer';
import {Header} from '../../../components/Layout/Header';
import {Block} from '../../../components/MyPage/Block';
import {ReviewProduct, ReviewShop} from '../../../components/Review';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-between',
  },
  btnReview: {
    width: '14.125rem',
    height: '3.375rem',
    background: '#979797',
    fontSize: '0.75rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    border: 'none',
    color: theme.palette.white.main,
    margin: '0 auto 2.188rem',
  },
}));

const product = {
  productId: 2,
  productName: '『大好評』江戸べっ甲についてご紹介しています。',
  productThumb: '/img/products/product-02.png',
  productUrl: '#',
  productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
  productPrice: 32800,
  productRate: 3.5,
  productOwner: {
    name: '磯貝 剛',
    avatar: '/img/sellers/seller1.jpg',
    introduction: 'ベッ甲イソガイ　統括',
    rate: 3.5,
  },
};

const ReviewsDetail = () => {
  const classes = useStyles();

  return (
    <div className={'page'}>
      <Head>
        <title>{'Order Detail - BH_EC'}</title>
        <meta
          name='description'
          content='Generated by NextJs'
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className={classes.content}>
        <Block title={'商品レビューを書く'}>
          <ReviewProduct product={product}/>
        </Block>

        <Block
          title={'店舗レビューを書く'}
          paddingBot={'2.188rem'}
        >
          <ReviewShop productOwner={product.productOwner}/>
        </Block>

        <button className={classes.btnReview}>{'投稿'}</button>
      </div>

      <Footer/>
    </div >
  );
};

export default ReviewsDetail;
