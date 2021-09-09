import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useSession} from 'next-auth/client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import {useRecoilState} from 'recoil';

import {Footer, Header} from '~/components';
import {loadingState} from '~/store/loadingState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .next-link': {
      textDecoration: 'none',
    },
  },
  backdrop: {
    zIndex: 9999,
    color: theme.palette.white.main,
  },
}));

const DefaultLayout = ({title, metaDescription, children}) => {
  const classes = useStyles();
  const [loading, setLoading] = useRecoilState(loadingState);
  const [, loadingPage] = useSession();

  React.useEffect(() => {
    setLoading(loadingPage);
  }, [loadingPage]);

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={metaDescription}
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className='content'>
        {children}
      </div>

      <Footer/>

      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
        <CircularProgress color={'inherit'}/>
      </Backdrop>
    </div>
  );
};

DefaultLayout.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  children: PropTypes.any,
};

export default DefaultLayout;
