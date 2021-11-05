import {Container, Grid, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

import {Breadcrumbs, ContentBlock, Search} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {ProductService} from '~/services';
const Product = new ProductService();

// Default
const PER_PAGE = 12;

const useStyles = makeStyles((theme) => ({
  products: {
    marginTop: '2rem',
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.75rem',
    },
  },
  product: {
    paddingBottom: '1.25rem !important',
    [theme.breakpoints.down('md')]: {
      paddingBottom: '0.75rem !important',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0.75rem 0.5rem !important',
      '& strong': {
        fontSize: '1rem',
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

const ProductNotFound = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
    >
      <Box
        component='h5'
        textAlign='center'
        p={1}
        fontSize={16}
      >
        {'該当する商品ありません'}
      </Box>
    </Box>
  );
};

const ArchiveProduct = ({queryParams}) => {
  const classes = useStyles();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (queryParams?.page < 1) {
      router.push({
        pathname: '/products',
        query: {...router.query, page: 1},
      });
    } else {
      setCurrentPage(queryParams?.page ?? 1);
      fetchData();
    }

    return () => {
      // return an anonymous clean up function
    };
    // eslint-disable-next-line
  }, [queryParams]);

  const fetchData = async () => {
    const response = await Product.getProducts(queryParams);
    setProducts(response.products ?? []);
    setCategories(response.categories ?? []);
    setCurrentPage(response.page ?? 0);
    setCountPages(response.pages ?? 0);
  };

  const linkProps = [
    {
      id: 1,
      linkLabel: 'ホーム',
      linkUrl: '/',
    },
    {
      id: 2,
      linkLabel: `${categories[0]?.name_kana ?? '商品'}一覧`,
    },
  ];

  const changePage = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    router.push({
      pathname: '/products',
      query: {...router.query, page: pageNumber},
    });
  };

  return (
    <DefaultLayout title={`${categories[0]?.name_kana ?? '商品'}一覧`}>
      <div className={classes.content}>
        <Container className={classes.searchBox}>
          <Breadcrumbs linkProps={linkProps}/>

          <Search/>
        </Container>

        <ContentBlock
          title={`${categories[0]?.name_kana ?? '商品'}一覧`}
          bgColor='transparent'
        >
          { products?.length > 0 ? (
            <Grid
              container={true}
              spacing={3}
              className={classes.products}
            >
              {products?.map((item) => (
                <Grid
                  key={item.id}
                  item={true}
                  sm={4}
                  xs={6}
                  className={classes.product}
                >
                  <ProductWidget
                    data={item}
                    border={'borderNone'}
                    heart={true}
                  />
                </Grid>
              ))}
            </Grid>) : <ProductNotFound/>
          }
          {products?.length > 0 && currentPage > 0 &&
            <Pagination
              count={countPages}
              page={currentPage}
              variant={'outlined'}
              color={'primary'}
              size={'large'}
              defaultPage={1}
              onChange={changePage}
              className={classes.pagination}
            />
          }
          <AdsWidget
            imgSrc={'/img/ad/ad5.png'}
            imgWidth={'1140'}
            imgHeight={'192'}
          />
        </ContentBlock>
      </div>
    </DefaultLayout>
  );
};

export default ArchiveProduct;

ArchiveProduct.propTypes = {
  queryParams: PropTypes.object.isRequired,
};

ArchiveProduct.defaultProps = {

};

export async function getServerSideProps({query}) {
  const queryParams = {...query, page: Number(query?.page ?? 1), per_page: PER_PAGE};

  return {
    props: {
      queryParams,
    },
  };
}
