import {Box, Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import {
  Breadcrumbs, ContentBlock, Search,
} from '~/components';
import {ArticleItem} from '~/components/Article';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget} from '~/components/Widgets';
import {ArticleService} from '~/services';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'url(/img/noise.png)',
  },
  container: {
    width: '100%',
    paddingBottom: '0.125rem',
  },
  topContainer: {
    paddingTop: '1.625rem',
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem 0',
    [theme.breakpoints.down('md')]: {
      margin: '1.5rem 0',
    },
    '& .MuiButtonBase-root': {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '1px solid ' + theme.palette.grey.dark,
      margin: '0 0.5rem',
      background: theme.palette.white.main,
      fontWeight: '700',
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      '&:hover': {
        background: theme.palette.red.main,
        borderColor: theme.palette.red.main,
        color: theme.palette.white.main,
      },
      [theme.breakpoints.down('md')]: {
        width: '2.5rem',
        height: '2.5rem',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
      },
    },
    '& .Mui-selected': {
      background: theme.palette.red.main,
      borderColor: theme.palette.red.main,
      color: theme.palette.white.main,
    },
  },
}));

const ArticleNotFound = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
    >
      <Box
        component='h5'
        textAlign='center'
        p={1}
        fontSize={16}
      >
        {'該当する記事ありません'}
      </Box>
    </Box>);
};

const ArchiveArticle = ({articles, pages}) => {
  const classes = useStyles();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pages);

  useEffect(() => {
    return () => {
      // return an anonymous clean up function
    };
  }, [currentPage]);

  const linkProps = [
    {
      id: 1,
      linkLabel: 'ホーム',
      linkUrl: '/',
    },
  ];

  const changePage = (e, pageNumber) => {
    setCurrentPage(pageNumber);
    router.push({
      pathname: '/articles',
      query: {...router.query, page: pageNumber},
    });
  };

  return (
    <DefaultLayout title={'記事一覧'}>
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
        title={'記事一覧'}
        bgImage={'/img/noise.png'}
        bgRepeat={'repeat'}
        padding={'0'}
      >

        {articles?.length > 0 ? articles?.map((article) => (
          <ArticleItem
            item={article}
            key={`article-${article.id}`}
          />
        )) : <ArticleNotFound/>}

        {articles?.length > 0 && pages > 0 &&
          <Pagination
            count={pages}
            variant={'outlined'}
            color={'primary'}
            size={'large'}
            defaultPage={1}
            onChange={changePage}
            className={classes.pagination}
          />
        }
        <AdsWidget
          imgSrc={'/img/ad/ad5.png'}
          imgWidth={'1140'}
          imgHeight={'192'}
        />
      </ContentBlock>
    </DefaultLayout>
  );
};

export default ArchiveArticle;

ArchiveArticle.propTypes = {
  articles: PropTypes.array.isRequired,
  pages: PropTypes.number,
};

ArchiveArticle.defaultProps = {
  articles: [],
  pages: 0,
};

export async function getServerSideProps({query}) {
  const queryParams = {...query, per_page: 10};
  const response = await ArticleService.getArticles(queryParams);

  return {
    props: {
      articles: response?.data,
      pages: response?.total_pages,
    },
  };
}
