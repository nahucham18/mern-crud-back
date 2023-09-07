import Category from '../models/category.model.js';

export const getAllCategory = async (req, res) => {
    const categories = await Category.find()
    console.log(categories)
    res.json(categories)
}

export const postCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.json('Faltan datos');

    const newName = name;
    const lowerName = newName.toLowerCase()
    const searchCategory = await Category.find({ name: lowerName });

    if (searchCategory.length > 0) return res.status(400).json({ message: 'Ya existe esta categoria' })

    try {
        const newCategory = new Category(
            {
                name: lowerName,
                habilitado: true,
            }
        )
        const categorySaved = await newCategory.save();
        res.status(200).json({ message: "Nueva categoria creada", data: categorySaved })
    } catch (error) {
        console.log(error)
    }
}

export const getByIdCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const searchCategory = await Category.findById(id);
        if (searchCategory === null) {
            return res.status(400).json('Categoria no encontrado')
        } else {
            return res.status(200).json(searchCategory)
        }
    } catch (error) {
        res.status(400).json({ message: 'Categoria no encontrada' });
    }
}


// export const deleteCategory = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const searchCategory = await Category.findByIdAndDelete(id)
//         if (searchCategory === null) {
//             return res.status(400).json({ message: 'Categoria no encontrada' })
//         } else {
//             return res.status(200).json({ message: 'La categoria fue eliminada', data: searchCategory })
//         }
//     } catch (error) {
//         res.status(400).json({ message: 'Categorina no encontrada' })
//     }
// }

export const deleteCategory = async (req, res)=>{
    try {
        const { id } = req.params 
        const {habilitado} = req.body
        console.log(habilitado)
        const searchCategory = await Category.findById(id)

        const updateCategory = await Category.findByIdAndUpdate(id,{
            $set:{  
                habilitado     
            },
            },
            {new: true}
        )
        res.status(200).json({message: "Categoria borrada", data: updateCategory})
    } catch (error) {
        console.log(error)
    }
}

export const putCategory = async (req, res) => {    
    try {
        const { id } = req.params
        const { name } = req.body
        const searchCategory = await Category.findById(id)
        console.log(habilitado)

        if(name !== undefined && name !== ""){  
            const searchNameCategory = await Category.find({name:name})

            if(searchNameCategory.length > 0 && searchNameCategory[0]?._id.toString() !== id){
                res.status(400).json({message: 'Ya existe categoria con ese nombre'})
            }else{
                const updateCategory = await Category.findByIdAndUpdate(id,{
                    $set:{
                        name,     
                    },
                    },
                    {new: true}
                )

                res.status(200).json({message: "Categoria actualizada", data: updateCategory})
            }
        }else {
            res.status(200).json({message: "Categoria actualizada", data:searchCategory})
        }

    } catch (error) {
        res.status(400).json({message: 'No se encontro la categoria'})
    }
}