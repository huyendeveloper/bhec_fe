/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Box, Grid, Button} from '@material-ui/core';
import clsx from 'clsx';
import {useRouter} from 'next/router';

import {SellerService} from '~/services';
const SellerInstance = new SellerService();
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& .MuiCardContent-root': {
      flex: '1 1 auto',
    },
    '& .MuiCardActionArea-root': {
      flex: '0 1 auto',
      display: 'flex',
    },
  },
  bgImg: {
    height: '100%',
    backgroundColor: '#DBDBDB',
    padding: 50,
    backgroundSize: 'cover',
    width: '100%',
  },
  sellerName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    marginBottom: '0.75rem',
    color: theme.palette.black3.main,
  },
  sellerAction: {
  },
  productSeller: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    color: '#000',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  borderNone: {
    boxShadow: 'none',
  },
  catchPhase: {
    fontSize: '0.875rem',
    lineHeight: '1.1325rem',
    color: theme.palette.black4.main,
  },
  sellerIntro: {
    fontSize: '0.875rem',
    lineHeight: '1.1325rem',
    color: theme.palette.black4.main,
  },
  btnDetail: {
    background: theme.palette.yellow.main,
    borderRadius: '4px',
    color: theme.palette.white.main,
    fontSize: '0.875rem',
    lineHeight: '1.1325rem',
    fontWeight: '700',
    width: '100%',
    height: '40px',
    '&:hover': {
      background: theme.palette.yellow.main,
      color: theme.palette.white.main,
    },
  },
  btnUnFollow: {
    background: theme.palette.white.main,
    borderRadius: '4px',
    color: theme.palette.black3.main,
    fontSize: '0.875rem',
    lineHeight: '1.1325rem',
    fontWeight: '700',
    border: '1px solid #BEBEBE',
    width: '100%',
    height: '40px',
  },
}));

// eslint-disable-next-line no-unused-vars
const SellerWidget = ({variant, data, reload}) => {
  const classes = useStyles();
  const router = useRouter();
  if (!data) {
    return null;
  }

  const goToDetailSeller = () => {
    router.push(`/seller/${data.id}`);
  };

  const unFollowSeller = async () => {
    const payload = {
      seller_id: data.id,
    };
    const response = await SellerInstance.unFollowSeller(payload);
    if (response) {
      reload();
    }
  };

  const seller = data;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={seller.name}
          height='160'
          className={clsx(seller.thumb_url ? '' : classes.bgImg)}
          image={seller.thumb_url ?? '/logo.png'}
          title={seller.name}
        />
      </CardActionArea>
      <CardContent>
        <Typography
          gutterBottom={true}
          component='h4'
          className={classes.catchPhase}
        >
          {seller.catch_phrase}
        </Typography>
        <Typography
          gutterBottom={true}
          component='h3'
          className={classes.sellerName}
        >
          {seller.name}
        </Typography>
        <Box
          component='div'
          className={classes.sellerIntro}
          dangerouslySetInnerHTML={{__html: `${seller.introduction}`}}
        />

      </CardContent>

      <CardActions className={classes.sellerAction}>
        <Box style={{width: '100%', marginBottom: '1rem'}}>
          <Grid
            container={true}
            spacing={3}
            style={{width: '100%', margin: '0'}}
          >
            <Grid
              item={true}
              xs={12}
              md={6}
              sm={12}
            >
              <Button
                customSize={'extraLarge'}
                className={classes.btnDetail}
                onClick={goToDetailSeller}
              >
                {'プロフィールへ'}
              </Button>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={6}
              sm={12}
            >
              <Button
                customSize={'extraLarge'}
                className={classes.btnUnFollow}
                onClick={unFollowSeller}
              >
                {'フォローを解除する'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardActions>
    </Card>
  );
};

SellerWidget.propTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  reload: PropTypes.func,
};

SellerWidget.defaultProps = {
  variant: 'simple',
};

export default SellerWidget;
