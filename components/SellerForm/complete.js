import 'date-fns';
import {makeStyles} from '@material-ui/core/styles';

import React from 'react';

import Image from 'next/image';

import Typography from '@material-ui/core/Typography';

import {AlertBox} from '../AlertBox';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '2.25rem',
    color: theme.palette.green.main,
    margin: '2rem 0 1.75rem',
  },
  description: {
    fontSize: '0.875rem',
    lineHeight: '1.3125rem',
  },
}));

export default function Complete() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AlertBox>
        <Image
          src='/img/seller-thanks.png'
          width={268}
          height={223}
          alt='出品者登録⼊⼒項⽬'
        />

        <Typography
          component='h1'
          variant='h5'
          className={classes.title}
        >
          {'送信が完了いたしました。'}
        </Typography>

        <Typography
          component='p'
          className={classes.description}
        >
          {'この度はご登録を頂き、誠にありがとうございます。折り返しご連絡させて頂きますので、今しばらくお待ちくださいますよう、お願いいたします。'}
        </Typography>
      </AlertBox>
    </div>
  );
}
