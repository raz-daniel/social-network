import { Server } from "socket.io";
import config from 'config'

const port = config.get<number>('io.port')

const io = new Server({
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true
    }
  });

io.on('connection', socket => {
    console.log(`got a new connection...`)



    socket.onAny((eventName, payload) => {
        console.log(`receive event ${eventName} with payload`, payload)
        io.emit(eventName, payload)
    })



    socket.on('disconnect', () => {
        console.log(`client disconnect...`)    
    })

})

io.listen(port)
console.log(`io server started on ${port}`)