// import {createServer} from "node:http" 

// const server = createServer((request, response) => {
//     response.write("Hellow world")
//     return response.end()
// })

// server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.post('/videos', (request, response) => {
    const {title, description, duration} = request.body
    // console.log(body);
    database.create({
        title,
        description,
        duration,
        })
    
    return response.status(201).send()
})
server.get('/videos', (request) => {
    const search = request.query.search
    const videos = database.list(search)
    return videos
})
server.put('/videos/:id', (request, response) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })
    return response.status(204).send()
})

server.delete("/videos/:id", (request, response) => {
    const videoId = request.params.id

    database.delete(videoId)

    return response.status(204).send()
})

server.listen(3333)