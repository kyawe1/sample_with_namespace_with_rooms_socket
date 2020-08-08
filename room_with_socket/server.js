let express=require('express')
let body=require('body-parser')

let application=express()

application.set('views','./view')
application.set('view engine','ejs')
application.get('/',(req,res)=>{
    res.render('home')
})


application.get('/chat/:id',(req,res)=>{
    res.render('chat',{roomid:req.params.id})
})



let server=application.listen(7000,(req,res)=>{
    console.log('This is listening at 7000 ..........................................')
})




let socket=require('socket.io')

let io = socket(server)

let endpoint=io.of('/chat')
var ______r=0;
endpoint.on('connection',(s)=>{
    console.log('Someone is connecting ....... ')
    s.emit('ok',"Welcome from my server")
    s.on('join_room',(room)=>{
        s.join(`${room}`)
        console.log(room)
        ______r=room
        console.log(`This is joining to room ${room}`)
    })
    s.on('message',(m)=>{
        endpoint.to(______r).emit("broad",m)
    })
})



// endpoint.sockets.in()(,(s)=>{
    // endpoint.sockets.emit('broadcast',s)
// })
