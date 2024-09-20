import { client } from "..";

export async function createTodo(userId: number, title: string, description: string){
    const query = `
        INSERT INTO todos (user_id, title, description)
        VALUES ($1, $2, $3)
    `
    const values = [userId, title, description]

    try{
        const res = await client.query(query, values)
        console.log(res);
    } catch(err){
        console.error(err, err)
    }
}

export async function updateTodo(todoId: number){
    const query = `
        UPDATE todos
        SET done = true
        WHERE id = $1
    `
    try{
        const res = await client.query(query, [todoId])
        console.log(res);
    } catch(err){
        console.error(err, err)
    }
}

export async function getTodos(userId: number){
    const query = `
        SELECT id, title, description, done
        FROM todos
        WHERE user_id = $1
    `

    try{
        const res = await client.query(query, [userId])
        console.log(res.rows);
    } catch(err){
        console.error(err, err)
    }
}