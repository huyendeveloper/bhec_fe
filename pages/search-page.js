import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box, Container, Breadcrumbs as MuiBreadcrumbs, Typography, Link} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

import {clean} from '~/lib/object';

import {ContentBlock, Search} from '~/components';
import {ProductWidget, TopBannerWidget} from '~/components/Widgets';
import {DefaultLayout} from '~/components/Layouts';

import {ProductService} from '~/services';
const Product = new ProductService();
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 0',
  },
  favoriteProducts: {
    marginTop: '2rem',
  },
  gridFilter: {
    textAlign: 'end',
    '& .MuiSelect-select': {
      width: '8rem',
    },
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem 0',
    [theme.breakpoints.down('md')]: {
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
      [theme.breakpoints.down('md')]: {
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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  breadcrumbs: {
    alignItems: 'center',
    display: 'flex',
    height: '3.375rem',
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.black.main,
      fontWeight: 'bold',
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
    },
  },
  link: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
  },

  btnSearch: {
    background: '#BA2636',
    color: 'white',
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
    linkLabel: '検索結果',
    linkUrl: '/search-page',
  },
];

const SearchPage = ({query, searchResult}) => {
  const {category, tag, keyword, page} = query;
  const {pagination, products} = searchResult;
  const [currentPage, setCurrentPage] = useState(page);
  const router = useRouter();
  const classes = useStyles();
  const searchTitle = tag || category;
  const message = products.length < 1 ? '該当する結果がありません' : searchTitle ? `${searchTitle}に関する結果一覧` : '';

  useEffect(() => {
    return () => {
      // return an anonymous clean up function
    };
  }, [currentPage]);
  const changePage = async (e, pageNumber) => {
    setCurrentPage(pageNumber);
    router.push({
      pathname: '/search-page',
      query: clean({category, tag, keyword, page: pageNumber}),
    });
  };

  return (
    <DefaultLayout title='Search Result - Oshinagaki Store'>
      <div className={classes.root}>
        <div className='content'>
          <Container>
            <Grid
              container={true}
              spacing={3}
              justifyContent='center'
              maxWidth={'lg'}
            >
              <Grid
                item={true}
                xs={12}
              >
                <MuiBreadcrumbs
                  className={classes.breadcrumbs}
                  separator={'＞'}
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
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <Search query={{category, tag, keyword}}/>
              </Grid>
            </Grid>
          </Container>
          <ContentBlock
            title={message}
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <Box
              m={'0 auto'}
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
                    md={4}
                  >
                    <ProductWidget
                      data={product}
                      border={'borderNone'}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={12}
                style={{marginBottom: '2rem'}}
              >
                { products.length && pagination?.number_of_page > 0 &&
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
            </Box>
          </ContentBlock>
        </div>
      </div>
    </DefaultLayout>
  );
};

SearchPage.propTypes = {
  searchResult: PropTypes.object,
  query: PropTypes.object,
};

export const getServerSideProps = async ({query}) => {
  const searchResult = await Product.getProducts(query);

  return {
    props: clean({
      query, searchResult,
    }),
  };
};

export default SearchPage;
