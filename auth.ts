import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Naver({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
      async profile(profile: any) {
        const data = profile.response;
        return {
          id: data.id,
          email: data.email,
          provider: 'naver',
        };
      },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      async profile(profile: any) {
        return {
          id: profile.id,
          email: profile.kakao_account.email,
          provider: 'kakao',
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      async profile(profile: any) {
        return {
          id: profile.sub,
          email: profile.email,
          provider: 'google',
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }

      return { ...token, ...user };
    },

    session: async ({ session, token }: any) => {
      session.user.uid = token.id;
      session.user.provider = token.provider;
      return session;
    },
  },
});
