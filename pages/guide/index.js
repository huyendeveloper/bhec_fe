import {Container, Grid, Typography} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {ContentBlock, Header, Footer} from '~/components';

const useStyles = makeStyles(() => ({

  title: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },

  description: {
    marginLeft: '1.5rem',
  },

  block: {
    marginBottom: '1rem',
    width: '100%',
  },
}));

function Guide() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={false}/>
        <div
          className='content'
        >
          <ContentBlock
            title='お買い物ガイド'
          >
            <Container maxWidth='lg'>
              <Grid container={true}>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'ご注文'}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'商品の探し方'}<br/>
                      {'商品の注文ステータス'}<br/>
                      {'商品のキャンセル/交換/返品方法'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'お支払い'}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'コンビニ払い (ローソン)'}<br/>
                      {'コンビニ払い (ミニストップ)'}<br/>
                      {'コンビニ払い (ファミリーマート)'}<br/>
                      {'商品代金・配送料'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <Typography
                      variant={'h3'}
                      className={classes.title}
                    >{'配送'}</Typography>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'お届け日時の指定'}<br/>
                      {'お届け先の設定'}<br/>
                      {'送料'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'クーポン'}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'クーポンのご利用方法'}<br/>
                      {'利用上の注意'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'会員登録・ログイン'}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'会員登録方法'}<br/>
                      {'ログイン方法'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'その他'}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div className={classes.description}>
                      {'各種情報の変更'}<br/>
                      {'退会方法'}
                    </div>
                  </Grid>
                </div>
                <div className={classes.block}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <div>
                      <div>
                        <Typography
                          variant={'h3'}
                          className={classes.title}
                        >{'よくある質問'}</Typography>
                      </div>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Container>
          </ContentBlock>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Guide;
