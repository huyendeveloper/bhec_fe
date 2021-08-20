import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import {Box, Button} from '@material-ui/core';
import Image from 'next/image';

const Accordion = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.cardPayment.borderColor}`,
    marginBottom: '1rem',
    boxShadow: 'none',
    borderRadius: 4,
    '&:last-child': {
      marginBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      marginBottom: '1rem',
      borderColor: theme.expanded.borderColor,
    },
    '& .MuiAccordionSummary-expandIcon': {
      background: 'url("/img/icons/arrow-right.png") center no-repeat',
      backgroundSize: '11.4px 20px',
      transform: 'none',
      marginRight: -10,
      [theme.breakpoints.down('sm')]: {
        padding: 8,
        backgroundSize: '8px 14px',
      },
      '& .MuiIconButton-label': {
        opacity: 0,
      },
      '&.Mui-expanded': {
        backgroundImage: 'url("/img/icons/arrow-down-black.png")',
        backgroundSize: '20px 11.4px',
        [theme.breakpoints.down('sm')]: {
          backgroundSize: '14px 8px',
        },
      },
    },
    '& .MuiTypography-root': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    marginBottom: -1,
    [theme.breakpoints.down('sm')]: {
      minHeight: 40,
    },
  },
  content: {
    '& .MuiTypography-root': {
      color: theme.selectBox.borderColor,
      paddingLeft: '0.5rem',
    },
    '&$expanded': {
      margin: '12px 0',
      '& .MuiTypography-root': {
        color: theme.palette.black.default,
      },
      [theme.breakpoints.down('xs')]: {
        margin: '9px 0',
      },
    },
    [theme.breakpoints.down('sm')]: {
      margin: '8px 0',
    },
  },
  expanded: {
    borderRadius: '4px 4px 0 0',
  },
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3.75, 3),
    '& .payment-answer p': {
      marginTop: 0,
      marginBottom: '0.5rem',
      [theme.breakpoints.down('xs')]: {
        lineHeight: '1.375rem',
      },
    },
    '& .payment-answer p:last-child': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.75, 2),
    },
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    },
    '& .MuiAccordionSummary-root': {
      [theme.breakpoints.down('sm')]: {
        padding: '0 12px 0 8px',
      },
    },
    '& > div[class*="-expanded"]': {
      '& .MuiAccordionSummary-root': {
        backgroundColor: theme.cardPayment.background,
        minHeight: '3rem',
        [theme.breakpoints.down('sm')]: {
          minHeight: 40,
        },
        color: theme.palette.black.default,
        '& .MuiIconButton-root': {
          color: theme.palette.black.default,
        },
      },
    },
  },
  title: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '1.5rem',
    color: theme.palette.black.default,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  divInfo: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleRow: {
    width: '10rem',
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    lineHeight: '1.25rem',
    color: theme.palette.solidBlack.default,
  },
  description: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontƯeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '21px',
    color: theme.palette.solidBlack.default,
  },
  divAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5rem',
    },
  },
}));

const PaymentWidget = ({data, openPopupDelete}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel_1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data && data.length ? data.map((payment, index) => {
        return (
          <Accordion
            key={index}
            square={true}
            expanded={expanded === `panel_${payment.id}`}
            onChange={handleChange(`panel_${payment.id}`)}
          >
            <AccordionSummary
              aria-controls={`panel${payment.id}d-content`}
              id={`panel${payment.id}d-header`}
              expandIcon={<ExpandMoreIcon/>}
            >
              <Image
                src={'/img/icons/ic-visa.png'}
                width={34}
                height={24}
                alt={'heart'}
              />
              <Typography className={classes.title}>
                {payment.req_number}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                className='payment-answer'
                style={{width: '100%'}}
              >
                <div className={classes.card}>
                  <div className={classes.divInfo}>
                    <div className={classes.row}>
                      <Typography className={classes.titleRow}>
                        {'カードの名義'}
                      </Typography>
                      <Typography className={classes.description}>
                        {payment.holder_name}
                      </Typography>
                    </div>
                    <div className={classes.row}>
                      <Typography className={classes.titleRow}>
                        {'カード番号'}
                      </Typography>
                      <Typography className={classes.car}>
                        {payment.req_number}
                      </Typography>
                    </div>
                    <div className={classes.row}>
                      <Typography className={classes.titleRow}>
                        {'有効期限'}
                      </Typography>
                      <Typography className={classes.description}>
                        {payment.expiration_date}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.divAction}>
                    <Button
                      variant='outlined'
                      className={classes.button}
                      startIcon={<DeleteIcon/>}
                      style={{color: '#ba2636', borderColor: '#ba2636'}}
                      onClick={() => openPopupDelete(payment.id)}
                    >
                      {'削除'}
                    </Button>
                  </div>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      }) : null}
    </div>
  );
};

PaymentWidget.propTypes = {
  data: PropTypes.array.isRequired,
  openPopupDelete: PropTypes.func,
  openPopupUpdate: PropTypes.func,
};

export default PaymentWidget;
