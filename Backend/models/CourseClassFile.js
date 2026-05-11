import mongoose, { Schema } from 'mongoose';

const CourseClassFileSchema = new Schema({
    file: {
        type: String,
        maxlength: 250,
        required: true,
    },
    file_url: {
        type: String,
        maxlength: 250,
        required: true,
    },
    class: {
        type:Schema.Types.ObjectId,
        ref: 'CourseClass',
        required:true,
    },
    size: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
});

const CourseClassFile = mongoose.model('CourseClassFile', CourseClassFileSchema);

export default CourseClassFile;