# WorkHaus

## API Reference

### 1. Users

- [Log in](#1-login-user)
- [Signup](#2-signup-user)
- [update](#3-update-user)
- [get user info](#4-get-user-info)

## Routes

### Users

### 1. Login user

`/users/login`

```rest
POST {{host}}/login
Content-Type: application/json
Accept: application/json

{
   "email": "datav72731@soulsuns.com",
   "password": "alain1231"
}
```

### 2. Signup user

0 if user is a freelancer or 1 if user is a client

```rest
POST {{host}}/signup/0
Content-Type: application/json
Accept: application/json

{
   "email": "datav72731@soulsuns.com",
   "password": "alain1231",
   "names": "Alain C",
   "country": "rwanda"
}
```

### 3. update user

```rest
PATCH {{host}}/update
Content-Type: application/json
Accept: application/json
Authorization: Bearer {{userToken}}

{
   "bankDetails": {
      "accountNumber": "1234567890",
      "bankName": "banque mondiale",
      "ba"
   },
   "skills": ["Graphic design", "audio production"],
   "type": 1,
   "phoneNumber": "0780964422"
}
```