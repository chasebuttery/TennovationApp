import React, { useState, useEffect } from 'react'
import './ActivityCard.scss'
import { addUserToActivity } from '../Backend/ActivitiesDB'
import { getActivityData, getMembersGoingList } from '../Backend/ActivitiesDB'
import Member from './Member'
import './ActivityCard.scss'
import JoinActivity from './JoinActivity'
import { NavLink } from 'react-router-dom'
import firebase from '../firebase'

export default function ActivityPage (props) {
  const [fullActivity, setFullActivity] = useState({})

  const [members, setMembers] = useState([])

  const [img, setImg] = useState()
  const [vid, setVid] = useState()

  const [showImg, setShowImg] = useState(false)
  const [showVid, setShowVid] = useState(false)

  const { activityid } = props.match.params

  console.log(activityid)

  console.log(fullActivity)

  useEffect(() => {
    async function getFullActivity (activityid) {
      const activityData = await getActivityData(activityid)
      setFullActivity(activityData)
    }
    getFullActivity(activityid)

    console.log(fullActivity)
  }, [activityid])

  useEffect(() => {
    async function getMembersGoing (activityid) {
      const membersList = await getMembersGoingList(activityid)
      setMembers(membersList.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getMembersGoing(activityid)
  }, [activityid])

  function refreshMembersGoing (member) {
    let isMemberIn = members.find(memb => memb.name === member.name)
    console.log(isMemberIn)
    if (isMemberIn == null) {
      console.log('ADDINGGGG')
      setMembers([...members, member])
    }
  }

  function refreshMembersNotGoing (memberData) {
    console.log('LEAVING ACTIVITY' + memberData.name)
    let filteredMembers = members.filter(
      member => member.name != memberData.name
    )
    setMembers(filteredMembers)
  }

  function saveImg (event) {
    let file = event.target.files[0]

    // Create a root reference
    var storageRef = firebase.storage().ref()

    // // Create a reference to 'mountains.jpg'
    var activityImgRef = storageRef.child('mainimg.jpg')

    activityImgRef.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!')
    })
  }

  function saveVid (event) {
    let file = event.target.files[0]

    // Create a root reference
    var storageRef = firebase.storage().ref()

    // // Create a reference to 'mountains.jpg'
    var activityVidRef = storageRef.child('mainvid.mp4')

    activityVidRef.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!')
    })
  }

  function downloadImg (event) {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref()
    const main = 'mainimg'
    var starsRef = storageRef.child(main + '.jpg')
    console.log('getting vidd')

    // Get the download URL
    const imgUrl = starsRef
      .getDownloadURL()
      .then(function (url) {
        // Insert url into an <img> tag to "download"
        setImg(url)
        setShowImg(true)
      })
      .catch(function (error) {
        // A full list of error codes is available at
      })

    console.log(img)
  }

  function downloadVid (event) {
    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref()
    var starsRef = storageRef.child('mainvid.mp4')
    console.log('getting vidd')

    // Get the download URL
    const vidUrl = starsRef
      .getDownloadURL()
      .then(function (url) {
        // Insert url into an <img> tag to "download"
        setVid(url)
        setShowVid(true)
      })
      .catch(function (error) {
        // A full list of error codes is available at
      })

    console.log(vid)
  }

  return (
    <div className='ActivityPage'>
      <h1 className='ActivityHeader'>Welcome to activity </h1>

      <label for='imgFile'>Upload Image:</label>
      <input type='file' name='imgFile' onChange={saveImg} />

      <label for='vidFile'>Upload Video:</label>
      <input type='file' name='vidFile' onChange={saveVid} />
      <button onClick={downloadImg}> DOWNLOAD IMG</button>
      <button onClick={downloadVid}> DOWNLOAD VID</button>
      {showImg && <img width='320' height='240' src={img} />}
      {showVid && (
        <video width='320' height='240' controls>
          <source src={vid} type='video/mp4' />
        </video>
      )}

      <JoinActivity
        activityID={fullActivity.activityID}
        onSubmit={refreshMembersGoing}
        onLeave={refreshMembersNotGoing}
      />
      <div className='MembersGoingGrid'>
        {members.map(member => (
          <div>
            <Member member={member} />
          </div>
        ))}
      </div>
    </div>
  )
}
