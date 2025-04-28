import { Server } from "socket.io";
import config from 'config'
import { v4 } from "uuid";

const port = config.get<number>('io.port')

const io = new Server({
    cors: {
        origin: '*'
    }
})

let clients: string[] = []


io.on('connection', socket => {
    const id = v4()
    clients.push(id)
    console.log(`new connection. total ${clients.length}`)

    socket.emit('welcome', {
        id
    })

    io.emit('new member', {
        id
    })

    socket.on('disconnect', () => {
        clients = clients.filter(client => client !== id)
        console.log(`client disconnect... total ${clients.length}`)
        io.emit('member gone', {
            id
        })
    })

})

io.listen(port)
console.log(`io server started on ${port}`)