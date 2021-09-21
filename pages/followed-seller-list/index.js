import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box} from '@material-ui/core';
import {useState, useEffect} from 'react';

import {SellerService} from '~/services';
const SellerInstance = new SellerService();
import {ContentBlock} from '~/components';
import {SellerWidget} from '~/components/Widgets';
import {DefaultLayout} from '~/components/Layouts';
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

export default function FollowedSellerList() {
  const classes = useStyles();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getSellersFollowed();
  }, []);

  const getSellersFollowed = async () => {
    const response = await SellerInstance.geSellersFollowed();
    if (response && response.list_followed_seller && response.list_followed_seller.length) {
      setSellers(response.list_followed_seller);
    } else {
      setSellers([]);
    }
  };

  return (
    <DefaultLayout title='Followed Seller List - Oshinagaki Store'>
      <div className={'page'}>
        <div className='content'>
          <ContentBlock
            title='フォロー中の出品者一覧'
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
                {sellers.map((seller) => (
                  <Grid
                    key={seller.id}
                    item={true}
                    md={4}
                    sm={4}
                    xs={12}
                  >
                    <SellerWidget
                      data={seller}
                      border={'borderNone'}
                      reload={getSellersFollowed}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ContentBlock>
        </div>
      </div>
    </DefaultLayout>
  );
}
