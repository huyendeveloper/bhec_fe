import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4rem 7.063rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem 1.5rem 0',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 1rem 0',
    },
    '& .MuiDivider-root': {
      backgroundColor: theme.border.default,
    },
  },
  title: {
    lineHeight: '3rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '0.938rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2.5rem',
    },
  },
}));

const ReviewsBlock = ({title, children, bgColor, bgImage, bgRepeat, mixBlendMode}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: bgColor || '#fff',
        backgroundRepeat: bgRepeat || 'no-repeat',
        backgroundImage: bgImage && bgImage !== '' ? `url("${bgImage}")` : 'none',
        mixBlendMode: mixBlendMode || 'unset',
      }}
    >
      {title && title !== '' ? (
        <>
          <Typography
            className={classes.title}
            variant={'h5'}
          >{title}</Typography>

          <Divider/>

          {children}
        </>
      ) : null}
    </div>
  );
};

ReviewsBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  bgRepeat: PropTypes.string,
  mixBlendMode: PropTypes.string,
};

export default ReviewsBlock;
