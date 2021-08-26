import {Link} from '@material-ui/core';
import Image from 'next/image';
import {makeStyles, useTheme} from '@material-ui/core/styles';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
    '& > a:not(:last-child)': {
      marginRight: '1.375rem',
    },

    '& .MuiLink-root': {
      display: 'inline-block',
    },
  },
}));

const SnsWidget = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = theme.breakpoints.down('sm');
  const imgSize = isTablet ? 48 : 44;
  return (
    <div className={classes.root}>
      <Link href={'https://www.facebook.com/oshinagaki.store'}>
        <Image
          src={'/img/icons/facebook.png'}
          width={imgSize}
          height={imgSize}
          alt={'Facebook Fanpage'}
        />
      </Link>
      <Link href={'https://twitter.com/OshinagakiStore'}>
        <Image
          src={'/img/icons/twitter.png'}
          width={imgSize}
          height={imgSize}
          alt={'Twitter'}
        />
      </Link>
      <Link href={'https://www.instagram.com/oshinagaki_store/'}>
        <Image
          src={'/img/icons/instagram.png'}
          width={imgSize}
          height={imgSize}
          alt={'Instagram'}
        />
      </Link>
    </div>
  );
};

export default SnsWidget;
