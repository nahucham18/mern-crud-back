import Category from '../models/category.model.js';

export const getAllCategory = async(req,res) =>{
    const categories = await Category.find()
    console.log(categories)
    res.json(categories)
}


export const postCategory = async(req,res) =>{
    const {name} = req.body;
    
    if(!name) return res.json('Faltan datos');

    const newName = name;
    console.log(newName);
    const lowerName = newName.toLowerCase()
    console.log(lowerName)
    const searchCategory = await Category.find({name: lowerName});

    if(searchCategory.length > 0) return res.json('Ya esta creado')

    try {
        const newCategory = new Category(
            {
                name: lowerName,
            }
        )
        const categorySaved =  await newCategory.save();
        res.json(categorySaved)
    } catch (error) {
        console.log(error)
    }
}

export const getByIdCategory = (req,res) =>{

}
export const deleteCategory = (req,res) =>{

}
export const putCategory = (req,res) =>{

}