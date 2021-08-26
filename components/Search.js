import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Button, IconButton, Divider, Paper, useTheme, useMediaQuery, Grid} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Router from 'next/router';

import {ProductService} from '~/services';
const Product = new ProductService();
import {clean} from '~/shared/module';

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
    zIndex: '9999999',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: 'max-content',
    border: 'none',
    outline: 'none',
    display: 'flex',
    flexWrap: 'wrap',
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
  filter: {
    paddingLeft: '2.125rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0.5rem',
    },
    cursor: 'pointer',
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

  searchBox: {
    position: 'absolute',
    top: '50px',
    width: '100%',
    padding: '1.5rem',
    background: 'white',
  },

  childCategory: {
    margin: '1rem',
  },

  parentCategoryLabel: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    cursor: 'pointer',
  },
  childCategoryLabel: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    cursor: 'pointer',
  },
  active: {
    fontFamily: theme.font.default,
    background: theme.expanded.borderColor,
    borderRadius: '4px',
    padding: '10px 15px',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
  },
  tagLabel: {
    fontSize: '0.8rem',
    lineHeight: '1.4rem',
    border: `1px solid ${theme.palette.grey.dark}`,
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },

  itemSearch: {
    display: 'flex',
    fontFamily: theme.font.default,
    background: theme.expanded.borderColor,
    borderRadius: '4px',
    padding: '5px 10px',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '0.25rem 0.5rem 0.25rem 0',
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
    width: '100%',
  },
}));

const Search = () => {
  const [openSearchCategory, setOpenSearchCategory] = useState(false);
  const [openSearchTag, setOpenSearchTag] = useState(false);
  const [categoryActive, setCategoryActive] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [listTagActive, setListTagActive] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    getListTag();
    getListCategory();
  }, []);

  const getListTag = async () => {
    const result = await Product.getTags({});
    if (result) {
      setListTag(result.tags);
    }
  };

  const getListCategory = async () => {
    const result = await Product.getCategories({});
    if (result) {
      setListCategory(result.categories);
    }
  };

  const checkCategoryActive = (id) => {
    if (categoryActive) {
      return categoryActive.id === id;
    }
    return false;
  };

  const checkTagActive = (id) => {
    if (listTagActive.length) {
      return listTagActive.find((item) => item.id === id);
    }
    return false;
  };

  const selectedCategory = (category) => {
    setCategoryActive(category);
    setOpenSearchCategory(false);
  };

  const selectedTag = (tag) => {
    const indexExits = listTagActive.findIndex((item) => item.id === tag.id);
    if (indexExits >= 0) {
      listTagActive.splice(indexExits, 1);
      setListTagActive([...listTagActive]);
    } else {
      setListTagActive([tag, ...listTagActive]);
    }

    setOpenSearchTag(false);
  };

  const removeTagActive = (index) => {
    listTagActive.splice(index, 1);
    setListTagActive([...listTagActive]);
  };

  const searchSubmit = () => {
    const query = {
      category: categoryActive ? categoryActive.name : '',
      tag: listTagActive.length ? listTagActive.map((item) => item.name).join(',') : '',
      keyword: keywordSearch || '',
    };
    const cleanObj = clean(query);
    Router.push({
      pathname: '/search-page',
      query: cleanObj,
    });
  };

  const openTagSearch = () => {
    setOpenSearchTag(!openSearchTag);
    setOpenSearchCategory(false);
  };

  const openCategorySearch = () => {
    setOpenSearchTag(false);
    setOpenSearchCategory(!openSearchCategory);
  };

  return (
    <>
      <Paper
        elevation={0}
        component='form'
        className={classes.root}
      >
        <div
          className={classes.filter}
          onClick={() => openCategorySearch()}
        >
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
              <span>{categoryActive ? categoryActive.name : 'カテゴリー'}</span>
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
        <div
          className={classes.input}
        >
          {listTagActive && listTagActive.length > 0 ? listTagActive.map((tag, index) => {
            return (
              <div
                className={classes.itemSearch}
                key={tag.id}
              >
                <span style={{marginRight: '0.5rem'}}>{tag.name}</span>
                <CloseIcon
                  fontSize='small'
                  onClick={() => removeTagActive(index)}
                />
              </div>
            );
          }) : null}
          <div className={classes.divSearch}>
            <input
              placeholder={listTagActive && listTagActive.length > 0 ? '' : '検索キーワードを入力してください'}
              onClick={() => openTagSearch()}
              className={classes.inputSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant='contained'
          size='large'
          className={classes.btnSearch}
          onClick={() => searchSubmit()}
        >
          {'検索'}
        </Button>

        {openSearchCategory && <div className={classes.searchBox}>
          <Grid
            container={true}
            spacing={3}
            maxWidth={'lg'}
            style={{padding: '1rem'}}
          >
            {listCategory && listCategory.length > 0 ? listCategory.map((category) => {
              return (
                <>
                  <Grid
                    item={true}
                    xs={6}
                    md={3}
                    key={category.id}
                  >
                    <span
                      className={clsx(classes.parentCategoryLabel, checkCategoryActive(category.id) ? classes.active : '')}
                      onClick={() => selectedCategory(category)}
                    >
                      {category.name}
                    </span>
                    <Grid
                      container={true}
                      spacing={3}
                      className={classes.childCategory}
                    >
                      {category.child_categories && category.child_categories.length > 0 ? category.child_categories.map((c) => {
                        return (
                          <>
                            <Grid
                              item={true}
                              xs={12}
                              key={c.id}
                            >
                              <span
                                className={clsx(classes.childCategoryLabel, checkCategoryActive(c.id) ? classes.active : '')}
                                onClick={() => selectedCategory(c)}
                              >
                                {c.name}
                              </span>
                            </Grid>
                          </>
                        );
                      }) : null}
                    </Grid>
                  </Grid>
                </>
              );
            }) : null}
          </Grid>
        </div>}
        {openSearchTag && <div className={classes.searchBox}>
          <Grid
            container={true}
            spacing={3}
            maxWidth={'lg'}
            style={{padding: '1rem'}}
          >
            {listTag && listTag.length > 0 ? listTag.map((tag, index) => {
              return (
                <>
                  <Grid
                    item={true}
                    xs={6}
                    md={2}
                    key={index}
                    style={{marginBotton: '1rem'}}
                  >
                    <span
                      className={clsx(classes.tagLabel, checkTagActive(tag.id) ? classes.active : '')}
                      onClick={() => selectedTag(tag)}
                    >
                      {tag.name}
                    </span>
                  </Grid>
                </>
              );
            }) : null}
          </Grid>
        </div>}
      </Paper>
    </>
  );
};

export default Search;