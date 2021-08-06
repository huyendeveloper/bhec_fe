/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      return {status: 'success', data: {...credentials.data, token: credentials.token}};
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