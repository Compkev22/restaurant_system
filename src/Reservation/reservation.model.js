import { Schema, model } from 'mongoose';

const reservationSchema = Schema({
    client: { type: String, required: true }, 
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Confirmada', 'Pendiente', 'Cancelada'], 
        default: 'Pendiente' 
    }
}, { versionKey: false });

export default model('Reservation', reservationSchema);