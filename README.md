# Tricog Demo API

This is a nodejs API for tricog that connects to a database to store and retrieve user information, along with validation for inputs and authentication for retrieval.

## Pre-Installation

### config/db-config.json

Create a file name db-config.json and place the following contents based on your database settings:

```bash
{
  "host": "YOUR HOST ADDRESS",
  "user": "YOUR DATABASE USER USERNAME",
  "password": "YOUR DATABASE USER PASSWORD",
  "database": "YOUR DATABASE NAME",
  "waitForConnections": true,
  "connectionLimit": 10,
  "queueLimit": 0
}

```

Place the db-config.json inside the config folder

# config/server-config.json

Create a file name server-config.json and place the following contents:

```bash
{
  "secretKey": "YOUR_SECRET_KEY",
  "iv": "YOUR INITIALISATION_VECTOR",
  "ServerSecret": "YOUR_SERVER_SECRET"
}
```

Place the server-config.json inside the config folder

## Installation

Use npm to install the app

```bash
npm install
```

## Usage

use npm to start the app after installation

```
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
