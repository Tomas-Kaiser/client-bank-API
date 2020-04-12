function balance() {
   document.querySelector("#balanceBtn").remove();
   document.querySelector("#container-login").remove();
   document.querySelector("#container-signup").remove();
   document.querySelector("h1").remove();
   document.querySelector("#adminBtn").remove();

   // Get balance
   const divCheckBalanceContainer = document.createElement("div");
   divCheckBalanceContainer.setAttribute("id", "check-balance-container");
   divCheckBalanceContainer.setAttribute("class", "form-style-8");

   divCheckBalanceContainer.innerHTML = (`
      <h2>Check Your Balance</h2>

      <form method="POST" id="balanceForm">
         <input type="text" id="balanceEmail" name="balanceEmail" placeholder="Email"><br><br>
         <input type="text" id="balancePassword" name="balancePassword" placeholder="Password"><br><br>
         <input type="text" id="accNum" name="accNum" placeholder="Your Account Number"><br><br>
         <p id="incorrect-credentials" class="err-msg">Email or password is incorrect</p>
         <button>Get Balance</button>
      </form>

      <div id="balance"></div>
   `);

   root.appendChild(divCheckBalanceContainer);

   const balanceForm = document.querySelector("#balanceForm");
   balanceForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = balanceForm.querySelector("#balanceEmail").value;
      const password = balanceForm.querySelector("#balancePassword").value;
      const errCredentials = balanceForm.querySelector("#incorrect-credentials");
      const accNum = balanceForm.querySelector("#accNum").value;

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

      url = `http://localhost:49000/api/customers/${email}/${password}/accounts/${accNum}/balance`;

      fetch(url)
         .then(res => res.json())
         .then(jsonRes => {
            balanceForm.remove();

            const balance = document.querySelector("#balance");
            balance.innerHTML = (`
               <p>Your current deposit is EUR${jsonRes}!
            `);

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
         });
   });

}