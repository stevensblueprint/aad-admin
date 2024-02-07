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

5. Setup Local Database - PostgreSQL

   - Starting docker container.
     First make sure that you have Docker installed.
     [Getting Started With Docker](https://www.docker.com/get-started/).

     Once Docker is installed and the Docker daemon is running (start Docker Desktop) run the following in your terminal

     [Additional Documentation on Building/Running Docker containers](https://docs.docker.com/get-started/02_our_app/)

     ```
     docker-compose up -d
     ```

     **Note:** Adding the `-d` flag lets the container run in detached mode allowing for it not to use a whole terminal window.

     When you're done, you can stop the docker container via `docker-compose down`

   - Seed dev database

     1. Push updated schema changes to database
        ```
        pnpm run db:push
        ```
     1. Generate Prisma Client based on current schema
        ```
        pnpm run postinstall
        ```
     1. Seed DB based off seed.ts file (seeds mentee, mentor, and admin user)
        ```
        pnpm run db:seed
        ```
     1. (OPTIONAL) You can check contents of DB using Prisma GUI
        ```
        npx prisma studio
        ```

## Contributing Changes

Please make a branch from main when contributing to the project. Refer to the issues board for a list of ongoing tasks.

Naming conventions:

- Creating a new feature: _feature/featureName_
- Documentation/Setup: _docs/description_
- Bug Fix: _bugfix/bugName_

It is best practice to run the code linter and formatter before pushing changes to help prevent merge conflicts. To do this, run the following in your terminal:

```
pnpm run lint
pnpm run format
```

[T3 Stack Folder Structure](https://create.t3.gg/en/folder-structure?packages=nextauth%2Cprisma%2Ctailwind%2Ctrpc)
