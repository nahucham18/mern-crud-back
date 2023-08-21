import Course from '../models/course.model.js';
import Category from '../models/category.model.js';

export const getAllCourses = async (req, res) => {
    const courses = await Course.find().populate('category').exec();
    return res.status(200).json(courses);
}

export const postCourse = async (req, res) => {
    try {
        const { name, description, categoryID } = req.body;
        console.log(categoryID)

        if (!name || !description || !categoryID) return res.status(400).json({ message: 'Faltan datos' })

        try {
            const searchCategory = await Category.findById(categoryID)

            const searchCourse = await Course.find(
                { category: categoryID, name: name }
            )
            if (searchCourse.length > 0){
                return res.status(400).json({message:'Ya existe este curso'})
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
            return res.status(400).json({message:'No existe la categoria'})
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
        res.status(400).json({message: 'No existe el curso'})
    }

}