import User from '../../../models/user.model.js';

export const userValidationPost = async (first_name, last_name, dni, age, gender) =>{

    console.log(first_name)
    console.log(last_name)
    console.log(dni)
    console.log(age)
    console.log(gender)

    if(!first_name || !last_name || !age || !gender || !dni) return {success:false, message:"Faltan datos"}

    const namePattern = /^[^\d]+$/;

    if(!namePattern.test(first_name)) return { success:false, message:"El nombre no puede contener numero"}
    if(first_name.length > 20) return {success:false,message: "El nombre no puede tener mas de 20 caracteres"}
    if(!namePattern.test(last_name)) return { success:false, message:"El apellido no puede contener numero"}
    if(last_name.length > 20) return { success:false ,message: "El apellido no puede tener mas de 20 caracteres"}

    const searchDni = await User.find({dni:dni})
    console.log(searchDni)
    if(searchDni.length > 0) return {success:false, message: 'El dni ya existe'}
        
    console.log(toString(dni))
    if(typeof(dni) !== 'number') return{ success:false, message: 'Tiene que ser un numero'}
    if(dni.toString().length !== 8) return { success:false, message: "El dni tiene que tener 8 caracteres"}

    if(age < 10 || age > 110) return { success:false, message: "No se puede crear usuario con esa edad"}

    const validGenders = ["hombre", "mujer", "no binario"];
    
    if(!validGenders.includes(gender.toLowerCase())) return { success:false, message: "El género debe ser 'hombre', 'mujer' o 'no binario'" }

    return {success:true}
}