import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderColor: theme.palette.yellow.light,
    overflow: 'unset',
    marginTop: '5rem',

    [theme.breakpoints.down('sm')]: {
      marginTop: '4.5rem',
      height: 'calc(100% - 4.5rem)',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5rem',
    },
  },
  cardHeader: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '1rem',
    '& span': {
      fontSize: 'inherit',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    '& div[class$="-avatar"]': {
      position: 'absolute',
      top: '-1rem',
      left: '-1rem',
    },
    position: 'absolute',
    top: '-5rem',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      height: 48,
      padding: '0.875rem',
      top: '-4rem',
      '& .MuiCardHeader-title': {
        lineHeight: '48px',
      },
    },
  },
  cardContent: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    textAlign: 'center',
    padding: '2rem 1.5rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      padding: '1.285rem 2rem !important',
      lineHeight: '1.25rem',

      '& > div': {
        marginLeft: '-1rem',
        marginRight: '-1rem',
      },
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
      lineHeight: '1.5rem',
      padding: '2.625rem 2rem 1.25rem !important',
    },
  },
}));

const StepWidget = ({title, children}) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant={'outlined'}
    >
      <CardHeader
        className={classes.cardHeader}
        title={title}
      />

      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
    </Card>
  );
};

StepWidget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

StepWidget.defaultProps = {
  title: 'New Step',
};

export default StepWidget;
