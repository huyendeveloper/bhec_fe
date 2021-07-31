import {makeStyles} from '@material-ui/core/styles';
import {Typography, Breadcrumbs as MuiBreadcrumbs, Link} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '3.375rem',
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.black.main,
      fontWeight: 'bold',
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
    },
  },
  link: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
  },
}));

const Breadcrumbs = ({linkProps}) => {
  const classes = useStyles();

  return (
    <MuiBreadcrumbs
      className={classes.root}
      separator={'＞'}
    >
      {linkProps.map((item) => (
        item.linkUrl ? (
          <Link
            key={item.id}
            className={classes.link}
            href={item.linkUrl}
          >
            {item.linkLabel}
          </Link>
        ) : (
          <Typography
            key={item.id}
            className={classes.link}
          >
            {item.linkLabel}
          </Typography>
        )
      ))}
    </MuiBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  linkProps: PropTypes.array,
};

export default Breadcrumbs;
