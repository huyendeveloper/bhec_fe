/* eslint-disable no-useless-escape */
import {
  Grid, Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {userState} from '~/store/userState';
import {ProductService} from '~/services';
import {orderState} from '~/store/orderState';

const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  orderSuccess: {
    textAlign: 'center',
  },
  paymentMessage: {
    color: '#54C0C0',
    margin: '0 0 2.75rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      margin: '1.5rem 0',
    },
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
  categoryBlock: {
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      '& .MuiGrid-container': {
        overflow: 'scroll',
        flexWrap: 'nowrap',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '& .MuiGrid-item': {
        minWidth: '16.688rem',
      },
    },
  },
}));

// eslint-disable-next-line no-warning-comments
// TODO: get recommended products via API

export async function getServerSideProps({query}) {
  return {
    props: {
      mstatus: query?.mstatus || null,
    },
  };
}

export default function OrderForm({mstatus}) {
  const classes = useStyles();
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [recommendProducts, setRecommendProducts] = useState([]);
  const order = useRecoilValue(orderState);

  const getListRecommendProducts = async () => {
    const query = {
      page: 1,
      per_page: 3,
    };
    const result = await Product.getProducts(query);
    if (result && result.products && result.products.length) {
      setRecommendProducts(result.products);
    }
  };

  useEffect(() => {
    getListRecommendProducts();
  }, []);

  return (
    <DefaultLayout title='ご注文完了'>
      <ContentBlock
        title={'ご注文フォーム'}
        bgImage='/img/noise.png'
      >
        <div className={classes.orderSuccess}>
          <Image
            src={'/img/female-character-happy.png'}
            width={181}
            height={320}
            alt={'icon'}
          />

          <Typography
            variant={'h5'}
            className={classes.thanks}
          >{'ご購入ありがとうございます。'}</Typography>

          {order?.order_number &&
            <Typography
              variant={'h5'}
              className={classes.thanks}
            >{`注文番号: ${order?.order_number}` || ''}</Typography>
          }
          {(mstatus || order?.mstatus) === 'success' &&
            <Typography
              variant={'h5'}
              className={classes.paymentMessage}
            >{'お支払いは成功しました。'}</Typography>
          }
          {(mstatus || order?.mstatus) === 'failure' &&
            <Typography
              variant={'h5'}
              className={classes.paymentMessage}
            >{'決済処理に失敗しました。お支払い情報のご確認のうえ、管理者へご連絡ください。'}</Typography>
          }

          <div className={classes.buttons}>
            <Button
              variant={'pill'}
              customColor={'white'}
              customBorder={'bdBlack'}
              customSize={'extraLarge'}
              onClick={() => router.push('/')}
            >
              {'TOPページへ戻る'}
            </Button>

            {user?.isAuthenticated && (
              <Button
                variant={'pill'}
                customColor={'red'}
                customSize={'extraLarge'}
                onClick={() => router.push('/orders')}
              >
                {'注文一覧へ'}
              </Button>
            )}
          </div>
        </div>
      </ContentBlock>

      {recommendProducts.length > 0 && (
        <ContentBlock
          title={'あなたにオススメの商品'}
          bgColor='#faf6ef'
          bgImage='/img/noise.png'
        >
          <div className={classes.categoryBlock}>
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
                    border={'borderNone'}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <Grid
            container={true}
            spacing={3}
            className={classes.recommendedProducts}
          >
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
        </ContentBlock>
      )}
    </DefaultLayout>
  );
}

OrderForm.propTypes = {
  mstatus: PropTypes.string,
};
