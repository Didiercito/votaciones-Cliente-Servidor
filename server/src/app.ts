import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from '../src/auth/infraestructure/routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT; 
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: http://localhost:' + PORT);
    console.log(process.env.PORT)
    console.log(process.env.SECRET_JWT)
});



//https://github.com/Aregomz/clienteServidorProyecto.git clonar para ver como esta 