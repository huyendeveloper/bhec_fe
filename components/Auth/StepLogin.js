import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stepForm: {
    fontFamily: theme.font.default,
    width: '56%',
    margin: '0 22%',
    background: theme.palette.gray.light,
    border: `1px solid ${theme.palette.border.default}`,
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '2rem 3rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '93.8%',
      margin: '0 3.1%',
      padding: '1rem',
      height: '12rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
      padding: '1rem',
    },
  },

  titleStep: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '1.5rem',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },

  divStep: {
    display: 'flex',
    width: '100%',
  },

  stepItem: {
    flex: 1,
    width: '33%',
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
    fontWeight: '700',
    fontSize: '1.4rem',
    lineHeight: '2.15rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '2.5rem',
      height: '2.5rem',
      fontSize: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '2rem',
      height: '2rem',
      fontSize: '0.875rem',
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
    width: '8.4rem',
    margin: '0 20%',
    textAlign: 'center',
    color: theme.palette.black4.main,
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    [theme.breakpoints.down('md')]: {
      lineHeight: '1rem',
      fontSize: '0.8125rem',
      width: '6.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: '1rem',
      fontSize: '0.6875rem',
      width: '90%',
      margin: '0 10%',
    },
  },

  stepLabel2: {
    width: '7.25rem',
    [theme.breakpoints.down('md')]: {
      lineHeight: '1rem',
      fontSize: '0.8125rem',
      width: '5.6875rem',
    },
  },

  divider: {
    top: '1.5rem',
    left: 'calc(-50% + 1.7rem)',
    position: 'absolute',
    border: `2px dashed ${theme.divider.dashCorlor}`,
    transform: 'rotate(0.02deg)',
    width: 'calc(100% - 3.4rem)',
    [theme.breakpoints.down('md')]: {
      top: '1.25rem',
      left: 'calc(-50% + 1.25rem)',
      width: 'calc(100% - 2.5rem)',
    },
    [theme.breakpoints.down('xs')]: {
      top: '1rem',
      left: 'calc(-50% + 1.2rem)',
      width: 'calc(100% - 2.4rem)',
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
              <div className={classes.stepLabel + ' ' + classes.stepLabel2}>{'メールアドレス承認'}</div>
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