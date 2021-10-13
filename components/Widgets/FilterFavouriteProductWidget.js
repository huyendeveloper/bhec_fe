import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {IconButton, Paper, Grid, ClickAwayListener} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {ProductService} from '~/services';
const Product = new ProductService();
import {omit} from '~/lib/object';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    zIndex: '1001',
    justifyContent: 'flex-end',
  },
  filter: {
    border: `1px solid ${theme.palette.black4.main}`,
    borderRadius: '4px',
    padding: '0 2.125rem',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0.5rem',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
    top: '68px',
    width: 'max-content',
    padding: '1.5rem 3rem',
    background: 'white',
    border: '1px solid #DBDBDB',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 10%)',
    borderRadius: '8px',
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

const Search = ({changeFilterCategory}) => {
  const [isExpandedCategory, toggleCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState();
  const [listCategory, setListCategory] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getListCategory();
    // eslint-disable-next-line
  }, []);

  const getListCategory = async () => {
    const result = await Product.getCategories();
    let res = [];
    if (result?.categories) {
      setListCategory(result.categories);
      res = result.categories.reduce((newRes, item) => {
        return [...newRes, omit(item, ['child_categories']), ...item.child_categories];
      }, []);
    }
    return res;
  };

  const handleClickAwayCategory = () => {
    toggleCategory(false);
  };

  const isActiveCategory = (id) => (currentCategory?.id === id);

  const onSelectCategory = (category) => {
    const isSelected = isActiveCategory(category.id);
    const targetCategory = isSelected ? null : category;
    setCurrentCategory(targetCategory);
    if (targetCategory?.id) {
      changeFilterCategory(targetCategory?.id);
    } else {
      changeFilterCategory(null);
    }
    toggleCategory(false);
  };

  const openCategorySearch = () => {
    toggleCategory(!isExpandedCategory);
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
            size={'medium'}
          >
            <Image
              src={'/img/icons/filter-search.svg'}
              layout={'intrinsic'}
              width={24}
              height={24}
              alt={'arrow right'}
            />
          </IconButton>
          <span>{currentCategory ? currentCategory.name_kana : 'フィルター'}</span>
        </div>
        {isExpandedCategory &&
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
                          className={clsx(classes.parentCategoryLabel, isActiveCategory(category.id) ? classes.active : '')}
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
                                    className={clsx(classes.childCategoryLabel, isActiveCategory(c.id) ? classes.active : '')}
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
        }
      </Paper>
    </>
  );
};

Search.propTypes = {
  changeFilterCategory: PropTypes.func,
};
export default Search;
