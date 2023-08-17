import Course from '../models/course.model.js';
import Category from '../models/category.model.js';

export const getAllCourses = async(req,res)=>{
    const courses = await Course.find().populate('category').exec();
    return res.json(courses); 
}

export const postCourse = async(req,res)=>{

    const {name,description,categoryID} = req.body;
    console.log(categoryID)

    const searchCategory = await Category.findById(categoryID)

    const searchCourse = await Course.find(
        {category:categoryID, name:name}
    )

    if(searchCourse.length > 0) return res.json('Ya existe este curso')

    if(!searchCategory) return res.json('No existe')

    console.log(searchCategory)

    const newCourse =  new Course(
        {
            name,
            description,
            category: searchCategory
        }
    )  
    const savedCourse = await newCourse.save()
    // const populateCourse = await savedCourse.populate('category');
    res.json(savedCourse)

}

export const getCourseById = async (req,res)=>{
    const {id} = req.params;
    const searchCourse = await Course.findById(id)
    res.json(searchCourse)
}