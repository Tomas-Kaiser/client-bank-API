Endpoints:

1. Login In:
GET      /customers/{email}/{passowrd}

2. Sign Up:
POST     /customers

3. Get all accounts related to the particular customer (customer dashboard):
GET      /customers/{email}/{passowrd}/accounts


4. Create a new account:
POST     /customers/{email}/{passowrd}/accounts

5. Delete an account:
DELETE   /customers/{email}/{passowrd}/accounts{accNum}

6. Withdrawal:
GET      /customers/{email}/{passowrd}/accounts{accNum}/withdrawal/{amount}

6. Lodgement:
GET      /customers/{email}/{passowrd}/accounts{accNum}/lodgement/{amount}

7. Transfer:
GET      /customers/{email}/{passowrd}/accounts{accNum}/transfer/{accNumReceiver}/{amount}


Admin panel:
8. Get all accounts

9. Get all transactions

10. Get a particular account 
GET      /customers/{email}/{passowrd}/accounts{accNum}