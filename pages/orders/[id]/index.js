import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

import {ContentBlock, OrderItem} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  row: {
    width: '100%',
    display: 'flex',
    padding: '0.688rem 0',
    borderBottom: '1px solid #DBDBDB',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: theme.palette.black.light,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
    },
    '& h4': {
      margin: '0rem',
    },
  },
  button: {
    width: '10.625rem',
    height: '2.5rem',
    border: 'none',
    background: theme.palette.yellow.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.875rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginLeft: '1.5rem',
    borderRadius: '0.25rem',
    color: theme.palette.white.main,
    [theme.breakpoints.down('md')]: {
      width: '8rem',
      marginLeft: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '6rem',
      margin: '0 0 1rem',
    },
  },
  secondLevelTitle: {
    marginLeft: '1.5rem',
    lineHeight: '1.938rem',
  },
  multiLine: {
    lineHeight: '1.938rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'column',
      width: '100%',
    },
  },
  whiteButton: {
    background: theme.palette.white.main,
    border: '1px solid ' + theme.border.default,
    color: theme.palette.black.light,
  },
  orderDetail: {
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
}));

const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

const order = {
  id: 1234567890,
  orderDate: '2021/01/01 01:30',
  username: '鈴木はなこ',
  postCode: '〒150-0043',
  address: '東京都渋谷区道玄坂2-29-1',
  addressNo: '渋谷マンション101号',
  phone: '090-0000-0000',
  paymentMethod: 'クレジットカード',
  shippingMethod: 'クール便',
  productSubtotal: 3000,
  shippingFee: 300,
  totalAmount: 3300,
  discount: 200,
  orderDetails: [
    {
      id: 1,
      productId: 'p123456',
      name: '何個もパクパク「種ごと丸ごときんかん」ミニサイズ計2kg',
      image: '/img/products/product-01.png',
      url: '#',
      tags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
      price: 300,
      owner: {
        id: 3214,
        name: '小田原漆器',
        avatar: '/img/sellers/seller-01.png',
        introduction: '木地部門　伝統工芸士',
      },
      quantity: 123,
      trackingNum: '01234567980',
      transportType: 'ヤマト運輸',
      status: 1,
    },
    {
      id: 2,
      productId: 2,
      name: '『大好評』江戸べっ甲についてご紹介しています。',
      image: '/img/products/product-02.png',
      url: '#',
      tags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
      price: 26600,
      owner: {
        id: 3217,
        name: '小田原漆器',
        avatar: '/img/sellers/seller-02.png',
        introduction: '木地部門　伝統工芸士',
      },
      quantity: 20,
      trackingNum: '01234567980',
      transportType: 'ヤマト運輸',
      status: 2,
    },
  ],
};

const OrdersDetail = () => {
  const classes = useStyles();
  const {id, orderDate, username, postCode, address, addressNo, phone, paymentMethod, shippingMethod, productSubtotal, shippingFee, totalAmount, discount, orderDetails} = order;
  return (
    <DefaultLayout title={'Order Detail - BH_EC'}>
      <ContentBlock
        title={'注文詳細'}
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        paddingBot={'1.438rem'}
      >
        <Grid
          container={true}
          spacing={0}
          className={classes.orderDetail}
        >
          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'注文番号'}</h4>
            </Grid>
            <Grid
              item={true}
              sm={9}
              xs={8}
            >
              {id}
            </Grid>
          </div>

          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'注文日時'}</h4>
            </Grid>
            <Grid
              item={true}
              sm={9}
              xs={8}
            >
              {orderDate}
            </Grid>
          </div>

          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'お届け先住所'}</h4>
            </Grid>
            <Grid
              item={true}
              sm={9}
              xs={8}
              className={classes.multiLine}
            >
              {username}<br/>
              {postCode}<br/>
              {address}<br/>
              {addressNo}<br/>
              {phone}
            </Grid>
          </div>

          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'決済方法'}</h4>
            </Grid>
            <Grid
              item={true}
              sm={9}
              xs={8}
            >
              {paymentMethod}
            </Grid>
          </div>

          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'配送方法'}</h4>
            </Grid>
            <Grid
              item={true}
              sm={9}
              xs={8}
            >
              {shippingMethod}
            </Grid>
          </div>

          <div className={classes.row}>
            <Grid
              item={true}
              sm={3}
              xs={4}
            >
              <h4>{'配送方法'}</h4>
              <div className={classes.secondLevelTitle}>
                {'商品の小計'}<br/>
                {'配送料'}<br/>
                {'注文合計'}<br/>
                {'クーポン利用'}<br/>
              </div>
              <h4>{'ご請求金額'}</h4>
            </Grid>

            <Grid
              item={true}
              sm={4}
              xs={4}
            >
              <br/>
              <div className={classes.multiLine}>
                {currency.format(productSubtotal)}<br/>
                {currency.format(shippingFee)}<br/>
                {currency.format(totalAmount)}<br/>
                {'- ' + currency.format(discount)}<br/>
              </div>
              <h4>
                {currency.format(
                  productSubtotal + shippingFee +
                    (totalAmount - discount),
                )}
              </h4>
            </Grid>

            <Grid
              item={true}
              sm={5}
              xs={4}
              className={classes.buttons}
            >
              <button className={clsx(classes.button, classes.whiteButton)}>{'領収書発行'}</button>
              <button className={classes.button}>{'再発行'}</button>
            </Grid>
          </div>
        </Grid>

        {orderDetails.map((detail) => (
          <OrderItem
            key={`orderDetail-${detail.productId}`}
            data={detail}
          />
        ))}
      </ContentBlock>
    </DefaultLayout>
  );
};

export default OrdersDetail;
