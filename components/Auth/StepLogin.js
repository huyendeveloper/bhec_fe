import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stepForm: {
    fontFamily: theme.font.default,
    width: '56%',
    margin: '0 22%',
    background: theme.palette.grey.light,
    border: `1px solid ${theme.palette.border.default}`,
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '2rem 3rem',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '0 5%',
      padding: '1rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
      padding: '1rem',
    },
  },

  titleStep: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },

  divStep: {
    display: 'flex',
    width: '100%',
  },

  stepItem: {
    flex: 1,
    position: 'relative',
  },

  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icStep: {
    background: theme.palette.background.default,
    boxSizing: 'border-box',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    marginBottom: '1rem',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    lineHeight: '2.15rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '2rem',
      height: '2rem',
      fontSize: '1rem',
    },
  },

  icStep1: {
    border: `2px solid ${theme.step.one.color}`,
    color: theme.step.one.color,
  },

  icStep2: {
    border: `2px solid ${theme.step.two.color}`,
    color: theme.step.two.color,
  },
  icStep3: {
    border: `2px solid ${theme.step.three.color}`,
    color: theme.step.three.color,
  },
  stepLabel: {
    width: '60%',
    margin: '0 20%',
    textAlign: 'center',
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      lineHeight: '1rem',
      fontSize: '0.75rem',
      width: '90%',
      margin: '0 10%',
    },
    [theme.breakpoints.down('md')]: {
      lineHeight: '1rem',
      fontSize: '0.75rem',
      width: '90%',
      margin: '0 10%',
    },
  },

  divider: {
    top: '1.5rem',
    left: 'calc(-50% + 1.7rem)',
    position: 'absolute',
    border: `1px dashed ${theme.divider.dashCorlor}`,
    transform: 'rotate(0.02deg)',
    width: 'calc(100% - 3.4rem)',
    [theme.breakpoints.down('sm')]: {
      top: '1rem',
      left: 'calc(-50% + 1rem)',
      width: 'calc(100% - 2rem)',
    },
  },

}));

const StepLogin = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.stepForm}>
        <div className={classes.titleStep}>{'３STEPでカンタン登録'}</div>
        <div className={classes.divStep}>
          <div className={classes.stepItem}>
            <div className={classes.stepContent}>
              <div
                className={classes.icStep + ' ' + classes.icStep1}
              >{'1'}</div>
              <div className={classes.stepLabel}>{'会員登録方法選択情報入力'}</div>
            </div>
          </div>
          <div className={classes.stepItem}>
            <div className={classes.divider}/>
            <div className={classes.stepContent}>
              <div className={classes.icStep + ' ' + classes.icStep2}>{'2'}</div>
              <div className={classes.stepLabel}>{'メールアドレス承認'}</div>
            </div>
          </div>
          <div className={classes.stepItem}>
            <div className={classes.divider}/>
            <div className={classes.stepContent}>
              <div className={classes.icStep + ' ' + classes.icStep3}>{'3'}</div>
              <div className={classes.stepLabel}>{'登録完了'}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepLogin;