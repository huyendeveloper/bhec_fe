/* eslint-disable no-useless-escape */
import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';

import {AuthService} from '~/services';
const Auth = new AuthService();

function AccountConfirm() {
  const router = useRouter();

  useEffect(async () => {
    if (router.query.confirmation_token) {
      const body = {
        confirmation_token: router.query && router.query.confirmation_token ? router.query.confirmation_token : '',
      };
      const res = await Auth.confirmAccount(body);
      if (res.user) {
        Router.push({
          pathname: '/auth/login',
        });
      } else {
        Router.push({
          pathname: '/auth/login',
        });
      }
    }
  }, [router.query.confirmation_token]);

  return (
    <>
    </>
  );
}

export default AccountConfirm;
