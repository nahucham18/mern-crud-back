import Course from '../models/course.model.js';
import Category from '../models/category.model.js';

export const getAllCourses = async (req, res) => {
    const courses = await Course.find().populate('category').exec();
    return res.status(200).json(courses);
}

export const postCourse = async (req, res) => {
    try {
        const { name , description, categoryID } = req.body;
        console.log(categoryID)

        if (!name || !description || !categoryID) return res.status(400).json({ message: 'Faltan datos' })

        try {
            const searchCategory = await Category.findById(categoryID)

            const searchCourse = await Course.find(
                { category: categoryID, name: name }
            )
            if (searchCourse.length > 0) {
                return res.status(400).json({ message: 'Ya existe este curso' })
            }

            const newCourse = new Course(
                {
                    name,
                    description,
                    category: searchCategory
                }
            )
            const savedCourse = await newCourse.save()

            res.status(200).json({ message: 'Nuevo curso creado', data: savedCourse })
        } catch (error) {
            return res.status(400).json({ message: 'No existe la categoria' })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const searchCourse = await Course.findById(id)
        res.status(200).json(searchCourse)
    } catch (error) {
        res.status(400).json({ message: 'No existe el curso' })
    }

}

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const searchCourse = await Course.findByIdAndDelete(id)
        res.status(200).json({ message: "Curso eliminado", data: searchCourse })
    } catch (error) {
        res.status(400).json({ message: 'No existe el curso' })
    }
}

export const putCourse = async (req, res) => {



    try {

        const { id } = req.params
        const searchCourse = await Course.findById(id)
        console.log(searchCourse)
        const { name, description, categoryID } = req.body
        if(!name && !description && !categoryID){
            res.status(200).json({message:"Curso Actualizadoasd", data:searchCourse})
        }           


        // console.log({descriptio:description,categoryID:categoryID, name:name})


        // console.log(searchCopyCourse)

        let opc = 0;

        if ((categoryID !== undefined && categoryID !== "") && (name !== undefined && name !== "")) {
            opc = 1;
        } else if (categoryID !== undefined && categoryID !== "") {
            opc = 2;
        } else if ((name !== undefined && name !== "")) {
            opc = 3;
        } else if ((description !== undefined && description !== "")) {
            opc = 4;
        }



        if (opc === 1) {
            console.log('entre1')
            const searchCopyCourseNameCategory = await Course.find({ name: name, category: categoryID })
            console.log('entre2')
            console.log({ idnameCategory: searchCopyCourseNameCategory[0]?._id.toString(), idParams: id })
            console.log('entre3')
            if (searchCopyCourseNameCategory.length > 0 && searchCopyCourseNameCategory[0]._id.toString() !== id) {
                res.status(400).json({ message: 'Es de otro' })
            } else {
                const updateObject = { name: name, category: categoryID }

                if (description !== undefined && description !== "") {
                    updateObject.description = description;
                }
                const updateCourse = await Course.findByIdAndUpdate(id,
                    {
                        $set: updateObject
                    },
                    { new: true });
                res.status(200).json({ message: 'Curso actualizado1', data: updateCourse })

            }
        } 
        else if (opc === 2) {
            try {
                const searchCategory = await Category.find({_id:categoryID})
                // console.log(searchCourse)
                // console.log('hola')

                const searchCourseCat = await Course.find({name: searchCourse.name, category:categoryID})
                console.log(searchCourseCat)

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
                
                // console.log(searchCourse)
                // console.log('hola')

                const searchCourseCat = await Course.find({name: name, category:searchCourse.category})
                // console.log(searchCourseCat)                    

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



