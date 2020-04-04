function verifyCustomerCredentials() {
   const email = document.querySelector("#email").value;
   const password = document.querySelector("#password").value;
   const errCredentials = document.querySelector("#incorret-credentials");

   if (email == "" || password == "") {
      console.log("email or passwrod is empty!");
      errCredentials.style.display = "block";
      return;
   }

   const url = `http://localhost:49000/api/customers/${email}/${password}`;

   console.log(url);

   fetch(url)
      .then(res => res.json())
      .then(jsonRes => {
         if (errCredentials.style.display === "block") { errCredentials.style.display = "none"; }
         const containerWelcome = document.querySelector("#container-welcome");
         containerWelcome.remove();

         getCustomerDashboard(jsonRes);

      })
      .catch(err => {
         console.log('Some error happen', err),
            console.log("Email or password is incorrect"),
            errCredentials.style.display = "block";
      })
}