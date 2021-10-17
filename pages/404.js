import {Container, Typography} from '@material-ui/core';
import React from 'react';

import {useRouter} from 'next/router';

import {makeStyles} from '@material-ui/core/styles';

import {Button, ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '0.75rem',
      [theme.breakpoints.down('xs')]: {
        margin: '0.5rem',
        width: '100%',
      },
    },
  },
}));

const Custom404 = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <DefaultLayout title='ページが見つかりませんでした'>
      <ContentBlock
        title='404'
      >
        <Container maxWidth='lg'>
          <Typography
            align='center'
            variant='h5'
          >
            {'ページが見つかりませんでした。'}
          </Typography>

          <div className={classes.buttons}>
            <Button
              variant={'pill'}
              customColor={'white'}
              customBorder={'bdGray'}
              customSize={'extraLarge'}
              onClick={() => router.push('/')}
            >
              {'TOPページへ戻る'}
            </Button>
          </div>
        </Container>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Custom404;
