## API Documentation MINI-WP


Dc-MiniWp build with:

```javascript
1. express
2. mongoose
3. vuejs
4. sweetallert2
5. boostrap-vue
```

### Base URL: 'http://localhost:3000'

## <span style='color:red'>Error Response</span> :

```java
[
  {
    "status": 400,
    "msg": [
      "email/password wrong",
      "username is required",
      "password is required",
      "email is required",
      "title is required",
      "content is required",
			"featured_image is required",
      "Article need Image / Problem with GCS",
      "cannot Update with empty value",
      "Exp Verify please try again"
    ]
  },
  {
    "status": 401,
    "msg": [
      "Authorization Error"
    ]
  },
  {
    "status": 403,
    "msg": [
      "Authentication Error",
      "Invalid Token / problem with Token",
      "Cant check yourSelf",
      "Wrong code / exp Code Verify Check your Email or request again",
      "the Email allready used!"
    ]
  },
  {
    "status": 404,
    "msg": [
      "The searched id was not found",
      "Target Not Found!"
    ]
  },
  {
    "status": 500,
    "msg": [
      "Internal Server Error"
    ]
  }
]
```



## <span style='color:green'>Routes</span> :

```java
1. List of User Routes:
```

| Routes                      | HTTP  | Headers | Body                                                         | Description                                 |
| --------------------------- | ----- | ------- | ------------------------------------------------------------ | ------------------------------------------- |
| /users/signup               | POST  | none    | username:String <span style='color:red'>(required) </span><br />password:String <span style='color:red'>(required) </span><br />email:String <span style='color:red'>(required) </span> | Create new Account                          |
| /users/signin               | POST  | none    | email:String <span style='color:red'>(required) </span> <br />password:String <span style='color:red'>(required) </span> | Logged in to your exist account             |
| /users                      | GET   | token   | none                                                         | Get All users                               |
| /users/{:id}                | GET   | token   | none                                                         | Get Logged in User                          |
| /users/status/{:id}         | GET   | token   | none                                                         | Check Status params id Users                |
| /users/status/public/{:id}  | PATCH | token   | none                                                         | Follow or Unffolow Users (params) (!status) |
| /users/status/private/{:id} | PATCH | token   | none                                                         | Request to Following (status)               |
| /users/status/accept/{:id}  | PATCH | token   | none                                                         | Accept the Request in                       |
| /users/status/decline/{:id} | PATCH | token   | none                                                         | Decline the Request in                      |

```java
1.a List for Reset Password Users
```



| Routes                | HTTP  | headers | Body                                                      | Description                      |
| --------------------- | ----- | ------- | --------------------------------------------------------- | -------------------------------- |
| /users/confirm/verify | POST  | none    | email:String <span style='color:red'>(required) </span>   | Send verify code to Email (body) |
| /users/confirm        | PATCH | none    | verify:String <span style='color:red'>(required) </span>  | Confirm the code verify          |
| /users/changepass     | PATCH | none    | newpass:String <span style='color:red'>(required) </span> | Create new Password              |



## <span style="color:green">POST</span> /users/signup

​		Create new Account

### Body: <span style='color:red'>(required)</span>

```java
{
  "username": String,
  "password": String,
  "email": String
}
```


Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
    "msg": String,
    "user": {
        "Followers": Array,
        "Following": Array,
        "RequestIn": Array,
        "RequestOut": Array,
        "_id": ObjectId,
        "username": String,
        "password": String,
        "email": String,
        "status": Boolean,
        "createdAt": Date,
        "__v": 0
    },
    "token": String
}
```



## <span style="color:green">POST</span> /users/signin

​		Logged in User

### Body: <span style='color:red'>(required)</span>

```java
{
  "username": String,
  "password": String
}
```


Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
    "token": String
}
```



## <span style="color:green">GET</span> /users

​		Get All Users

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
[
  {
    "Followers": Array of ObjectId,
    "Following": Array of ObjectId,
    "RequestIn": Array of ObjectId,
    "RequestOut": Array of ObjectId,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "status": Boolean,
    "createdAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```



## <span style="color:green">GET</span> /users/{:id}

​		Get LoggedIn Users

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "Followers": Populate ObjectId,
  "Following": Populate ObjectId,
  "RequestIn": Populate ObjectId,
  "RequestOut": Populate ObjectId,
  "_id": ObjectId,
  "username": String,
  "password": String,
  "email": String,
  "status": Boolean,
  "createdAt": Date,
  "__v": 0
}
```



## <span style="color:green">GET</span> /users/{:id}

​		Get LoggedIn Users

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "Followers": Populate ObjectId,
  "Following": Populate ObjectId,
  "RequestIn": Populate ObjectId,
  "RequestOut": Populate ObjectId,
  "_id": ObjectId,
  "username": String,
  "password": String,
  "email": String,
  "status": Boolean,
  "createdAt": Date,
  "__v": 0
}
```



## <span style="color:green">GET</span> /users/status/{:id}

​		Check Status Users

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "status": Boolean
}
```



## <span style="color:green">PATCH</span> /users/status/public/{:id}

​		Follow / unFollow Users 

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```



## <span style="color:green">PATCH</span> /users/status/private{:id}

​		Request Follow if(!status)

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```



## <span style="color:green">PATCH</span> /users/status/accept{:id}

​		Accept the Request in

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```



## <span style="color:green">PATCH</span> /users/status/decline/{:id}

​		Decline Request In

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```



## <span style="color:green">POST</span> /users/confirm/verify

​		Send verify Code to Email for reset the password

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "Followers": Populate ObjectId,
  "Following": Populate ObjectId,
  "RequestIn": Populate ObjectId,
  "RequestOut": Populate ObjectId,
  "_id": ObjectId,
  "username": String,
  "password": String,
  "email": String,
  "status": Boolean,
  "createdAt": Date,
  "__v": 0
}
```

