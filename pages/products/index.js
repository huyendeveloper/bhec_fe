import {Container, Grid, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

import {
  Breadcrumbs, ContentBlock, Search,
} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {ProductService} from '~/services';
const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'url(/img/noise.png)',
  },
  container: {
    width: '100%',
    paddingBottom: '0.125rem',
  },
  product: {
    paddingBottom: '1.25rem !important',
    [theme.breakpoints.down('md')]: {
      paddingBottom: '0.75rem !important',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0.5rem !important',
    },
  },
  topContainer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  breadcrumbs: {
    padding: '4rem 0 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 0',
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
    </Box>);
};

const ArchiveProduct = ({queryParams}) => {
  const classes = useStyles();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
    return () => {
      // return an anonymous clean up function
    };
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchData = async () => {
    const response = await Product.getProducts(queryParams);
    setProducts(response.products ?? []);
    setCategories(response.categories ?? []);
    setCurrentPage(response.pages ?? 0);
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
      <Container
        maxWidth='lg'
      >
        <Grid
          container={true}
          spacing={0}
          className={classes.breadcrumbs}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <Breadcrumbs linkProps={linkProps}/>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth='lg'
        className={classes.topContainer}
      >
        <Search/>
      </Container>

      <ContentBlock
        title={`${categories[0]?.name_kana ?? '商品'}一覧`}
        bgImage={'/img/noise.png'}
        bgRepeat={'repeat'}
      >
        { products?.length > 0 ? (
          <Grid
            container={true}
            spacing={3}
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
                  fetchData={fetchData}
                />
              </Grid>
            ))}
          </Grid>) : <ProductNotFound/>
        }
        {products?.length > 0 && currentPage > 0 &&
          <Pagination
            count={currentPage}
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
  const queryParams = {...query, per_page: 12};

  return {
    props: {
      queryParams,
    },
  };
}
