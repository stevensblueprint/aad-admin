## Google Authentification

1) include google platform library on web pages that have sign in with google with this line:
<script src="https://apis.google.com/js/platform.js" async defer></script>

2) create an oauth 2.0 client id, used google cloud to generate one but im not sure how that will be done otherwise.
read this: https://developers.google.com/fit/android/get-api-key


4) specify client id by including this line:
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">

5) add a sign in button:
<div class="g-signin2" data-onsuccess="onSignIn"></div>

5) added a new google-signin.tsx (not sure if this necessary, just following along with documentation)

6) check to see in the database if the user is already registered.
