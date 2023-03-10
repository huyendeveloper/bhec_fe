import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem 0 1rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem 0 1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 1.5rem',
    },
  },
  title: {
    textAlign: 'center',
    paddingTop: '3rem',
    marginBottom: '3rem',
    position: 'relative',
    '& h2': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      width: '3.5rem',
      height: '2px',
      left: 0,
      right: 0,
      margin: '0 auto',
      backgroundColor: theme.palette.red.main,
      bottom: '-0.875rem',
    },
    [theme.breakpoints.down('sm')]: {
      '& h2': {
        fontSize: '1.5rem',
        lineHeight: '2.5rem',
      },
    },
  },
  category: {
    textAlign: 'left',
    marginBottom: '1rem',
    position: 'relative',
    '& h4': {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 'bold',
      borderLeft: '5px solid #BA2636',
      borderRadius: '0.125rem',
      borderWidth: '0.5rem',
      paddingLeft: '1rem',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      '& h4': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
  },
  linkName: {
    color: theme.palette.black.light,
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const CategoryBlock = ({title, category, categoryLink, bgColor, bgImage, bgRepeat, mixBlendMode, children, padding}) => {
  const classes = useStyles();

  return (
    <section
      className={classes.root}
      style={{
        backgroundColor: bgColor || '#fff',
        backgroundRepeat: bgRepeat || 'no-repeat',
        backgroundImage: bgImage && bgImage !== '' ? `url("${bgImage}")` : 'none',
        mixBlendMode: mixBlendMode || 'unset',
        padding,
      }}
    >
      <Container>
        {title && title !== '' ? (
          <div className={classes.title}>
            <Typography variant={'h2'}>{title}</Typography>
          </div>
        ) : null}
        {category && category !== '' ? (
          <Link
            href={`/products?category=${categoryLink}`}
            className={classes.linkName}
            passHref={true}
          >
            <div className={classes.category}>
              <Typography variant={'h4'}>{category}</Typography>
            </div>
          </Link>
        ) : null}

        <div className={classes.content}>
          {children}
        </div>
      </Container>
    </section>
  );
};

CategoryBlock.propTypes = {
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  bgRepeat: PropTypes.string,
  mixBlendMode: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  categoryLink: PropTypes.string,
  children: PropTypes.any,
  padding: PropTypes.string,
};

export default CategoryBlock;
