import {Grid, Container, InputBase, Paper, Button, Chip, Breadcrumbs as MuiBreadcrumbs, Typography, Link} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import SearchIcon from '@material-ui/icons/Search';

import {articleDetail} from '~/mock/article';
import {Header, Footer, ContentBlock} from '~/components';
import {ArticleDetail, ArticleDetailProduct} from '~/components/Article';
import {ArticleWidget, ProductWidget, TopBannerWidget} from '~/components/Widgets';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 0',
  },

  title: {
    fontSize: '2rem',
    lineHeight: '3rem',
    fontWeight: 'bold',
    margin: '1rem 0',
  },

  label: {
    fontSize: '1rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
  },

  titleStyle: {
    margin: 0,
  },
  chipItem: {
    borderRadius: 'unset',
    marginRight: '1rem',
    background: theme.chipItem.borderColor,
    color: 'white',
  },

  articleImage: {
    width: '100%',
  },
  paper: {
    padding: '0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  breadcrumbs: {
    alignItems: 'center',
    display: 'flex',
    height: '3.375rem',
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.black.main,
      fontWeight: 'bold',
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
    },
  },
  link: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
  },

  tagHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },

  divChip: {
    marginBottom: '1rem',
  },

  dateArticle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: '19px',
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '1.5rem',
  },
  contentArticle: {
    padding: '1rem 0 2rem 0',
    width: '80%',
    borderBottom: `1px solid ${theme.blockContact.borderColor}`,
  },
}));

const linkProps = [
  {
    id: 1,
    linkLabel: 'ホーム',
    linkUrl: '/',
  },
  {
    id: 2,
    linkLabel: '記事一覧',
    linkUrl: '/article',
  },
  {
    id: 3,
    linkLabel: '記事詳細',
    linkUrl: '/article',
  },
];

function generateBlog(article) {
  if (article) {
    if (article.blogType === 1) {
      return article.blogs.map((blog) =>
        (
          <ArticleDetail
            {...blog}
            key='column'
          />
        ),
      );
    }
    return article.blogs.map((blog) =>
      (
        <ArticleDetailProduct
          {...blog}
          key='row'
        />
      ),
    );
  }

  return article.blogs.map((blog) =>
    (
      <ArticleDetail
        {...blog}
        key='row'
      />
    ),
  );
}

function generateRelated(article) {
  if (article && article.related && article.related.length) {
    if (article.blogType === 1) {
      return article.related.map((r) =>
        (
          <Grid
            item={true}
            xs={6}
            sm={4}
            md={4}
            key={article.id}
          >
            <ArticleWidget
              article={r}
            />
          </Grid>
        ),
      );
    }
  }
  return article.related.map((r) =>
    (
      <Grid
        item={true}
        xs={6}
        sm={4}
        md={4}
        key={r.id}
      >
        <ProductWidget
          data={r}
          heart={true}
        />
      </Grid>
    ),
  );
}

function ArticleDetailPage() {
  const classes = useStyles();
  const [article, setArticle] = useState();

  useEffect(() => {
    // console.log(articleDetail);
    setArticle(articleDetail);
  }, []);

  return (
    <>
      <section className={classes.root}>

        <Header showMainMenu={false}/>
        <div
          className='content'
          style={{marginBottom: '3rem'}}
        >
          <Container>
            <Grid
              container={true}
              spacing={3}
              justifyContent='center'
              maxWidth={'lg'}
            >
              <Grid
                item={true}
                xs={12}
              >
                <MuiBreadcrumbs
                  className={classes.breadcrumbs}
                  separator={'＞'}
                >
                  {linkProps.map((item) => (
                    item.linkUrl ? (
                      <Link
                        key={item.id}
                        className={classes.link}
                        href={item.linkUrl}
                      >
                        {item.linkLabel}
                      </Link>
                    ) : (
                      <Typography
                        key={item.id}
                        className={classes.link}
                      >
                        {item.linkLabel}
                      </Typography>
                    )
                  ))}
                </MuiBreadcrumbs>
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <Paper
                  component='form'
                  className={classes.paper}
                >
                  <SearchIcon style={{marginLeft: '1rem'}}/>
                  <InputBase
                    className={classes.input}
                    placeholder='検索キーワードを入力してください'
                    inputProps={{'aria-label': 'search'}}
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    type='submit'
                    size='large'
                  >
                    {'検索'}
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <ContentBlock
            title='『大好評』小田原漆器についてご紹いてご紹介しています。'
          >
            <Grid
              container={true}
              justifyContent='center'
              className={classes.tagHeader}
            >
              <Grid
                item={true}
                xs={12}
                className={classes.divChip}
              >
                <Chip
                  label='送料無料'
                  className={classes.chipItem}
                />
                <Chip
                  label='農薬節約栽培'
                  className={classes.chipItem}
                />
                <Chip
                  label='期間限定'
                  className={classes.chipItem}
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <div className={classes.dateArticle}>{'2021/02/17'}</div>
              </Grid>
            </Grid>
            <Grid
              container={true}
              spacing={3}
              justifyContent='center'
            >
              <Grid
                item={true}
                xs={12}
              >
                <Image
                  className={classes.articleImage}
                  width={946}
                  height={544}
                  src='/img/article/article_detail_banner.png'
                  alt='support'
                  layout='responsive'
                />
              </Grid>
              <div className={classes.contentArticle}>
                <Grid
                  item={true}
                  xs={12}
                >
                  <span lassName={classes.description}>{'株式会社Branding House（以下「当社」という）は、ユーザーおよび当社に関係する皆様からお預かりする個人情報を厳格に保護し、適切に取扱うことが当社運営上の重要課題であると認識しております。ユーザーが、当社の運営するウェブサイト「OSHINAGAKI」（以下「本サービス」）という）を利用した場合、下記のプライバシーポリシーに同意されたものとみなします。当社は、個人情報の保護に適用される法令、ガイドラインおよびその他の規範を遵守するとともに、個人情報保護方針を定めその保護に努めます。'}</span>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  {article && generateBlog(article)}
                </Grid>
              </div>
              <Grid
                item={true}
                xs={12}
              >
                {article &&
                  <ContentBlock
                    title={article.blogType === 1 ? '関連の記事' : '関連の商品'}
                    key={article.id}
                  >
                    <Grid
                      container={true}
                      spacing={3}
                      justifyContent='center'
                    >
                      {article && article.related.length && generateRelated(article)}
                    </Grid>
                  </ContentBlock>
                }
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <TopBannerWidget
                  imgSrc='/img/article/banner.png'
                  imgAlt='Article Banner'
                  imgWidth={1140}
                  imgHeight={192}
                />
              </Grid>
            </Grid>
          </ContentBlock>
        </div>
        <Footer/>
      </section>
    </>
  );
}

export default ArticleDetailPage;
