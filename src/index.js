import app from "./server";
const port=process.env.Port || 3000;
const startServer=()=>{
    app.listen(port,()=>{
        console.log('Server is up on port ' + port)
    })
};
startServer();