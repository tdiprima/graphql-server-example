# GraphQL Query Test

## Overview
This project is a GraphQL server implementation built using Apollo Server. It demonstrates basic querying and mutation capabilities, focusing on books and records data. MongoDB-like functionality is implemented using LokiJS, and additional records are fetched from an external API.

## Features
- **GraphQL Queries**:
  - Fetch a list of books.
  - Retrieve external data from the SPARC API.
  - Get the current date and time.
- **GraphQL Mutations**:
  - Add a new book to the local database.
- **Data Storage**:
  - Utilizes LokiJS for in-memory database storage with autosave enabled.
- **External API Integration**:
  - Fetches healthcare data from the SPARC API.

## Prerequisites
- Node.js (v14.x or higher recommended)
- npm (comes with Node.js)

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/tdiprima/graphql-server-example.git
   cd graphql-query-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage
1. Start the server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:4000/
   ```

3. Use the Apollo Server GraphQL playground to execute queries and mutations.

## Example Queries

### Fetch Records

```graphql
query {
  records {
    age_group
    apr_drg_description
    total_charges
  }
}
```

### Add a Book

```graphql
mutation {
  addBook(title: "New Book", author: "Author Name") {
    title
    author
  }
}
```

### Fetch Books

```graphql
query {
  books {
    title
    author
  }
}
```

## Project Structure
- **`index.js`**: Main server file containing schema definitions, resolvers, and server setup.
- **`books.json`**: LokiJS database file for storing books data.
- **`package.json`**: Contains project metadata and dependencies.
- **`query.rq`**: A query for healthcare data.

## Dependencies
- `apollo-server`: Provides the GraphQL server implementation.
- `graphql`: GraphQL query language support.
- `lokijs`: Lightweight JavaScript-based database.
- `node-fetch`: Enables fetching data from the SPARC API.

## Author
Originally developed by Meteor Development Group.
(Inferred from the `"author": "Meteor Development Group"` entry in the `package.json` file)

Forked from https://github.com/akiraei/graphql-server-example

<br>
