function modal(btnClicked, jsonRes, clickedCardNum) {

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
               <input type="text" id="accountReceiver" name="account" placeholder="Account number receiver"><br><br>
               <button>Submit</button>
            </form> 
         </div>
      </div>
      `);
   } else if (btnClicked === "transactions") {
      const divModalContent = document.createElement("div");
      divModalContent.setAttribute("class", "modal-content");

      divModal.appendChild(divModalContent);

      const divModalHeader = document.createElement("div");
      divModalHeader.setAttribute("class", "modal-header");
      divModalHeader.innerHTML = (`
         <span class="close">&times;</span>
         <h2>${btnClicked}</h2>
      `);

      divModalContent.appendChild(divModalHeader);

      const divModalBody = document.createElement("div");
      divModalBody.setAttribute("class", "modal-body");
      divModalContent.appendChild(divModalBody);

      
      for (i = 0; i < jsonRes.accounts[clickedCardNum].transactions.length; i++){
         const divContentBody = document.createElement("div");


         divContentBody.innerHTML = (`
         <p><b>Date:</b> ${jsonRes.accounts[clickedCardNum].transactions[i].created}</p>
         <p><b>Description:</B> ${jsonRes.accounts[clickedCardNum].transactions[i].description}</p>
         <p>******************************</p>
      `);

      divModalBody.appendChild(divContentBody);
      }



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