import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/storage';
import { Alert } from "rsuite";

const config = {
	apiKey: "AIzaSyBS8BIEbKQi6JabuahUQxT8kspf0oZW8go",
	authDomain: "ailms-4e560.firebaseapp.com",
	databaseURL: "https://ailms-4e560-default-rtdb.firebaseio.com",
	projectId: "ailms-4e560",
	storageBucket: "ailms-4e560.appspot.com",
	messagingSenderId: "1022356302990",
	appId: "1:1022356302990:web:0144a39fee6a363ab5addf"
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.database();
		this.storage = app.storage();
	}

	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};
	doSignInWithEmailAndPassword = (email, password) => {
		return this.auth.signInWithEmailAndPassword(email, password);
	};

	doSignOut = () => {
		this.auth.signOut();
		Alert.success('Successfully signed out...')
	};

	doPasswordReset = email => {
		return this.auth.sendPasswordResetEmail(email);
	};

	doPasswordUpdate = password => {
		return this.auth.currentUser.updatePassword(password);
	};

	user = uid => this.db.ref(`users/${uid}`);
	users = () => this.db.ref("users");

	course = cid => this.db.ref(`courses/${cid}`);
	courses = () => this.db.ref("courses");
	courseCurriculums = cid => this.db.ref(`courses/${cid}/curriculum`);

	assignments = cid => this.db.ref(`courses/${cid}/assignments`)
	// Database ref
	assignmentRef = () => this.storage.ref().child('assignments');
	
	onAuthUserListener = (next, fallback) =>{
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.user(authUser.uid).on('value', snapshot => {
					const dbUser = snapshot.val();
					if (dbUser) {
						if (!dbUser.roles) {
							dbUser.roles = {};
						}

						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							...dbUser
						};

						next(authUser);
					} 
				});
			}
			else {
				fallback();
			}
		});
	}
	
	onAuthCourseListener = (next, fallback) => {
		this.auth.onAuthStateChanged(() => {
			this.courses().on("value", (snapshot, prevChildKey) => {
				const coursesObject = snapshot.val();

				if(coursesObject){
                    const coursesList = Object.keys(coursesObject).map(key => ({
                        ...coursesObject[key],
                        uid: key,
                    }));
					next(coursesList);
				}
				else{
					fallback();
				}
			});
		});
	};
}

export default Firebase;
