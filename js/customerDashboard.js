function getCustomerDashboard(jsonRes) {

   // Create header
   const header = document.createElement("h2");
   header.innerHTML = `Welcome to your dashboard, ${jsonRes.email}!`;

   // Create a list
   const list = document.createElement("ul");
   let item = document.createElement("li");
   item.appendChild(document.createTextNode(`Address: ${jsonRes.address}`));
   list.appendChild(item);

   item = document.createElement("li");
   item.appendChild(document.createTextNode(`You have currently ${jsonRes.accounts.length} account${jsonRes.accounts.length === 1 ? "" : "s"}`));
   list.appendChild(item);

   const headerAccount = document.createElement("h3");
   headerAccount.innerHTML = `Your account${jsonRes.accounts.length === 1 ? "" : "s"}`

   // Craete a button for creating a new account
   const paraCreateNewAccount = document.createElement("p");
   paraCreateNewAccount.innerHTML = "Do you want to create a new account?"
   const btnCreateNewAccount = document.createElement("button");
   btnCreateNewAccount.innerHTML = "Create Account";


   // Render the page
   root.appendChild(header);

   root.appendChild(list);
   root.appendChild(headerAccount);

   for (let i = 0; i < jsonRes.accounts.length; i++) {
      let paraAccNum = document.createElement("p");
      let paraCurrentBalance = document.createElement("p");
      let paraTypeOfAccount = document.createElement("h4");

      paraTypeOfAccount.innerHTML = `Your ${jsonRes.accounts[i].currentAcc ? "current" : "saving"} account: `;
      root.appendChild(paraTypeOfAccount);
      paraAccNum.innerHTML = `Account number ${jsonRes.accounts[i].accountNumber}`;
      root.appendChild(paraAccNum);
      paraCurrentBalance.innerHTML = `Current balance: ${jsonRes.accounts[i].currentBalance}`;
      root.appendChild(paraCurrentBalance);

      root.appendChild(paraCreateNewAccount)
      root.appendChild(btnCreateNewAccount);



      // TODO cancel account button
   }
}