import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User, { UserModel } from '@models/user';
import { connectToDatabase } from '@utils/database';


console.log({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {
      console.log({session})
      // store the user id from MongoDB to session
      const currentSession = session as unknown as { user: { id: string, email: string }}
      const sessionUser = await User.findOne({ email: currentSession.user.email });
      currentSession.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        console.log("Sign In Callback Executed");
        const profileParam = profile as UserModel;
        await connectToDatabase();

        // check if user already exists
        const userExists = await User.findOne({ email: profileParam.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profileParam.email,
            username: (profileParam.name as string).replace(" ", "").toLowerCase(),
            image: profileParam.picture,
          });
        }

        return true
      } catch (error) {
        console.error("Error in signIn callback: ", (error as Error).message);
        return false;
      }
    },
  }
})

export { handler as GET, handler as POST }