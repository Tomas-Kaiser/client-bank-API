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

8. Get all customers
GET     /customers

9. Check Balance
GET      /customers/{email}/{passowrd}/accounts/{accNum}/balance

10. Delete a customer 
DELETE   /customers/{email}/{passowrd}