import {makeStyles} from '@material-ui/core/styles';
import {Grid, Chip, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({

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
    borderRadius: '4px',
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
  },

  description: {
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
}));

const ArticleItem = ({id, image, title, tags = [], description}) => {
  const classes = useStyles();

  function toDetailPage(article_id) {
    Router.push({
      pathname: `/article/${article_id}`,
    });
  }

  return (
    <>
      <Grid
        item={true}
        xs={12}
        sm={4}
        md={4}
        key={`article-left-${id}`}
      >
        <div>
          <Image
            className={classes.articleImage}
            src={image}
            width={364}
            height={208}
            alt='support'
            onClick={() => toDetailPage(id)}
          />
        </div>
      </Grid>
      <Grid
        item={true}
        xs={12}
        sm={8}
        md={8}
        key={`article-right-${id}`}
      >
        <div justify='left'>
          <Typography
            variant={'h3'}
            className={classes.articleLabel}
            onClick={() => toDetailPage(id)}
          >{title}</Typography>
          <div className={classes.chipList}>
            {tags.map((tag) => {
              return (
                <>
                  <Chip
                    key={`${tag}-${id}`}
                    label={tag}
                    className={classes.chipItem}
                    onClick={() => toDetailPage(id)}
                  />
                </>
              );
            })}
          </div>
          <div className={classes.description}>{description}</div>
          <div className={classes.seeMore}>
            <span className={classes.text}>{'もっと見る'}</span>
            {'>'}
          </div>
        </div>
      </Grid>
    </>
  );
};

ArticleItem.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.array,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ArticleItem;
