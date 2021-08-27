import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useState} from 'react';

import {
  Breadcrumbs, ContentBlock, Search,
} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {ProductCategoryService} from '~/services';

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

const linkProps = [
  {
    id: 1,
    linkLabel: 'ホーム',
    linkUrl: '/',
  },
  {
    id: 2,
    linkLabel: '工芸品一覧',
  },
];

export async function getServerSideProps(context) {
  const page = typeof context.query.page === 'undefined' ? '1' : context.query.page;
  const productList = await ProductCategoryService.getProductByCategory(context.params.category, page);

  return {
    props: {productList},
  };
}

export default function ProductCategory({productList}) {
  const classes = useStyles();
  const pagination = productList.pagination;
  const categories = productList.categories;
  const nameCategories = categories.map((item) => item.name_kana);
  const router = useRouter();
  const [page] = useState(pagination.page);
  const [isAuthenticated] = useState(false);

  const changePage = (e, pageNumber) => {
    router.replace(`/products/${router.query.category}?page=${pageNumber}`);
  };

  return (
    <DefaultLayout title={'BH_EC - ' + nameCategories.join(' & ')}>
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
        title={'伝統工芸品'}
        bgImage={'/img/noise.png'}
        bgRepeat={'repeat'}
      >
        <Grid
          container={true}
          spacing={3}
        >
          {productList.products.map((item) => (
            <Grid
              key={item.id}
              item={true}
              sm={4}
              xs={6}
              className={classes.product}
            >
              <ProductWidget
                data={item}
                heart={isAuthenticated}
                border={'borderNone'}
              />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={pagination.number_of_page}
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          defaultPage={page}
          onChange={changePage}
          className={classes.pagination}
        />

        <AdsWidget
          imgSrc={'/img/ad/ad5.png'}
          imgWidth={'1140'}
          imgHeight={'192'}
        />
      </ContentBlock>
    </DefaultLayout>
  );
}

ProductCategory.propTypes = {
  productList: PropTypes.object,
};

ProductCategory.defaultProps = {
};
