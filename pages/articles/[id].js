import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Box, Chip, Container, Grid, useTheme, makeStyles, Typography, useMediaQuery} from '@material-ui/core';

import {useRouter} from 'next/router';

import moment from 'moment';

import {DefaultLayout} from '~/components/Layouts';
import {ArticleService, ProductService} from '~/services';
import {Breadcrumbs, ContentBlock, Search, Button, CategoryBlock} from '~/components';
import {AdsWidget, ProductWidget, ArticleWidget} from '~/components/Widgets';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    width: '100%',
    paddingBottom: '0.125rem',
  },
  topContainer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  breadcrumbs: {
    padding: '2rem 0 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 0',
    },
  },
  chipList: {
    marginBottom: 16,
    textAlign: 'center',
  },
  chipItem: {
    marginRight: 16,
    background: theme.chipItem.borderColor,
    color: theme.palette.background.default,
    borderRadius: 2,
    height: 16,
    fontSize: 10,
    fontWeight: 'bold',
  },
  createdAt: {
    textAlign: 'center',
    marginBottom: 28,
  },
  thumbnail: {
    textAlign: 'center',
    marginBottom: 32,
  },
  body: {
    marginBottom: theme.spacing(6),
    '& img': {
      width: '100%',
    },
  },
  categoryBlock: {
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      '& .MuiGrid-container': {
        overflow: 'scroll',
        flexWrap: 'nowrap',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '& .MuiGrid-item': {
        minWidth: '16.688rem',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
}));

const ProductServiceInstance = new ProductService();

const SingleArticle = ({article, shortcodes, refinedHTML}) => {
  const classes = useStyles();
  const router = useRouter();
  const [linkProps, setLinkProps] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [lasestArticles, setLasestArticles] = useState([]);

  const toArchivePage = (tag) => {
    router.push(`/articles?tag=${tag?.name}`);
  };

  const renderShortcodes = async () => {
    for (let i = 0; i < shortcodes.length; i++) {
      const shortcode = shortcodes[i];
      const shortcodeRegex = /\[product_ids=([\s\S]*?)\]/gm;
      let match;
      const products = [];
      // eslint-disable-next-line no-cond-assign
      while (match = shortcodeRegex.exec(shortcode)) {
        const productIds = match[1].replace(/ /g, '').split(',');
        for (let j = 0; j < productIds.length; j++) {
          const id = productIds[j];
          // eslint-disable-next-line no-await-in-loop
          const response = await ProductServiceInstance.getProductDetail(id);
          if (response?.product_detail) {
            products.push({
              ...response?.product_detail,
              seller_info: response?.seller_info,
              tags: response?.product_detail.tags,
            });
          }
        }
      }
      ReactDOM.render(
        <Grid
          container={true}
          spacing={3}
          style={{
            justifyContent: 'center',
            margin: '16px auto',
          }}
        >
          {products?.map((item) => (
            <Grid
              key={item.id}
              item={true}
              sm={4}
              xs={6}
            >
              <ProductWidget
                data={item}
                border={'borderNone'}
              />
            </Grid>
          ))}
        </Grid>
        , document.getElementById(`js-shorcode-${i}`));
    }
  };

  useEffect(() => {
    setLinkProps(
      [
        {
          id: 1,
          linkLabel: 'ホーム',
          linkUrl: '/',
        },
        {
          id: 2,
          linkLabel: '記事一覧',
          linkUrl: '/articles',
        },
        {
          id: 3,
          linkLabel: article?.title,
        },
      ],
    );

    renderShortcodes();
    getNewArticles();
  }, []);

  const getNewArticles = async () => {
    const queryParams = {per_page: 3};
    const response = await ArticleService.getArticles(queryParams);
    if (response.data) {
      setLasestArticles(response.data);
    } else {
      setLasestArticles([]);
    }
  };

  return (
    <DefaultLayout title={`${article?.title}`}>
      <Container
        maxWidth='lg'
      >
        <Grid
          container={true}
          spacing={0}
          className={classes.breadcrumbs}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <Breadcrumbs
              linkProps={linkProps}
              margin='0'
            />
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth='lg'
        className={classes.topContainer}
      >
        <Search/>
      </Container>

      <ContentBlock
        title={article?.title}
        bgImage={'/img/noise.png'}
        bgRepeat={'repeat'}
        styleTitle={isMobile ? {fontSize: '1rem'} : {}}
      >

        <div className={classes.chipList}>
          {article.tags?.map((tag) => {
            return (
              <>
                <Chip
                  key={`${tag}-${article?.id}`}
                  label={tag?.name}
                  className={classes.chipItem}
                  onClick={() => toArchivePage(tag)}
                />
              </>
            );
          })}
        </div>

        <Typography className={classes.createdAt}>{moment(article?.created_at).format('YYYY/MM/DD')}</Typography>

        {article?.image_url && (
          <Box
            className={classes.thumbnail}
          >
            <Image
              src={article?.image_url ?? '/logo.png'}
              layout='intrinsic'
              width={946}
              height={554}
              alt={article?.title}
              objectFit='contain'
            />
          </Box>
        )}

        <Box>
          <div
            className={classes.body}
            dangerouslySetInnerHTML={{
              __html: refinedHTML,
            }}
          />
        </Box>

        <div className={classes.buttons}>
          <Button
            variant={'pill'}
            customColor={'white'}
            customBorder={'bdBlack'}
            customSize={'extraLarge'}
            onClick={() => router.push('/articles')}
          >
            {'記事一覧に戻る'}
          </Button>
        </div>

        <div className={classes.categoryBlock}>
          <CategoryBlock
            bgColor='transparent'
            title={'関連の記事'}
          >
            <Grid
              container={true}
              spacing={3}
              className={classes.recommendedProducts}
            >
              {lasestArticles.map((articleItem) => (
                <Grid
                  key={articleItem.id}
                  item={true}
                  sm={4}
                  xs={12}
                >
                  <ArticleWidget
                    article={articleItem}
                  />
                </Grid>
              ))}
            </Grid>
          </CategoryBlock>
        </div>
        <AdsWidget
          imgSrc={'/img/ad/ad5.png'}
          imgWidth={'1140'}
          imgHeight={'192'}
        />
      </ContentBlock>
    </DefaultLayout>
  );
};

SingleArticle.propTypes = {
  article: PropTypes.object,
  shortcodes: PropTypes.array,
  refinedHTML: PropTypes.string,
};

SingleArticle.defaultProps = {
  shortcodes: [],
  refinedHTML: '',
};

export default SingleArticle;

export async function getServerSideProps({params}) {
  const {id} = params;
  const response = await ArticleService.getArticleDetail(id);
  if (!response?.id) {
    return {
      notFound: true,
    };
  }

  const rawHTML = response?.description;
  const productsRegrex = /\[product_ids=([\s\S]*?)\]/gm;
  let match;
  let refinedHTML = rawHTML;
  const shortcodes = [];
  let shortcodeIdx = 0;
  // eslint-disable-next-line no-cond-assign
  while (match = productsRegrex.exec(rawHTML)) {
    const shortcode = match[0];
    shortcodes.push(shortcode);

    // replace shortcode by div container
    // then, render shortcode to container in client side
    refinedHTML = refinedHTML.replace(shortcode, `<div id="js-shorcode-${shortcodeIdx}"></div>`);
    shortcodeIdx++;
  }

  return {
    props: {
      article: {
        ...response,
      },
      shortcodes,
      refinedHTML,
    },
  };
}
