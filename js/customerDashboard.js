function getCustomerDashboard(jsonRes, email, password) {

   // Create header
   const header = document.createElement("h2");
   header.setAttribute("class", "welcome-header");
   header.innerHTML = `Welcome to your dashboard, ${jsonRes.email}!`;

   // Create a unorder list
   const list = document.createElement("ul");
   const h3 = document.createElement("h3");
   h3.textContent = "Your Details:";

   list.innerHTML = (`
      <li>Address: ${jsonRes.address}</li>
      <li>You have currently ${jsonRes.accounts.length} account${jsonRes.accounts.length === 1 ? "" : "s"} open</li>
   `);

   const headerAccount = document.createElement("h3");
   headerAccount.innerHTML = `Your account${jsonRes.accounts.length === 1 ? "" : "s"}:`;


   // Create a form for a new account
   const containerCreateAccountForm = document.createElement("div");
   containerCreateAccountForm.innerHTML = (`
   <div class="new-account-form-container">
      <h4>Do you want to create a new account?</h4>

      <form class="form" id="createAccountForm">
         <div class="radio-container">
            <div class="radio-inner">
               <input type="radio" id="currentAcc" name="account" value="currentAcc">
               <label for="CurrentAcc">Current account</label><br>

               <input type="radio" id="savingAcc" name="account" value="savingAcc">
               <label for="savingAcc">Saving account</label><br>
            </div>
         </div>
         <button class="btn-new-account">Create Account</button>
      </form> 
   </div>  
   `);


   const divCardContainer = document.createElement("div");
   divCardContainer.setAttribute("id", "card-container");

   // Render the page
   root.appendChild(header);

   root.appendChild(h3);
   root.appendChild(list);
   root.appendChild(headerAccount);

   root.appendChild(divCardContainer);
   const cardContainer = document.querySelector("#card-container");

   for (let i = 0; i < jsonRes.accounts.length; i++) {
      let bankCard = document.createElement("div");
      bankCard.setAttribute("class", "card");
      // TODO cancel account button
      bankCard.innerHTML = (`
         <header>
            <h4>${jsonRes.accounts[i].currentAcc ? "Current" : "Saving"} account</h4>
         </header>
         <div>
            <p>Account number: ${jsonRes.accounts[i].accountNumber}</p>
            <p>Current balance: ${jsonRes.accounts[i].currentBalance}</p>
            <p>Current transactions: ${jsonRes.transactions == null ? 0 : jsonRes.transactions.length}</p>
         </div>
         <div>
            <button value="lodgement">Lodgement</button>
            <button value="withdrawal">Withdrawal</button>
            <button value="transaction">Transaction</button>
            <button class="delete" value="delete">Delete</button>
         </div>
      `);

      cardContainer.appendChild(bankCard);
   }

   let cardContainerClickEvent = cardContainer;
   cardContainerClickEvent.addEventListener("click", doSomething, false);

   function doSomething(e){
      if(e.target !== e.currentTarget){
         let clickedItem = e.target.parentNode.parentNode.querySelector("div p");
         console.log("Select:");
         console.log(clickedItem);

         let btnClicked = e.target.value;
         console.log("What btn was clicked?");
         console.log(btnClicked);         
      }
   }

   root.appendChild(containerCreateAccountForm);

   // Sening POST mehtod to craete a new account
   const createAccountForm = document.querySelector("#createAccountForm");
   createAccountForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Select radio inputs
      const radioForm = document.getElementsByName("account");

      console.log(radioForm[0].value);
      console.log(radioForm[1].value );
      fetch(`http://localhost:49000/api/customers/${email}/${password}/accounts`, {
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
         method: 'POST',
         // TODO change the body based on form
         body: JSON.stringify({
            "currentAcc": radioForm[0].checked ? true : false,
            "currentBalance": 0.0,
            "savingAcc": radioForm[1].checked ? true : false,
            "sortCode": 112233
         })
      }).then(res => res.json().then(jsonRes => {
         console.log("Account created");
         console.log(jsonRes);
         addAccount(jsonRes, cardContainer);

      }));
   });
}