/* eslint-disable react/jsx-max-props-per-line */
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Grid, useMediaQuery, Link} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    '& img': {
      objectPosition: 'center',
      [theme.breakpoints.down('xs')]: {
        objectPosition: 'left',
      },
    },
  },
  time: {
    fontSize: '0.75rem',
    lineHeight: '1.125rem',
    margin: '0',
    marginBottom: '0.25rem',
    color: theme.palette.black.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.688rem',
      lineHeight: '1rem',
      marginBottom: '0.5rem',
    },
  },
  contentBlock: {
    padding: '1rem 0 0.813rem',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      paddingBottom: '0.875rem',
    },
    '& .MuiLink-underlineHover:hover': {
      textDecoration: 'none',
    },
  },
  content: {
    lineHeight: '1.375rem',
    margin: '0',
    color: theme.palette.black.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
  },
}));

const Media = ({media}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        justifyContent='center'
        spacing={isMobile ? 2 : 3}
        className={classes.contentBlock}
      >
        <Grid
          item={true}
          sm={4}
          style={{display: 'flex'}}
        >
          <Link target='_blank' href={media.url}>
            <Image
              src={media.image}
              width={220}
              height={isTablet ? 40 : 48}
              objectFit={'contain'}
              layout='intrinsic'
              alt={media.image}
            />
          </Link>
        </Grid>

        <Grid
          item={true}
          sm={8}
        >
          <Link target='_blank' href={media.url}>
            <h5 className={classes.time}>{media.time}</h5>

            <p className={classes.content}>{media.content}</p>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

Media.propTypes = {
  media: PropTypes.object,
};

export default Media;
