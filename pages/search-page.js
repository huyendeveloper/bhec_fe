import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box, Container, Breadcrumbs as MuiBreadcrumbs, Typography, Link} from '@material-ui/core';
import {useRouter} from 'next/router';

import {Header, Footer, ContentBlock, Search} from '~/components';
import {ProductWidget, TopBannerWidget} from '~/components/Widgets';

import {ProductService} from '~/services';
const Product = new ProductService();
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 0',
  },
  favouriteProducts: {
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
    linkLabel: 'の検索結果',
    linkUrl: '/search-page',
  },
];

export default function SearchPage() {
  const classes = useStyles();
  const [listProduct, setListProduct] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getListProduct(router.query);
  }, []);

  const getListProduct = async (query) => {
    const result = await Product.getProducts(query);
    setListProduct([...result.products]);
  };

  const searchProduct = (query) => {
    getListProduct(query);
  };

  return (
    <div className={classes.root}>
      <Header showMainMenu={false}/>

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
                      key={item.id}
                      className={classes.link}
                      href={item.linkUrl}
                      color='textPrimary'
                    >
                      {item.linkLabel}
                    </Link>
                  ) : (
                    <Typography
                      key={item.id}
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
              {/* <Paper
                component='form'
                className={classes.paper}
              >
                <SearchIcon style={{marginLeft: '1rem'}}/>
                <InputBase
                  className={classes.input}
                  placeholder='検索キーワードを入力してください'
                  inputProps={{'aria-label': 'search'}}
                />
                <Button
                  variant='contained'
                  type='submit'
                  size='large'
                  className={classes.btnSearch}
                >
                  {'検索'}
                </Button>
              </Paper> */}
              <Search searchProduct={searchProduct}/>
            </Grid>
          </Grid>
        </Container>
        <ContentBlock
          title='“送料無料”,”農薬節約栽培”,”期間限定”に関する記事一覧'
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
              {listProduct.length && listProduct.map((product) => (
                <Grid
                  key={product.productId}
                  item={true}
                  md={4}
                >
                  <ProductWidget
                    data={product}
                    heart={true}
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
              <TopBannerWidget
                variant='titleBanner'
                imgSrc='/img/banner-favorite1.png'
                imgWidth={1140}
                imgHeight={192}
                imgAlt='Seller Form'
              />
            </Grid>
            {/* <Grid
              item={true}
              xs={12}
              md={12}
              style={{marginBottom: '2rem'}}
            >
              <Pagination
                count={5}
                color='secondary'
              />
            </Grid> */}
          </Box>
        </ContentBlock>
      </div>
      <Footer/>
    </div>
  );
}
