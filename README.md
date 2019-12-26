## API Documentation MINI-WP


Dc-MiniWp build with:

```javascript
1. express
2. mongoose
3. vuejs
4. sweetallert2
5. boostrap-vue
6. vue-awesome-notification
```

### Base URL: 'http://wpserver.dreamcarofficial.com'

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

| Routes               | HTTP  | Headers | Body        | Description                  |
| -------------------- | ----- | ------- | ----------- | ---------------------------- |
| /users/find/login    | GET   | token   | none        | Get data of User login       |
| /users/getId/fol     | GET   | token   | none        | Get Following Id for Article |
| /users/change/status | PATCH | token   | none        | Update change status Private |
| /users/upload        | PATCH | token   | image: File | Update profile picture       |



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
  "token": String,
  "user": {
    "Followers": [
      {
        "Followers": Array of ObjectId,
        "Following": Array of ObjectId,
        "RequestIn": Array,
        "RequestOut": Array,
        "_id": ObjectId,
        "username": String,
        "password": String,
        "email": String,
        "createdAt": Date,
        "status": Boolean,
        "image": String,
        "color": String,
        "__v": 0
      }
    ],
    "Following": [
      {
        "Followers": Array of ObjectId,
        "Following": Array of ObjectId,
        "RequestIn": Array,
        "RequestOut": Array,
        "_id": ObjectId,
        "username": String,
        "password": String,
        "email": String,
        "createdAt": Date,
        "status": Boolean,
        "image": String,
        "color": String,
        "__v": 0
      }
    ],
    "RequestIn": Array,
    "RequestOut": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "createdAt": Date,
    "status": Boolean,
    "image": String,
    "color": String,
    "__v": 0
  }
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

### Body :

```java
{
	"email": String
}
```



<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```



## <span style='color:green'>PATCH</span> /users/confirm

​	Confirm the code from email

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "email": String,
  "verify": String
}
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"status": Boolean
}
```



## <span style='color:green'>PATCH</span> /changepass

​	change with new Password

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "email": String,
  "newPass": String
}
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"msg": String,
  "user": {
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
}
```



## <span style='color:green'>GET</span> /users/find/login

​	Get data of User Login

### Authentication

<span style='color:red'>Token</span>

### Responses: <blockquote>application/json</blockquote>

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



## <span style='color:green'>PATCH</span> /users/change/status

​	Change status Private / Public

### Authentication

<span style='color:red'>Token</span>

### Responses: <blockquote>application/json</blockquote>

```java
{
  "msg": String
}
```

## <span style='color:green'>PATCH</span> /users/upload

​	Update Profile Image

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
	"image": File
}
```



### Responses: <blockquote>application/json</blockquote>

```java
{
  "url": String
}
```



```java
2. List of Article Routes :
```

| Routes                 | HTTP   | Headers | Body                                                         | Description                              |
| ---------------------- | ------ | ------- | ------------------------------------------------------------ | ---------------------------------------- |
| /articles/one/{:id}    | GET    | token   | none                                                         | Get One Article                          |
| /articles/public       | GET    | token   | none                                                         | Get All Article (except Private Profile) |
| /articles              | GET    | token   | none                                                         | Get User Login Article                   |
| /articles/folArt/{:id} | GET    | token   | none                                                         | Get User Article                         |
| /articles/tag/{:tag}   | GET    | token   | none                                                         | Find Article by Tag                      |
| /articles/upload       | POST   | token   | newtags: String<br />title: String<br />content: String<br />url: File | Create new Article                       |
| /articles/{:id}        | PUT    | token   | title: String<br />content: String                           | Update Article                           |
| /articles/{:id}        | PATCH  | token   | none                                                         | Like or unlike the article               |
| /articles/{:id}        | DELETE | token   | none                                                         | Delete Article                           |



## <span style='color:green'>GET</span> /articles/one/{:id}

​	Get One Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
{
  "tags": Array,
  "Likes": Array of ObjectId,
  "_id": ObjectId,
  "title": String,
  "content": String,
  "featured_image": String,
  "Author": {
    "Followers": Array of ObjectId,
    "Following": Array of ObjectId,
    "RequestIn": Array of ObjectId,
    "RequestOut": Array of ObjectId,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "createdAt": Date,
    "status": Boolean,
    "image": String,
    "color": String,
    "__v": 0
  },
  "createdAt": Date,
  "__v": 0
}
```

## <span style='color:green'>GET</span> /articles/public

​	Get All Article (except private User)

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
[
  {
    "tags": Array,
    "Likes": Array of ObjectId,
    "_id": ObjectId,
    "title": String,
    "content": String,
    "featured_image": String,
    "Author": {
      "Followers": Array of ObjectId,
      "Following": Array of ObjectId,
      "RequestIn": Array of ObjectId,
      "RequestOut": Array of ObjectId,
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "createdAt": Date,
      "status": Boolean,
      "image": String,
      "color": String,
      "__v": 0
    },
    "createdAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```

