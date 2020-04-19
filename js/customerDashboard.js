function getCustomerDashboard(jsonRes, email, password) {

   // Create header
   const header = document.createElement("h2");
   header.setAttribute("class", "welcome-header");
   header.innerHTML = `Welcome to your dashboard, ${jsonRes.email}!`;

   // Create a unorder list
   const list = document.createElement("ul");
   list.setAttribute("class", "customerDetail");
   const h3 = document.createElement("h3");
   h3.textContent = "Your Details:";

   list.innerHTML = (`
      <li>Address: ${jsonRes.address}</li>
      <li>You have currently <span id="accountNumber">${jsonRes.accounts.length}</span> account${jsonRes.accounts.length === 1 ? "" : "s"} open</li>
      <li><button id="deleteCustomerBtn" class="delete">Delete whole account</button></li>
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

   // Delete customer
   const deleteCusBtn = document.querySelector("#deleteCustomerBtn");
   deleteCusBtn.addEventListener("click", function (e) {
      //   DELETE   /customers/{email}/{passowrd}
      const url = `http://localhost:49000/api/customers/${email}/${password}`
      fetch(url, {
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
         method: 'DELETE'
      }).then(res => res.text().then(text => {
         console.log(text);
         root.innerHTML = (`
            <h3>Account has been deleted!</h3>
         `);
      }));
   });


   let numOfTheBankCard = 0;
   for (let i = 0; i < jsonRes.accounts.length; i++) {
      let bankCard = document.createElement("div");
      bankCard.setAttribute("class", "card");
      // TODO cancel account button
      bankCard.innerHTML = (`
         <header>
            <h4>${jsonRes.accounts[i].currentAcc ? "Current" : "Saving"} account</h4>
         </header>
         <div>
            <p style="display:none">Num: <span class="num">${numOfTheBankCard++}</p>         
            <p>Account number: <span class="account-number">${jsonRes.accounts[i].accountNumber}</span></p>
            <p>Current balance: <span class="balance">${jsonRes.accounts[i].currentBalance}</span></p>
            <p>Current transactions: <span class="transactions">${jsonRes.accounts[i].transactions == null ? 0 : jsonRes.accounts[i].transactions.length}</span></p>
         </div>
         <div>
            <button value="lodgement">Lodgement</button>
            <button value="withdrawal">Withdrawal</button>
            <button value="transfer">Transfer</button>
            <button value="transactions">All Transactions</button>
            <button class="delete" value="delete">Delete</button>
         </div>
      `);

      cardContainer.appendChild(bankCard);
   }

   let cardContainerClickEvent = cardContainer;
   cardContainerClickEvent.addEventListener("click", accountOperation, false);

   function accountOperation(e) {
      if (e.target !== e.currentTarget) {
         let selectAccountNumber = e.target.parentNode.parentNode.querySelector("div .account-number");
         let accountNumber = selectAccountNumber.textContent;
         let balance = e.target.parentNode.parentNode.querySelector("div .balance");
         let transactions = e.target.parentNode.parentNode.querySelector("div .transactions");
         let clickedCardNum = e.target.parentNode.parentNode.querySelector("div .num");
         let selectCard = e.target.parentNode.parentNode;

         let btnClicked = e.target.value;
         console.log("Button clicked: ", btnClicked);


         e.stopPropagation();

         // Call modal        
         switch (btnClicked) {
            case "lodgement":
            case "withdrawal":
            case "transfer":
               modal(btnClicked);
               break;
            case "transactions":
               modal(btnClicked, jsonRes, clickedCardNum.textContent);
               break;
            case "delete":
               deleteAccount(email, password, accountNumber, selectCard);
               console.log("Call delete()");
         }

         if (btnClicked === "lodgement" || btnClicked === "withdrawal" || btnClicked === "transfer") {
            const amountForm = document.querySelector("#amountForm");

            amountForm.addEventListener("submit", function (e) {
               e.preventDefault();
               const modal = document.getElementById("myModal");
               const amount = document.querySelector("#amount").value;
               let accountReceiver;
               if (btnClicked === "transfer") {
                  accountReceiver = document.querySelector("#accountReceiver").value;
               }
               modal.remove();

               console.log("Modal - amount: " + amount);

               switch (btnClicked) {
                  case "lodgement":
                  case "withdrawal":
                     // call fetch
                     lodgeOrWithdrawal(btnClicked, email, password, accountNumber, amount, balance, transactions);
                     break;
                  case "transfer":
                     // call fetch
                     transfer(btnClicked, email, password, accountNumber, accountReceiver, amount, balance, transactions);
                     break;
               }
            });
         }

      }
   }

   root.appendChild(containerCreateAccountForm);

   // Sending POST mehtod to craete a new account
   const createAccountForm = document.querySelector("#createAccountForm");
   createAccountForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Select radio inputs
      const radioForm = document.getElementsByName("account");

      console.log(radioForm[0].value);
      console.log(radioForm[1].value);
      fetch(`http://localhost:49000/api/customers/${email}/${password}/accounts`, {
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
         method: 'POST',
         // TODO change the body based on form
         body: JSON.stringify({
            "currentAcc": radioForm[0].checked ? true : false, // without ternary?? .checked should return true or false therefore we do not have to use the ternary operator
            "currentBalance": 0.0,
            "savingAcc": radioForm[1].checked ? true : false,
            "sortCode": 112233
         })
      }).then(res => res.json().then(jsonRes => {
         console.log("Account created");
         console.log(jsonRes);
         const accNum = document.querySelector("#accountNumber");
         accNum.textContent++;


         addAccount(jsonRes, cardContainer, numOfTheBankCard);
         numOfTheBankCard++;
      }));
   });
}

function lodgeOrWithdrawal(type, email, password, accountNumber, amount, balance, transactions) {
   // /{accNum}/withdrawal/{amount}
   fetch(`http://localhost:49000/api/customers/${email}/${password}/accounts/${accountNumber}/${type}/${amount}`, {
      headers: {
         "Accept": "application/json",
         "Accept": "text/plain",
         "Content-Type": "application/json"
      },
      method: "GET"
   }).then(res => res.json().then(jsonRes => {
      console.log(jsonRes);
      console.log("Balaaance", balance);
      balance.textContent = jsonRes;
      console.log(transactions.textContent);
      transactions.textContent++;
   }));
}

function deleteAccount(email, password, accountNumber, selectCard) {
   fetch(`http://localhost:49000/api/customers/${email}/${password}/accounts/${accountNumber}`, {
      headers: {
         "Accept": "application/json",
         "Accept": "text/plain",
         "Content-Type": "application/json"
      },
      method: "DELETE"
   }).then(res => res.text().then(text => {
      console.log(text);
      selectCard.remove();

      const accNum = document.querySelector("#accountNumber");
      accNum.textContent--;
   }));
}

function transfer(type, email, password, accountNumber, accountReceiver, amount, balance, transactions) {
   fetch(`http://localhost:49000/api/customers/${email}/${password}/accounts/${accountNumber}/${type}/${accountReceiver}/${amount}`, {
      headers: {
         "Accept": "application/json",
         "Accept": "text/plain",
         "Content-Type": "application/json"
      },
      method: "GET",
   }).then(res => res.json().then(jsonRes => {
      console.log(jsonRes)
      balance.textContent = `${balance.textContent - amount}`;
      transactions.textContent++;
   }));
}