import firebase from "../firebase";
import Auth from "../Auth";

export async function getActivityList() {
  const activities = firebase
    .firestore()
    .collection("Activities")
    .get();
  return activities;
}

export async function getActivityData(activityID) {
  const activityData = firebase
    .firestore()
    .collection("Activities")
    .doc(activityID)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  return activityData;
}

export async function getActivitiesJoinedBy(userName) {
  console.log(
    "Function Needs to Be Done after Members going is converted into an array of member usernames on FIRST LEVEL OF DB"
  );

  const activityData = firebase
    .firestore()
    .collection("Activities")
    .where("creatorID", "==", userName)
    .get()
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  return activityData;
}

export async function getActivitiesCreatedBy(userName) {
  console.log("hereeee");

  const activityData = firebase
    .firestore()
    .collection("Activities")
    .where("creatorID", "==", userName)
    .get()
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  return activityData;
}




export async function getActiveActivities() {
  //console.log("day", day);
  var query = firebase.firestore().collection("Activities");
  console.log("FIAGKAKHA");
  var time = new Date();

  query = query.where("time", "<=", time);


  const activityData = query.get().catch(function(error) {
    console.log("Error getting documents: ", error);
  });
  return activityData;
}





export async function getActivitiesByAll(filterOptions) {
  //console.log("day", day);
  var query = firebase.firestore().collection("Activities");
  console.log("FIAGKAKHA");

  for (var filterVar of Object.keys(filterOptions)) {
    console.log(filterVar + " -> " + filterOptions[filterVar]);

    if (filterOptions[filterVar]) {
      query = query.where(filterVar, "==", true);

      console.log("AFGHAHASDGquery", query);
    }
  }

  //TIMESTAMP WHERE
  // query.where(time, >, timestamp1d).where(time, >, timestamp2)
  //firebase.firestore().collection("cities").where("timestamp", ">", timestamp);

  const activityData = query.get().catch(function(error) {
    console.log("Error getting documents: ", error);
  });
  return activityData;
}

export async function getMembersList(activityID) {
  const members = firebase
    .firestore()
    .collection("Activities")
    .doc("activityID")
    .collection("MembersGoing")
    .get();
  return members;
}

export async function getMembers() {
  const members = firebase
    .firestore()
    .collection("Users")
    .get();
  return members;
}

export async function getMembersGoingList(activityID) {
  const members = firebase
    .firestore()
    .collection("Activities")
    .doc(activityID)
    .collection("MembersGoing")
    .get();
  return members;
}

export async function addActivity(
  createActivity,
  createEvent,
  title,
  activityCategory,
  eventCategory,
  sport,
  location,
  cost,
  imgID,
  time,
  day,
  week,
  description,
  info,
  coach
) {
  console.log("add Activity to firestore");
  const userName = Auth.getUserName();
  const profileImg = Auth.getProfileImg();

  const newActivity = firebase
    .firestore()
    .collection("Activities")
    .add({
      activityID: "",
      creatorID: userName,
      creatorImage: profileImg,
      createActivity: createActivity,
      createEvent: createEvent,
      title: title,
      activityCategory: activityCategory,
      eventCategory: eventCategory,
      sport: sport,
      location: location,
      cost: cost,
      imgID: imgID,
      time: time,
      day: day,
      week: week,
      description: description,
      info: info,
      coach: coach,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      setActivityID(docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  function setActivityID(id) {
    const newActivityID = firebase
      .firestore()
      .collection("Activities")
      .doc(id)
      .update({
        activityID: id,
      });
  }
}

export async function addUserToActivity(activityID) {
  const userName = Auth.getUserName();
  const profileImg = Auth.getProfileImg();
  const id = Auth.getUserID();

  console.log("put user in firestore");
  const activities = firebase
    .firestore()
    .collection("Activities")
    .doc(activityID)
    .collection("MembersGoing")
    .doc(userName)
    .set({
      name: userName,
      profileImg: profileImg,
      id: id,
    });
  return activities;
}

export async function deleteUserFromActivity(activityID) {
  const userName = Auth.getUserName();

  const deleteUser = firebase
    .firestore()
    .collection("Activities")
    .doc(activityID)
    .collection("MembersGoing")
    .doc(userName)
    .delete();
}
