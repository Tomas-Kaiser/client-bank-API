Endpoints:

1. Login In:
GET      /customers/{email}/{passowrd}

2. Sign Up:
POST     /customers

3. Get all accounts related to the particular customer (customer dashboard):
GET      /customers/{email}/{password}/accounts

4. Create a new account:
POST     /customers/{email}/{password}/accounts

5. Delete an account:
DELETE   /customers/{email}/{password}/accounts{accNum}

6. Withdrawal:
GET      /customers/{email}/{password}/accounts{accNum}/withdrawal/{amount}

7. Lodgement:
GET      /customers/{email}/{password}/accounts{accNum}/lodgement/{amount}

8. Transfer:
GET      /customers/{email}/{password}/accounts{accNum}/transfer/{accNumReceiver}/{amount}

9. Get all customers
GET     /customers

10. Check Balance
GET      /customers/{email}/{password}/accounts/{accNum}/balance

11. Delete a customer 
DELETE   /customers/{email}/{passowrd}