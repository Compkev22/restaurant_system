'use strict';

import Branch from './branch.model.js';

export const getBranches = async (req, res) => {
    try {
        const { zona } = req.query;
        const filter = zona ? { zona: parseInt(zona), estado: 'Activa' } : { estado: 'Activa' };

        const branches = await Branch.find(filter).sort({ branchId: 1 });
        res.status(200).json({ success: true, data: branches });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createBranch = async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json({ success: true, data: branch });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
        if (!branch) return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });

        res.status(200).json({ success: true, data: branch });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};