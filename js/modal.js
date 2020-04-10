function modal(btnClicked) {
   console.log("Modal btn: ");
   console.log(btnClicked);

   const divModal = document.createElement("div");
   divModal.setAttribute("id", "myModal");
   divModal.setAttribute("class", "modal");

   if (btnClicked === "transfer") {
      divModal.innerHTML = (`
      <div class="modal-content">
         <div class="modal-header">
            <span class="close">&times;</span>
            <h2>${btnClicked}</h2>
         </div>
         <div class="modal-body">
            <form id="amountForm">
               <input type="text" id="amount" name="amount" placeholder="Amount"><br><br>
               <input type="text" id="accountReceiver" name="account" placeholder="Account number"><br><br>
               <button>Submit</button>
            </form> 
         </div>
         <div class="modal-footer">
            <h3>Modal Footer</h3>
         </div>
      </div>
      `);
   } else {
      divModal.innerHTML = (`
      <div class="modal-content">
         <div class="modal-header">
            <span class="close">&times;</span>
            <h2>${btnClicked}</h2>
         </div>
         <div class="modal-body">
            <form id="amountForm">
               <input type="text" id="amount" name="amount" placeholder="Amount"><br><br>
               <button>Submit</button>
            </form> 
         </div>
         <div class="modal-footer">
            <h3>Modal Footer</h3>
         </div>
      </div>
      `);
   }


   root.appendChild(divModal);


   // Call the modal
   const modal = document.getElementById("myModal");
   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];
   // When the user clicks on the button, open the modal
   modal.style.display = "block";

   // When the user clicks on <span> (x), close the modal
   span.onclick = function () {
      modal.style.display = "none";
      divModal.remove();
   }
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
      if (event.target == modal) {
         modal.style.display = "none";
         divModal.remove();
      }
   }

}