import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.yellow.main}`,
    borderRadius: '4px',
    padding: '2rem 1.5rem',
  },
  specList: {
    margin: 0,
    paddingLeft: '2rem',
  },
  specListItem: {
    fontSize: '1.25rem',
    lineHeight: '2.25rem',
    '&:not(:last-child)': {
      marginBottom: '0.5rem',
    },
  },
}));

const SpecificationsWidget = ({specs}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {specs && specs.length > 0 ? (
        <ul className={classes.specList}>
          {specs.map((item, index) => {
            return (
              <li
                key={`spec_${String(index)}`}
                className={classes.specListItem}
              >
                {item}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

SpecificationsWidget.propTypes = {
  specs: PropTypes.array.isRequired,
};

SpecificationsWidget.defaultProps = {
  specs: [],
};

export default SpecificationsWidget;
