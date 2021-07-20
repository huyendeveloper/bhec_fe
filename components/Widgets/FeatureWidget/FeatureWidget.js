import Image from 'next/image';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderColor: theme.palette.yellow.light,
    overflow: 'unset',
    height: '100%',
  },
  cardHeader: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '-1px -1px 0 -1px',
    borderRadius: '4px 4px 0 0',
    padding: '15px',
    '& span': {
      fontSize: 'inherit',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    '& div[class$="-avatar"]': {
      position: 'absolute',
      top: '-1.45rem',
      left: '-1.45rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      padding: '13px',

      '& div[class$="-avatar"]': {
        top: '-1.25rem',
      },
    },
  },
  cardContent: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
    },
  },
}));

const FeatureWidget = ({iconSrc, title, children}) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      variant={'outlined'}
    >
      <CardHeader
        className={classes.cardHeader}
        avatar={iconSrc === '' ? null : (
          <Image
            className={classes.cardIcon}
            width={78}
            height={78}
            src={iconSrc}
            alt={title}
          />
        )}
        title={title}
      />

      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
    </Card>
  );
};

FeatureWidget.propTypes = {
  iconSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

FeatureWidget.defaultProps = {
  iconSrc: '',
  title: 'New Feature',
};

export default FeatureWidget;
