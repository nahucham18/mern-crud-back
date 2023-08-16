import User from '../models/user.model.js';

export const register = async(req,res) => {
    const {first_name, last_name, dni, gender, age} = req.body

    try {
        const newUser = new User({
            dni,
            first_name,
            last_name,
            age,
            gender
        })
        
        const userSaved = await newUser.save()

        res.json(userSaved)
    } catch (error) {
        console.log(error)
        res.send('Ya esta creado')
    }
    

    // const data = req.body
    // console.log(data)
    // res.send(data)
};

export const login = (req,res) => res.send('login');