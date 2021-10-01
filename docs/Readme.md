# WorkHaus

## API Reference

### Users

- [Log in](#1-login-user)
- [Signup](#2-signup-user)
- [update](#3-update-user)
- [get user info](#4-get-user-info)

### Categories

- [Get categories](#5-get-categories)

### Tasks

- [Add a new task](#6-add-a-new-task)
- [Get task by id](#7-get-task-by-id)
- [Get task by category id](#8-get-task-by-category-id)
- [Register interest on task](#9-register-interest-on-task)
- [Update task completion](#10-update-task-completion)
- [Users can update the progress of a task](#11-users-can-update-task-progress)
- [Approve users for a task](#12-approve-users-for-task)

### Transactions

- [Get transactions](#13-get-transactions)
- [Payout](#14-payout)
- [Top up](#15-top-up)
- [Get countries](#16-get-countries)
- [Search products](#17-search-products)
- [Order giftcards](#18-order-giftcards)
- [Redeem giftcard](#19-redeem-giftcard)

### Wallets

- [Get wallet](#20-get-wallet)

### All Routes

### 1. Login user

```rest
POST /v1/users/login
Content-Type: application/json
Accept: application/json

{
   "email": "datav72731@soulsuns.com",
   "password": "alain1231"
}
```
Response :

```json
{
  "status": 200,
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjE0YzhiMmM4MTAyZmRjYzhiOGIyMjkzIiwiYWNjZXNzIjowLCJpYXQiOjE2MzMwNzM2NjMsImV4cCI6MTYzNTY2NTY2M30.toH14mCR2b56hYxDDHo8GA2VTuSltuvj9ugKI3qKh2U",
    "access": 0
  }
}
```

### 2. Signup user

**0 if user is a freelancer or 1 if user is a client**

```rest
POST /v1/users/signup/0
Content-Type: application/json
Accept: application/json

{
   "email": "datav72731@soulsuns.com",
   "password": "alain1231",
   "names": "Alain C",
   "country": "rwanda"
}
```
Response :

```json

{
  "status": 201,
  "message": "Signed up successfully!",
  "data": {
    "email": "datav7273w1@soulsuns.com",
    "password": "$2b$10$/L3oy6g7uOlc0EfXthd7x.jLaKAldehuLRdt2m5de03DdCqbbhAJ.",
    "names": "Alain C",
    "country": "rwanda",
    "type": 0,
    "isVerified": false,
    "skills": [],
    "_id": "6156ba3716b56c0b62df6a83",
    "createdAt": "2021-10-01T07:35:19.417Z",
    "__v": 0
  }
}
```
### 3. update user

```rest
PATCH /v1/users/update
Content-Type: application/json
Accept: application/json
Authorization: Bearer {{userToken}}

{
   "bankDetails": {
      "accountNumber": "1234567890",
      "bankName": "banque mondiale",
      "bankId": "054"
   },
   "skills": ["Graphic design", "audio production"],
   "type": 1,
   "phoneNumber": "0780964422"
}
```
Response

```json

{
  "status": 200,
  "message": "User information was updated"
}
```
### 4. Get user info   

```rest
GET /v1/users/
Content-Type: application/json
Accept: application/json
Authorization: Bearer {{userToken}}
```
Response
```json
{
  "status": 200,
  "message": "User information was pulled",
  "data": {
    "bankDetails": {
      "accountNumber": 1234567890,
      "bankName": "banque mondiale",
      "bankId": "054"
    },
    "_id": "614c8efb4e59e2d469a66523",
    "email": "letiga1665@timevod.com",
    "password": "$2b$10$RbYoiJoaRVbF3zezth23yuUNxu7MxZuEDdCrKfcoYCpTLYvINrVWu",
    "names": "Alain C",
    "country": "RW",
    "type": 1,
    "isVerified": true,
    "skills": [
      "Graphic design",
      "audio production"
    ],
    "createdAt": "2021-09-23T14:28:11.494Z",
    "__v": 0,
    "phoneNumber": "0780964422"
  }
}
```

### 5. Get categories

```rest

GET /v1/categories/
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{adminToken}}
```

Response
```json

{
  "status": 200,
  "message": "Category found",
  "data": [
    {
      "_id": "614b3b3c3433aaf413214c1e",
      "name": "Graphic design",
      "description": "Graphic design is the process of visual communication and problem-solving through the use of typography, photography, and illustration.",
      "__v": 0
    }
  ]
}
```

### 6. Add a new task

```rest
POST /v1/tasks/add
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{companyToken}}

{
    "title": "Graphic design",
    "description": "bla bla bla bla bla bla bla bla",
    "amount": "10",
    "category": "614b3b3c3433aaf413214c1e"
}

```
**After a task is created redirect the user to this link to deposit the money**
Response
```json
{
  "status": 201,
  "message": "Tasks created",
  "data": {
    "pay": {
      "link": "https://ravemodal-dev.herokuapp.com/v3/hosted/pay/92bacd15e9c9557fdfa1"
    },
    "task": {
      "title": "Graphic design",
      "description": "bla bla bla bla bla bla bla bla",
      "status": "unVerified",
      "amount": 10,
      "attachement": [],
      "deletedAt": null,
      "user": "61421cb14cc5fa0a638aa036",
      "txRef": "5c849557-1b0d-4a48-b86a-27346b99d6a2",
      "category": "614b3b3c3433aaf413214c1e",
      "progress": "unstarted",
      "completion": "incomplete",
      "_id": "6156bdda16b56c0b62df6a8e",
      "interests": [],
      "createdAt": "2021-10-01T07:50:50.729Z",
      "__v": 0
    }
  }
}
```

### 7. Get task by Id

**ex: GET /v1/tasks/614dd30a879ae119d42f01cc**

```rest
GET /v1/tasks/:id 
Accept: application/json
Authorization: Bearer {{userToken}}
```

```json
{
  "status": 200,
  "message": "Tasks found",
  "data": [
    {
      "_id": "614dd30a879ae119d42f01cc",
      "title": "Graphic design",
      "description": "bla bla bla bla bla bla bla bla",
      "status": "Verified",
      "amount": 10,
      "attachement": [],
      "deletedAt": null,
      "user": "614dcc5e4a6118d6dae91494",
      "txRef": "f3f1addd-1f09-45ab-b7ea-c34c9305dd37",
      "category": "614b3b3c3433aaf413214c1e",
      "progress": "unstarted",
      "completion": "completed",
      "interests": [
        {
          "user": "614c8efb4e59e2d469a66523",
          "status": "approved",
          "_id": "614dd3b6879ae119d42f01d0"
        },
        {
          "user": "614c8b2c8102fdcc8b8b2293",
          "status": "pending",
          "_id": "614dd3bc879ae119d42f01d2"
        }
      ],
      "createdAt": "2021-09-24T13:30:50.746Z",
      "__v": 0
    }
  ]
}
```

### 8. Get task by category Id:

***ex: GET /v1/tasks/sort/category/614b3b3c3433aaf413214c1e***

```rest
GET /v1/tasks/sort/category/:id
Accept: application/json
Authorization: Bearer {{userToken}}
```

```json
{
  "status": 200,
  "message": "Tasks found",
  "data": [
    {
      "progress": "unstarted",
      "completion": "incomplete",
      "_id": "614b4e7f8ade9529646a87e2",
      "title": "Graphic design",
      "description": "bla bla bla bla bla bla bla bla",
      "status": "unVerified",
      "attachement": [],
      "interests": [],
      "deletedAt": null,
      "user": "61421f63ac0820d8f463037b",
      "txRef": "151d729a-d3b0-4fb8-b37d-90bf16b09d77",
      "category": "614b3b3c3433aaf413214c1e",
      "createdAt": "2021-09-22T15:40:47.216Z",
      "__v": 0
    },
    {
      "_id": "614b8aeb793e48f76439bc10",
      "title": "Graphic design",
      "description": "bla bla bla bla bla bla bla bla",
      "status": "unVerified",
      "attachement": [],
      "interests": [
        {
          "_id": "6156bee290274eff937b83bb"
        }
      ],
      "deletedAt": null,
      "user": "61421f63ac0820d8f463037b",
      "txRef": "f79b54b5-9019-401b-b005-69a6ec78c05c",
      "category": "614b3b3c3433aaf413214c1e",
      "progress": "unstarted",
      "completion": "incomplete",
      "createdAt": "2021-09-22T19:58:35.261Z",
      "__v": 0
    },
  ]
  ```

### 9. Register interest on Task

***ex: PATCH /v1/tasks/interest/614b4e7f8ade9529646a87e2***

```rest
PATCH /v1/tasks/interest/:id
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{userToken2}}
```

Response

```json

{
  "status": 200,
  "message": "Interest registered",
  "data": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

### 10. update task completion

***ex: PATCH /v1/tasks/completion/614b4e7f8ade9529646a87e2***

```rest
PATCH /v1/tasks/completion/:id
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{userToken2}}

{
    "completion": "completed"
}
```

### 11. Users can update task progress

PATCH {{host}}/progress/614b082ce1f12d838bedab06
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{userToken}}

{
    "progress": "finishes"
}

### 12. approve users for task

***ex: PATCH /v1/tasks/approve/interest/614b4e7f8ade9529646a87e2***

```rest
PATCH /v1/tasks/approve/interest/:id
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{companyToken}}

{
    "status": "approved",
    "user": "614c8b2c8102fdcc8b8b2293"
}
```

### 13. Get transactions:

```rest
GET /v1/transactions
Accept: application/json
Authorization: Bearer {{userToken}}
```

```json
{
  "status": 200,
  "message": "Transactions found",
  "data": [
    {
      "status": "pending",
      "_id": "614dd5e5e7b18b2e19fbfdb3",
      "user": "614c8efb4e59e2d469a66523",
      "amount": 10,
      "type": "debit",
      "reference": "f3f1addd-1f09-45ab-b7ea-c34c9305dd37",
      "__v": 0
    },
    {
      "_id": "614efbafeb94e996eb169d6f",
      "user": "614c8efb4e59e2d469a66523",
      "amount": 10,
      "type": "credit-payout",
      "reference": "207496-99942ec6-412d-4127-ad62-cb98a5d2f96b",
      "status": "pending",
      "__v": 0
    },
  ]
}
```

### 14. Payout

```rest
POST /v1/transactions/payout
Accept: application/json
Content-Type: application/json
Authorization: Bearer {{userToken}}

{
    "amount": 10
}
```

Response

```json
{
  "status": 200,
  "message": "Transaction successful",
  "data": {
    "user": "614c8efb4e59e2d469a66523",
    "amount": 10,
    "type": "credit-payout",
    "reference": "207837-b7709e6a-76ce-4115-aac2-e24311af8e00",
    "status": "pending",
    "_id": "6156ca1016b56c0b62df6aa3",
    "__v": 0
  }
}
```

### 15. Top up

```rest
POST /v1/transactions/topup
Accept: application/json
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "amount": 0.3,
    "number": "0780964422",
    "country": "RW"
}
```

Response

```json
{
  "status": 200,
  "message": "Transaction successful",
  "data": {
    "user": "614c8efb4e59e2d469a66523",
    "amount": 0.3,
    "type": "credit-topup",
    "reference": "20650",
    "status": "pending",
    "_id": "6156c89316b56c0b62df6a9e",
    "__v": 0
  }
}

```

### 16. Get countries

```rest
GET /v1/transactions
Accept: application/json
```

Response

```json
{
  "status": 200,
  "message": "Countries found",
  "data": [
    {
      "isoName": "AF",
      "name": "Afghanistan",
      "currencyCode": "AFN",
      "currencyName": "Afghan Afghani",
      "currencySymbol": "؋",
      "flag": "https://s3.amazonaws.com/rld-flags/af.svg",
      "callingCodes": [
        "+93"
      ]
    },
    {
      "isoName": "AL",
      "name": "Albania",
      "currencyCode": "ALL",
      "currencyName": "Albanian Lek",
      "currencySymbol": "Lek",
      "flag": "https://s3.amazonaws.com/rld-flags/al.svg",
      "callingCodes": [
        "+355"
      ]
    },
  ]
}
```

### 17. Search products

```rest
GET {{host}}/products/search?q=united
Accept: application/json
Authorization: Bearer {{userToken}}
```

Response

```json
{
  "status": 200,
  "message": "Products found",
  "data": [
    {
      "brand": {
        "brandId": 6,
        "brandName": "CALL OF DUTY: MODERN WARFARE"
      },
      "country": {
        "isoName": "US",
        "name": "United States",
        "flagUrl": "https://s3.amazonaws.com/rld-flags/us.svg"
      },
      "_id": "6154189765ba8878bea98ce9",
      "productId": 310,
      "__v": 0,
      "fixedRecipientDenominations": [
        9.99
      ],
      "fixedRecipientToSenderDenominationsMap": {
        "9.99": 10150.14
      },
      "fixedSenderDenominations": [
        10150.14
      ],
      "global": true,
      "logoUrls": [
        "https://cdn.reloadly.com/giftcards/c332e6fd-ce42-41ac-9af0-125cd7341d51.jpg"
      ],
      "maxRecipientDenomination": null,
      "maxSenderDenomination": null,
      "minRecipientDenomination": null,
      "minSenderDenomination": null,
      "productName": "1,100 CALL OF DUTY: MODERN WARFARE POINTS",
      "recipientCurrencyCode": "USD",
      "senderCurrencyCode": "RWF"
    },
  ]
}
```

### 18. Order giftcards

```rest
POST /v1/transactions/giftcards/order
Accept: application/json
Authorization: Bearer {{userToken}}
Content-Type: application/json
```

Response

```json
{
  "status": 200,
  "message": "Order successful",
  "data": {
    "transactionId": 264,
    "amount": 14187.22896,
    "discount": 95.75221,
    "currencyCode": "RWF",
    "fee": 508.34166,
    "recipientEmail": "letiga1665@timevod.com",
    "customIdentifier": "d8491c3f-9eb0-42b0-b273-dee8fece09c2",
    "status": "SUCCESSFUL",
    "product": {
      "productId": 2,
      "productName": "Amazon UK",
      "countryCode": "GB",
      "quantity": 1,
      "unitPrice": 10,
      "totalPrice": 10,
      "currencyCode": "GBP",
      "brand": {
        "brandId": 2,
        "brandName": "Amazon"
      }
    },
    "transactionCreatedTime": "2021-10-01 04:46:48"
  }
}
```

### 19. Redeem giftcard

```rest
GET {{host}}/giftcards/redeem/262
Accept: application/json
Authorization: Bearer {{userToken}}
```

Response

```json
{
  "status": 200,
  "message": "Redeem code found",
  "data": [
    {
      "cardNumber": "LJ2yktest",
      "pinCode": "57730test"
    }
  ]
}
```

### 20. Get wallet

```rest
GET /v1/wallets
Accept: application/json
Authorization: Bearer {{userToken}}
```

```json
{
  "status": 200,
  "message": "Wallet information found",
  "data": [
    {
      "_id": "614c8efb4e59e2d469a66525",
      "user": "614c8efb4e59e2d469a66523",
      "amount": 9928.082060000004,
      "__v": 0
    }
  ]
}
```
