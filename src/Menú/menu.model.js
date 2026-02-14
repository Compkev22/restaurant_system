import { Schema, model } from 'mongoose';

const menuSchema = Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'] },
    type: { 
        type: String, 
        enum: ['Individual', 'Combo'], 
        required: [true, 'El tipo (Individual/Combo) es obligatorio'] 
    },
    description: { type: String },
    price: { type: Number, required: [true, 'El precio es obligatorio'] },
    status: { type: String, default: 'Disponible' }
}, { versionKey: false });

export default model('Menu', menuSchema);