/*
This JavaScript code utilizes ApolloServer, a community-driven, open-source GraphQL server that works with any GraphQL schema. It sets up an Apollo Server and creates a GraphQL API.

One of its functionalities is fetching specified health data from 'https://health.data.ny.gov/resource/gnzp-ekau.json' using node-fetch. It also creates, stores and queries a simple book collection using LokiJS, a fast, in-memory document-oriented datastore for Node.js.

The code defines GraphQL types for 'Book', 'Date', and 'Record'. The 'Book' type contains attributes 'title' and 'author'. The 'Date' type has attributes 'now' and 'hello'. The 'Record' type includes health data parameters like 'abortion_edit_indicator', 'age_group', 'apr_drg_code', 'apr_drg_description', and so on.

Queries and mutations for the types are defined in 'resolvers' - 'books', 'date', and 'records' queries fetch data based on the defined types while 'addBook' mutation adds a new book to the collection.

Finally, the ApolloServer is started with the type definitions and resolvers, providing an API key if available, and the server is set to listen on the specified port, with a console log outputting the server URL when ready.
*/
const {ApolloServer, gql} = require('apollo-server');
const loki = require('lokijs');
const fetch = require('node-fetch');

const sparc_url = 'https://health.data.ny.gov/resource/gnzp-ekau.json';
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


const db = new loki('books.json', {'autosave': true, 'autoload': true, 'serializationMethod': 'pretty'});

var mybooks = db.addCollection('books');


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Date {
    now: String
    hello: String
  }

  type Record {
    abortion_edit_indicator: String
    age_group: String
    apr_drg_code: String
    apr_drg_description: String
    apr_mdc_code: String
    apr_mdc_description: String
    apr_medical_surgical_description: String
    apr_risk_of_mortality: String
    apr_severity_of_illness_code: String
    apr_severity_of_illness_description: String
    attending_provider_license_number: String
    birth_weight: String
    ccs_diagnosis_code: String
    ccs_diagnosis_description: String
    ccs_procedure_code: String
    ccs_procedure_description: String
    discharge_year: String
    emergency_department_indicator: String
    ethnicity: String
    facility_id: String
    facility_name: String
    gender: String
    health_service_area: String
    hospital_county: String
    length_of_stay: String
    operating_certificate_number: String
    patient_disposition: String
    payment_typology_1: String
    payment_typology_2: String
    race: String
    total_charges: String
    total_costs: String
    type_of_admission: String
    zip_code_3_digits: String
  }
  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    records: [Record]
    books: [Book]
    date: Date
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        books: () => {
            return (mybooks.find({}));
        },
        date: () => [{
            now: Date(),
            hello: "hello at " + Date()
        }],
        records: () => {
            return fetch(sparc_url)
                .then(response => response.json());
            //.then(json => console.log(json));
        },
    },
    Mutation: {
        addBook: (root, args) => {
            const items = {
                'title': args.title,
                'author': args.author,
            };
            mybooks.insert(items);
            db.save();
            return items
        }
    },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
//const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: process.env.ENGINE_API_KEY && {
        apiKey: process.env.ENGINE_API_KEY,
    },
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
/*server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });*/
server.listen({port: process.env.PORT || 4000}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
