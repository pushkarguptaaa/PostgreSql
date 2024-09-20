import { client } from "..";

export async function createUser(username: string, password: string, name: string){
    const query = `
        INSERT INTO users (username, password, name) VALUES ($1, $2, $3)
    `
    const values = [username, password, name]

    try{
        const res = await client.query(query, values)
        return res
    } catch(err){
        console.error(err, err)
    }
}

export async function getUser(userId: number){
    const query = `
        SELECT id, username, password, name FROM users WHERE id = $1
    `

    try{
        const res = await client.query(query, [userId])
        console.log(res.rows[0]);
    } catch(err){
        console.error(err, err)
    }
}