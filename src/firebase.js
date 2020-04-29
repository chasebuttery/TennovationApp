import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDIv8hKsUGc92n3BMQibq4lxVmCRpmVIGE',
  authDomain: 'tennovation-b93ce.firebaseapp.com',
  databaseURL: 'https://tennovation-b93ce.firebaseio.com',
  projectId: 'tennovation-b93ce',
  storageBucket: 'tennovation-b93ce.appspot.com',
  messagingSenderId: '736340379693',
  appId: '1:736340379693:web:94a245b42604f996ed10a4',
  measurementId: 'G-2228RLJNPM'
}

firebase.initializeApp(firebaseConfig)

export default firebase
