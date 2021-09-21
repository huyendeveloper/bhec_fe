import {Container, Grid, Link, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  content: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '21px',
    fontSize: '16px',
    color: theme.palette.black.default,
  },
  block: {
    marginBottom: '1.5rem',
  },
}));

const SpecifiedCommercialTransactions = () => {
  const classes = useStyles();

  return (
    <DefaultLayout title='特定商取引法'>
      <ContentBlock
        title='特定商取引法'
      >
        <Container maxWidth='lg'>
          <Grid
            container={true}
          >
            <Grid
              item={true}
              xs={12}
            >
              <div className={classes.content}>
                <div className={classes.block}>
                  {'特定商取引法に基づく表記'}<br/><br/><br/>
                </div>
                <div className={classes.block}>
                  {'販売業者'}<br/>
                  {'株式会社Branding House'}<br/>
                </div>
                <div className={classes.block}>
                  {'運営統括責任者名'}<br/>
                  {'大谷　聖一'}<br/>
                </div>
                <div className={classes.block}>
                  {'所在地'}<br/>
                  {'神奈川県横浜市中区常盤町３ー２９'}<br/>
                  {'アライアンス関内ビル302'}<br/><br/>
                </div>
                <div className={classes.block}>
                  {'商品代金以外の料金の説明について'}<br/>
                  {'配送料については本サイト上の「配送料・その他手数料について」をご確認ください。'}<br/>
                </div>
                <div className={classes.block}>
                  {'申込有効期限'}<br/>
                  {'お支払方法がクレジットカード決済・コンビニ決済の場合、ご注文より1週間以内に入金'}
                  {'確認できない場合はご注文をキャンセルさせていただきます。再度ご注文の場合、新たに'}
                  {'ご注文のお手続きをお願い致します。在庫切れの場合は随時メールまたは電話にて連絡さ'}
                  {'せていただきます。'}<br/><br/><br/>
                </div>
                <div className={classes.block}>
                  {'商品の引き渡し時期'}<br/>
                  {'各商品の詳細ページ、または注文履歴よりご確認ください。'}<br/><br/>
                </div>
                <div className={classes.block}>
                  {'お支払い方法'}<br/>
                  {'コンビニ決済・クレジットカード'}<br/><br/>
                </div>
                <div className={classes.block}>
                  {'お支払い期限'}<br/>
                  {'クレジットカードの支払い処理は購入時に行われます。'}<br/>
                  {'その後のお支払いはクレジットカード会社の締め日に準じます。'}<br/>
                  {'コンビニ決済の場合，ご注文日から5日以内にお支払いください。'}<br/>
                </div>
                <div className={classes.block}>
                  {'お届け対象地域について'}<br/>
                  {'日本全国発送可能です（一部地域を除く）'}<br/>
                </div>
                <div className={classes.block}>
                  {'商品の返品・交換について'}<br/>
                  {'返品・交換については、原則承っておりません。'}<br/>
                  {'但し、お届けした商品に破損、汚損等あった場合や、注文品と違う商品が届いた場合につ'}
                  {'いては、商品到着後5日以内に，問合せフォームよりご連絡ください。'}<br/>
                </div>
                <div className={classes.block}>
                  {'返品送料'}<br/>
                  {'商品間違いや破損等初期不良の場合は当店負担、お客様都合の場合はお客様にて送料をご'}
                  {'負担ください。'}<br/>
                </div>
                <div className={classes.block}>
                  {'ご注文のキャンセルについて'}<br/>
                  {'発送準備後のキャンセルは原則承っておりません。'}<br/>
                </div>
                <div className={classes.block}>
                  {'名称'}<br/>
                  {'おしながき'}<br/>
                </div>
                <div className={classes.block}>
                  {'連絡先'}<br/>
                  {'サイト上のお問合せフォーム、もしくは下記メールアドレスにご連絡ください。'}<br/>
                  <Link href={'mailto:info@oshinagaki-store.com'}>{'info@oshinagaki-store.com'}</Link><br/>
                  {'※特商法に関わるお問い合わせである旨記載していただきご連絡をお願いいたします。'}<br/>
                </div>
                <div className={classes.block}>
                  {'電話番号'}<br/>
                  <Link href={'tel:045‐264-6562'}>{'045‐264-6562'}</Link><br/>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default SpecifiedCommercialTransactions;
