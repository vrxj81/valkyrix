# nest-users-feature

# Users Feature Backend Library

The Users Feature Backend Library is a key component of the Valkyrix framework, designed to handle API endpoints for user management. It interfaces seamlessly with the Users Data Access Library to facilitate CRUD operations, ensuring efficient and consistent data handling.

## Features

- **API Endpoints for User Management**: Offers a set of endpoints for creating, retrieving, updating, and deleting user data.
- **Integration with Data Access Library**: Utilizes the Users Data Access Library for database interactions.
- **Validation and Error Handling**: Implements robust input validation and error handling for API requests.

## Getting Started

Follow these instructions to include the Users Feature Backend Library in your project.

### Installation

Install the library via npm or yarn:
```
npm install @valkyrix/nest-users-feature
```
or
```
yarn add @valkyrix/nest-users-feature
```

### Usage
Here's how to use the library in your application:
``` 
import { UserController } from '@valkyrix/nest-users-feature';

const userController = new UserController();

// Example: Add an API endpoint for creating a new user
router.post('/users', userController.createUser);
```

### Building

Run `nx build nest-users-feature` to build the library.

### Running unit tests

Run `nx test nest-users-feature` to execute the unit tests via [Jest](https://jestjs.io).
