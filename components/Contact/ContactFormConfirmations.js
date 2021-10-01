
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import {Box, Button, useMediaQuery} from '@material-ui/core';
import {useSetRecoilState} from 'recoil';
import React, {useState} from 'react';

import {loadingState} from '~/store/loadingState';
import {ThanksPopup} from '~/components/Contact';
import {ContactService} from '~/services';
const Contact = new ContactService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '0 0.5rem',
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      margin: '0 20%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '0',
    },
  },
  infoBlock: {
    marginBottom: '2.5rem',
  },
  infoBlockTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  infoBlockContent: {
    '& p': {
      margin: '3px 0',
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.875rem',
      },
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
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      margin: '2rem 0 1rem',
      flexWrap: 'wrap',
      '& button': {
        width: '100%',
      },
    },
  },

  btnPrev: {
    background: theme.palette.white.main,
    border: '1px solid #333333',
    boxSizing: 'border-box',
    borderRadius: '45px',
    fontSize: '1rem',
    fontWeight: '700',
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
    [theme.breakpoints.down('xs')]: {
      height: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },

  btnSubmit: {
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
    fontSize: '1rem',
    fontWeight: '700',
    background: theme.palette.red.main,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: '45px',
    color: theme.palette.white.main,

    '&:hover': {
      background: theme.palette.red.main,
      color: theme.palette.white.main,
    },
    [theme.breakpoints.down('xs')]: {
      height: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },
  productCategory: {
    margin: '0 1rem',
  },
}));

const ContactFormConfirmations = ({data, onBackStep, listProduct, listContactCategory}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [requestNo, setRequestNo] = useState();
  const setLoading = useSetRecoilState(loadingState);
  const [open, setOpen] = useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const logoWidth = isMobile ? 80 : (isTablet ? 80 : 120);
  const logoHeight = isMobile ? 80 : (isTablet ? 80 : 120);
  const handleSubmitForm = async () => {
    setLoading(true);
    if (Number.parseInt(data.contact_category_id, 10) !== 5) {
      const body = {
        contact_category_id: Number.parseInt(data.contact_category_id, 10),
        name: data.name,
        email: data.email,
        description: data.description,
        image_urls: data.images,
      };
      const res = await Contact.createContact(body);
      if (res.id) {
        setLoading(false);
        setOpen(true);
        setRequestNo(res.request_no);
      } else {
        setLoading(false);
      }
    } else if (Number.parseInt(data.contact_category_id, 10) === 5) {
      const contactProduct = [];
      listProduct.forEach(async (item, index) => {
        contactProduct.push({
          order_number: data[`order_number${index}`],
          product_code: data[`product_code${index}`],
          description: data[`description${index}`],
          image_urls: data[`productImages${index}`],
        });
      });
      const body = {
        contact_category_id: Number.parseInt(data.contact_category_id, 10),
        name: data.name,
        email: data.email,
        description: data.description,
        contact_products: contactProduct,
      };
      const res = await Contact.createContact(body);
      if (res.id) {
        setLoading(false);
        setOpen(true);
        setRequestNo(res.request_no);
      } else {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.infoBlock}>
        <Typography
          component='h3'
          className={classes.infoBlockTitle}
        >
          {'連絡先情報'}
        </Typography>

        <div className={classes.infoBlockContent}>
          <Typography component='p'>
            <span>{'氏名 :'}</span>
            {data.name ? data.name : ''}
          </Typography>
          <Typography component='p'>
            <span>{'メールアドレス：'}</span>
            {data.email ? data.email : ''}
          </Typography>
          <Typography component='p'>
            <span>{'種別：'}</span>
            {data.contact_category_id ? listContactCategory.find((item) => item.id === Number(data.contact_category_id)) ? listContactCategory.find((item) => item.id === Number(data.contact_category_id)).name : '' : ''}
          </Typography>
          {data.contact_category_id === 5 ? (<Typography component='p'>
            <span>{'問い合わせ内容：'}</span>
            {data.description ? data.description : ''}
          </Typography>) : null}
        </div>
      </div>
      {data.contact_category_id === '5' ? (
        <div className={classes.infoBlock}>
          <Typography
            component='h3'
            className={classes.infoBlockTitle}
          >
            {'製品カテゴリ'}
          </Typography>
          <div className={classes.infoBlockContent}>
            <div className={classes.productCategory}>
              {listProduct.length && listProduct.map((product, index) => (
                <div key={product.id}>
                  <Typography
                    component='h3'
                    className={classes.infoBlockTitle}
                  >
                    {`商品情報${index + 1}`}
                  </Typography>
                  <div className={classes.infoBlockContent}>
                    <Typography component='p'>
                      <span>{'注文番号 :'}</span>
                      <span>{product[`order_number${index}`]}</span>
                      {data[`order_number${index}`] ? data[`order_number${index}`] : ''}
                    </Typography>
                    <Typography component='p'>
                      <span>{'商品コード：'}</span>
                      {data[`product_code${index}`] ? data[`product_code${index}`] : ''}
                    </Typography>
                    <Typography component='p'>
                      <span>{'問い合わせ内容：'}</span>
                      {data[`description${index}`] ? data[`description${index}`] : ''}
                    </Typography>
                    {data[`productImages${index}`].length && <div className={classes.infoBlock}>
                      <Typography
                        component='p'
                      >
                        {'画像アップロード'}
                      </Typography>
                      <div className={classes.productImages}>
                        {data[`productImages${index}`].map((img, prodIndex) => (
                          <Image
                            key={String(prodIndex)}
                            src={img}
                            width={logoWidth}
                            height={logoHeight}
                            alt={`product-image-${prodIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {data.images && data.contact_category_id !== '5' && data.images.length > 0 ? (
        <div className={classes.infoBlock}>
          <Typography
            component='h3'
            className={classes.infoBlockTitle}
          >
            {'画像アップロード'}
          </Typography>

          <div className={classes.infoBlockContent}>
            <div className={classes.productImages}>
              {data.images.map((img, prodIndex) => (
                <Image
                  key={String(prodIndex)}
                  src={img}
                  width={logoWidth}
                  height={logoHeight}
                  alt={`product-image-${prodIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

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
            className={classes.btnPrev}
            onClick={onBackStep}
          >
            {'前のページへ戻る'}
          </Button>

          <Button
            variant='pill'
            customColor='red'
            customSize='extraLarge'
            type='submit'
            className={classes.btnSubmit}
            onClick={() => handleSubmitForm()}
          >
            {'フォームを送信'}
          </Button>
        </Box>
      </div>
      {open &&
        <ThanksPopup
          open={open}
          requestNo={requestNo}
          handleClose={handleClose}
          style={{width: '90%'}}
        />
      }
    </div>
  );
};

ContactFormConfirmations.propTypes = {
  data: PropTypes.any.isRequired,
  onBackStep: PropTypes.func,
  listProduct: PropTypes.array,
  listContactCategory: PropTypes.array,
};

export default ContactFormConfirmations;
