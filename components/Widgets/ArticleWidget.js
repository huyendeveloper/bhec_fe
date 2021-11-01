import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    marginBottom: '1rem',
    height: '100%',

    '& .MuiCardActionArea-root': {
      height: '100%',
    },
  },
  articelName: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    marginBottom: '0.75rem',
  },
}));

const ArticleWidget = ({article}) => {
  const classes = useStyles();
  if (!article) {
    return null;
  }

  return (
    <Card className={clsx(classes.root)}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={article.title}
          height='160'
          image={article.image_url}
          title={article.title}
        />
        <CardContent>
          <Typography
            gutterBottom={true}
            component='h3'
            className={classes.articelName}
          >
            {article.title}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ArticleWidget.propTypes = {
  article: PropTypes.object.isRequired,
};

ArticleWidget.defaultProps = {
  variant: 'simple',
  heart: false,
  border: null,
};

export default ArticleWidget;
