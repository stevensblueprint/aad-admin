## Setup

Create and setup your .env file. Refer to .env.example

Install Dependencies - project uses pnpm over npm or yarn to optimize performance and minimize dependency conflicts.

https://pnpm.io/installation

- pnpm install

Before starting make sure that you have docker installed.

[Getting Started With Docker](https://www.docker.com/get-started/).

Once Docker is installed and the Docker daemon is running (start Docker Desktop) run the following in the terminal:

1. docker build -t aad-admin .
2. docker run -dp 127.0.0.1:3000:3000 aad-admin

The first command must be run in order for the Docker container to reflect any of your changes.

https://docs.docker.com/get-started/02_our_app/

### Disable Google Authentication in Developer Mode

In your .env set ENABLE_AUTH="false"

The application should now be running on localhost:3000

## Getting Secret Keys for Next-Google Authentication

1. create an oauth 2.0 client id, used google cloud to generate one but im not sure how that will be done otherwise.
   read this: https://support.google.com/cloud/answer/6158849?hl=en

2. specify client id by including this line in src/pages/index.tsx
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com" />

3. added a new google-signin.tsx (not sure if this necessary, just following along with documentation)

https://medium.com/frontendweb/how-to-set-up-the-next-auth-library-for-development-and-production-in-nextjs-103e9e4e9691
https://www.youtube.com/watch?v=A5ZN--P9vXM - Good guide on setting up secrets for Authentication

## Starting Prisma

pnpm run postinstall
pnpm run db:push
