import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//MODELO Category
const categorySchema = new Schema (
    {
        name:{
            type: String,
            required: true
        },
    }
)

const Category = mongoose.model('Categories', categorySchema);

export default Category;