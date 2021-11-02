import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '2rem 0 3rem',
    [theme.breakpoints.down('md')]: {
      padding: '1.5rem 0 2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0 1.5rem',
      fontSize: '0.8125rem',
    },
  },
  title: {
    width: '100%',
    height: '3rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    borderRadius: '0.25rem',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      height: '2.5rem',
      fontWeight: '0.875rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
      fontSize: '0.875rem',
    },
  },
  gray: {
    background: theme.palette.gray.main,
    color: theme.palette.black.light,
  },
}));

const BlockForm = ({title, themeStyle, children, id}) => {
  const classes = useStyles();

  return (
    <div id={id}>
      <div className={clsx(classes.title, classes[themeStyle])}>{title}</div>

      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

BlockForm.propTypes = {
  title: PropTypes.string,
  themeStyle: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  id: PropTypes.string,
};

BlockForm.defaultProps = {
};

export default BlockForm;
