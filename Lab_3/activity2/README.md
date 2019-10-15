# To run teh application 
``` npm start ```

# Activity 2
Used Mongo DB as persistence store 

Connection url: mongodb://localhost:27017/

Application creates " answers" database.

answers has 3 collections:

session: to store session data

credentials: to store admin credentials, used to authorize

userAnswers: stores responses of questions of each user

session: to store user session information

# Activity 3

## user Authorization to add questions:

C2: 
To validate user for adding questions, i am checking the user against valid credentials.

User should be admin, for which valid credentials are :

Username: admin

Password: admin

In case of new user, user needs to register, and then when login next time validated against teh registered credentials.

