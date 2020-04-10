function addAccount(jsonRes, cardContainer, numOfTheBankCard) {
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
         <p style="display:none">Num: <span class="num">${numOfTheBankCard}</p>  
         <p>Account number: <span class="account-number">${jsonRes.accountNumber}</span></p>
         <p>Current balance: <span class="balance">${jsonRes.currentBalance}</span></p>
         <p>Transactions: <span class="transactions">${jsonRes.transactions == null ? 0 : jsonRes.transactions.length}</span></p>
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