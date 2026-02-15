import { Schema, model } from 'mongoose';

const saleSchema = Schema({
    product: { type: String, required: true }, // Lo dejamos como String para evitar fallos de populate
    quantity: { type: Number, required: true },
    employee: { type: String, required: true }, 
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { versionKey: false });

export default model('Sale', saleSchema);