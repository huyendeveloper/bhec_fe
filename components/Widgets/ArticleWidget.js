import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {
  useMediaQuery,
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '1rem',
    height: '100%',

    '& .MuiCardActionArea-root': {
      height: '100%',
    },
  },
  articelName: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
    },
  },
}));

const ArticleWidget = ({article}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  if (!article) {
    return null;
  }

  return (
    <Card className={clsx(classes.root)}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={article.title}
          height={isMobile ? 200 : isTablet ? 128 : 208}
          width={isMobile ? 343 : isTablet ? 224 : 364}
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
