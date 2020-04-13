const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (e) {
   e.preventDefault();

   const email = loginForm.querySelector("#loginEmail").value;
   const password = loginForm.querySelector("#loginPassword").value;
   const errCredentials = loginForm.querySelector("#incorrect-credentials");


   if (email == "" || password == "") {
      console.log("email or passwrod is empty!");
      errCredentials.style.display = "block";
      setTimeout(function () {
         loginForm.querySelector("#loginEmail").value = "";
         loginForm.querySelector("#loginPassword").value = "";
      }, 1000);
      setTimeout(function () {
         errCredentials.style.display = "none";
      }, 3000);
      return;
   }

   const url = `http://localhost:49000/api/customers/${email}/${password}`;

   fetch(url)
      .then(res => res.json())
      .then(jsonRes => {
         if (errCredentials.style.display === "block") { errCredentials.style.display = "none"; }
         document.querySelector("#balanceBtn").remove();
         document.querySelector("#container-login").remove();
         document.querySelector("#container-signup").remove();
         document.querySelector("h1").remove();
         document.querySelector("#adminBtn").remove();

         getCustomerDashboard(jsonRes, email, password);

      })
      .catch(err => {
         console.log('Some error happen', err),
            console.log("Email or password is incorrect"),
            errCredentials.style.display = "block";

         setTimeout(function () {
            loginForm.querySelector("#loginEmail").value = "";
            loginForm.querySelector("#loginPassword").value = "";
         }, 1000);

         setTimeout(function () {
            errCredentials.style.display = "none";
         }, 3000);
      })

});