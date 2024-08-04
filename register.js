
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { auth } from "./config.js";



const form = document.querySelector("#form") 
const email = document.querySelector("#email") 
const password = document.querySelector("#password") 




form.addEventListener("submit" , (event)=>{
    event.preventDefault();
    console.log("hello register");createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      window.location = "index.html"
    })
    .catch((error) => {
      
      const errorMessage = error.message;
      console.log(errorMessage);
    });
})
















