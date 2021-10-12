import {
  Typography,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

import {format} from '~/lib/date';
import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ContactService} from '~/services';
const ContactCommon = new ContactService();

const useStyles = makeStyles((theme) => ({
  contactBox: {
    padding: '2rem 1.5rem',
    background: theme.palette.white.main,
    border: '1px solid #DBDBDB',
    borderRadius: '4px',
  },
  infoBlockTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },

  infoBlockLabel: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    margin: '1rem 0',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  infoBlockContent: {
    flexWrap: 'wrap',
    '& p': {
      display: 'flex',
      fontSize: '0.875rem',
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

  title: {
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    color: theme.palette.black3.main,
    fontWeight: '700',
  },

  infoBlockImage: {
    marginTop: '1.875rem',
  },
  createdDate: {
    marginBottom: '0.688rem',
  },
}));

const Contacts = () => {
  const classes = useStyles();
  const [contact, setContact] = useState([]);
  const router = useRouter();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const imgWidth = isMobile ? 80 : (isTablet ? 120 : 120);
  const imgHeight = isMobile ? 80 : (isTablet ? 120 : 120);

  const getDetailContact = async () => {
    const {id} = router?.query;
    if (id) {
      const response = await ContactCommon.getContactDetail(id);
      setContact(response?.contact);
    }
  };

  useEffect(() => {
    getDetailContact();
  }, [router]);

  return (
    <DefaultLayout title={'問い合わせ詳細'}>
      <ContentBlock
        title={'問い合わせ詳細'}
        bgImage='/img/noise.png'
        bgRepeat='repeat'
      >
        <div className={classes.root}>
          <Box
            mt={2}
            mb={-4}
            className={classes.contactBox}
          >
            <div className={classes.infoBlock}>
              <div className={classes.infoBlockContent}>
                {contact?.created_at &&
                  <Typography
                    component='p'
                    className={classes.createdDate}
                  >
                    {format(contact?.created_at, 'dateTime1')}
                  </Typography>
                }
                <Typography component='p'>
                  <span className={classes.title}>{'氏名 :'}</span>
                  {contact?.name}
                </Typography>
                <Typography component='p'>
                  <span className={classes.title}>{'メールアドレス：'}</span>
                  {contact?.email}
                </Typography>
                <Typography component='p'>
                  <span className={classes.title}>{'種別：'}</span>
                  {contact?.contact_category ? contact.contact_category.name : ''}
                </Typography>
                {contact?.contact_category_id === 5 ? (<Typography component='p'>
                  <span className={classes.title}>{'問い合わせ内容：'}</span>
                  {contact?.description}
                </Typography>) : null}
              </div>
            </div>
            {contact?.contact_category_id === 5 ? (
              <div className={classes.infoBlock}>
                <div className={classes.infoBlockContent}>
                  <div className={classes.productCategory}>
                    {contact.contact_products.length && contact.contact_products.map((product, index) => (
                      <div
                        key={product.id}
                        style={{marginTop: '1rem'}}
                      >
                        <Typography
                          component='h4'
                          className={classes.infoBlockTitle}
                        >
                          {`商品情報${index + 1}`}
                        </Typography>
                        <div className={classes.infoBlockContent}>
                          <Typography component='p'>
                            <span className={classes.title}>{'注文番号 :'}</span>
                            <span>{product.order_number}</span>
                          </Typography>
                          <Typography component='p'>
                            <span className={classes.title}>{'商品コード：'}</span>
                            {product.product_code}
                          </Typography>
                          <Typography component='p'>
                            <span className={classes.title}>{'問い合わせ内容：'}</span>
                            {product.description}
                          </Typography>
                          {product.image_urls.length && <div className={classes.infoBlock}>
                            <div className={classes.productImages}>
                              {product.image_urls.map((img, prodIndex) => (
                                <Image
                                  key={String(prodIndex)}
                                  src={img}
                                  width={imgWidth}
                                  height={imgHeight}
                                  alt={'product-image'}
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
            {contact?.image_urls && contact?.contact_category_id !== 5 && contact?.image_urls.length > 0 ? (
              <div className={classes.infoBlockImage}>
                <div className={classes.infoBlockContent}>
                  <div className={classes.productImages}>
                    {contact.image_urls.map((img, prodIndex) => (
                      <Image
                        key={String(prodIndex)}
                        src={img}
                        width={imgWidth}
                        height={imgHeight}
                        alt={`product-image-${prodIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </Box>
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Contacts;
