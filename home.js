import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,  
  deleteDoc,
  updateDoc,
  query,
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
  arr = [];
  const q = query(collection(db, "todos"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });
  console.log(arr);
  renderTodo();
}

getData();





 // Items Render


function renderTodo (){
   ul.innerHTML = ""
if(arr.length === 0){
     ul.innerHTML = "No data found";
     return;
}
arr.map((item)=>{
   ul.innerHTML += `
   <li class = "font-serif text-2xl mt-3 mx-[3rem]">${item.todo}
   <button id="deleteBtn" class="btn bg-[#000000] text-white">Delete</button>
   <button id="editBtn" class="btn bg-[#000000] text-white">Edit</button>
   </li>
   `   
});

const deleteBtn = document.querySelectorAll("#deleteBtn")
const editBtn = document.querySelectorAll("#editBtn")

deleteBtn.forEach((btn, index) => {
  btn.addEventListener("click", async () => {
    try {
      console.log(arr[index]);
      await deleteDoc(doc(db, "todos", arr[index].id));
      console.log("Data deleted successfull");
      arr.splice(index, 1);
      renderTodo();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  });
});
editBtn.forEach((btn, index) => {
  btn.addEventListener("click", async () => {
    const updatedNewValue = prompt("enter new value");
    const todoUpdate = doc(db, "todos", arr[index].id);
    await updateDoc(todoUpdate, {
      todo: updatedNewValue,
    });
    console.log("Data updated");
    arr[index].todo = updatedNewValue;
    renderTodo();
  });
});

}








form.addEventListener("submit" , async (event)=>{
    event.preventDefault();
    // console.log(todo.value);
    try {
        const docRef = await addDoc(collection(db, "todos"), {
       todo: todo.value,
});
arr.push({
  todo: todo.value,
  id : docRef.id
})

    console.log("Document written with ID: ", docRef.id);     
    todo.value = ""
   renderTodo()
 } 
  
catch (e) { 
      console.error("Error adding document: ", e);
  }
})
































































































