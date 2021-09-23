import {Breadcrumbs as MuiBreadcrumbs, Container, Grid, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Pagination} from '@material-ui/lab';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Swal from 'sweetalert2';

import {ContentBlock, Search} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductWidget, TopBannerWidget} from '~/components/Widgets';
import {clean} from '~/lib/object';
import {ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  favoriteProducts: {
    marginTop: '2rem',
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.75rem',
    },
  },
  content: {
    padding: '2rem 0 0 0',
    backgroundColor: '#f8f8f8',
    backgroundRepeat: 'repeat',
    backgroundImage: 'url("/img/noise.png")',
    mixBlendMode: 'multiply',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5rem 0 0 0',
    },
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1.5rem 0',
    },
    '& .MuiButtonBase-root': {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '1px solid ' + theme.palette.grey.dark,
      margin: '0 0.5rem',
      background: theme.palette.white.main,
      fontWeight: '700',
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      '&:hover': {
        background: theme.palette.red.main,
        borderColor: theme.palette.red.main,
        color: theme.palette.white.main,
      },
      [theme.breakpoints.down('sm')]: {
        width: '2.5rem',
        height: '2.5rem',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
      },
    },
    '& .Mui-selected': {
      background: theme.palette.red.main,
      borderColor: theme.palette.red.main,
      color: theme.palette.white.main,
    },
  },

  breadcrumbs: {
    alignItems: 'center',
    display: 'flex',
    margin: '0 0 1.688rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 1.25rem',
    },
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.black.light,
      fontWeight: 'bold',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
    '& .MuiBreadcrumbs-li:last-child > p': {
      fontWeight: 'normal',
    },
  },

  link: {
    color: theme.palette.black.light,
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
  },
  searchBox: {
    marginBottom: '-2rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '-1rem',
    },
  },
}));

const linkProps = [
  {
    id: 1,
    linkLabel: 'ホーム',
    linkUrl: '/',
  },
  {
    id: 2,
    linkLabel: '検索結果一覧',
  },
];

const SearchPage = ({query}) => {
  const {category, tag, keyword, page} = query;
  const [currentPage, setCurrentPage] = useState(page);
  const router = useRouter();
  const classes = useStyles();
  const [pagination, setPagination] = useState(null);
  const [products, setProducts] = useState([]);
  const setLoading = useSetRecoilState(loadingState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    fetchData();
    return () => {
      // return an anonymous clean up function
    };
  }, [category, currentPage]);

  const changePage = async (e, pageNumber) => {
    setCurrentPage(pageNumber);
    router.push({
      pathname: '/search-page',
      query: clean({category, tag, keyword, page: pageNumber}),
    });
  };

  const fetchData = async () => {
    const searchResult = await Product.getProducts(query);
    if (searchResult && searchResult?.products) {
      const productList = searchResult?.products;
      setPagination(searchResult?.pagination);
      setProducts(productList);
    }
  };

  const handleLikeProduct = async (id, likeStatus) => {
    if (user?.isAuthenticated) {
      setLoading(true);
      const res = likeStatus ? await Product.likeProduct(id) : await Product.unlikeProduct(id);
      if (res) {
        fetchData();
      }
      setLoading(false);
    } else {
      Swal.fire({
        title: '登録・ログインが必要です。',
        text: ' ',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '閉じる',
        confirmButtonText: '登録・ログインへ',
        backdrop: false,
        customClass: {
          container: 'swal2-warning',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/auth/login');
        }
      });
    }
  };

  return (
    <DefaultLayout title={category}>
      <div className={classes.content}>
        <Container className={classes.searchBox}>
          <MuiBreadcrumbs
            className={classes.breadcrumbs}
            separator={'/'}
          >
            {linkProps.map((item) => (
              item.linkUrl ? (
                <Link
                  key={`link-${item.id}`}
                  className={classes.link}
                  href={item.linkUrl}
                  color='textPrimary'
                >
                  {item.linkLabel}
                </Link>
              ) : (
                <Typography
                  key={`textLink-${item.id}`}
                  className={classes.link}
                >
                  {item.linkLabel}
                </Typography>
              )
            ))}
          </MuiBreadcrumbs>

          <Search query={{category, tag, keyword}}/>
        </Container>

        <ContentBlock
          title={'検索結果一覧'}
          bgColor='transparent'
        >
          <Grid
            container={true}
            spacing={3}
            className={classes.favoriteProducts}
          >
            {products.length > 0 && products.map((product) => (
              <Grid
                key={`product${product.id}`}
                item={true}
                sm={4}
              >
                <ProductWidget
                  data={product}
                  border={'borderNone'}
                  heart={true}
                  handleLike={handleLikeProduct}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={12}
          >
            {products.length > 0 && pagination?.number_of_page > 0 &&
              <Pagination
                count={pagination.number_of_page}
                variant={'outlined'}
                color={'primary'}
                size={'large'}
                defaultPage={1}
                onChange={changePage}
                className={classes.pagination}
              />
            }
            <TopBannerWidget
              variant='titleBanner'
              imgSrc='/img/banner-favorite1.png'
              imgWidth={1140}
              imgHeight={192}
              imgAlt='Seller Form'
            />
          </Grid>
        </ContentBlock>
      </div>
    </DefaultLayout>
  );
};

SearchPage.propTypes = {
  query: PropTypes.object,
};

export const getServerSideProps = async ({query}) => {
  return {
    props: clean({
      query,
    }),
  };
};

export default SearchPage;
