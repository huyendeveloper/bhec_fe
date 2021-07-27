import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F2F2F2',
    margin: '0 5rem 2.125rem',
    padding: '1.875rem',
    fontSize: '1.125rem',
    lineHeight: '2.188rem',
    '& img': {
      objectFit: 'cover',
    },
    '& a': {
      width: '11.125rem',
      height: '3.875rem',
      border: 'none',
      background: theme.palette.grey.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.125rem',
      textAlign: 'center',
      lineHeight: '3.875rem',
      textDecoration: 'none',
      color: theme.palette.black.default,
    },
    '& h4': {
      margin: '0',
    },
  },
  productName: {
    fontSize: '1.5rem',
    lineHeight: '2.188rem',
    margin: '0',
    fontWeight: 'bold',
    marginBottom: '1.75rem',
  },
  buttonList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& a': {
      marginBottom: '1.25rem',
    },
  },
  container: {
    '& > div': {
      marginBottom: '1.75rem',
    },
  },
  timeline: {
    transform: 'rotate(90deg)',
  },
  timelineItem: {
    '&:before': {
      flex: '0',
    },
  },
  timelineContent: {
    flex: '0',
  },
  stepper: {
    background: 'transparent',
    padding: '0',
    '& .MuiStep-root': {
      padding: '0',
    },
    '& .MuiStepIcon-text': {
      display: 'none',
    },
    '& .MuiStepIcon-root': {
      width: '0.875rem',
      height: '0.875rem',
      color: '#979797',
      zIndex: '1',
      '&.MuiStepIcon-active': {
        color: theme.palette.black.default,
      },
      '&.MuiStepIcon-completed': {
        color: theme.palette.black.default,
        background: theme.palette.black.default,
        borderRadius: '50%',
      },
    },
    '& .MuiStepLabel-root': {
      alignItems: 'flex-start',
    },
    '& .MuiTypography-root': {
      textAlign: 'left',
    },
    '& .MuiStepConnector-root': {
      left: 'calc(-100%)',
      right: 'calc(100%)',
      top: '0.438rem',
    },
  },
  productThumb: {
    maxWidth: '100%',
  },
}));

const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

const steps = ['注文完了', '発送準備中', '発送済み'];

const OrderItem = ({data}) => {
  const {name, image, productId, price, quantity, trackingNum, transportType, status} = data;
  const classes = useStyles();
  const isDelivered = () => status === 2;

  return (
    <div className={classes.root}>
      <div className={classes.productName}>
        {name}
      </div>

      <Grid
        container={true}
        spacing={1}
        className={classes.container}
      >
        <Grid
          item={true}
          md={3}
        >
          <Image
            src={image}
            width={250}
            height={170}
            className={classes.productThumb}
            alt={name}
          />
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <Button
            variant='contained'
            href='/'
            disabled={!isDelivered()}
          >
            {'再度購入'}
          </Button>
          <Button
            variant='contained'
            href={`/review/${productId}`}
            disabled={!isDelivered()}
          >
            {'レビューを書く'}
          </Button>
          <Button
            variant='contained'
            href='/'
            disabled={!isDelivered()}
          >
            {'返品・交換'}
          </Button>
          <Button
            variant='contained'
            href='/'
          >
            {'お問い合わせ'}
          </Button>

        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h4>
            {'商品コード'}<br/>
            {'数量'}<br/>
            {'単価'}<br/>
            {'合計'}
          </h4>
        </Grid>
        <Grid
          item={true}
          md={9}
        >
          {productId}<br/>
          {quantity}<br/>
          {currency.format(price)}<br/>
          {currency.format(price * quantity)}
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h4>
            {'ご注文進行状況'}
          </h4>
        </Grid>
        <Grid
          item={true}
          md={9}
        >
          <Stepper
            activeStep={status}
            alternativeLabel={true}
            className={classes.stepper}
          >
            {steps.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h4>
            {'出品者のメモ'}
          </h4>
        </Grid>
        <Grid
          item={true}
          md={9}
        >
          {'追跡番号: '} {trackingNum || null } <br/>
          {transportType}
        </Grid>
      </Grid>
    </div>
  );
};

OrderItem.propTypes = {
  data: PropTypes.object,
};

export default OrderItem;
