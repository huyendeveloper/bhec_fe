import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import produce from 'immer';
import {signOut} from 'next-auth/client';
import Router from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {BoxLink, ButtonLink, ContentBlock, Notifications, UserAccount} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductWidget} from '~/components/Widgets';
import {AuthService, ProductService} from '~/services';
import {cartState} from '~/store/cartState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';

const Product = new ProductService();
const AuthServiceInstance = new AuthService();

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

// eslint-disable-next-line no-warning-comments
// TODO: retrieve notifications via API
const notifications = [];

const buttonLinks = [
  {id: 1, label: '基本情報', url: '/basic-information'},
  {id: 2, label: 'お届け先情報', url: '/delivery-info'},

  // TODO: not implement yet
  {id: 4, label: '割引クーポン', url: '/'},

  // TODO: not implement yet
  // {id: 5, label: 'お問い合わせ一覧', url: '/contact'},
  {id: 6, label: 'フォロー中の出品者一覧', url: '/followed-seller-list'},
  {id: 7, label: '返品/交換申請', url: '/contact'},
  {id: 9, label: 'パスワードを変更', url: '/auth/change-password'},
  {id: 3, label: '決済方法', url: '/payment-method'},
  {id: 10, label: 'ログアウト', url: '/'},
];

const boxLinks = [
  {
    image: '/img/icons/bill.png',
    content: '注文確認',
    url: '/orders',
    colorLabel: '#54c0c0',
  },

  // {
  //   image: '/img/icons/heart_fill.png',
  //   content: 'お気に入り商品',
  //   url: '/favorite-products',
  //   colorLabel: '#ba2636',
  // },
];

// eslint-disable-next-line no-warning-comments
// TODO: retrieve recommend products via API

export default function MyPage() {
  const classes = useStyles();
  const [user, setUser] = useRecoilState(userState);
  const setCart = useSetRecoilState(cartState);
  const setOrder = useSetRecoilState(orderState);
  const [recommendProducts, setRecommendProducts] = useState([]);

  const actionButton = (item) => {
    if (item.id === 10) {
      // clear local storage data in logging out
      setUser({});
      setCart({items: [], seller: null});
      setOrder();
      signOut({redirect: false});
      Router.push({
        pathname: 'auth/login',
      });
    } else {
      Router.push({
        pathname: item.url,
      });
    }
  };

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

  const fetchUserInfo = async () => {
    const response = await AuthServiceInstance.getInfoUser();
    if (!response?.user) {
      // has smt wrong to fetch user info
      // logout then redirect back to login
      setUser({});
      setCart({items: [], seller: null});
      setOrder();
      signOut({redirect: false});
      Router.push({
        pathname: 'auth/login',
      });
      return;
    }

    setUser(produce((draft) => {
      draft.profile = response?.user;
    }));
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      fetchUserInfo();
    }
    getListRecommendProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout title={'マイページ'}>
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

      {recommendProducts?.length > 0 && (
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
                  heart={false}
                  border={'borderNone'}
                />
              </Grid>
            ))}
          </Grid>
        </ContentBlock>
      )}
    </DefaultLayout>
  );
}
