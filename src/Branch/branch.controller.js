'use strict';

import Branch from './branch.model.js';

export const getBranches = async (req, res) => {
    try {
        const { zona, BranchStatus } = req.query;
        
        const filter = {};
        // Filtro por defecto: solo sucursales activas
        filter.BranchStatus = BranchStatus || 'ACTIVE';
        
        if (zona) filter.zona = parseInt(zona);

        const branches = await Branch.find(filter).sort({ zona: 1, nombre: 1 });
        
        res.status(200).json({ 
            success: true, 
            data: branches 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
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
        
        if (!branch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Sucursal no encontrada' 
            });
        }

        res.status(200).json({ success: true, data: branch });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const changeBranchStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findById(id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Sucursal no encontrada'
            });
        }

        // Lógica de Soft Delete
        branch.BranchStatus = branch.BranchStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        branch.deletedAt = branch.BranchStatus === 'INACTIVE' ? new Date() : null;

        await branch.save();

        res.status(200).json({
            success: true,
            message: `Sucursal ${branch.BranchStatus === 'ACTIVE' ? 'activada' : 'desactivada'} exitosamente`,
            data: branch
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la sucursal',
            error: error.message
        });
    }
};