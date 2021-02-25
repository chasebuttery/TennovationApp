import firebase from "../firebase";
import Auth from "../Auth";

export function User() {}

export function somethin() {
  console.log("reee");
}

export function getUser() {
  const user = firebase.auth().currentUser;

  console.log(user);

  return user;
}

export function saveUser(user) {
  const userRef = firebase
    .firestore()
    .collection("Users")
    .doc(user.uid);

  console.log("USER REFEERNECE", userRef);

  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.onSnapshot((doc) => {
        // do stuff with the data
        console.log("USER EXISTS");
      });
    } else {
      console.log("DOES NOT EXIST");

      userRef.set({
        name: user.displayName,
        id: user.uid,
        tokens: 10,
        tickets: 1,
        profileImg: user.photoURL,
      }); // create the document
    }
  });

  //   firebase
  //     .firestore()
  //     .collection("Users")
  //     .doc(user.uid)
  //     .set({
  //       name: user.displayName,
  //       country: "USA",
  //       county: "idk",
  //     })
  //     .then(function() {
  //       console.log("Document successfully written!");
  //     })
  //     .catch(function(error) {
  //       console.error("Error writing document: ", error);
  //     });
}

export function saveUserImg(userID, img) {
  console.log(userID, "user", img);

  const userRef = firebase
    .firestore()
    .collection("Users")
    .doc(userID);

  console.log("USER REFEERNECE", userRef);

  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      userRef.onSnapshot((doc) => {
        // do stuff with the data
        console.log("USER EXISTS");
        userRef.update({
          id: userID,
          img: img,
        });
      });
    } else {
      console.log("DOES NOT EXIST");

      // create the document
    }
  });
}
