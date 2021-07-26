import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Button, IconButton, Divider, InputBase, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <>
      <Paper
        component='form'
        className={classes.root}
      >
        <IconButton
          className={classes.iconButton}
          aria-label='menu'
        >
          <MenuIcon/>
        </IconButton>
        {'カテゴリー'}
        <Divider
          className={classes.divider}
          orientation='vertical'
        />
        <SearchIcon/>
        <InputBase
          className={classes.input}
          placeholder='検索キーワードを入力してください'
          inputProps={{'aria-label': 'search'}}
        />
        <Button
          variant='contained'
          color='secondary'
          type='submit'
          size='large'
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