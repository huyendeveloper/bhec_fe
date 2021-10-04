import {makeStyles} from '@material-ui/core/styles';
import {Grid, Chip, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  articleLabel: {
    fontSize: '1rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  chipList: {
    marginBottom: '1rem',
  },

  chipItem: {
    marginRight: '1rem',
    background: theme.chipItem.borderColor,
    color: theme.palette.background.default,
    borderRadius: 2,
    height: 16,
    fontSize: 10,
    fontWeight: 'bold',
  },

  articleImage: {
    cursor: 'pointer',
  },

  cursor: {
    cursor: 'pointer',
  },

  seeMore: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '1.25rem',
    color: theme.palette.buttonLogin.default,
    marginTop: '1rem',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.75rem',
    },
  },

  introduction: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '1.25rem',
  },

  text: {
    textDecorationLine: 'underline',
    marginRight: '0.25rem',
  },
  articleRight: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.75rem',
      paddingTop: '0 !important',
    },
  },
}));

const ArticleItem = ({item}) => {
  const classes = useStyles();
  const router = useRouter();

  const toDetailPage = (article_id) => {
    router.push(`/articles/${article_id}`);
  };

  const toArchivePage = (tag) => {
    router.push(`/articles?tag=${tag}`);
  };

  return (
    <Grid
      container={true}
      className={classes.root}
      spacing={3}
    >
      <Grid
        item={true}
        xs={12}
        sm={4}
        md={4}
        key={`article-left-${item?.id}`}
      >
        <div>
          <Image
            className={classes.articleImage}
            src={item.image_url ?? '/logo.png'}
            width={364}
            height={208}
            alt={item?.title}
            objectFit={item.image_url ? 'fill' : 'contain'}
            onClick={() => toDetailPage(item?.id)}
          />
        </div>
      </Grid>
      <Grid
        item={true}
        xs={12}
        sm={8}
        md={8}
        key={`article-right-${item?.id}`}
        className={classes.articleRight}
      >
        <div justifyContent='left'>
          <Typography
            variant={'h3'}
            className={classes.articleLabel}
            onClick={() => toDetailPage(item?.id)}
          >{item?.title}</Typography>
          {item.tags.length ? <div className={classes.chipList}>
            {item.tags?.map((tag) => {
              return (
                <>
                  <Chip
                    key={`${tag}-${item?.id}`}
                    label={tag?.name}
                    className={classes.chipItem}
                    onClick={() => toArchivePage(tag?.name_kana)}
                  />
                </>
              );
            })}
          </div> : null }
          <div className={classes.introduction}>{item?.introduction}</div>
          <div
            className={classes.seeMore}
            onClick={() => toDetailPage(item?.id)}
          >
            <span className={classes.text}>{'もっと見る'}</span>
            {'>'}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

ArticleItem.propTypes = {
  item: PropTypes.object,
};

export default ArticleItem;
