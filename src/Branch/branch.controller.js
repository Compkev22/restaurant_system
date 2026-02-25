'use strict';

import Branch from './branch.model.js';

export const getBranches = async (req, res) => {
    try {
        const { zone, branchStatus } = req.query;
        
        const filter = {};
        filter.branchStatus = branchStatus || 'ACTIVE';
        
        if (zone) filter.zone = parseInt(zone);

        const branches = await Branch.find(filter).sort({ zone: 1, name: 1 });
        
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
                message: 'Branch not found' 
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
                message: 'Branch not found'
            });
        }

        branch.branchStatus =
            branch.branchStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        branch.deletedAt =
            branch.branchStatus === 'INACTIVE' ? new Date() : null;

        await branch.save();

        res.status(200).json({
            success: true,
            message: `Branch ${branch.branchStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`,
            data: branch
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error changing branch status',
            error: error.message
        });
    }
};