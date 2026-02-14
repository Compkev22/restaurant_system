import Billing from './billing.model.js';

export const getBillings = async (req, res) => {
    try {
        const { page = 1, limit = 10, BillStatus } = req.query;

        const filter = {};
        if (BillStatus) {
            filter.BillStatus = BillStatus;
        }

        const billings = await Billing.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ BillDate: -1 });

        const total = await Billing.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: billings,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las facturas',
            error: error.message,
        });
    }
};

export const getBillingById = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findById(id);

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Factura no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            data: billing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la factura',
            error: error.message,
        });
    }
};

export const createBilling = async (req, res) => {
    try {
        const billingData = req.body;

        if (billingData.BillDate || typeof billingData.BillDate === "object") {
            billingData.BillDate = new Date();
        } // Esto es para que si no se envia la fecha, se tome la fecha actual

        const billing = new Billing(billingData);
        await billing.save();

        res.status(201).json({
            success: true,
            message: 'Factura creada exitosamente',
            data: billing,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la factura',
            error: error.message,
        });
    }
};

export const updateBilling = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Factura no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Factura actualizada exitosamente',
            data: billing,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la factura',
            error: error.message,
        });
    }
};

export const changeBillingStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findById(id);

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Factura no encontrada',
            });
        }

        billing.BillStatus =
            billing.BillStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        await billing.save();

        res.status(200).json({
            success: true,
            message: `Factura ${billing.BillStatus === 'ACTIVE' ? 'activada' : 'desactivada'} exitosamente`,
            data: billing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la factura',
            error: error.message,
        });
    }
};
