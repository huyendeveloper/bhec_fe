import {Grid, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';
import produce from 'immer';

import {BoxLink, ButtonLink, ContentBlock, Notifications, UserAccount} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductWidget} from '~/components/Widgets';
import {AuthService, ProductService} from '~/services';
import {userState} from '~/store/userState';

const Product = new ProductService();
const AuthServiceInstance = new AuthService();

const useStyles = makeStyles((theme) => ({
  userInfo: {
    padding: '1.875rem 0 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '2rem',
    },
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
// TODO: retrieve notifications via API
const notifications = [];

const buttonLinks = [
  {id: 1, label: '基本情報', url: '/basic-information'},
  {id: 2, label: 'お届け先情報', url: '/delivery-info'},
  {id: 4, label: '割引クーポン', url: '/coupons'},

  // TODO: not implement yet
  {id: 5, label: 'お問い合わせ一覧', url: '/contacts'},
  {id: 6, label: 'フォロー中の出品者一覧', url: '/followed-seller-list'},
  {id: 7, label: '返品/交換申請', url: '/contacts/send-contact'},
  {id: 9, label: 'パスワードを変更', url: '/auth/change-password'},
  {id: 3, label: 'お支払い方法', url: '/payment-method'},
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
    url: '/favorite-products',
    colorLabel: '#ba2636',
  },
];

// eslint-disable-next-line no-warning-comments
// TODO: retrieve recommend products via API

export default function MyPage() {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();

  const [recommendProducts, setRecommendProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useRecoilState(userState);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      fetchUserInfo();
      getListRecommendProducts();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const actionButton = (item) => {
    if (item.id === 10) {
      // clear local storage data in logging out
      setUser({});
      signOut({redirect: false});
      router.push({
        pathname: '/auth/login',
      });
    } else {
      router.push({
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
      signOut({redirect: false});
      router.push({pathname: '/auth/login'});
      return;
    }

    setUser(
      produce((draft) => {
        draft.profile = response?.user;
        draft.noti_unread = response?.noti_unread;
      }),
    );
  };

  return (
    <DefaultLayout title={'マイページ'}>
      {isAuthenticated && (
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
            spacing={isMobile ? 2 : 3}
            className={classes.boxLink}
          >
            {boxLinks.map((item) => (
              <Grid
                key={item.url}
                item={true}
                md={4}
                sm={6}
                xs={6}
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
            spacing={isMobile ? 1 : 3}
            className={classes.buttonLink}
          >
            {buttonLinks.map((item) => (
              <Grid
                key={item.id}
                item={true}
                md={4}
                sm={4}
                xs={12}
              >
                <ButtonLink
                  item={item}
                  actionButton={actionButton}
                />
              </Grid>
            ))}
          </Grid>
        </ContentBlock>
      )}

      {recommendProducts?.length > 0 && (
        <div className={classes.categoryBlock}>
          <ContentBlock
            title={'オススメ商品'}
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
                  key={product.id}
                  item={true}
                  sm={4}
                  xs={6}
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
        </div>
      )}
    </DefaultLayout>
  );
}
