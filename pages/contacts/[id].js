import {
  Typography,
  Box,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ContactService} from '~/services';
const ContactCommon = new ContactService();

const useStyles = makeStyles((theme) => ({
  root: {

  },
  contactBox: {
    padding: '1.5rem 2rem',
    background: theme.palette.white.main,
    border: '1px solid #DBDBDB',
    borderRadius: '4px',
  },
}));

const Contacts = () => {
  const classes = useStyles();
  const [contact, setContact] = useState([]);
  const router = useRouter();

  const getDetailContact = async () => {
    const {id} = router?.query;
    const response = await ContactCommon.getContactDetail(id);
    setContact(response?.contact);
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
              <Typography
                component='h3'
                className={classes.infoBlockTitle}
              >
                {'連絡先情報'}
              </Typography>

              <div className={classes.infoBlockContent}>
                <Typography component='p'>
                  <span>{'氏名 :'}</span>
                  {contact.name ? contact.name : ''}
                </Typography>
                <Typography component='p'>
                  <span>{'メールアドレス：'}</span>
                  {contact.email ? contact.email : ''}
                </Typography>
                <Typography component='p'>
                  <span>{'種別：'}</span>
                  {contact.contact_category ? contact.contact_category.name : ''}
                </Typography>
                {contact.contact_category_id === 5 ? (<Typography component='p'>
                  <span>{'問い合わせ内容：'}</span>
                  {contact.description ? contact.description : ''}
                </Typography>) : null}
              </div>
            </div>
            {contact.contact_category_id === 5 ? (
              <div className={classes.infoBlock}>
                <Typography
                  component='h3'
                  className={classes.infoBlockTitle}
                >
                  {'製品カテゴリ'}
                </Typography>
                <div className={classes.infoBlockContent}>
                  <div className={classes.productCategory}>
                    {contact.image_urls.length && contact.image_urls.map((product, index) => (
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
                            {contact[`order_number${index}`] ? contact[`order_number${index}`] : ''}
                          </Typography>
                          <Typography component='p'>
                            <span>{'商品コード：'}</span>
                            {contact[`product_code${index}`] ? contact[`product_code${index}`] : ''}
                          </Typography>
                          <Typography component='p'>
                            <span>{'問い合わせ内容：'}</span>
                            {contact[`description${index}`] ? contact[`description${index}`] : ''}
                          </Typography>
                          {contact[`productImages${index}`].length && <div className={classes.infoBlock}>
                            <Typography
                              component='p'
                            >
                              {'画像アップロード'}
                            </Typography>
                            <div className={classes.productImages}>
                              {contact[`productImages${index}`].map((img, prodIndex) => (
                                <Image
                                  key={String(prodIndex)}
                                  src={img.contact_url}
                                  width={176}
                                  height={176}
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
            {contact.images && contact.contact_category_id !== 5 && contact.images.length > 0 ? (
              <div className={classes.infoBlock}>
                <Typography
                  component='h3'
                  className={classes.infoBlockTitle}
                >
                  {'画像アップロード'}
                </Typography>

                <div className={classes.infoBlockContent}>
                  <div className={classes.productImages}>
                    {contact.images.map((img, prodIndex) => (
                      <Image
                        key={String(prodIndex)}
                        src={img.contact_url}
                        width={176}
                        height={176}
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
