import firebase from '../../firebase';



 export function AddContent (){
 }




export  function AddGame (){
        console.log("reee");
    
}

export function addActivity(data){

    firebase.firestore().collection("Users").doc(userName).set({
        name: "WHATTT"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}