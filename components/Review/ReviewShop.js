import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2.813rem',
    '& img': {
      objectFit: 'cover',
      marginBottom: '2.875rem !important',
    },
    '& h3': {
      fontSize: '1.125rem',
      margin: '0rem',
      color: theme.palette.black.main,
    },
  },
  productName: {
    fontSize: '1.5rem',
    lineHeight: '2.188rem',
    color: theme.palette.black.main,
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.938rem',
    '& span': {
      marginLeft: '1.75rem',
      fontSize: '0.75rem',
      color: theme.palette.grey.main,
    },
  },
  star: {
    width: '2.063rem',
    height: '2.063rem',
  },
  reviewComment: {
    width: '100%',
    border: '1px solid #D8D8D8',
    outline: 'none',
    height: '170',
    padding: '0.75rem 1.625rem',
    fontSize: '0.875rem',
    lineHeight: '2.188rem',
    '&::placeholder': {
      color: '#D8D8D8',
      fontSize: '0.875rem',
      lineHeight: '2.188rem',
    },
  },
  guide: {
    fontSize: '0.875rem',
    lineHeight: '2.188rem',
    color: theme.palette.black.main,
    fontWeight: '500',
    marginBottom: '0',
  },
  followBtn: {
    width: '10.125rem',
    height: '2.875rem',
    background: theme.palette.grey.main,
    fontSize: '1.125rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    border: 'none',
  },
}));

const stars = [1, 2, 3, 4, 5];

const ReviewShop = ({productOwner}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        spacing={0}
        className={classes.container}
      >
        <Grid
          item={true}
          md={3}
        >
          <Image
            src={productOwner.avatar}
            width={177}
            height={140}
            alt={productOwner.name}
          />
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <h2 className={classes.productName}>
            {productOwner.name}
          </h2>

          <button className={classes.followBtn}>{'フォロー中'}</button>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h3>{'店舗の満足度'}</h3>
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <div className={classes.stars}>
            {stars.map((index) => (
              <StarBorderIcon
                key={index}
                className={classes.star}
              />
            ))
            }
            <span>{'星をクリックして入力してください'}</span>
          </div>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h3>{'レビュー内容'}</h3>
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <textarea
            placeholder={'気に入ったこと/気に入らなかったことは何ですか？この製品をどのように使いましたか？'}
            rows={2}
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
