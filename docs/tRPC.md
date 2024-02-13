# tRPC

tRPC is a framework for building APIs with Typescript. It is all just functions and types. RPC in tRPC stands for Remote Procedure Call - a way to call functions on a server from a client. tRPC lets us define the functions on the server in routers (see /src/server/api/routers) and call them from the client (see /src/pages/form/[id].tsx). The server is the Next.js backend server, and the client is client-side Javascript or other functions that run on the server.

## Utilities File

It is helpful to make a look at the utilities file in /src/server/api/trpc.ts. This file contains a lot of the boilerplate code for tRPC. There are some comments on the functions in this file - this file is also where authorization middleweare should be added, following the pattern of protectedProcedure.

## Routers

Routers are created by calling createTRPCRouter (exported from /src/server/api/trpc.ts) with the first argument being an object. Each key in this object is a function (route) that can be called from the client.

Looking at how existing routes are implemented can help you implement new ones. publicProcedure and protectedProcedure return a ProcedureBuilder object, where we can call .input method to define the input type using [Zod](https://github.com/colinhacks/zod) schemas, and either .mutation or .query to write the route logic.

## Client

tRPC is integrated with Tanstack's React Query library to allow us to call the server functions we wrote in the routers with hooks. The two hooks we will primarily be using are useQuery and useMutation. These hooks are used in the client-side code to call the server-side functions. More information on the hooks can be found in the [React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).
