# Domain Interfaces Library

The Domain Interfaces Library is a core part of the Valkyrix framework, providing a set of standardized interfaces that define the data structures for user management. These interfaces ensure consistency and interoperability between the frontend and backend components of the Valkyrix framework.

## Features

- **Standardized Data Structures**: Uniform interfaces for user data across the entire framework.
- **Interoperability**: Ensures seamless integration between different modules of the Valkyrix framework.
- **Extensibility**: Easily extendable to accommodate future data models and requirements.

## Getting Started

### Building

Run `nx build interfaces` to build the library.

### Running unit tests

Run `nx test interfaces` to execute the unit tests via [Jest](https://jestjs.io).

### Installation

```
npm i @valkyrix/domain-interfaces
```

or 

```
yarn add @valkyrix/domain-interfaces
```

Import the required interfaces into your project:
```
import { IUser } from '@valkyrix/domain-interfaces';
```

### Usage

Utilize the interfaces provided by this library to define data models in your application. For example:

```
import { IUser } from '@valkyrix/domain-interfaces';

class User implements IUser {
    id: string;
    username: string;
    email: string;
    // other fields as per the IUser interface
}
```