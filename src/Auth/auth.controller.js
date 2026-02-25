import User from '../User/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

// REGISTER (Crear cuenta)
export const register = async (req, res) => {
    try {
        const data = req.body;

        // Crear instancia del usuario con los datos que vienen (incluyendo password)
        const user = new User(data);

        // Guardar en DB
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// LOGIN (Iniciar sesión)
export const login = async (req, res) => {
    try {
        // 1. Recibir correo y contraseña del body
        const { UserEmail, password } = req.body;

        // 2. Buscar si existe un usuario con ese correo
        const user = await User.findOne({ UserEmail });

        // Verificar usuario y contraseña (Bcrypt)
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: 'Credenciales inválidas'
            });
        }

        // Generar el token usando el helper
        const token = await generateJWT(user._id, user.UserEmail, user.role);

        // 4. Si todo coincide, responder con éxito
        res.status(200).json({
            success: true,
            message: 'Bienvenido al sistema',
            userDetails: {
                id: user._id,
                name: user.UserName,
                email: user.UserEmail,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};