'use strict';

import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    EventNumberOfPersons: {
        type: String,
        required: [true, 'El número de personas es requerido'],
        trim: true,
        maxlength: [20, 'El número de personas no puede tener más de 20 caracteres'],
    },
    EventNumberOfTables: {
        type: String,
        required: [true, 'El número de mesas es requerido'],
        trim: true,
        maxlength: [100, 'El número de mesas no puede tener más de 100 caracteres']
    },
    EventTotal: {
        type: Number,
        required: [true, 'El total es requerido'],
        trim: true,
        lowercase: true,
    },
    EventUser: {
        type: Schema.Types.ObjectId,
        ref: 'User', //ROL: Cliente
        required: [true, "El Cliente es obligatorio"]
    },
    EventStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    EventCreatedAt: {
        type: Date,
        default: Date.now
    }
});

eventSchema.index({ EventName: 1 });

export default mongoose.model("Event", eventSchema);
