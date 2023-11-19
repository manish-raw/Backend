# Backend

I have been working on this project from October'23. During this journey I learnt a lot of things which includes

- Authentication
- Authorization
- [JWT](https://jwt.io/)
- AccessToken
- RefreshToken
- Middlewares
- Routes

## Steps to test this project using Postman Tool.

Make sure you have postman installed (Thunder client will also work).  
After cloning this project please add .env file which inculudes.  
PORT = enter your port number.  
DATABASE_URL = enter you mongodb url.  
ACCESS_TOKEN_SECRET = enter_your_secret_access_token.  
REFRESH_TOKEN_SECRET = enter_your_secret_refresh_token.

**Register a user**
```javascript
URL : http://localhost:PORT_NUMBER/register
{
    "emailID": "example@domain.com",
    "password": "examplePassowrd"
}
```

**Authenticate User**
```javascript
URL : http://localhost:PORT_NUMBER/auth
{
    "emailID": "example@domain.com",
    "password": "examplePassowrd"
}
```