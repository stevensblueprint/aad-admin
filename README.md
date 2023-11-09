## Setup

### Get Authentication Keys

Install Dependencies (You have 3 choices but HIGHLY RECOMMEND pnpm over npm or yarn)
- pnpm install
- npm install 
- yarn install

Before starting make sure that you have docker installed. 

[Getting Started With Docker](https://www.docker.com/get-started/).

Once Docker is installed and the Docker daemon is running (start Docker Desktop) run the following in the terminal:

1. docker build -t aad-admin .
2. docker run -dp 127.0.0.1:3000:3000 aad-admin 

## Assigning Yourself to a Task

## Documentation Guide


## Google Authentification

1. create an oauth 2.0 client id, used google cloud to generate one but im not sure how that will be done otherwise.
   read this: https://developers.google.com/fit/android/get-api-key

2. specify client id by including this line:
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">

3. added a new google-signin.tsx (not sure if this necessary, just following along with documentation)
