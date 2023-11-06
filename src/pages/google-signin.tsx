interface GoogleProfile {
  getId: () => string;
  getName: () => string;
  getImageUrl: () => string;
  getEmail: () => string;
}

function onSignIn(googleUser: { getBasicProfile: () => GoogleProfile }) {
  const profile = googleUser.getBasicProfile();

  if (profile) {
    console.log("ID: " + profile.getId());
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  }
}

// Default exported React component
const GoogleSignIn = () => {
  return <div>Google Sign-in page</div>;
};

export default GoogleSignIn;
