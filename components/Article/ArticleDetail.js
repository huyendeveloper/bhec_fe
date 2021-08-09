import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';

const useStyles = makeStyles(() => ({

  titleStyle: {
    fontSize: '1rem',
    lineHeight: '2.5rem',
    fontWeight: 'bold',
  },

  blogImageColumn: {
    width: '60%',
    height: 'auto',
    marginTop: '1rem',
  },

  gridImage: {
    textAlign: 'center',
    marginTop: '1rem',
  },

  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    lineHeight: '1.5rem',
    marginTop: '1rem',
  },

}));

const ArticleDetail = ({image, description}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container={true}
        xs={12}
        justifyContent='center'
      >
        <Grid
          item={true}
          xs={12}
          className={classes.gridImage}
        >
          <Image
            className={classes.blogImageColumn}
            src={image}
            width={704}
            height={418}
            alt='support'
            layout='responsive'
          />
        </Grid>
        <Grid
          item={true}
          xs={12}
          className={classes.grid}
        >
          <div className={classes.description}>{description}
          </div>
        </Grid>
      </Grid>

    </>
  );
};

ArticleDetail.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string,
};

export default ArticleDetail;
