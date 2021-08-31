/* eslint-disable no-useless-escape */
import {
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {Button, ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  orderSuccess: {
    textAlign: 'center',
  },
  thanks: {
    fontWeight: 'bold',
    lineHeight: '2.25rem',
    color: '#54C0C0',
    margin: '3rem 0 0.7rem 2.75rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      margin: '1.5rem 0',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      margin: '1.5rem 0 2.5rem 0',
    },
  },
  recommendedProducts: {
    marginTop: '2rem',
  },
  ads: {
    paddingTop: '3rem !important',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem !important',
    },
  },
  buttons: {
    '& button': {
      margin: '0.75rem',
      [theme.breakpoints.down('xs')]: {
        margin: '0.5rem',
        width: '100%',
      },
    },
  },

  note: {
    width: '35rem',
    margin: '0 calc((100% - 35rem)/2)',
    textAlign: 'center',
    fontSize: '0.875rem',
    lineHeight: '1.3rem',
    marginBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '3rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 calc((100% - 19.2rem)/2)',
      width: '19.2rem',
      marginBottom: '2rem',
    },
  },
  noteCenter: {
    width: '35rem',
    margin: '0 calc((100% - 35rem)/2)',
    fontSize: '0.875rem',
    textAlign: 'center',
    lineHeight: '1.3rem',
    marginBottom: '3.5rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '4.3rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 calc((100% - 21rem)/2)',
      width: '21rem',
      marginBottom: '6rem',
    },
  },
}));

export default function RequestSucceeded() {
  const classes = useStyles();
  const theme = useTheme();
  const [type, setType] = useState('sign-up');
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const router = useRouter();
  useEffect(() => {
    if (router.query.type) {
      setType(router.query.type);
    }
  }, []);
  return (
    <DefaultLayout title='Request successded - BH_EC'>
      <ContentBlock
        title={'メールアドレスで会員登録'}
        bgImage='/img/noise.png'
      >
        <div className={classes.orderSuccess}>
          <Image
            src={'/order-succes.png'}
            width={isMobile ? 113 : 181}
            height={isMobile ? 200 : 320}
            alt={'icon'}
          />

          <Typography
            variant={'h5'}
            className={classes.thanks}
          >{'ご購入ありがとうございます。'}</Typography>
          {type === 'sign-up' && <div className={classes.note}>
            {'この度はご登録を頂き、誠にありがとうございます。本人確認メールを送信しました。'}<br/>
            {'登録メールにご確認の上、登録を完了してください。'}<br/>
            {'ご利用のメール設定により迷惑メールフォルダに振り分けられる場合がございます。'}
          </div>}
          {type === 'forgot' && <div className={classes.noteCenter}>
            {'入力メールアドレスに再設定手順を送付しました。'}<br/>
            {'ご利用のメール設定により迷惑メールフォルダに振り分けられる場合がございます。'}
          </div>}
          <div className={classes.buttons}>
            <Link href={'/'}>
              <Button
                variant={'pill'}
                customColor={'red'}
                customBorder={'bdGray'}
                customSize={'extraLarge'}
              >
                {'ホームページに戻る'}
              </Button>
            </Link>
          </div>
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
}
