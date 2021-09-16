import {Box, Container, Grid, makeStyles, useTheme, Typography, Button, useMediaQuery} from '@material-ui/core';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  sellerAvatar: {
    width: '128px',
    height: '128px',
    marginRight: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
      height: '80px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80px',
      height: '80px',
    },
  },
  blockInfo: {
    borderBottom: '1px solid #DBDBDB',
    paddingBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      paddingBottom: 0,
    },
  },
  blockAvatar: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  blockDetail: {
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
  intro: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: theme.palette.black4.main,
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8125rem',
      lineHeight: '1.1875rem',
      marginBottom: '4px',
    },
  },
  name: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: theme.palette.black.default,
    marginBottom: '14px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.3125rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
  },
  btnFollow: {
    backgroundColor: theme.btnFollow.backgroundColor,
    color: theme.palette.white.main,
    fontWeight: 'bold',
    fontSize: '0.8125rem',
    width: '100%',
    height: '40px',
    '&:hover': {
      backgroundColor: theme.btnFollow.backgroundColor,
    },
  },
  introduction: {
    margin: '1.5rem 0',
    fontSize: '0.8125rem',
    lineHeight: '1.25rem',
  },
  description: {
    marginTop: '2rem',
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
  isFollowing: {
    backgroundColor: theme.palette.white.main,
    color: theme.btnFollow.isFollowing,
    borderColor: theme.btnFollow.isFollowing,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
    },
  },
}));

const Seller = ({sellerInfo}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const avatarWidth = isMobile ? 72 : (isTablet ? 80 : 128);
  const avatarHeight = isMobile ? 72 : (isTablet ? 80 : 128);

  return (
    <>
      <Container>
        <Grid
          container={true}
          className={classes.blockInfo}
        >
          <Grid
            item={true}
            xs={12}
            sm={8}
            md={9}
          >
            <Box
              component='div'
              className={classes.blockAvatar}
            >
              <Image
                src={sellerInfo?.avatar_url ? sellerInfo?.avatar_url : '/img/sellers/seller-01.png'}
                alt={'seller avatar'}
                width={avatarWidth}
                height={avatarHeight}
                className={classes.sellerAvatar}
              />
              <Box
                component='div'
                className={classes.blockDetail}
              >
                <Typography
                  component={'h5'}
                  className={classes.intro}
                >
                  {sellerInfo?.catch_phrase}
                </Typography>
                <Typography
                  component={'h5'}
                  className={classes.name}
                >
                  {sellerInfo?.name || '小田原漆器'}
                </Typography>
                <Rating
                  name='read-only'
                  value={2}
                  precision={0.5}
                  readOnly={true}
                  emptyIcon={<StarBorderIcon fontSize='inherit'/>}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={4}
            md={3}
            style={{textAlign: 'right'}}
          >
            <Button
              variant='contained'
              onClick={() => setIsFollowing(!isFollowing)}
              className={clsx(classes.btnFollow, isFollowing ? classes.isFollowing : '')}
            >
              {'プロフィール'}
            </Button>
          </Grid>
          <Grid
            item={true}
            xs={12}
            md={12}
            className={classes.introduction}
          >
            <Box
              component='div'
              dangerouslySetInnerHTML={{__html: sellerInfo?.introduction}}
            />
          </Grid>
        </Grid>
        <Grid
          container={true}
          className={classes.description}
        >
          <Grid
            item={true}
            xs={12}
          >
            <Box
              component='div'
              dangerouslySetInnerHTML={{__html: sellerInfo?.description}}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Seller.propTypes = {
  sellerInfo: PropTypes.object,
};
export default Seller;
