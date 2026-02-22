import { Schema, model } from 'mongoose';

const reservationSchema = Schema({
    table: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
        },
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