import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box, Select, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import {useState} from 'react';

import {Header} from '../../components/Layout/Header';
import {ProductWidget} from '../../components/Widgets/ProductWidget';
import {Footer} from '../../components/Layout/Footer';
import {ContentBlock} from '../../components/ContentBlock';
import {TopBannerWidget} from '../../components/Widgets/TopBannerWidget';

const useStyles = makeStyles((theme) => ({
  favouriteProducts: {
    marginTop: '2rem',
  },
  gridFilter: {
    textAlign: 'end',
    '& .MuiSelect-select': {
      width: '8rem',
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const favoriteProducts = [
  {
    productId: 1,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-01.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    productPrice: 26600,
    favoriteProduct: true,
    productOwner: {
      name: '小田原漆器',
      avatar: '/img/sellers/seller-01.png',
      introduction: '木地部門　伝統工芸士',
    },
  },
  {
    productId: 2,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-02.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
    productPrice: 32800,
    favoriteProduct: true,
    productOwner: {
      name: '磯貝 剛',
      avatar: '/img/sellers/seller-02.png',
      introduction: 'ベッ甲イソガイ　統括',
    },
  },
  {
    productId: 3,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-03.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    productPrice: 149300,
    favoriteProduct: false,
    productOwner: {
      name: '林　文雄',
      avatar: '/img/sellers/seller-03.png',
      introduction: 'アートランド',
    },
  },
  {
    productId: 4,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-01.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    productPrice: 26600,
    favoriteProduct: true,
    productOwner: {
      name: '小田原漆器',
      avatar: '/img/sellers/seller-01.png',
      introduction: '木地部門　伝統工芸士',
    },
  },
  {
    productId: 5,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-02.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
    productPrice: 32800,
    favoriteProduct: true,
    productOwner: {
      name: '磯貝 剛',
      avatar: '/img/sellers/seller-02.png',
      introduction: 'ベッ甲イソガイ　統括',
    },
  },
  {
    productId: 6,
    productName: '『大好評』1度は食べたい淡路島のたまねぎ！加熱するとまるでフルーツ！',
    productThumb: '/img/products/product-03.png',
    productUrl: '#',
    productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
    productPrice: 149300,
    favoriteProduct: false,
    productOwner: {
      name: '林　文雄',
      avatar: '/img/sellers/seller-03.png',
      introduction: 'アートランド',
    },
  },
];

export default function FavoriteProducts() {
  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={'page'}>
      <Header showMainMenu={false}/>

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
                md={12}
                className={classes.gridFilter}
              >
                <FormControl
                  variant='outlined'
                  className={classes.formControl}
                >
                  <InputLabel>{'フィルター'}</InputLabel>
                  <Select
                    value={age}
                    onChange={handleChange}
                    label='フィルター'
                  >
                    <MenuItem value=''>
                      <em>{'None'}</em>
                    </MenuItem>
                    <MenuItem value={1}>{'ガラス工芸'}</MenuItem>
                    <MenuItem value={2}>{'農産物'}</MenuItem>
                    <MenuItem value={3}>{'水産物'}</MenuItem>
                    <MenuItem value={4}>{'畜産物'}</MenuItem>
                    <MenuItem value={5}>{'キッチン'}</MenuItem>
                    <MenuItem value={6}>{'文具・玩具'}</MenuItem>
                    <MenuItem value={7}>{'ファッション'}</MenuItem>
                    <MenuItem value={8}>{'ヘルス・ビューティー'}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {favoriteProducts.map((product) => (
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
      <Footer/>
    </div>
  );
}