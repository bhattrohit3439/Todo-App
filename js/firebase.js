const firebaseConfig = {
	apiKey: 'AIzaSyCMfi9rbTpU_ywvVKIaXyOyFwlzONxD9KY',
	authDomain: 'todoapp-c850f.firebaseapp.com',
	projectId: 'todoapp-c850f',
	storageBucket: 'todoapp-c850f.appspot.com',
	messagingSenderId: '857258886579',
	appId: '1:857258886579:web:3d83ff9d513afdd73137c6',
	measurementId: 'G-M1LSZVW7SY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
