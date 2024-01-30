# nest-users-data-access

## Users Data Access Library

The Nest Users Data Access Library is an integral component of the Valkyrix framework, designed to handle database interactions and CRUD operations for user data. It works in tandem with the Domain Interfaces Library to ensure consistent data structures across the framework.

## Features

- **CRUD Operations**: Comprehensive support for Create, Read, Update, and Delete operations on user data.
- **Integration with Domain Interfaces**: Seamlessly integrates with the Domain Interfaces Library for consistent data modeling.
- **Database Agnostic**: Designed to be adaptable with various database technologies.

## Getting Started

### Building

Run `nx build nest-users-data-access` to build the library.

### Running unit tests

Run `nx test nest-users-data-access` to execute the unit tests via [Jest](https://jestjs.io).

### Installation
  ```
  npm install @valkyrix/nest-users-data-access
  ```

  or

  ```
  yarn add @valkyrix/nest-users-data-access

  ```

### Usage

Here's an example of how to use the Nest Users Data Access Library:

```
import { UserService } from '@valkyrix/nest-users-data-access';

const userService = new UserService();

// Create a new user
userService.create({ username: 'johndoe', email: 'john@example.com' });

// Fetch all users
userService.findAll();

// Fetch a user by ID
userService.findOne('userId');

// Update a user
userService.update(id, { username: 'janedoe' });

// Delete a user
userService.delete(id);
```