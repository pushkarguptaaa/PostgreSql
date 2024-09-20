import { Client } from 'pg'
import { DB_URL } from './config';
import { createUser, getUser } from './db/user';
import { createTodo, getTodos, updateTodo } from './db/todo';

export const client = new Client({
    connectionString: DB_URL
});

async function createTables(){
    const userTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        );
    `;

    const todoTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT false
        );
    `;

    try{
        await client.query(userTableQuery)
        await client.query(todoTableQuery)
        console.log('Tables created successfully');

    } catch(err){
        console.error("error", err)
    }
}

client.connect()
    .then(() => {
        console.log('Connected to the database')
    })
    .catch(err => console.error('Database connection error', err));

// createUser("uhtud", "jfkj", "Sandeep")
// getUser(3)
// createTodo(1, "go to gym", "go to gym at 6")
// updateTodo(1)
getTodos(1)


