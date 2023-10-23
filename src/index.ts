import express from "express";

export const server = express();
server.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

server.get('/test', (req, res) => {
  res.send('test')
})