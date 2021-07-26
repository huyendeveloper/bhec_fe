import url from 'url';
import querystring from 'querystring';

import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
const maxAge = 120;

const useStyles = makeStyles((theme) => ({
  loginMethod: {
    background: theme.line.background,
    border: `1px solid ${theme.palette.border.default}`,
    boxSizing: 'border-box',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  labelLogin: {
    fontFamily: 'Roboto',
    marginLeft: '2rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
    position: 'relative',
    color: theme.palette.white.main,
  },

}));

const LineLogin = ({
  clientID,
  clientSecret,
  state,
  nonce,
  scope,
  setPayload,
  setIdToken,
  redirectURI,
}) => {
  const classes = useStyles();
  const lineLogin = () => {
    const query = querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      state,
      scope,
      nonce,
      prompt: 'consent',
      max_age: maxAge,
      bot_prompt: 'normal',
    });
    const lineAuthoriseURL =
      'https://access.line.me/oauth2/v2.1/authorize?' +
      query +
      '&redirect_uri=' +
      redirectURI;
    window.location.href = lineAuthoriseURL;
  };

  const getAccessToken = (callbackURL) => {
    const urlParts = url.parse(callbackURL, true);
    const query = urlParts.query;
    const hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
    if (hasCodeProperty) {
      const reqBody = {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: redirectURI,
        client_id: clientID,
        client_secret: clientSecret,
      };
      const reqConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      axios.post(
        'https://api.line.me/oauth2/v2.1/token',
        qs.stringify(reqBody),
        reqConfig,
      ).then((res) => {
        if (setPayload) {
          setPayload(res.data);
        }

        try {
          const decodedIdToken = jwt.verify(res.data.id_token, clientSecret, {
            algorithms: ['HS256'],
            audience: clientID.toString(),
            issuer: 'https://access.line.me',
            nonce,
          });

          if (setIdToken) {
            setIdToken(decodedIdToken);
          }
        } catch (err) {
          // If token is invalid.
        }
      }).catch(() => {
        return false;
      });
    }
  };

  useEffect(() => {
    getAccessToken(window.location.href);
  });

  return (
    <div>
      <div
        className={classes.loginMethod}
        onClick={() => lineLogin()}
      >
        <Image
          src='/line2.png'
          width='32'
          height='32'
          alt=''
        />
        <div
          className={classes.labelLogin}
        >{'LINEで会員登録'}</div>
      </div>
    </div>
  );
};

LineLogin.propTypes = {
  clientID: PropTypes.string,
  clientSecret: PropTypes.string,
  state: PropTypes.string,
  nonce: PropTypes.string,
  scope: PropTypes.string,
  setPayload: PropTypes.any,
  setIdToken: PropTypes.any,
  redirectURI: PropTypes.string,
};

export default LineLogin;
