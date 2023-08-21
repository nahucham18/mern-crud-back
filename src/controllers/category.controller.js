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

    if(searchCategory.length > 0) return res.status(400).json({message:'Ya existe esta categoria'})

    try {
        const newCategory = new Category(
            {
                name: lowerName,
            }
        )
        const categorySaved =  await newCategory.save();
        res.status(200).json({message:"Nueva categoria creada",data:categorySaved})
    } catch (error) {
        console.log(error)
    }
}

export const getByIdCategory = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    try {
        const searchCategory = await Category.findById(id);
        console.log(searchCategory)
        if(searchCategory === null){
            return res.status(400).json('Categoria no encontrado')
        } else{
            return res.status(200).json(searchCategory)
        }
    } catch (error) {
        res.status(400).json({message: 'Categoria no encontrada'});
    }
}


export const deleteCategory = async(req,res) =>{
    const {id} = req.params;
    try {
        const searchCategory = await Category.findByIdAndDelete(id)
        console.log(searchCategory)
        if(searchCategory === null){
            return res.status(400).json({message: 'Categoria no encontrada'})
        }else{
            return res.status(200).json({message: 'La categoria fue eliminada', data:searchCategory})
        }
    } catch (error) {
        res.status(400).json({message: 'Categorina no encontrada'})
    }
}
export const putCategory = (req,res) =>{

}