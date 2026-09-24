const firebaseConfig = {
  apiKey: "AIzaSyBmnD6bztdH9ymL-Oyz_f91MD-IHqBSI1U",
  authDomain: "senai-teste-1.firebaseapp.com",
  projectId: "senai-teste-1",
  storageBucket: "senai-teste-1.firebasestorage.app",
  messagingSenderId: "332436343732",
  appId: "1:332436343732:web:8b89d7805eafc32bb700e1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
