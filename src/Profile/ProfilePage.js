import React, { useState } from 'react'
import firebase from '../firebase'
import Auth from '../Auth'
import { useLocation } from 'react-router-dom'

export default function SignInPage () {
  var provider = new firebase.auth.GoogleAuthProvider()

  function signInWithGoogle () {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user

        //Saving user
        Auth.saveUser(user)
        Auth.saveToken(token)
        Auth.saveUserData()
        console.log(user)
        //window.location.reload()
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential

        console.log('ERROR WHEN sgning in')
        // ...
      })
  }

  function signOutWithGoogle () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log('signed out')

        //window.location.reload()
        localStorage.clear()
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        console.log('ERROR WHEN signing out')
      })
  }

  return (
    <div className='ProfilePage'>
      <h1>Welcome To Your Tennovation Member Profile</h1>
      <p>Here you can login and customize your profile. </p>
      <div className='GoogleSignInOut'>
        <button onClick={signInWithGoogle}>SIGN IN W/Google </button>
        <button onClick={signOutWithGoogle}>SIGN OUT W/Google</button>
      </div>
      <div>
        <h3>image change</h3>
      </div>
    </div>
  )
}

// const [email, setEmail] = useState();
// const [password, setPassword] = useState();
// function handleEmailChange(event) {
//   setEmail(event.target.value);

//   console.log(email);
// }
// function handlePasswordChange(event) {
//   setPassword(event.target.value);
//   console.log(password);
// }

// //function setEmail(event) {}

// //function setPassword(event) {}

// function createUserWithEmailAndPassword() {
//   firebase.auth();
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(function(result) {
//       console.log(result);
//       console.log("signed in");
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...

//       console.log(errorMessage);
//       console.log("songohaogh");
//     });

//   console.log("trying");
// }

// function signInWithEmailAndPassword() {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...
//     });
// }

// function signOutWithEmailAndPassword() {
//   firebase
//     .auth()
//     .signOut()
//     .then(function() {
//       // Sign-out successful.
//     })
//     .catch(function(error) {
//       // An error happened.
//     });
// }

// function phoneNumberSignIn() {
//   firebase.auth().languageCode = "it";

//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//     "recaptcha-container",
//     {
//       size: "normal",
//       callback: function(response) {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         // ...
//         console.log("it worked");
//       },
//       "expired-callback": function() {
//         // Response expired. Ask user to solve reCAPTCHA again.
//         // ...

//         console.log("retry");
//       }
//     }
//   );
// }
/* <div className="PhoneSignInOut">
        <form className="CreateUser">
          <label>
            email:
            <input type="text" name="email" onChange={handleEmailChange} />
          </label>
          <label>
            password:
            <input
              type="text"
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit" onClick={createUserWithEmailAndPassword}>
            Create User w/Email
          </button>
        </form>
        <form className="SignInUser">
          <label>
            email:
            <input type="text" name="email" onChange={handleEmailChange} />
          </label>
          <label>
            password:
            <input
              type="text"
              name="password"
              onChange={handlePasswordChange}
            />
          </label>
          <button onClick={signInWithEmailAndPassword}>Sign In W/Email</button>
        </form>

        <button onClick={signOutWithEmailAndPassword}>Sign Out W/Email</button>
      </div> */
