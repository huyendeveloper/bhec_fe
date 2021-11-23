import Image from 'next/image';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {Box, CircularProgress} from '@material-ui/core';

import React, {useState} from 'react';

import {genders} from '~/constants';
import {Button, AlertMessageForSection} from '~/components';

import {CommonService} from '~/services';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  infoBlock: {
    marginBottom: '2.5rem',
  },
  infoBlockTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: '1.5rem',
  },
  infoBlockContent: {
    '& p': {
      margin: '3px 0',
      display: 'flex',
    },
  },
  productImages: {
    display: 'flex',
    gap: '1.5rem',

    [theme.breakpoints.down('xs')]: {
      gap: '0.5rem',
    },

    '& > div': {
      border: '1px solid #e3e3e3',
      overflow: 'hidden',
      borderRadius: '4px',
    },
  },
  actionBtns: {
    margin: '3rem 0 1.5rem',
    [theme.breakpoints.down('xs')]: {
      margin: '2rem 0 1rem',

      '& button': {
        width: '100%',
      },
    },
  },
}));

const SellerFormConfirmations = ({data, onBackStep, onNextStep}) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [alerts, setAlerts] = useState(null);

  const handleSubmitForm = async () => {
    setAlerts(null);
    setLoading(true);
    const res = await CommonService.registerSeller(data);
    if (res?.data) {
      setLoading(false);
      onNextStep();
    } else {
      setLoading(false);
      const message = res?.errors ? res.errors : '送信できませんでした。再度、別のタイミングでお試してください。';
      setAlerts({
        type: 'error',
        message,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.infoBlock}>
        <Typography
          component='h3'
          className={classes.infoBlockTitle}
        >
          {'代理店コード'}
        </Typography>

        <div className={classes.infoBlockContent}>
          {data.agency_code ? data.agency_code : ''}
        </div>
      </div>
      <div className={classes.infoBlock}>
        <Typography
          component='h3'
          className={classes.infoBlockTitle}
        >
          {'代表者情報'}
        </Typography>

        <div className={classes.infoBlockContent}>
          <Typography component='p'>
            <span>{'氏名：'}</span>
            {data.name ? data.name : ''}
          </Typography>
          <Typography component='p'>
            <span>{'⽒名カナ：'}</span>
            {data.name_kana ? data.name_kana : ''}
          </Typography>
          <Typography component='p'>
            <span>{'生年月日：'}</span>
            {data.dob ? data.dob : ''}
          </Typography>
          <Typography component='p'>
            <span>{'性別：'}</span>
            {data.gender ? genders[data.gender] : ''}
          </Typography>
        </div>
      </div>

      <div className={classes.infoBlock}>
        <Typography
          component='h3'
          className={classes.infoBlockTitle}
        >
          {'事業者情報'}
        </Typography>

        <div className={classes.infoBlockContent}>
          <Typography component='p'>
            <span>{'事業者名 (屋号/法⼈名)：'}</span>
            {data.company_name ? data.company_name : ''}
          </Typography>
          <Typography
            component='p'
            style={{marginBottom: '10px'}}
          >
            <span>{'事業者住所：'}</span>
            <span>
              {data.zipcode ? (
                <>
                  {data.zipcode} <br/>
                </>
              ) : null}
              {data.province && data.city && data.ward ? (
                <>
                  {data.province} {data.city} {data.ward}<br/>
                </>
              ) : null}
              {data.address_line_2 ? (
                <>
                  {data.address_line_2} <br/>
                </>
              ) : null}
              {data.phone_no ? (
                <>
                  {data.phone_no} <br/>
                </>
              ) : null}
              {/* {data.office_room ? (
                <>
                  {data.office_room} <br/>
                </>
              ) : null}
              {data.company_address ? (
                <>
                  {data.company_address} <br/>
                </>
              ) : null}
              {data.district ? (
                <>
                  {data.district + ', ' + selected.label} <br/>
                </>
              ) : null} */}
            </span>
          </Typography>
          <Typography component='p'>
            <span>{'メールアドレス：'}</span>
            {data.email ? data.email : ''}
          </Typography>
          <Typography component='p'>
            <span>{'ご利⽤予定の運送会社：'}</span>
            {data.express_delivery ? data.express_delivery : ''}
          </Typography>
        </div>
      </div>

      <div className={classes.infoBlock}>
        <Typography
          component='h3'
          className={classes.infoBlockTitle}
        >
          {'担当者情報・連絡先等'}
        </Typography>

        <div className={classes.infoBlockContent}>
          {data.representative === false ? (
            <>
              <Typography component='p'>
                <span>{'氏名：'}</span>
                {data.other_name ? data.other_name : ''}
              </Typography>
              <Typography component='p'>
                <span>{'⽒名カナ：'}</span>
                {data.other_name_kana ? data.other_name_kana : ''}
              </Typography>
              <Typography component='p'>
                <span>{'電話番号：'}</span>
                {data.other_phone ? data.other_phone : ''}
              </Typography>
              <Typography component='p'>
                <span>{'メールアドレス：'}</span>
                {data.other_email ? data.other_email : ''}
              </Typography>
            </>
          ) : null}
          <Typography component='p'>
            <span>{'出品予定の商品：'}</span>
            {data.product_sell ? data.product_sell : ''}
          </Typography>
          <Typography component='p'>
            <span>{'⽣年出品予定の時期：'}</span>
            {data.time_sell ? data.time_sell : ''}
          </Typography>
        </div>
      </div>

      {data.images && data.images.length > 0 ? (
        <div className={classes.infoBlock}>
          <Typography
            component='h3'
            className={classes.infoBlockTitle}
          >
            {'画像アップロード'}
          </Typography>

          <div className={classes.infoBlockContent}>
            <div className={classes.productImages}>
              {data.images.map((imgSrc, prodIndex) => (
                <Image
                  key={String(prodIndex)}
                  src={imgSrc}
                  width={176}
                  height={176}
                  alt={`product-image-${prodIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />

      <div className={classes.actions}>
        <Box
          display='flex'
          gridGap='1rem'
          justifyContent='center'
          flexWrap='wrap'
          className={classes.actionBtns}
        >
          <Button
            variant='pill'
            customSize='extraLarge'
            customColor='white'
            customBorder='bdBlack'
            disabled={loading}
            onClick={() => onBackStep()}
          >
            {'入力画面に戻る'}
          </Button>

          <Button
            variant='pill'
            customColor='red'
            customSize='extraLarge'
            disabled={loading}
            onClick={() => handleSubmitForm()}
          >
            {'上記の内容で送信する'}
            {loading ? (
              <CircularProgress
                size={24}
              />
            ) : null}
          </Button>
        </Box>
      </div>
    </div>
  );
};

SellerFormConfirmations.propTypes = {
  data: PropTypes.any.isRequired,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default SellerFormConfirmations;
