import User from '../../../models/user.model.js';

export const userValidationPut = async (id, first_name, last_name, dni, gender, age) => {

    const namePattern = /^[^\d]+$/;

    if (first_name && !namePattern.test(first_name)) return { success: false, message: "El nombre no puede contener numero" }
    if (first_name && first_name.length > 20) return { success: false, message: "El nombre no puede tener mas de 20 caracteres" }
    if (last_name && !namePattern.test(last_name)) return { success: false, message: "El apellido no puede contener numero" }
    if (last_name && last_name.length > 20) return { success: false, message: "El apellido no puede tener mas de 20 caracteres" }

    if (dni) {   
        try {
            const searchDni = await User.find({ dni: dni })
            if ((searchDni.length > 0) && (searchDni[0].id !== id)) return { success: false, message: 'El DNI ya existe' }
            if (isNaN(parseInt(dni))) return { success: false, message: 'El DNI tiene que ser un numero' }
            if (dni.toString().length !== 8) return { success: false, message: "El DNI tiene que tener 8 caracteres" }
        } catch (error) {
            console.log('nose')
        }
    }

    if (age && (age < 10 || age > 110)) return { success: false, message: "No se puede crear usuario con esa edad" }

    if (gender) {

        const validGenders = {
            hombre: true,
            mujer: true,
            "no binario": true
        }

        const lowerGender = gender.toLowerCase()
        if (!validGenders[lowerGender]) {
            return {
                success: false,
                message: "El género debe ser 'hombre' o 'mujer''"
            };
        }
    }
    return { success: true }
}