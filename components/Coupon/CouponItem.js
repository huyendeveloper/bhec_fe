import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import {Button, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles, styled} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({

  // Common
  container: {
    display: 'flex',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  expiredCoupon: {
    opacity: 0.5,
    color: '#333333 !important',
    borderColor: '#333333 !important',
  },

  // Coupon Image
  couponImageContainer: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'start',
    marginRight: '1.5rem',
    [theme.breakpoints.down('md')]: {
      marginRight: '1.063rem',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      float: 'left',
    },
  },
  couponImage: {
    borderRadius: '4px',
  },

  // Coupon Content
  contentContainer: {
    flex: 1,
  },

  // Coupon Top Container
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '6px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  couponTitleContainer: {
    marginRight: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0',
    },
  },
  couponTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  couponExpiryDate: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'start',
    },
  },
  expiryDateContainer: {},
  expiryDate: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    marginRight: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: '0.5rem',
    },
  },
  usabitityContainer: {
    padding: '0.344rem 0',
    width: '97px',
    border: '1px solid #54C0C0',
    textAlign: 'center',
    color: '#54C0C0',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      padding: '0.344rem 0',
      width: '70px',
    },
  },
  usabitity: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
  },

  // Coupon Bottom Container
  bottomContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  couponDescriptionContainer: {
    flex: '0 0 77%',
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      alignSelf: 'start',
    },
  },
  couponDescription: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
  },

  // Divider
  divider: {
    borderTop: '1px solid #DBDBDB',
    borderRadius: '1px',
  },
}));

const CouponItem = ({coupon, handleSubmit, haveBottomBorder}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const isExpired = moment(coupon.coupon.expiration_date).isBefore(new Date());

  const onSubmit = () => handleSubmit(coupon);

  const ColorButton = styled(Button)(() => ({
    width: '170px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: '0.594rem 0rem',
    backgroundColor: '#BA2636',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '45px',
    '&:hover': {
      backgroundColor: '#8b1c28',
    },
    [theme.breakpoints.down('xs')]: {
      width: '161px',
    },
  }));

  return (
    <>
      <div className={`${classes.container} ${isExpired && classes.expiredCoupon}`}>
        <div className={classes.couponImageContainer}>
          <Image
            src={coupon.coupon?.thumbnail ? coupon.coupon?.thumbnail : '/img/btn-upload.png'}
            width={isTablet ? (isMobile ? 163 : 187) : 267}
            height={isTablet ? (isMobile ? 96 : 112) : 160}
            objectFit={'contain'}
            alt={'coupon image'}
            className={classes.couponImage}
          />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.topContainer}>
            <div className={classes.couponTitleContainer}>
              <Typography
                component='h3'
                className={classes.couponTitle}
              >
                {coupon.coupon?.title ?? ''}
              </Typography>
            </div>
            <div className={classes.couponExpiryDate}>
              <div className={classes.expiryDateContainer}>
                <Typography
                  component='p'
                  className={classes.expiryDate}
                >
                  {moment(coupon.coupon?.expiration_date).format('YYYY年MM月DD日') + 'まで'}
                </Typography>
              </div>
              <div className={`${classes.usabitityContainer} ${isExpired && classes.expiredCoupon}`}>
                <Typography
                  component='p'
                  className={classes.usabitity}
                >
                  {isExpired ? '期限切れ' : '期間中'}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.bottomContainer}>
            <div className={classes.couponDescriptionContainer}>
              <p dangerouslySetInnerHTML={{__html: coupon.coupon?.description ?? ''}}/>
            </div>
            <ColorButton
              variant='contained'
              size='large'
              disabled={isExpired}
              onClick={onSubmit}
            >
              {'このクーポンを使う'}
            </ColorButton>
          </div>
        </div>
      </div>
      {haveBottomBorder && <div className={classes.divider}/>}
    </>
  );
};

CouponItem.propTypes = {
  handleSubmit: PropTypes.func,
  coupon: PropTypes.object,
  haveBottomBorder: PropTypes.bool,
};

export default CouponItem;
