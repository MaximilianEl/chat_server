const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {})

server.listen(3000, () => {
  console.log("listening on Port 3000...")
})

wsServer = new SocketServer({httpServer:server})

const connections = []

wsServer.on('request', (req) => {
  const connection = req.accept()
  console.log("new Connection")
  connections.push(connection)

  connection.on('message', (mes) =>{
    connections.forEach(element => {
      if (element !== connection)
        element.sendUTF(mes.utf8Data)
    })
  })

  connection.on('close', (resCode, des) => {
    console.log('connection closed')
    connections.splice(connections.lastIndexOf(connection), 1)
  })
})