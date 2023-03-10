import url from 'url';
import querystring from 'querystring';

import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import {signIn} from 'next-auth/client';
import produce from 'immer';
import {useSetRecoilState} from 'recoil';

import {httpStatus} from '~/constants';
import {userState} from '~/store/userState';
import {loadingState} from '~/store/loadingState';
import {AuthService} from '~/services';
const Auth = new AuthService();
const maxAge = 120;

const useStyles = makeStyles((theme) => ({
  loginMethod: {
    background: theme.line.background,
    border: `1px solid ${theme.palette.border.default}`,
    boxSizing: 'border-box',
    padding: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '2.5rem',
  },

  labelLogin: {
    fontFamily: 'Roboto',
    marginLeft: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    textAlign: 'center',
    fontWeight: '700',
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
  login,
}) => {
  const classes = useStyles();
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
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
      setLoading(true);
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
      ).then(async (res) => {
        if (res.status === httpStatus.SUCCESS) {
          const result = await Auth.loginBySNS({
            type: 'line',
            id_token: res.data.id_token,
            client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
          });
          if (result && result.access_token) {
            setUser(produce((draft) => {
              draft.isAuthenticated = true;
            }));
            await signIn('credentials',
              {
                data: result,
                token: result.access_token,
                callbackUrl: `${window.location.origin}`,
              },
            );
            setLoading(false);
          }
        }
        if (setPayload) {
          setPayload(res.data);
        }

        try {
          setLoading(false);
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
          setLoading(false);
        }
      }).catch(() => {
        setLoading(false);
        return false;
      });
    }
  };

  useEffect(() => {
    getAccessToken(window.location.href);
  }, []);

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
        >{login ? 'LINE???????????????' : 'LINE???????????????'}</div>
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
  login: PropTypes.bool,
};

export default LineLogin;
