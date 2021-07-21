import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box} from '@material-ui/core';

const Accordion = withStyles({
  root: {
    border: '1px solid #dbdbdb',
    marginBottom: '1rem',
    boxShadow: 'none',
    borderRadius: 4,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      marginBottom: '1rem',
      borderColor: '#eee0b5',
    },
    '& .MuiAccordionSummary-expandIcon': {
      background: 'url("/img/icons/arrow-right.png") center no-repeat',
      backgroundSize: '11.4px 20px',
      transform: 'none',
      marginRight: -10,
      '& .MuiIconButton-label': {
        opacity: 0,
      },
      '&.Mui-expanded': {
        backgroundImage: 'url("/img/icons/arrow-down-white.png")',
        backgroundSize: '20px 11.4px',
      },
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
  },
  content: {
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      color: '#444',
      paddingLeft: '0.5rem',
    },
    '&$expanded': {
      margin: '12px 0',
      '& .MuiTypography-root': {
        color: '#fff',
      },
    },
  },
  expanded: {
    borderRadius: '4px 4px 0 0',
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3.75, 3),
    '& .faq-answer p': {
      marginTop: 0,
      marginBottom: '0.5rem',
    },
    '& .faq-answer p:last-child': {
      marginBottom: 0,
    },
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div[class*="-expanded"]': {
      '& .MuiAccordionSummary-root': {
        backgroundColor: theme.palette.red.main,
        minHeight: '3rem',
        color: '#fff',
        '& .MuiIconButton-root': {
          color: '#fff',
        },
      },
    },
  },
}));

const FaqsWidget = ({data}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel_1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data && data.length > 0 ? data.map((faq) => {
        const formattedAnswer = faq.answer ? faq.answer.split('\n').
          map((str, index) => (
            <p
              key={String(index)}
            >{index === 0 ? 'A.' + str : str}</p>)) : null;

        return (
          <Accordion
            key={faq.id}
            square={true}
            expanded={expanded === `panel_${faq.id}`}
            onChange={handleChange(`panel_${faq.id}`)}
          >
            <AccordionSummary
              aria-controls={`panel${faq.id}d-content`}
              id={`panel${faq.id}d-header`}
              expandIcon={<ExpandMoreIcon/>}
            >
              <Typography>{`Q.${faq.question}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className='faq-answer'>
                {formattedAnswer}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      }) : null}
    </div>
  );
};

FaqsWidget.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FaqsWidget;
