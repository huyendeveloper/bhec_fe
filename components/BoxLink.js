import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.pink.light,
    display: 'flex',
    height: '12rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.black.default,
    marginBottom: '2rem',
    borderRadius: '0.25rem',
    '& .content': {
      marginTop: '1rem',
      lineHeight: '2.25rem',
    },
  },
}));

const BoxLink = ({link, colorLabel}) => {
  const classes = useStyles();

  return (
    <Link href={link.url}>
      <a className={classes.root}>
        <Image
          src={link.image}
          width={48}
          height={48}
          alt={'icon'}
        />

        <div
          className='content'
          style={{color: colorLabel}}
        >
          {link.content}
        </div>
      </a>
    </Link>
  );
};

BoxLink.propTypes = {
  link: PropTypes.object,
  colorLabel: PropTypes.string,
};

BoxLink.defaultProps = {
  colorLabel: '#000000',
};

export default BoxLink;
