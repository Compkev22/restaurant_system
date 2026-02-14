'use strict';

import Employe from './employee.model.js';

export const getEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = { isActive: true };

        const employees = await Employe.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ nombre: 1 });

        const total = await Employe.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: employees,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createEmploye = async (req, res) => {
    try {
        const employe = new Employe(req.body);
        await employe.save();
        res.status(201).json({ success: true, data: employe });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updateEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmploye = await Employe.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedEmploye) return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
        
        res.status(200).json({ success: true, data: updatedEmploye });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};