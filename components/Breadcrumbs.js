import {makeStyles} from '@material-ui/core/styles';
import {Typography, Breadcrumbs as MuiBreadcrumbs, Link} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    fontSize: '0.813rem',
    lineHeight: '1.188rem',

    '& .MuiBreadcrumbs-separator': {
      fontWeight: 'bold',
    },
    '& a': {
      color: theme.palette.common.black,
      fontWeight: 'bold',
    },
  },
}));

const Breadcrumbs = ({linkProps}) => {
  const classes = useStyles();

  return (
    <MuiBreadcrumbs
      className={classes.root}
      separator={' / '}
    >
      {linkProps.map((item) => (
        item.linkUrl ? (
          <Link
            key={item.id}
            href={item.linkUrl}
          >
            {item.linkLabel}
          </Link>
        ) : (
          <Typography
            key={item.id}
            variant={'inherit'}
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
