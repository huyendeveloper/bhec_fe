import {Link} from '@material-ui/core';
import Image from 'next/image';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
    '& > a:not(:last-child)': {
      marginRight: '1.375rem',
    },
  },
}));

const SnsWidget = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href={'#'}>
        <Image
          src={'/img/icons/facebook.png'}
          width={48}
          height={48}
          alt={'Facebook Fanpage'}
        />
      </Link>
      <Link href={'#'}>
        <Image
          src={'/img/icons/twitter.png'}
          width={48}
          height={48}
          alt={'Twitter'}
        />
      </Link>
      <Link href={'#'}>
        <Image
          src={'/img/icons/instagram.png'}
          width={48}
          height={48}
          alt={'Instagram'}
        />
      </Link>
    </div>
  );
};

export default SnsWidget;
