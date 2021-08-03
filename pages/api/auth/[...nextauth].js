import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const providers = [
  // eslint-disable-next-line new-cap
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      if (credentials.type === 'email') {
        const axiosConfig = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        const user = await axios.post('http://18.118.210.155/api/v1/users/sign_in',
          {user: {
            email: credentials.email,
            password: credentials.password,
          }},
          axiosConfig);
        if (user) {
          return {status: 'success', data: {...user.data, token: user.headers.authorization.split(' ')[1] || ''}};
        }
      }

      return {status: 'fail'};
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
};

const AuthNext = (req, res) => new NextAuth(req, res, options);
export default AuthNext;