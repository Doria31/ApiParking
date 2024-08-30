import express from 'express';
// import { connect } from 'mongoose';
import mongoose from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;
import dotenv from 'dotenv';
import celdaRoutes from './routes/celdaRoutes.mjs'; 

dotenv.config();

const app = express();
app.use(json());
app.use('/api', celdaRoutes); 

const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error('La cadena de conexión a MongoDB no está definida en las variables de entorno');
  process.exit(1);
}

mongoose.connect(URI)
  .then(() => console.log('Connected to Data Base'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running');
});
