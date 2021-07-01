import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {
  FormControl,
  Hidden,
  IconButton,
  Link,
  NativeSelect,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';

function HideOnScroll(props) {
  const {children, window} = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  // eslint-disable-next-line no-undefined
  const trigger = useScrollTrigger({target: window ? window() : undefined});

  return (
    <Slide
      appear={false}
      direction='down'
      in={!trigger}
    >
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
    color: theme.palette.text.primary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    display: 'flex',
    '& button': {
      marginRight: '0.5rem',
    },
  },
  nativeSelect: {
    '&::before, &::after': {
      display: 'none',
    },
    '& select': {
      border: '1px solid #444',
      borderRadius: '4px !important',
      padding: '10px 32px 9px 18px',
      color: '#333',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <>
      <div id='back-to-top-anchor'/>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.iconWrapper}>
              <Hidden lgUp={true}>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                >
                  <MenuIcon/>
                </IconButton>
              </Hidden>
              <Link
                href={'/'}
              >
                <Image
                  src='/logo.png'
                  alt='BH_EC Logo'
                  width={162}
                  height={48}
                />
              </Link>
            </div>
            <div className={classes.languageSwitcher}>
              <FormControl>
                <NativeSelect
                  name='siteLanguage'
                  className={classes.nativeSelect}
                  inputProps={{'aria-label': 'siteLanguage'}}
                >
                  <option value={'jp'}>{'日本語'}</option>
                  <option value={'en'}>{'ENG'}</option>
                </NativeSelect>
              </FormControl>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar/>
    </>
  );
};

export default Header;
