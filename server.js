// import {createServer} from "node:http" 

// const server = createServer((request, response) => {
//     response.write("Hellow world")
//     return response.end()
// })

// server.listen(3333)

import {fastify} from "fastify";

const server = fastify()


server.listen(3333)