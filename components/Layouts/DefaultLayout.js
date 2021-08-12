import Head from 'next/head';

import {makeStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import {Footer, Header} from '~/components';

const useStyles = makeStyles(() => ({
  root: {
    '& .next-link': {
      textDecoration: 'none',
    },
  },
}));

const DefaultLayout = ({title, metaDescription, children}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={metaDescription}
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className='content'>
        {children}
      </div>

      <Footer/>
    </div>
  );
};

DefaultLayout.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  children: PropTypes.any,
};

export default DefaultLayout;
