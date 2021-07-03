import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 0',
  },
  title: {
    fontSize: '2rem',
    lineHeight: '3rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '3rem',
    position: 'relative',
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
  },
  description: {
    fontSize: '1.5rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginBottom: '2rem',
    '& p': {
      margin: 0,
    },
  },
}));

const ContentBlock = ({title, description, bgColor, bgImage, bgRepeat, mixBlendMode, children}) => {
  const classes = useStyles();
  const newDesc = description ? description.split('\n').
    map((str, index) => (
      <p
        key={index}
      >{str}</p>)) : null;

  return (
    <section
      className={classes.root}
      style={{
        backgroundColor: bgColor || '#fff',
        backgroundRepeat: bgRepeat || 'no-repeat',
        backgroundImage: bgImage && bgImage !== '' ? `url("${bgImage}")` : 'none',
        mixBlendMode: mixBlendMode || 'unset',
      }}
    >
      <Container>
        {title && title !== '' ? (
          <div className={classes.title}>
            <Typography variant={'h2'}>{title}</Typography>
          </div>
        ) : null}

        {description && description !== '' ? (
          <div className={classes.description}>
            {newDesc}
          </div>
        ) : null}

        <div className={classes.content}>
          {children}
        </div>
      </Container>
    </section>
  );
};

ContentBlock.propTypes = {
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  bgRepeat: PropTypes.string,
  mixBlendMode: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.element,
};

export default ContentBlock;
