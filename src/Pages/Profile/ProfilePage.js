import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import Auth from "../../Auth";
import { useLocation, useHistory } from "react-router-dom";
import { getUser, saveUserImg } from "../../Backend/User";
import "./ProfilePage.scss";
import Check from "../../Images/check.png";
import Ticket from "../../Images/ticket.png";
import Token from "../../Images/token.png";
import SignIn from '../../Images/gsignin1.png';


export default function ProfilePage() {
  var provider = new firebase.auth.GoogleAuthProvider();

  const history = useHistory();
  const [status, setStatus] = useState(false);

  const memberStat = window.localStorage.getItem("member") === "true" || false;

  const userID = window.localStorage.getItem("userID") || "noone";
  const userName = window.localStorage.getItem("userName") || "noone";

  const [memberStatus, setMemberStatus] = useState(memberStat);
  const [member, setMember] = useState();
  const [userLocal, setUserLocal] = useState({});
  const [imgID, setImgID] = useState("");

  const tokens = "10";
  const tickets = "1";




  let userdetails = firebase.auth().currentUser;
  console.log(userdetails, "DETAILS");

  useEffect(() => {
    async function getUserData() {
      const userData = await getUser();

      setUserLocal(userData);
      console.log(userData, "status");

      console.log(member, "statsSER");
    }
    getUserData();
  }, []);

  async function signInWithGoogle(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        //Saving user
        Auth.saveUser(user);
        Auth.saveToken(token);
        Auth.saveUserData();
        console.log(user);

        setStatus(true);

        history.push("./profile");

        // window.location.reload();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log("ERROR WHEN sgning in");
        // ...
      });
  }

  async function signOutWithGoogle(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("signed out");

        // window.location.reload();
        localStorage.clear();

        setStatus(false);

        history.push("./profile");

        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        console.log("ERROR WHEN signing out");
      });
  }

  function goToCreatePage() {
    history.push("/create");
  }

  return (
    <div className="ProfilePage">
      <h1>Member Profile </h1>
      <p>Customize your profile and manage your membership.</p>
      <div className="GoogleSignInOut">
        <button>
          <img className = "SignIn" src = {SignIn} onClick={signInWithGoogle} />
          </button>
  
        <button className = "SignOut" onClick={signOutWithGoogle}>
          SIGN OUT
        </button>
      </div>
        <div className="MemberStatus">
          <h3>Member:</h3>
          <img className="CheckIcon" src={Check} />
        </div>
   <p className = "Warning">^SIGN IN AND BECOME A MEMBER TO JOIN ACTIVITIES^</p>
      <div className="Currency">
        <div className = "Token">
          <h3>{"Tokens: " + tokens}</h3>
          <img className="Icon" src={Token} />
        </div>
        <div className = "Ticket">
          <h3>{"Tickets: " + tickets} </h3>
          <img className="Icon" src={Ticket} />
        </div>
      </div>
      <div className = "Buy">
       <button>Get More Tokens/Tickets</button> 
      </div>

      <button className = "Create" onClick = {goToCreatePage}> CREATE ACTIVITY</button>

    </div>
  );
}
