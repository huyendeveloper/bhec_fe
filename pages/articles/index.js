import {Grid, Container, InputBase, Paper, Button, Breadcrumbs as MuiBreadcrumbs, Typography, Link} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Header, Footer, ContentBlock} from '~/components';
import {ArticleItem} from '~/components/Article';
import {listArticle} from '~/mock/article';
import {TopBannerWidget} from '~/components/Widgets';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 0',
  },

  title: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3rem',
    position: 'relative',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
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
];

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setArticles(listArticle);
  }, []);

  const ArticleList = articles.map((article) =>
    (
      <ArticleItem
        {...article}
        key={article.id}
      />
    ),
  );

  return (
    <div className={classes.root}>
      <Header showMainMenu={false}/>
      <div className='content'>
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
          title='よくある質問'
        >
          <Grid
            container={true}
            spacing={3}
            justifyContent='center'
          >
            {ArticleList}
            <Grid
              item={true}
              xs={12}
              sm={6}
              md={4}
            />
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
    </div>
  );
}

export default ArticlePage;
