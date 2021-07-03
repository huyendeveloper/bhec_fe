import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderColor: theme.palette.yellow.light,
    overflow: 'unset',
    marginTop: '5rem',
  },
  cardHeader: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '15px',
    '& span': {
      fontSize: 'inherit',
      fontWeight: 'bold',
    },
    '& div[class$="-avatar"]': {
      position: 'absolute',
      top: '-1rem',
      left: '-1rem',
    },
    position: 'absolute',
    top: '-5rem',
    width: '100%',
  },
  cardContent: {
    fontSize: '1.2rem',
    lineHeight: '2rem',
    textAlign: 'center',
    padding: '2rem 1.5rem',
  },
}), {name: 'StepWidget'});

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
