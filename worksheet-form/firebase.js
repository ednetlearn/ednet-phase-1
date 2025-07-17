// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPoXtBSgl4C9ssL6qjeGpMgly1TLf-Jo0",
  authDomain: "ednet-form-workflow.firebaseapp.com",
  projectId: "ednet-form-workflow",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);
window.db = db; // Expose it globally if needed elsewhere
