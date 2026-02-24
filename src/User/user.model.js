'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT', 'EMPLOYEE'],
        default: 'EMPLOYEE'
  },
    UserStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    //  campo para el Soft Delete
    deletedAt: {
        type: Date,
        default: null
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ UserEmail: 1 });
userSchema.index({ UserNIT: 1 });

export default mongoose.model("User", userSchema);
