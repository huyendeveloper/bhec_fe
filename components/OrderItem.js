import {
  Grid, Step, StepLabel, Stepper, useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Image from 'next/image';
import PropTypes from 'prop-types';

import {order} from '~/constants';
import {format as formatNumber} from '~/lib/number';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.boxProduct.background,
    marginBottom: '2.125rem',
    padding: '1.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    border: '1px solid ' + theme.border.default,
    borderRadius: '0.25rem',
    color: theme.palette.black.light,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.188rem',
    },
    '& h4': {
      margin: '0',
    },
  },
  productName: {
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '0.625rem',
    color: theme.palette.black.default,
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      marginBottom: '1rem',
    },
  },
  buttonList: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      marginTop: '1rem',
    },
    '& a': {
      margin: '0 1.5rem 1.25rem 0',
      height: '2.5rem',
      width: '10.625rem',
      background: theme.palette.white.main,
      border: '1px solid ' + theme.border.default,
      boxShadow: 'none',
      color: theme.palette.black.light,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        width: '8rem',
        padding: '0',
        margin: '0 0 1rem 1rem',
      },
      [theme.breakpoints.down('xs')]: {
        width: 'calc(50% - 0.5rem)',
        margin: '0 0 1rem',
      },
    },
    '& a.Mui-disabled': {
      background: theme.palette.white.main + ' !important',
      color: theme.palette.gray.main + '!important',
      border: '1px solid ' + theme.border.default + ' !important',
    },
  },
  container: {
    '& > div': {
      marginBottom: '1rem',
      [theme.breakpoints.down('md')]: {
        marginBottom: '0',
      },
    },
  },
  stepper: {
    background: 'transparent',
    padding: '0',
    transform: 'translateX(-13%)',
    [theme.breakpoints.down('xs')]: {
      transform: 'translateX(0%)',
      margin: '0 -10%',
    },
    '& .MuiStep-root': {
      padding: '0',
    },
    '& .MuiStepIcon-text': {
      display: 'none',
    },
    '& .MuiStepIcon-root': {
      width: '0.875rem',
      height: '0.875rem',
      color: theme.palette.gray.dark,
      zIndex: '1',
      '&.MuiStepIcon-active': {
        color: theme.palette.yellow.main,
      },
      '&.MuiStepIcon-completed': {
        color: theme.palette.green.main,
        background: theme.palette.green.main,
        borderRadius: '50%',
      },
    },
    '& .MuiStepLabel-root': {
      '& .MuiStepLabel-active': {
        color: theme.palette.yellow.main,
      },
      '& .MuiStepLabel-completed': {
        color: theme.palette.green.main,
      },
    },
    '& .MuiStepConnector-root': {
      left: '-50%',
      right: '50%',
      top: '0.438rem',
      '& span': {
        borderTop: '2px ' + theme.border.default + ' dashed',
      },
    },
    '& .MuiStepConnector-completed span, .MuiStepConnector-active span': {
      borderTopColor: theme.palette.green.main + '!important',
    },
  },
  productThumb: {
    borderRadius: '0.25rem',
    objectFit: 'cover',
  },
  multiLine: {
    '& div': {
      marginBottom: '0.688rem',
    },
  },
  btnBuyAgain: {
    borderColor: theme.palette.green.main + '!important',
    color: theme.palette.green.main + '!important',
  },
}));

const steps = Object.values(order.label);

const OrderItem = ({item, status}) => {
  const classes = useStyles();

  // eslint-disable-next-line no-warning-comments
  // TODO: not implemented yet
  // eslint-disable-next-line no-unused-vars
  const isDelivered = false;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const product = item?.product;

  return item ? (
    <div className={classes.root}>
      <div className={classes.productName}>
        {product?.name}
      </div>

      <Grid
        container={true}
        spacing={1}
        className={classes.container}
      >
        <Grid
          item={true}
          md={3}
          sm={4}
          xs={12}
        >
          {isMobile ? (
            <Image
              src={product.thumb_url ?? '/logo.png'}
              width={500}
              height={200}
              layout={'responsive'}
              className={classes.productThumb}
              objectFit='contain'
              alt={product?.name}
            />
          ) : (
            <Image
              src={product.thumb_url ?? '/logo.png'}
              width={
                (isTablet ? 146 : 195)
              }
              height={
                (isTablet ? 96 : 128)
              }
              layout={'intrinsic'}
              className={classes.productThumb}
              objectFit='contain'
              alt={product?.name}
            />
          )}
        </Grid>

        <Grid
          item={true}
          md={9}
          sm={8}
          xs={12}
          className={classes.buttonList}
        >
          {/* eslint-disable-next-line no-warning-comments */}
          {/* TODO: not implemented yet */}
          {/* <Button
            variant='contained'
            href='/'
            className={classes.btnBuyAgain}
            disabled={!isDelivered()}

          >
            {'再度購入'}
          </Button>
          <Button
            variant='contained'
            href={`/reviews/${item?.id}`}
            >
            disabled={!isDelivered()}

            {'レビューを書く'}
          </Button>
          <Button
            variant='contained'
            href='/'
            >
            disabled={!isDelivered()}

            {'返品・交換'}
          </Button>
          <Button
            variant='contained'
            href='/'
          >
            {'お問い合わせ'}
          </Button> */}
        </Grid>

        <Grid
          item={true}
          sm={3}
        >
          <h4 className={classes.multiLine}>
            <div>{'商品コード'}</div>
            <div>{'数量'}</div>
            <div>{'単価'}</div>
            <div>{'合計'}</div>
            <div>{'ご注文進行状況'}</div>
          </h4>
        </Grid>
        <Grid
          item={true}
          sm={9}
          className={classes.multiLine}
        >
          <div>{product?.id}</div>
          <div>{item?.quantity}</div>
          <div>{`¥${formatNumber(parseInt(product?.price, 10))}`}</div>
          <div>{`¥${formatNumber(parseInt(item?.price, 10))}`}</div>

          {/* eslint-disable-next-line no-warning-comments */}
          {/* TODO: not implemented yet */}
          {!isMobile && (
            <Stepper
              activeStep={status}
              alternativeLabel={true}
              className={classes.stepper}
            >
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </Grid>

        {/* eslint-disable-next-line no-warning-comments */}
        {/* TODO: not implemented yet */}
        {isMobile && (
          <Grid
            item={true}
            xs={12}
          >
            <Stepper
              activeStep={status}
              alternativeLabel={true}
              className={classes.stepper}
            >
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        )}
      </Grid>
    </div>
  ) : <></>;
};

OrderItem.propTypes = {
  item: PropTypes.object,
  status: PropTypes.any,
};

export default OrderItem;
