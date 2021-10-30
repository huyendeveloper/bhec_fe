import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '4rem',
    border: '1px solid ' + theme.palette.gray.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: theme.palette.black.default,
    textDecoration: 'none',
    background: theme.palette.white.main,
    cursor: 'pointer',
    borderRadius: '0.25rem',
    '& .MuiGrid-item': {
      paddingTop: '0',
      paddingBottom: '2.063rem',
    },
    [theme.breakpoints.down('sm')]: {
      height: '3rem',
    },
  },
}));

const ButtonLink = ({item, actionButton}) => {
  const classes = useStyles();

  return (
    <a
      className={classes.root}
      onClick={() => actionButton(item)}
    >
      {item.label}
    </a>
  );
};

ButtonLink.propTypes = {
  item: PropTypes.object,
  actionButton: PropTypes.func,
};

export default ButtonLink;
