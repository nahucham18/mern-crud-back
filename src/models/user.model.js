import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
//Para las personas se pide registrar su nombre y apellido, DNI, género y edad.


const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true,
        trim:true,
    },
    last_name: {
        type: String,
        required: true,
        trim:true,
    },
    dni:{
        type: Number,
        required:true,
        trim:true,
        unique:true,
    },
    gender:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    courses:{
        type: [mongoose.Types.ObjectId],
        ref: 'Courses',
        autopopulate: true, 
    }
},{
    timestamps:true
})

userSchema.plugin(autopopulate)

export default mongoose.model('Users', userSchema)