import React, {useState} from 'react';
import Image from 'next/image';
import {Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${theme.textDisable.default}`,
    boxSizing: 'border-box',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
    position: 'relative',
    zIndex: '1001',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    height: 'max-content',
    border: 'none',
    outline: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    overflowX: 'auto',
    maxHeight: '48px',
    '& input': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.688rem',
        lineHeight: '1.031rem',
      },
    },
    '&[contenteditable=true]:empty:before': {
      content: 'attr(placeholder)',
      pointerEvents: 'none',
      display: 'block',
    },
  },
  searchIcon: {
    marginLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
  },

  btnSearch: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.red.main,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    fontWeight: 700,
    width: '6.063rem',
    height: '3rem',
    [theme.breakpoints.down('xs')]: {
      width: '2.5rem',
      height: '2.5rem',
      padding: '0.625rem 1.063rem',
      fontSize: '0.813rem',
      lineHeight: '2.25rem',
    },
  },

  inputSearch: {
    border: 'none',
    outline: 'none',
    width: '100%',
  },

  divSearch: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 0%',
    width: 'auto',
  },
}));

const ApplyCouponBar = ({handleSubmit}) => {
  const classes = useStyles();
  const [couponCode, setCouponCode] = useState('');

  const onSubmit = () => handleSubmit(couponCode);
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.searchIcon}>
          <Image
            src={'/img/icons/search.svg'}
            layout={'intrinsic'}
            width={24}
            height={24}
            alt={'arrow right'}
          />
        </div>
        <div className={classes.input}>
          <div className={classes.divSearch}>
            <input
              placeholder={'クーポンコード入力'}
              className={classes.inputSearch}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <Button
          variant='contained'
          size='large'
          className={classes.btnSearch}
          onClick={onSubmit}
        >
          {'適用'}
        </Button>
      </Paper>
    </>
  );
};

ApplyCouponBar.propTypes = {
  handleSubmit: PropTypes.func,
};

export default ApplyCouponBar;
