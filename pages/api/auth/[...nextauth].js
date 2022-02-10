import NextAuth from "next-auth"
import { API_BASE } from "../../../config";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const options = {
                    url: `${API_BASE}/auth/login`,
                    method: 'POST',
                    data: credentials,
                    headers: { "Content-Type": "application/json" }
                }
                try {
                    const { data } = await axios(options)
                    console.log(data)
                    let user = {
                        ...data.user,
                        accessToken: data.token
                    }
                    return user
                } catch (err) {
                    return null
                }
            },
            session: { jwt: true },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            // first time jwt callback is run, user object is available
            if (user) {
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.picture = user.image
                token.phone = user.phone
                token.role = user.role
                token.accessToken = user.accessToken
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.picture = token.picture
                session.user.phone = token.phone
                session.user.role = token.role
                session.accessToken = token.accessToken
            }
            return session;
        },
    },
}


export default (req, res) => NextAuth(req, res, options);