import User from './user.model.js';

// Obtener todos los usuarios (Filtra activos por defecto)
export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, UserStatus } = req.query;

        // Soft Delete: Filtramos por ACTIVE 
        const filter = { UserStatus: UserStatus || 'ACTIVE' };

        const users = await User.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ UserCreatedAt: -1 });

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

// Obtener un usuario por ID (Sin alterar el estado)
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error.message,
        });
    }
};

// Crear usuario
export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

// Actualizar datos del usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

// Soft Delete 
export const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Cambio de estado 
        user.UserStatus = user.UserStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        
        // Manejo de la fecha de Soft Delete
        user.deletedAt = user.UserStatus === 'INACTIVE' ? new Date() : null;

        await user.save();

        res.status(200).json({
            success: true,
            message: `Usuario ${user.UserStatus === 'ACTIVE' ? 'activado' : 'desactivado'} exitosamente`,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del usuario',
            error: error.message,
        });
    }
};