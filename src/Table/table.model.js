import { Schema, model } from 'mongoose';

const tableSchema = Schema({
    numberTable: { 
        type: Number, 
        required: [true, 'El número de mesa es obligatorio'], 
        unique: true 
    },
    capacity: { 
        type: Number, 
        required: [true, 'La capacidad es obligatoria'] 
    },
    status: { 
        type: String, 
        enum: ['Disponible', 'Ocupada', 'Mantenimiento'], 
        default: 'Disponible' 
    }
}, { versionKey: false });

export default model('Table', tableSchema);