import mongoose from 'mongoose';
const Schema = mongoose.Schema
import autopopulate from 'mongoose-autopopulate';

const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true, 
        },
        category:{
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            autopopulate: true,
        }

    },
    {
        timestamps: true,
    }
)

courseSchema.plugin(autopopulate)

const Course = mongoose.model('Courses', courseSchema);

export default Course