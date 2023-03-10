import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Button, IconButton, Divider, Paper, useTheme, useMediaQuery, Grid, ClickAwayListener} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

import {ProductService} from '~/services';
const Product = new ProductService();
import {clean, omit} from '~/lib/object';

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

  searchBox: {
    position: 'absolute',
    top: '50px',
    width: '100%',
    padding: '1.5rem 3rem',
    background: 'white',
  },

  childCategory: {
    margin: '0.5rem 0 0 1rem',
  },

  parentCategoryLabel: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.3125rem',
    },
  },
  childCategoryLabel: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    color: theme.palette.black3.main,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8125rem',
      lineHeight: '1.1875rem',
    },
  },
  active: {
    fontFamily: theme.font.default,
    background: theme.expanded.borderColor,
    borderRadius: '4px',
    padding: '8px 15px',
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
    color: theme.palette.black3.main,
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
    margin: '0.5rem 0.5rem 0.5rem 0',
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

const Search = ({query = {}}) => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();

  const [isExpandedCategory, toggleCategory] = useState(false);
  const [isExpandedTag, toggleTag] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState();

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    getInitData();
    // eslint-disable-next-line
  }, []);

  const getInitData = async () => {
    const tagArray = await getTags();
    const categoryArray = await getListCategory();
    const {category, tag, keyword} = query;
    const queryTag = tag ? tag.split(',') : [];
    const findCategory = categoryArray.find(({name_kana}) => name_kana === category);
    const findTags = queryTag.map((item) => {
      const targetTag = tagArray.find(({name_kana}) => name_kana === item);
      return targetTag;
    });
    setCurrentCategory(findCategory);
    setActiveTags(findTags);
    setKeywordSearch(keyword);
  };

  const getTags = async () => {
    const result = await Product.getSpecialTags();
    let res = [];
    if (result?.tags) {
      setTags(result.tags);
      res = result.tags;
    }
    return res;
  };

  const getListCategory = async () => {
    const result = await Product.getCategories();
    let res = [];
    if (result?.categories?.length) {
      const convertCategories = [...result?.categories];
      const temp = convertCategories[0];
      convertCategories[0] = convertCategories[1];
      convertCategories[1] = temp;
      setListCategory(convertCategories);
      res = result.categories.reduce((newRes, item) => {
        return [...newRes, omit(item, ['child_categories']), ...item.child_categories];
      }, []);
    }
    return res;
  };

  const handleClickAwayCategory = () => {
    toggleCategory(false);
  };

  const handleClickAwayTag = () => {
    toggleTag(false);
  };

  const isActiveCategory = (id) => currentCategory?.id === id;

  const isActiveTag = (id) => {
    if (activeTags.length) {
      return activeTags.some((item) => item.id === id);
    }
    return false;
  };

  const onSelectCategory = (category) => {
    const isSelected = isActiveCategory(category.id);
    const targetCategory = isSelected ? null : category;
    setCurrentCategory(targetCategory);
    toggleCategory(false);
  };

  const onSelectTag = (tag) => {
    const indexExits = activeTags.findIndex((item) => item.id === tag.id);
    if (indexExits >= 0) {
      activeTags.splice(indexExits, 1);
      setActiveTags([...activeTags]);
    } else {
      setActiveTags([...activeTags, tag]);
    }

    toggleTag(false);
  };

  const removeTag = (index) => {
    activeTags.splice(index, 1);
    setActiveTags([...activeTags]);
  };

  const onSearch = () => {
    const newQuery = {
      category: currentCategory ? currentCategory.name_kana : '',
      tag: activeTags.length ? activeTags.map((item) => item.name).join(',') : '',
      keyword: keywordSearch || '',
    };
    const cleanObj = clean(newQuery);
    toggleCategory(false);
    toggleTag(false);
    router.push({
      pathname: '/search-page',
      query: cleanObj,
    });
  };

  const toggleSearch = () => {
    toggleTag(!isExpandedTag);
    toggleCategory(false);
  };

  const openCategorySearch = () => {
    toggleTag(false);
    toggleCategory(!isExpandedCategory);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch();
      return false;
    }
    return false;
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
          {isMobile ? null : <span>{currentCategory ? currentCategory.name_kana : '???????????????'}</span>}
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
          onClick={() => toggleSearch()}
        >
          {activeTags && activeTags.length > 0 ? activeTags.map((tag, index) => {
            return (
              <div
                className={classes.itemSearch}
                key={`activeTag-${tag.id}`}
              >
                <span style={{marginRight: '0.5rem'}}>{tag?.name}</span>
                <CloseIcon
                  fontSize='small'
                  onClick={() => removeTag(index)}
                />
              </div>
            );
          }) : null}
          <div className={classes.divSearch}>
            <input
              placeholder={activeTags && activeTags.length > 0 ? '' : '????????????????????????????????????????????????'}
              className={classes.inputSearch}
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <Button
          variant='contained'
          size='large'
          className={classes.btnSearch}
          onClick={() => onSearch()}
        >
          {'??????'}
        </Button>

        {isExpandedCategory && (
          <ClickAwayListener onClickAway={handleClickAwayCategory}>
            <div className={classes.searchBox}>
              <Grid
                container={true}
                maxWidth={'lg'}
              >
                {listCategory && listCategory.length > 0 ? listCategory.map((category) => {
                  return (
                    <>
                      <Grid
                        item={true}
                        xs={6}
                        sm={3}
                        md={2}
                        key={`${category.name}-${category.id}`}
                      >
                        <span
                          className={clsx(
                            classes.parentCategoryLabel,
                            isActiveCategory(category.id) ? classes.active : '',
                          )}
                          onClick={() => onSelectCategory(category)}
                        >
                          {category.name_kana}
                        </span>
                        <Grid
                          container={true}
                          className={classes.childCategory}
                        >
                          {category.child_categories && category.child_categories.length > 0 ? category.child_categories.map((c) => {
                            return (
                              <>
                                <Grid
                                  item={true}
                                  xs={12}
                                  key={`${c.name}-${c.id}`}
                                  style={{marginBottom: '1rem'}}
                                >
                                  <span
                                    className={clsx(
                                      classes.childCategoryLabel,
                                      isActiveCategory(c.id) ? classes.active : '',
                                    )}
                                    onClick={() => onSelectCategory(c)}
                                  >
                                    {c.name_kana}
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
            </div>
          </ClickAwayListener>
        )}
        {isExpandedTag && (
          <ClickAwayListener onClickAway={handleClickAwayTag}>
            <div className={classes.searchBox}>
              <Grid
                container={true}
                maxWidth={'lg'}
              >
                {tags && tags.length ? tags.map((tag) => {
                  return (
                    <>
                      <Grid
                        item={true}
                        key={tag.name}
                        style={{marginBottom: '1rem', padding: '8px'}}
                      >
                        <span
                          className={clsx(classes.tagLabel, isActiveTag(tag.id) ? classes.active : '')}
                          onClick={() => onSelectTag(tag)}
                        >
                          {tag.name}
                        </span>
                      </Grid>
                    </>
                  );
                }) : null}
              </Grid>
            </div>
          </ClickAwayListener>
        )}
      </Paper>
    </>
  );
};

Search.propTypes = {
  query: PropTypes.object,
};
export default Search;
