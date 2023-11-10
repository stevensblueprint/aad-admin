# AAD-Admin

## Getting Started

1. **Create and setup your .env file**: Refer to .env.example

2. **Add Google OAuth 2.0 client to the Application**: in index.ts (src/pages/index.tsx) add the following to _AuthShowcase_

   ```
   <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com" />
   ```

3. **Install Dependencies** - this project uses pnpm over npm or yarn to optimize performance and minimize dependency conflicts.
   [Installing pnpm](https://pnpm.io/installation).

   Run `pnpm install` in your terminal in the root directory of the project

4. **Start & Seed Prisma**

   Run the following two commands in your terminal:

   ```
   pnpm run postinstall
   pnpm run db:push
   ```

   [Seeding Your Database on Prisma](https://www.prisma.io/docs/guides/migrate/seed-database)

5. **Start the application**

   Run the following in your terminal:

   ```
   pnpm run dev
   ```

   The application should now be running on http://localhost:3000.

6. TODO: Ignore this step for now. **Setting up the Docker Container**

   First make sure that you have Docker installed.
   [Getting Started With Docker](https://www.docker.com/get-started/).

   Once Docker is installed and the Docker daemon is running (start Docker Desktop) run the following in your terminal

   ```
   docker build -t aad-admin .
   docker run -dp 127.0.0.1:3000:3000 aad-admin
   ```

   The first command must be run in order for the Docker container to reflect any of your changes.
   [Additional Documentation on Building/Running Docker containers](https://docs.docker.com/get-started/02_our_app/)
