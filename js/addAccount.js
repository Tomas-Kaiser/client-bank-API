function addAccount(jsonRes, cardContainer) {
   /*
     accountNumber: 79718121
     currentAcc: true
     currentBalance: 0
     id: 2
     savingAcc: true
     sortCode: 112233
     transactions: []
  */
   let bankCard = document.createElement("div");
   bankCard.setAttribute("class", "card");
   bankCard.innerHTML = (`
      <header>
         <h4>${jsonRes.currentAcc ? "Current" : "Saving"} account:</h4>
      </header>
      <div>
         <p>Account number: ${jsonRes.accountNumber}</p>
         <p>Current balance: ${jsonRes.currentBalance}</p>
         <p>Transactions: ${jsonRes.transactions == null ? 0 : jsonRes.transactions.length}</p>
      </div>
      <div>
         <button>Lodgement</button>
         <button>Withdrawal</button>
         <button>Payment</button>
         <button class="delete">Delete</button>
      </div>
   `);

   cardContainer.appendChild(bankCard);
}