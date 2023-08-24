import User from '../models/user.model.js';
import Courses from '../models/course.model.js';
import Categories from '../models/category.model.js';
import { userValidationPost } from './validations/user/user.validationPost.js';
import { userValidationPut } from './validations/user/user.validationPut.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const postUser = async (req, res) => {
    console.log({ bodyy: req.body })
    const { first_name, last_name, age, gender, dni } = req.body;

    const validation = await userValidationPost(first_name, last_name, dni, age, gender)

    if (!validation.success) return res.status(400).json({ message: validation.message })

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
        res.status(200).json({ message: "Nuevo usuario creado", data: userSaved });
    } catch (error) {
        res.json({ message: error })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if (user === null) return res.status(400).json({ message: "Usuario no encontrado" })
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: "Usuario no encontrado" })
    }
}

export const getUserForCourse = async (req, res) => {
    const { courseID } = req.query
    try {
        const course = await Courses.findById(courseID)
        const users = await User.find({ courses: course._id })
        res.json(users)
    } catch (error) {
        res.status(400).json({ message: "Curso no encontrado" })
    }
}

export const deteleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuario eliminado", data: user });
    } catch (error) {
        res.status(400).json({ message: "Usuario no encontrado" })
    }
}

export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        const { first_name, last_name, dni, gender, age, courses } = req.body
        const validation = await userValidationPut(id, first_name, last_name, dni, gender, age, courses)

        if (!validation.success) return res.status(400).json({ message: validation.message })

        if (courses) {
            const course = await Courses.findById(courses);
            if (course?.category === null) return res.status(400).json({ message: "Este curso no tiene categoria" })

            const category = await Categories.findById(course?.category)
            const repeatCourseUser = user.courses.filter((cour, index) => {
                return (cour.category.name === category.name) && (cour.name === course.name)
            })

            if (repeatCourseUser.length > 0) return res.status(400).json({ message: 'El usuario ya pertenece a ese curso' })

            const repeatCategory = user.courses.filter((course, index) => {
                return course.category.name === category.name
            })

            if (repeatCategory.length >= 3) return res.status(400).json({ message: 'No puede tener mas de 3 cursos con la misma categoria' })
        }

        const udpadteObject = {}
        if (first_name !== undefined && first_name !== "") {
            udpadteObject.first_name = first_name
        }
        if (last_name !== undefined && last_name !== "") {
            udpadteObject.last_name = last_name
        }
        if (dni !== undefined && dni !== "") {
            udpadteObject.dni = dni
        }
        if (gender !== undefined && gender !== "") {
            udpadteObject.gender = gender
        }
        if (age !== undefined && age !== "") {
            udpadteObject.age = age
        }
    
        const updateUser = await User.findByIdAndUpdate(id,
            {
                $set: udpadteObject,
                $addToSet: { courses: courses },
            },
            { new: true });

        res.status(200).json({ message: `Se actualizaron los datos`, data: updateUser })
    } catch (error) {
        res.status(410).json({ error: error })
    }
}