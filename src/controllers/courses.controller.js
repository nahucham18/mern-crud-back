import Course from '../models/course.model.js';
import Category from '../models/category.model.js';

//Controlador para buscar todo los cursos
export const getAllCourses = async (req, res) => {
    const courses = await Course.find().populate('category').exec();
    return res.status(200).json(courses);
}

//Controlador para crear nuevo curso
export const postCourse = async (req, res) => {
    try {
        const { name , description, categoryID } = req.body;
        //Todo los datos son requeridos
        if (!name || !description || !categoryID) return res.status(400).json({ message: 'Faltan datos' })

        try {
            //Buscamos en la base de datos si ya existe el curso con el mismo nombre y la misma categoria
            const searchCategory = await Category.findById(categoryID)
            const searchCourse = await Course.find({ category: categoryID, name: name })
            if (searchCourse.length > 0) return res.status(400).json({ message: 'Ya existe este curso' })

            //Creamos el nuevo curso
            const newCourse = new Course(
                {
                    name,
                    description,
                    category: searchCategory
                }
            )
            //Guardamos el nuevo curso en la base de datos
            const savedCourse = await newCourse.save()
            res.status(200).json({ message: 'Nuevo curso creado', data: savedCourse })
        } catch (error) {
            //Si no se encuenta la categoria ingresada
            return res.status(400).json({ message: 'No existe la categoria' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//Controlador para buscar curso por  ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        //Buscamos el ID sacado el params
        const searchCourse = await Course.findById(id)
        res.status(200).json(searchCourse)
    } catch (error) {
        res.status(400).json({ message: 'No existe el curso' })
    }
}

//Controlador para borrar un curso por ID
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        //Buscamos y borramos el curso buscado por el ID del params
        const searchCourse = await Course.findByIdAndDelete(id)
        res.status(200).json({ message: "Curso eliminado", data: searchCourse })
    } catch (error) {
        res.status(400).json({ message: 'No existe el curso' })
    }
}

//Controlador para actualizar un curso
export const putCourse = async (req, res) => {
    try {
        const { id } = req.params
        //Buscamos si existe el curso con el ID del params
        const searchCourse = await Course.findById(id)
        const { name, description, categoryID } = req.body
        if(!name && !description && !categoryID){
            res.status(200).json({message:"Curso Actualizado", data:searchCourse})
        }           

        let opc = 0;

        //Creamos opciones segun los datos que ingresan para cambiar
        if ((categoryID !== undefined && categoryID !== "") && (name !== undefined && name !== "")) {
            opc = 1;
        } else if (categoryID !== undefined && categoryID !== "") {
            opc = 2;
        } else if ((name !== undefined && name !== "")) {
            opc = 3;
        } else if ((description !== undefined && description !== "")) {
            opc = 4;
        }

        //Opcion 1: Si mandan una categoryID y un name
        if (opc === 1) {
            //Nos fijamos si existe un curso con el name y la categoryID ingresados
            const searchCopyCourseNameCategory = await Course.find({ name: name, category: categoryID })
            if (searchCopyCourseNameCategory.length > 0 && searchCopyCourseNameCategory[0]._id.toString() !== id) {
                res.status(400).json({ message: 'No se puede actualizar, ya existe el curso' })
            } else {
                //Creamos el objeto con el que vamos a actualizar
                const updateObject = { name: name, category: categoryID }

                if (description !== undefined && description !== "") {
                    updateObject.description = description;
                }
                const updateCourse = await Course.findByIdAndUpdate(id,
                    {
                        $set: updateObject
                    },
                    { new: true });
                res.status(200).json({ message: 'Curso actualizado', data: updateCourse })
            }
        } 
        //Opcion 2: Si solo mandan una categoryID
        else if (opc === 2) {
            try {
                const searchCategory = await Category.find({_id:categoryID})
                const searchCourseCat = await Course.find({name: searchCourse.name, category:categoryID})

                if((searchCourseCat.length > 0) && (searchCourseCat[0]?._id.toString() !== id)){
                    res.status(400).json({message: "Ya existe el curso con esa categoria"})
                }else{
                    const updateObject = { category: categoryID }

                    if (name !== undefined && name !== "") {
                        updateObject.name = name;
                    }

                    if (description !== undefined && description !== "") {
                        updateObject.description = description;
                    }
                    const updateCourse = await Course.findByIdAndUpdate(id,
                        {
                            $set: updateObject
                        },
                        { new: true });
                    res.status(200).json({ message:'Curso actualizado2', data: updateCourse })
    
                }
            } catch (error) {
                res.status(400).json({messsage: 'Categoria no existe'})
            }

        }
        else if (opc === 3) {

                const searchCourseCat = await Course.find({name: name, category:searchCourse.category})                

                if(searchCourseCat.length > 0 && searchCourseCat[0]?._id.toString() !== id){
                     res.status(400).json({message: "Ya existe el curso con esa categoria 2"})
                }else{
                    const updateObject = { name: name }

                    if (categoryID !== undefined && categoryID !== "") {
                        updateObject.category = categoryID;
                    }

                    if (description !== undefined && description !== "") {
                        updateObject.description = description;
                    }
                    const updateCourse = await Course.findByIdAndUpdate(id,
                        {
                            $set: updateObject
                        },
                        { new: true });
                    res.status(200).json({ message: 'Curso actualizado3', data: updateCourse })
                    }
        }   else if(opc === 4){
            const updateObject = { description: description }
            const updateCourse = await Course.findByIdAndUpdate(id,
                {
                    $set: updateObject
                },
                { new: true });
            res.status(200).json({ message: 'Curso actualizado3', data: updateCourse })
        }
    } catch (error) {
        res.status(400).json({ message: 'No existe el curso final' })
    }
}



