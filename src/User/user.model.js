'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserNIT: {
        type: String,
        required: [true, 'El NIT es requerido'],
        trim: true,
        maxlength: [20, 'El NIT no puede tener más de 20 caracteres'],
    },
    UserName: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    UserSurname: {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true,
        maxlength: [100, 'El apellido no puede tener más de 100 caracteres']
    },
    UserEmail: {
        type: String,
        required: [true, 'El correo es requerido'],
        trim: true,
        lowercase: true,
    },
    UserStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ UserEmail: 1 });
userSchema.index({ UserNIT: 1 });

export default mongoose.model("User", userSchema);
