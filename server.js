const http=require('http')
const app=require('./app');
const PORT=9000||process.env.PORT;


const server=http.createServer(app);
server.listen(PORT,()=>{
    console.log("server("+PORT+") started....")
})