import Sale from './sale.model.js';

export const saveSale = async (req, res) => {
    try {
        const data = req.body;
        const sale = new Sale(data);
        await sale.save();
        return res.status(201).send({ success: true, message: 'Venta registrada con éxito' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al registrar venta', err });
    }
};

export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        return res.send({ success: true, totalSales: sales.length, sales });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener ventas' });
    }
};