import { Schema, model } from 'mongoose';

const celdaSchema = new Schema({
  numeroCelda: { 
    type: Number, 
    unique: true, 
    required: true 
  },
  estado: { 
    type: String, 
    default: 'disponible' 
  },
  placaVehiculo: { 
    type: String, 
    maxlength: 6 
  },
  fechaIngreso: { 
    type: Date 
  },
  fechaSalida: { 
    type: Date 
  },
  pin: { 
    type: String 
  },
});

const Celda = model('Celda', celdaSchema);

export default Celda;
