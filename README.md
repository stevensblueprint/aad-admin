# AAD-Admin

## Getting Started

1. **Create and setup your .env file**: Refer to .env.example

2. **Install Dependencies** - this project uses pnpm over npm or yarn to optimize performance and minimize dependency conflicts.
   [Installing pnpm](https://pnpm.io/installation).

   Run the following in the terminal in the root directory of the project. 

   ```
   pnpm install
   ```
   
   You may encounter warnings if you do not have the correct version of Node installed. This project uses V20.0.0. When working with Node, it is highly recommended to use nvm (Node Version Manager). [nvm Documentation](https://github.com/nvm-sh/nvm)

3. **Start & Seed Prisma**

   Run the following command in your terminal:

   ```
   pnpm run db:push
   ```

   [Seeding Your Database on Prisma](https://www.prisma.io/docs/guides/migrate/seed-database)

4. **Start the application**

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
