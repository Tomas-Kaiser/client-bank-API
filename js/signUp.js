const signUpForm = document.querySelector("#container-signup");
const passErr = signUpForm.querySelector("#incorrect-password");

signUpForm.addEventListener("submit", function (e) {
   console.log("Sign up button clicked");
   e.preventDefault();

   const email = signUpForm.querySelector("#signUpEmail").value;
   const address = signUpForm.querySelector("#address").value;
   const pass1 = signUpForm.querySelector("#password1").value;
   const pass2 = signUpForm.querySelector("#password2").value;
   
   console.log(pass1);
   console.log(pass2);


   if (pass1 != pass2) {
      console.log("Passwords do not match!");
      passErr.style.display = "block";
      setTimeout(function () {
         passErr.style.display = "none";
      }, 3000);
      return;
   }

   const bodyContent = {
      "address": `${address}`,
      "email": `${email}`,
      "securityCredential": `${pass1}`
   }

   fetch(`http://localhost:49000/api/customers`, {
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(bodyContent)
   }).then(res => res.json()).then(jsonRes => {
      console.log(jsonRes);
      alert(`Customer has been created! \n Email: ${jsonRes.email}`);
      signUpForm.querySelector("#signUpEmail").value = "";
      signUpForm.querySelector("#address").value = "";
      signUpForm.querySelector("#password1").value = "";
      signUpForm.querySelector("#password2").value = "";

   });
});