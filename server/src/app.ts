import express from 'express'

const app = express();
app.use(express.json())

const PORT: number = 8080;


app.listen(PORT, () =>{
    console.log('Servidor corriendo en el puerto: http://localhost:8080')
})