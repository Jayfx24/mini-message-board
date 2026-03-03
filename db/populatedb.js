#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const messages = [
  {
    text: "Hi there!",
    username: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    username: "Charles",
    added: new Date(),
  },
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR (255),
  username VARCHAR(100),
  created_at DATE 
);
  
`;

const values = [
  messages[0].text,
  messages[0].username,
  messages[0].added,
  messages[1].text,
  messages[1].username,
  messages[1].added,
];
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.query(`INSERT INTO messages (message, username, created_at) 
VALUES
($1, $2, $3),
($4, $5, $6);`, values);
  await client.end();
  console.log("done");
}

main();
