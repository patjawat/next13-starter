import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
            value:"admin@local.com"
          },

          password: { label: "Password", type: "password",value:"admin112233" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          
          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            randomKey: "Hey coolxx",
          };
        },
      }),
    ],
    
    callbacks: {
      session: ({ session, token }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role:token.role,
            randomKey: token.randomKey,
          },
        };
      },
      jwt: ({ token, user }) => {
        if (user) {
        
          return {
            ...token,
            id: user.id,
            role:user.role,
            randomKey: user.randomKey,
          };
        }
        if(user) token.role = user.role
        return token;
      },
    },
  }

  
export default NextAuth(authOptions);