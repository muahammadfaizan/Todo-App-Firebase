import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,  
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 

import { auth , db } from "./config.js";

const logout = document.querySelector(".logout")
const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
  } else {
    window.location = "index.html"
  }
});




logout.addEventListener("click" , ()=>{
  signOut(auth).then(() => {
    window.location = "index.html"
  }).catch((error) => {
    console.log(error);
    
  });
})




let arr = []


async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  arr.push({ ...doc.data() , docId : doc.id})
  console.log(doc.id);
});
console.log(arr);
renderTodo();
}

getData()





 // Items Render


function renderTodo (){
   ul.innerHTML = ""
if(arr.length === 0){
     ul.innerHTML = "No data found";
     return;
}
arr.map((item)=>{
   ul.innerHTML += `
   <li class = "font-serif text-4xl mt-3 mx-[3rem]">${item.todo}</li>
   `
});
}








form.addEventListener("submit" , async (event)=>{
    event.preventDefault();
    // console.log(todo.value);
    arr.push({
        todo: todo.value,
    })
    try {
        const docRef = await addDoc(collection(db, "todos"), {
       todo: todo.value,
});
    console.log("Document written with ID: ", docRef.id);     
    todo.value = ""
   renderTodo()
 } 
  
catch (e) { 
      console.error("Error adding document: ", e);
  }
})
































































































