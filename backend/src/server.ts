import http from 'http'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { Context, createContext } from '@shared/context'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { schema } from './shared/graphql/schema'

// Required logic for integrating with Express
const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app)

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<Context>({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpServer })],
    introspection: true,
})

;(async () => {
    await server.start()

    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use(
        '/',
        cors<cors.CorsRequest>(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req }) =>
                createContext({ token: req.headers.authorization }),
        }),
    )

    // Modified server startup
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    )
    console.log(`🚀 Server ready at http://localhost:4000/`)
})().catch((error) => {
    console.error(error)
    throw new Error('Server: something went wrong')
})
