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
import {Avatar, Chip, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '1rem',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    marginBottom: '0.75rem',
  },
  productTags: {
    marginBottom: '1rem',
    '& > div': {
      height: '16px',
      borderRadius: '4px',
      backgroundColor: theme.productWidget.tag.backgroundColor,

      '& span': {
        fontSize: '10px',
        fontWeight: 'bold',
        color: theme.productWidget.tag.textColor,
      },
      '&:not(:last-child)': {
        marginRight: '0.5rem',
      },
    },
  },
  productTagHighlight: {
    backgroundColor: `${theme.productWidget.tag.highlightColor} !important`,
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: '1.875rem',
  },
  productSellerAction: {
    borderTop: `1px solid ${theme.productWidget.seller.sepColor}`,
  },
  productSeller: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    color: theme.productWidget.seller.textColor,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  productSellerAvatar: {
    marginRight: '0.75rem',
    width: '3rem',
    height: '3rem',
  },
  sellerInfo: {
    fontSize: '0.6875rem',
    lineHeight: '1rem',
    fontWeight: 'bold',
  },
  sellerInfoIntro: {
    marginTop: '3px',
    fontWeight: 'normal',
  },
}));

// eslint-disable-next-line no-unused-vars
const ProductWidget = ({variant, data}) => {
  const classes = useStyles();
  if (!data) {
    return null;
  }

  const tags = data.productTags;
  const owner = data.productOwner;

  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={data.productName}
          height='160'
          image={data.productThumb}
          title={data.productName}
        />
        <CardContent>
          <Typography
            gutterBottom={true}
            component='h3'
            className={classes.productName}
          >
            {data.productName}
          </Typography>

          <div className={classes.productTags}>
            {/* eslint-disable-next-line react/prop-types */}
            {tags && tags.length > 0 ? tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  size='small'
                  label={tag.name}
                  className={tag.isFeatured ? classes.productTagHighlight : ''}
                />
              );
            }) : null}
          </div>

          <div className={classes.productPrice}>
            {currency.format(data.productPrice)}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.productSellerAction}>
        <Link
          href={'#'}
          className={classes.productSeller}
        >
          <Avatar
            alt={owner.name}
            src={owner.avatar}
            className={classes.productSellerAvatar}
          />

          <div className={classes.productSellerInfo}>
            <Typography
              component={'h5'}
              className={classes.sellerInfo}
            >{owner.name}</Typography>
            <Typography
              component={'p'}
              className={classes.sellerInfo + ' ' + classes.sellerInfoIntro}
            >{owner.introduction}</Typography>
          </div>
        </Link>
      </CardActions>
    </Card>
  );
};

ProductWidget.propTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

ProductWidget.defaultProps = {
  variant: 'simple',
};

export default ProductWidget;
