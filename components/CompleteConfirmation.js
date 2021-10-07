/* eslint-disable indent */
/* eslint-disable no-useless-escape */
import {
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import PropTypes from 'prop-types';

import {Button, ContentBlock} from '~/components';

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

const CompleteConfirmation = ({type, isMale = false}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const forgotDesc = () => {
    return (
      <div className={classes.noteCenter}>
        {'入力メールアドレスに再設定手順を送付しました。'}<br/>
        {'ご利用のメール設定により迷惑メールフォルダに振り分けられる場合がございます。'}
      </div>
    );
  };

  const registerDesc = () => {
    return (
      <div className={classes.note}>
        {'この度はご登録を頂き、誠にありがとうございます。本人確認メールを送信しました。'}<br/>
        {'登録メールにご確認の上、登録を完了してください。'}<br/>
        {'ご利用のメール設定により迷惑メールフォルダに振り分けられる場合がございます。'}
      </div>
    );
  };

  const typeArray = {
    register: {
      title: 'ご登録ありがとうございます。',
      content: registerDesc(),
    },
    forgot: {
      title: 'パスワードリセットの申請が送信されました。',
      content: forgotDesc(),
    },
  };

  const {title, content} = typeArray[type];
  return (
    <ContentBlock>
      <div className={classes.orderSuccess}>
        {isMale ? (
          <Image
            src='/img/male-character-happy.png'
            width={268}
            height={223}
            alt={'icon'}
          />) : (
            <Image
              src={'/img/female-character-happy.png'}
              width={isMobile ? 113 : 181}
              height={isMobile ? 200 : 320}
              alt={'icon'}
            />)
        }
        <Typography
          variant={'h5'}
          className={classes.thanks}
        >
          {title}
        </Typography>
        {content}
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
  );
};

CompleteConfirmation.propTypes = {
  type: PropTypes.string,
  isMale: PropTypes.bool,
};

export default CompleteConfirmation;
