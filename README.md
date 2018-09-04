# mongodb-crud

List of user routes:

| Route                 |  HTTP  | Desription                                                   |
| --------------------- |:------:| ------------------------------------------------------------ |
| /signup               | POST   | Sign up withh new user info                                  |
| /signin               | POST   | Sign in while get an access token based on credentials       |
| /users                | GET    | Get all the users info (admin only)                          |
| /users/:id            | GET    | Get a single user info (admin and authenticated user)        |
| /users                | POST   | Create a user (admin only)                                   |
| /users/:id            | DELETE | Delete a user (admin only)                                   |
| /users/:id            | PUT    | Update a user with new info (admin and authenticated user)   |


```
Example :
http://localhost:3000/
```