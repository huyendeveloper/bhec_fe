import {Container, Typography} from '@material-ui/core';
import React from 'react';

import Head from 'next/head';
import {makeStyles} from '@material-ui/core/styles';

import {ContentBlock} from '~/components';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    '& .next-link': {
      textDecoration: 'none',
    },
  },
  main: {
    position: 'relative',
    flexGrow: 1,
  },
}));

const Custom500 = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>{'エラーが発生しました'}</title>
      </Head>

      <div
        className={classes.main}
      >
        <div className='content'>
          <ContentBlock
            title='500'
          >
            <Container maxWidth='lg'>
              <Typography
                align='center'
                variant='h5'
              >
                {'エラーが発生しました。'}<br/>
                {'しばらく時間をおいて再度アクセスしてください。'}
              </Typography>
            </Container>
          </ContentBlock>
        </div>

      </div>
    </div>
  );
};

export default Custom500;
