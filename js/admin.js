function admin() {
   document.querySelector("#balanceBtn").remove();
   document.querySelector("#container-login").remove();
   document.querySelector("#container-signup").remove();
   document.querySelector("h1").remove();
   document.querySelector("#adminBtn").remove();


   // Get all customers
   const divAdminContainer = document.createElement("div");
   divAdminContainer.setAttribute("id", "admin-container");

   divAdminContainer.innerHTML = (`
      <h2>Admin Panel</h2>

      <form id="getAllCustomersForm">
         <button>Get All Customers</button>
      </form>

      <div id="listOfCustomers"></div>
   `);

   root.appendChild(divAdminContainer);


   getAllCustomersForm = document.querySelector("#getAllCustomersForm");

   getAllCustomersForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const url = "http://localhost:49000/api/customers";

      fetch(url)
         .then(res => res.json())
         .then(jsonRes => {
            const divCustomerCardContainer = document.createElement("div");
            divCustomerCardContainer.setAttribute("id", "customer-card-container");

            for (let i = 0; i < jsonRes.length; i++) {
               const customerCard = document.createElement("div");
               customerCard.setAttribute("class", "customer-card");

               customerCard.innerHTML = (`
               <p>Customer: ${(i + 1)}</p>
               <p>Email: ${jsonRes[i].email}</p>
               <p>Id: ${jsonRes[i].id}</p>
               <p>Number of accounts: ${jsonRes[i].accounts.length}</p>
            `);
               divCustomerCardContainer.appendChild(customerCard);
            }

            const listOfCustomers = document.querySelector("#listOfCustomers");
            listOfCustomers.appendChild(divCustomerCardContainer);

            getAllCustomersForm.remove();
         });
   });
}