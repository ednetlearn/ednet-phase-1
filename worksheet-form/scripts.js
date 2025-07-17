// scripts.js
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("worksheetForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const grade = document.getElementById("grade").value;
  const subject = document.getElementById("subject").value;
  const topic = document.getElementById("topic").value;

  const data = {
    studentName,
    grade,
    subject,
    topic,
    timestamp: new Date()
  };

  try {
    const docRef = await addDoc(collection(window.db, "worksheetRequests"), data);
    alert("Worksheet request submitted! Reference ID: " + docRef.id);
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("Error submitting form. Please try again.");
  }
});
