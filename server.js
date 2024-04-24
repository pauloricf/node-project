// import {createServer} from "node:http" 

// const server = createServer((request, response) => {
//     response.write("Hellow world")
//     return response.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()
// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, response) => {
    const {title, description, duration} = request.body
    // console.log(body);
    await database.create({
        title,
        description,
        duration,
        })
    
    return response.status(201).send()
})
server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)
    return videos
})
server.put('/videos/:id', async (request, response) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })
    return response.status(204).send()
})

server.delete("/videos/:id", async (request, response) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return response.status(204).send()
})

server.listen(3333)