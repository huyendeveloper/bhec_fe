import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: '1rem',
    boxShadow: 'none',
    borderRadius: 8,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      marginBottom: '1rem',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {
    borderRadius: '8px 8px 0 0',
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
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
      {data && data.length > 0 ? data.map((faq) => (
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
            <Typography>
              {`A.${faq.answer}`}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )) : null}
    </div>
  );
};

FaqsWidget.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FaqsWidget;
