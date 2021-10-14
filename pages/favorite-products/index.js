import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box} from '@material-ui/core';
import {useState, useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {useSetRecoilState} from 'recoil';

import {ContentBlock} from '~/components';
import {ProductWidget, TopBannerWidget, FilterFavouriteProductWidget} from '~/components/Widgets';
import {DefaultLayout} from '~/components/Layouts';
import {ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
const Product = new ProductService();
const useStyles = makeStyles((theme) => ({
  favouriteProducts: {
    backgroundImage: 'url("/bg-login.png")',
    backgroundSize: 'auto',
  },
  gridFilter: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    '& .MuiSelect-select': {
      width: '8rem',
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

export default function FavoriteProducts() {
  const classes = useStyles();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category_id, setCategoryId] = useState();
  const setLoading = useSetRecoilState(loadingState);
  useEffect(() => {
    getFavoriteProducts();
    // eslint-disable-next-line
  }, [page, category_id]);
  const PER_PAGE = 6;

  const getFavoriteProducts = async () => {
    setLoading(true);
    let payload = {
      page,
      per_page: PER_PAGE,
    };

    if (category_id) {
      payload = {...payload, category_id};
    }

    const response = await Product.getListFavoriteProduct(payload);
    if (response?.products?.length) {
      setLoading(false);
      setFavoriteProducts(response?.products);
      setTotalPage(response?.pages);
    } else {
      setLoading(false);
      setFavoriteProducts([]);
      setPage(1);
      setTotalPage(1);
    }
  };

  const changeFilterCategory = (value) => {
    if (value) {
      setCategoryId(value);
    } else {
      setCategoryId();
    }
  };

  const changePage = (e, pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <DefaultLayout title='お気に入り商品一覧'>
      <div className={'page'}>
        <div className='content'>
          <ContentBlock
            title='お気に入り商品'
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
                className={classes.favouriteProducts}
              >
                <Grid
                  item={true}
                  xs={12}
                  className={classes.gridFilter}
                >
                  <FilterFavouriteProductWidget changeFilterCategory={changeFilterCategory}/>
                </Grid>
                {favoriteProducts.map((product) => (
                  <Grid
                    key={product.productId}
                    item={true}
                    md={4}
                    sm={4}
                    xs={12}
                  >
                    <ProductWidget
                      data={{
                        ...product,
                        is_favorite_product: true,
                      }}
                      loadListFavourite={getFavoriteProducts}
                      border={'borderNone'}
                      heart={true}
                    />
                  </Grid>
                ))}
                <Grid
                  item={true}
                  xs={12}
                >
                  {favoriteProducts?.length > 0 && totalPage > 0 &&
                    <Pagination
                      count={totalPage}
                      variant={'outlined'}
                      color={'primary'}
                      size={'large'}
                      defaultPage={1}
                      onChange={changePage}
                      className={classes.pagination}
                    />
                  }
                </Grid>
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={12}
                style={{marginBottom: '2rem'}}
              >
                <TopBannerWidget
                  variant='titleBanner'
                  imgSrc='/img/banner-favorite1.png'
                  imgWidth={1140}
                  imgHeight={192}
                  imgAlt='Seller Form'
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={12}
              >
                <TopBannerWidget
                  variant='titleBanner'
                  imgSrc='/img/banner-favorite2.png'
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
}
