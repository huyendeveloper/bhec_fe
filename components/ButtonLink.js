import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '4rem',
    border: '1px solid ' + theme.mypage.borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: theme.palette.black.default,
    textDecoration: 'none',
    background: theme.palette.white.main,
    borderRadius: '0.25rem',
    '& .MuiGrid-item': {
      paddingTop: '0',
      paddingBottom: '2.063rem',
    },
  },
}));

const ButtonLink = ({linkLabel}) => {
  const classes = useStyles();

  return (
    <Link href={'/'}>
      <a className={classes.root}>
        {linkLabel}
      </a>
    </Link>
  );
};

ButtonLink.propTypes = {
  linkLabel: PropTypes.string,
};

export default ButtonLink;
