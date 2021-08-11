import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Typography, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2.5rem 6.25rem 6.25rem',
    '& .MuiDivider-root': {
      backgroundColor: theme.palette.grey.light,
    },
  },
  title: {
    height: '4.065rem',
    fontWeight: 'bold',
    justifyContent: 'center',
    color: theme.palette.black.default,
    display: 'flex',
    alignItems: 'center',
  },
}));

const Block = ({title, children, paddingBot}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={paddingBot ? {paddingBottom: paddingBot} : null}
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

Block.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  paddingBot: PropTypes.string,
};

export default Block;
