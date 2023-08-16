import User from '../models/user.model.js';
import Courses from '../models/course.model.js';
import Categories from '../models/category.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        console.log(error)
    }

}

export const postUser = async (req, res) => {
    const { first_name, last_name, age, gender, dni } = req.body;
    try {
        const newUser = new User(
            {
                first_name,
                last_name,
                dni,
                age,
                gender
            }
        )

        const userSaved = await newUser.save()
        res.json(userSaved);
    } catch (error) {
        res.json({ message: error })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const deteleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.json(user);     
    } catch (error) {
        console.log(error)
    }
}

export const putUser = async(req,res)=>{
    const {id} = req.params;
    const {first_name,last_name, dni, gender, age, courses} = req.body



    try {
        const user = await User.findById(id)
        // console.log(user)

        const course = await  Courses.findById(courses);
        // console.log(course)

        const category = await Categories.findById(course.category)
        // console.log(category)

        const repeatCategory = user.courses.filter((course,index)=>{
            console.log(course.category.name)
            console.log(category.name)
           return course.category.name === category.name
        })

        // console.log(repeatCategory)
        console.log(repeatCategory.length)
        if(repeatCategory.length >= 3) return res.json('No puede tener mas de 3 cursos con la misma categoria')

        const updateUser = await User.findByIdAndUpdate(id,
            {
              $set:{
                first_name,
                last_name,
                dni,
                gender,
                age,
              },
              $addToSet:{courses: courses},
            },
            {new: true});
            
            res.json(updateUser)
    } catch (error) {
        console.log(error)
    }
}