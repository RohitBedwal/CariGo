# Backend API Documentation

## User Registration
Endpoint for registering new users in the system.

### POST 

#### Description
Creates a new user account with the provided information and returns an authentication token.

#### Request Body
```json
{
    "fullname": {
        "firstname": "string", // required, min 3 characters
        "lastname": "string"   // optional, min 3 characters if provided
    },
    "email": "string",        // required, min 5 characters, must be unique
    "password": "string"      // required, min 6 characters
}

### Example  Response

{"user":{

    "fullname": {
        "firstname": "string", // required, min 3 characters
        "lastname": "string"   // optional, min 3 characters if provided
    },
    "email": "string",        // required, min 5 characters, must be unique
    "password": "string"      // required, min 6 characters
        }
}
{"token":"string"}//jwt Token
