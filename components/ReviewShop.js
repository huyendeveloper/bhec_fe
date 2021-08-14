import {Grid, Avatar, useMediaQuery, TextareaAutosize as Textarea} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import {RatingWidget} from '~/components/Widgets';
import {Button} from '~/components';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1.5rem',
    },
    '& img': {
      objectFit: 'cover',
    },
    '& h3': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      margin: '0rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.75rem',
      },
    },
  },
  productName: {
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    color: theme.palette.black.default,
    margin: '1rem 0 1.625rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 1rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  stars: {
    display: 'flex',
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
  },
  guideRating: {
    marginLeft: '1rem',
    fontSize: '0.875rem',
    color: theme.palette.gray.dark,
    lineHeight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
  },
  star: {
    width: '2.063rem',
    height: '2.063rem',
  },
  reviewComment: {
    width: '100%',
    border: '1px solid ' + theme.palette.grey.dark,
    outline: 'none',
    height: '9rem !important',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    borderRadius: '0.25rem',
    [theme.breakpoints.down('sm')]: {
      height: '7rem !important',
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '8rem !important',
    },
    '&::placeholder': {
      color: theme.palette.grey.dark,
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
  },
  guide: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    color: theme.palette.black.default,
    margin: '1rem 0 3.25rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.5rem',
    },
  },
  avatar: {
    width: '7rem',
    height: '7rem',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      width: '5rem',
      height: '5rem',
    },
  },
}));

const ReviewShop = ({productOwner}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        spacing={0}
      >
        <Grid
          item={true}
          sm={12}
        >
          <Grid
            container={true}
            spacing={0}
          >
            <Grid
              item={true}
              md={2}

              style={{marginBottom: isMobile ? '1.5rem' : (isTablet ? '1.625rem' : '2.125rem')}}
            >
              <Avatar
                alt={productOwner.name}
                src={productOwner.avatar}
                className={classes.avatar}
              />
            </Grid>
            <Grid
              item={true}
              md={10}
              style={{marginLeft: isTablet ? '1rem' : null}}
            >
              <h2
                className={classes.productName}
              >
                {productOwner.name}
              </h2>

              <Button
                customColor={'yellow'}
                customSize={'small'}
              >
                {'フォロー中'}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
          xs={12}
        >
          <h3>{'店舗の満足度'}</h3>
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
          xs={12}
        >
          <div className={classes.stars}>
            <RatingWidget readOnly={false}/>

            <span className={classes.guideRating}>{'星をクリックして入力してください'}</span>
          </div>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
        >
          <h3>{'レビュー内容'}</h3>
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
        >
          <Textarea
            placeholder={'気に入ったこと/気に入らなかったことは何ですか？この製品をどのように使いましたか？'}
            maxRows={6}
            className={classes.reviewComment}
          />

          <p className={classes.guide}>
            {'案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。'}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

ReviewShop.propTypes = {
  productOwner: PropTypes.object,
};

ReviewShop.defaultProps = {

};

export default ReviewShop;
