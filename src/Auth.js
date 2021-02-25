import firebase from "./firebase";
import { saveUser } from "./Backend/User";
import ProImg from "./Images/profile.png";

//Rewrite local user saves to only firestore so you can listen for user changes on the navbar and profile page

export default {
  getProfileImg() {
    return localStorage.getItem("profileImg") || ProImg;
  },

  getUserName() {
    return localStorage.getItem("userName");
  },

  saveUserData() {
    // const user = firebase.auth().currentUser;
    // const profileImg = user.photoURL;
    console.log("saving user data");

    // localStorage.setItem(profileImg, profileImg);
  },
  saveUser(user) {
    console.log(user.photoURL);
    //Save User to DB

    saveUser(user);

    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("profileImg", user.photoURL);
    localStorage.setItem("idToken", user.id_token);
    localStorage.setItem("userID", user.uid);

    localStorage.setItem("accessToken", user.access_token);
    localStorage.setItem("member", true);
  },
  saveToken(token) {
    console.log("token = " + token);
    localStorage.setItem("token", token);
  },

  isMember() {
    const user = firebase.auth().currentUser;

    if (user) {
      console.log("there is a user logged in");
      return true;
    } else {
      console.log("no user in yet");
      return false;
    }
  },

  isAuthenticated() {
    const id_token = this.getToken();
    const access_token = this.getAccessToken();
    const expires_in = this.getTokenExpiration();

    console.log("there is a user logged in");

    if (!id_token || !access_token) {
      return false;
    }
    try {
      if (expires_in === 0) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  },
};
