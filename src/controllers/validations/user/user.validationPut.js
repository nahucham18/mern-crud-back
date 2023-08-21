import User from '../../../models/user.model.js';

export const userValidationPut = async (id, first_name, last_name, dni, gender, age) => {

    console.log({ id: id, first_name: first_name, last_name: last_name, dni: dni, age: age, gender: gender })

    const namePattern = /^[^\d]+$/;


    if (first_name && !namePattern.test(first_name)) return { success: false, message: "El nombre no puede contener numero" }
    if (first_name && first_name.length > 20) return { success: false, message: "El nombre no puede tener mas de 20 caracteres" }
    if (last_name && !namePattern.test(last_name)) return { success: false, message: "El apellido no puede contener numero" }
    if (last_name && last_name.length > 20) return { success: false, message: "El apellido no puede tener mas de 20 caracteres" }



    if (dni) {
        
        try {
            const searchDni = await User.find({ dni: dni })
            console.log({ dnibuscado: searchDni[0].id, dniIngresado: id })
            console.log(searchDni[0].id)
            console.log(id)
            if ((searchDni.length > 0) && (searchDni[0].id !== id)) return { success: false, message: 'El dni ya existe' }

            console.log(typeof(dni))

            if (isNaN(parseInt(dni))) return { success: false, message: 'Tiene que ser un numero' }
            if (dni.toString().length !== 8) return { success: false, message: "El dni tiene que tener 8 caracteres" }
        } catch (error) {
            console.log('nose')
        }
    }

    // const searchDni = await User.find({dni:dni})


    // const searUserDni = await User.find({dni:dni, first_name:first_name})   

    // if(dni && ((searchDni.length > 0) && (searchDni[0].id !== id)) ) return {success:false, message: 'El dni ya existe'}

    // console.log(toString(dni))




    if (age && (age < 10 || age > 110)) return { success: false, message: "No se puede crear usuario con esa edad" }




    if (gender) {


        const validGenders = {
            hombre: true,
            mujer: true,
            "no binario": true
        }

        console.log(validGenders)
        const lowerGender = gender.toLowerCase()
        console.log(gender)
        if (!validGenders[lowerGender]) {
            return {
                success: false,
                message: "El género debe ser 'hombre', 'mujer' o 'no binario'"
            };
        }
        console.log('fin validation')


    }

    // if(gender && (!validGenders.includes(gender.toLowerCase()))) return { success:false, message: "El género debe ser 'hombre', 'mujer' o 'no binario'" }



    return { success: true }
}