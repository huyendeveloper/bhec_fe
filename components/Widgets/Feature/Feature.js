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
      top: '-1rem',
      left: '-1rem',
    },
  },
  cardContent: {
    fontSize: '1.2rem',
    lineHeight: '2rem',
    textAlign: 'center',
    padding: '2rem 1.5rem',
  },
}));

const Feature = ({type, title, children}) => {
  const classes = useStyles();
  let iconPath;
  switch (type) {
  case 'support':
    iconPath = '/img/support.png';
    break;
  case 'know':
    iconPath = '/img/know.png';
    break;
  default:
    iconPath = '/img/found.png';
    break;
  }
  return (
    <Card
      className={classes.root}
      variant={'outlined'}
    >
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Image
            className={classes.cardIcon}
            width={62}
            height={62}
            src={iconPath}
            alt={title}
          />
        }
        title={title}
      />

      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
    </Card>
  );
};

Feature.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

Feature.defaultProps = {
  type: 'found',
  title: 'New Feature',
};

export default Feature;
