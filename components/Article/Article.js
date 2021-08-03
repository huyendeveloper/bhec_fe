import React from 'react';
import PropTypes from 'prop-types';
import {Box, Link, useMediaQuery, useTheme} from '@material-ui/core';
import Image from 'next/image';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    color: '#444444',
    paddingTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
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
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.188rem',
      },
      '& span': {
        position: 'relative',
        top: '4px',
      },
    },
  },
}));

const Article = ({data}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        component='div'
        m={isTablet ? 1 : 2}
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
