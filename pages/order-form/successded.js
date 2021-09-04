/* eslint-disable no-useless-escape */
import {
  Grid, Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';

import {Button, ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {userState} from '~/store/userState';

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

// eslint-disable-next-line no-warning-comments
// TODO: get recommended products via API
const recommendProducts = [];

export default function OrderForm() {
  const classes = useStyles();
  const user = useRecoilValue(userState);
  const router = useRouter();

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

          <div className={classes.buttons}>
            <Button
              variant={'pill'}
              customColor={'white'}
              customBorder={'bdGray'}
              customSize={'extraLarge'}
              onClick={() => router.push('/')}
            >
              {'ホームページに戻る'}
            </Button>

            {user?.isAuthenticated && (
              <Button
                variant={'pill'}
                customColor={'red'}
                customSize={'extraLarge'}
              >
                {'注文一覧へ'}
              </Button>
            )}
          </div>
        </div>
      </ContentBlock>

      {recommendProducts.length && (
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
        </ContentBlock>
      )}
    </DefaultLayout>
  );
}