## <span style='color:green'>GET</span> /articles

​	Get Login Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
[
  {
    "tags": Array,
    "Likes": Array of ObjectId,
    "_id": ObjectId,
    "title": String,
    "content": String,
    "featured_image": String,
    "Author": {
      "Followers": Array of ObjectId,
      "Following": Array of ObjectId,
      "RequestIn": Array of ObjectId,
      "RequestOut": Array of ObjectId,
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "createdAt": Date,
      "status": Boolean,
      "image": String,
      "color": String,
      "__v": 0
    },
    "createdAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```

## <span style='color:green'>GET</span> /articles/folArt/{:id}

​	Get User Following Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
[
  {
    "tags": Array,
    "Likes": Array of ObjectId,
    "_id": ObjectId,
    "title": String,
    "content": String,
    "featured_image": String,
    "Author": {
      "Followers": Array of ObjectId,
      "Following": Array of ObjectId,
      "RequestIn": Array of ObjectId,
      "RequestOut": Array of ObjectId,
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "createdAt": Date,
      "status": Boolean,
      "image": String,
      "color": String,
      "__v": 0
    },
    "createdAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```

## <span style='color:green'>GET</span> /articles/tag/{:tag}

​	Get All Article by Tag name

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
[
  {
    "tags": Array,
    "Likes": Array of ObjectId,
    "_id": ObjectId,
    "title": String,
    "content": String,
    "featured_image": String,
    "Author": {
      "Followers": Array of ObjectId,
      "Following": Array of ObjectId,
      "RequestIn": Array of ObjectId,
      "RequestOut": Array of ObjectId,
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "createdAt": Date,
      "status": Boolean,
      "image": String,
      "color": String,
      "__v": 0
    },
    "createdAt": Date,
    "__v": 0
  },
  {...},
  {...}
]
```

## <span style='color:green'>POST</span> /articles/upload

​	Create new Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
 	"tags": String,
  "title": String,
	"content": String,
  "url": File
}
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"msg": String,
  "article": {
    "tags": Array,
    "Likes": Array of ObjectId,
    "_id": ObjectId,
    "title": String,
    "content": String,
    "featured_image": String,
    "Author": ObjectId,
    "createdAt": Date,
    "__v": 0
  },
}
```

## <span style='color:green'>PUT</span> /articles/{:id}

​	Update Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "title": String,
  "content": String,
  "tags" String
}
```



Responses: <blockquote>application/json</blockquote>

```java
{
  "tags": Array,
  "Likes": Array of ObjectId,
  "_id": ObjectId,
  "title": String,
  "content": String,
  "featured_image": String,
  "Author": ObjectId,
  "createdAt": Date,
  "__v": 0
},
```

## <span style='color:green'>PATCH</span> /articles/{:id}

​	Like / Unlike the Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"msg": String
}
```

## <span style='color:green'>DELETE</span> /articles/{:id}

​	Delete the Article

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"msg": String
}
```



```java
3. List of Message Route :
```

## <span style='color:green'>GET</span> /msg

​	Get all Messages

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
[
  {
    "UserId": {
      "Followers": Array of ObjectId,
      "Following": Array of ObjectId,
      "RequestIn": Array of ObjectId,
      "RequestOut": Array of ObjectId,
      "_id": ObjectId,
      "username": String,
      "password": String,
      "email": String,
      "createdAt": Date,
      "status": Boolean,
      "image": String,
      "color": String,
      "__v": 0
    },
    "msg": String,
    "createdAt": Date
  },
  {...},
  {...}
]
```

## <span style='color:green'>POST</span> /msg

​	Create a Message

### Authentication

<span style='color:red'>Token</span>

### Body :

```java
{
  "msg": String
}
```

Responses: <blockquote>application/json</blockquote>

### Response :

```java
{
  "UserId": {
    "Followers": Array of ObjectId,
    "Following": Array of ObjectId,
    "RequestIn": Array of ObjectId,
    "RequestOut": Array of ObjectId,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "createdAt": Date,
    "status": Boolean,
    "image": String,
    "color": String,
    "__v": 0
  },
  "msg": String,
  "createdAt": Date
},
```



```java
4. List of Quote Route :
```

## <span style='color:green'>GET</span> /quote

​	Get One Quote

### Body :

```java
none
```



Responses: <blockquote>application/json</blockquote>

```java
{
	"author": String,
  "body": String
}
```

## 

## USAGE

```java
$ npm install
$ npm run dev
```

