import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import {ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';

const useStyles = makeStyles((theme) => ({
  content: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '1.375rem',
    color: theme.palette.black.default,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
  },
  block: {
    marginBottom: '1.5rem',
  },
}));

const Company = () => {
  const classes = useStyles();

  return (
    <DefaultLayout title='会社概要'>
      <ContentBlock
        title='会社概要'
      >
        <Container maxWidth='lg'>
          <Grid
            container={true}
          >
            <Grid
              item={true}
              md={3}
              xs={0}
            />
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <div className={classes.content}>
                <div className={classes.block}>
                  {'■会社名'}<br/>
                  {'株式会社 Branding House'}<br/>
                </div>
                <div className={classes.block}>
                  {'■代表取締役'}<br/>
                  {'大谷　聖一'}<br/>
                </div>
                <div className={classes.block}>
                  {'■設立'}<br/>
                  {'2020年5月25日'}<br/>
                </div>
                <div className={classes.block}>
                  {'■住所'}<br/>
                  {'神奈川県横浜市中区常盤町3丁目２１'}<br/>
                  {'アライアンス関内ビル３F'}
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Company;
