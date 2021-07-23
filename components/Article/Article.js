import React from 'react';
import PropTypes from 'prop-types';
import {Box, Link} from '@material-ui/core';
import Image from 'next/image';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: '#333333',
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    color: '#444444',
    paddingTop: '1rem',
  },
  link: {
    paddingTop: '0.5rem',
    '& a': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      color: '#333333',
      textDecoration: 'underline',
      '& span': {
        position: 'relative',
        top: '4px',
      },
    },
  },
}));

const Article = ({data}) => {
  const classes = useStyles();
  return (
    <>
      <Box
        component='div'
        m={2}
      >
        <div className={classes.title}>{data.title}</div>
        <div className={classes.description}>{data.description}</div>
        <div className={classes.link}>
          <Link
            href={'#'}
          >
            {'続きを見る'}
            <span>
              <Image
                src={'/img/icons/arrow_right.svg'}
                layout={'intrinsic'}
                width={16}
                height={16}
                alt={'arrow right'}
              />
            </span>

          </Link>
        </div>
      </Box>
    </>
  );
};

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Article;
