import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Button, ReviewProduct, ReviewsBlock, ReviewShop} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-between',
  },
  container: {
    padding: '0 1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 4rem',
    '& button': {
      width: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      '& button': {
        width: '100%',
      },
    },
  },
}));

const product = {
  productId: 2,
  productName: '何個もパクパク「種ごと丸ごときんかん」ミニサイズ計2kg',
  productThumb: '/img/products/product-02.png',
  productUrl: '#',
  productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
  productPrice: 32800,
  productRate: 3.5,
  productOwner: {
    name: '小田原漆器',
    avatar: '/img/sellers/seller1.jpg',
    introduction: 'ベッ甲イソガイ　統括',
    rate: 3.5,
  },
};

const ReviewsDetail = () => {
  const classes = useStyles();

  return (
    <DefaultLayout title='Review - BH_EC'>

      <div className={classes.content}>
        <ReviewsBlock
          title={'商品レビューを書く'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          <ReviewProduct product={product}/>
        </ReviewsBlock>

        <ReviewsBlock
          title={'店舗レビューを書く'}
        >
          <ReviewShop productOwner={product.productOwner}/>
        </ReviewsBlock>

        <Grid
          container={true}
          spacing={0}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <div className={classes.container}>
              <Button
                variant={'pill'}
                customColor={'red'}
                customSize={'medium'}
                customWidth={'fullwidth'}
              >
                {'投稿'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </DefaultLayout>
  );
};

export default ReviewsDetail;
