import firebase from '../../firebase';



 export function User (){
 }




export  function somethin (){
        console.log("reee");
    
}

export function saveUser (userName){

    firebase.firestore().collection("Users").doc(userName).set({
        name: "Chase",
        state: "OH",
        country: "USA"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}