import {Breadcrumbs as MuiBreadcrumbs, Container, Grid, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Pagination} from '@material-ui/lab';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {ContentBlock, Search} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductWidget, TopBannerWidget} from '~/components/Widgets';
import {clean} from '~/lib/object';
import {ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  products: {
    marginTop: '2rem',
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.75rem',
    },
  },
  product: {
    [theme.breakpoints.down('xs')]: {
      padding: '0.75rem 0.5rem !important',
      '& strong': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
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
  description: {
    fontSize: '1rem',
    lineHeight: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.black4.main,
    marginBottom: '3rem',
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
  const router = useRouter();
  const classes = useStyles();
  const [pagination, setPagination] = useState(null);
  const [products, setProducts] = useState([]);
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    fetchData();
    return () => {
      // return an anonymous clean up function
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, tag, keyword, page]);

  const changePage = async (e, pageNumber) => {
    router.push({
      pathname: '/search-page',
      query: clean({category, tag, keyword, page: pageNumber}),
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const searchResult = await Product.getProducts(query);
    if (searchResult && searchResult?.products) {
      setLoading(false);
      const productList = searchResult?.products;
      setPagination({...pagination, current: searchResult.page, number_of_page: searchResult.pages});
      setProducts(productList);
    } else {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout title={'検索結果一覧'}>
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
          {
            products.length > 0 ? (
              <>
                <Grid
                  container={true}
                  spacing={3}
                  className={classes.products}
                >
                  {products.map((product) => (
                    <Grid
                      key={`product${product.id}`}
                      item={true}
                      sm={4}
                      xs={6}
                      className={classes.product}
                    >
                      <ProductWidget
                        data={product}
                        border={'borderNone'}
                        heart={true}
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
                </Grid>
              </>
            ) : (
              <Typography
                component='p'
                className={classes.description}
              >
                {'折り返しご連絡させて頂きますので、今しばらくお待ちくださいますよう、お願いいたします。'}
              </Typography>
            )
          }
          <TopBannerWidget
            variant='titleBanner'
            imgSrc='/img/banner-favorite1.png'
            imgWidth={1140}
            imgHeight={192}
            imgAlt='Seller Form'
          />
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
