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
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            autopopulate: true,
        },
        img_course: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/nahuelchamorro-e4019.appspot.com/o/cursoonline.png?alt=media&token=82c098f1-ba88-4743-b2e0-33b0f1f51d28"
        }

    },
    {
        timestamps: true,
    }
)

courseSchema.plugin(autopopulate)

const Course = mongoose.model('Courses', courseSchema);

export default Course