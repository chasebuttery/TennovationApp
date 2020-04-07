import firebase from '../firebase'
import Auth from '../Auth'

export async function getActivityList () {
  const activities = firebase
    .firestore()
    .collection('Activities')
    .get()
  return activities
}

export async function getActivityData (activityID) {
  const activityData = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        return doc.data()
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })
  return activityData
}

export async function getMembersList (activityID) {
  const members = firebase
    .firestore()
    .collection('Activities')
    .doc('activityID')
    .collection('MembersGoing')
    .get()
  return members
}

export async function getMembersGoingList (activityID) {
  const members = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .collection('MembersGoing')
    .get()
  return members
}

export async function addActivity (activity) {
  console.log('add Activity to firestore')
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  const newActivity = firebase
    .firestore()
    .collection('Activities')
    .add({
      activityID: '',
      creatorID: userName,
      creatorImage: profileImg,
      title: activity.title,
      category: activity.category,
      description: activity.description,
      location: activity.location,
      time: activity.time,
      imageURL: activity.imageURL
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
      setActivityID(docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })

  function setActivityID (id) {
    const newActivityID = firebase
      .firestore()
      .collection('Activities')
      .doc(id)
      .update({
        activityID: id
      })
  }
}

export async function addUserToActivity (activityID) {
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  console.log('put user in firestore')
  const activities = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .collection('MembersGoing')
    .doc(userName)
    .set({
      name: userName,
      profileImg: profileImg
    })
  return activities
}

export async function deleteUserFromActivity (activityID) {
  const userName = Auth.getUserName()

  const deleteUser = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .collection('MembersGoing')
    .doc(userName)
    .delete()
}

// db.collection("cities").where("capital", "==", true)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
