import React from 'react';
import Image from 'next/image';
import {Button, IconButton, Divider, InputBase, Paper, useTheme, useMediaQuery} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #D8D8D8',
    boxSizing: 'border-box',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: '1.313rem',
    '& input': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      color: '#8A8A8A',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.688rem',
        lineHeight: '1.031rem',
      },
    },
  },
  filter: {
    paddingLeft: '2.125rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0.5rem',
    },
  },
  divider: {
    height: '3rem',
    marginLeft: '2.125rem',
    marginRight: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginRight: '0.75rem',
      height: '2.5rem',
    },
  },
  btnSearch: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.red.main,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
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
}));

const Search = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Paper
        elevation={0}
        component='form'
        className={classes.root}
      >
        <div className={classes.filter}>
          <IconButton
            aria-label='menu'
            size={isMobile ? 'small' : 'medium'}
          >
            <Image
              src={'/img/icons/filter-search.svg'}
              layout={'intrinsic'}
              width={24}
              height={24}
              alt={'arrow right'}
            />
          </IconButton>
          {
            isMobile ? (null) : (
              <span>{'カテゴリー'}</span>
            )
          }
        </div>

        <Divider
          className={classes.divider}
          orientation='vertical'
        />
        <Image
          src={'/img/icons/search.svg'}
          layout={'intrinsic'}
          width={24}
          height={24}
          alt={'arrow right'}
        />
        <InputBase
          className={classes.input}
          placeholder='検索キーワードを入力してください'
          inputProps={{'aria-label': 'search'}}
        />
        <Button
          variant='contained'
          type='submit'
          size='large'
          className={classes.btnSearch}
        >
          {'検索'}
        </Button>
      </Paper>
    </>
  );
};

Search.propTypes = {

};

export default Search;