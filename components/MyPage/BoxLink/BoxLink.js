import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey.main,
    display: 'flex',
    height: '11.313rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.black.main,
    marginBottom: '3.625rem',
    '& .content': {
      marginTop: '1.5rem',
    },
  },
}));

const BoxLink = ({link}) => {
  const classes = useStyles();

  return (
    <Link href={link.url}>
      <a className={classes.root}>
        <Image
          src={link.image}
          width={26.92}
          height={25.5}
          alt={'icon'}
        />

        <div className='content'>
          {link.content}
        </div>
      </a>
    </Link>
  );
};

BoxLink.propTypes = {
  link: PropTypes.object,
};

export default BoxLink;
