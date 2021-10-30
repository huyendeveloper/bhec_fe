import {makeStyles} from '@material-ui/core/styles';
import {Typography, Breadcrumbs as MuiBreadcrumbs, Link} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    fontSize: '0.813rem',
    lineHeight: '1.188rem',
    margin: '0 0 1.688rem',
    '& .MuiBreadcrumbs-ol': {
      display: 'block',
    },
    '& li': {
      display: 'inline',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 1.25rem',
    },

    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.black.light,
      fontWeight: 'bold',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
    '& .MuiBreadcrumbs-li:last-child > p': {
      fontWeight: 'normal',
    },
  },
  link: {
    color: theme.palette.black.light,
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.815rem',
      lineHeight: '1.1875rem',
    },
  },
}));

const Breadcrumbs = ({linkProps, margin}) => {
  const classes = useStyles();

  return (
    <MuiBreadcrumbs
      className={classes.root}
      separator={' / '}
      style={{margin: margin || 'none'}}
    >
      {linkProps.map((item) => (
        item.linkUrl ? (
          <Link
            key={item.id}
            href={item.linkUrl}
            className={classes.link}
          >
            {item.linkLabel}
          </Link>
        ) : (
          <Typography
            key={item.id}
            variant={'inherit'}
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
  margin: PropTypes.any,
};

export default Breadcrumbs;
