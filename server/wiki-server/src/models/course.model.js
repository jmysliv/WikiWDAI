import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: String,
    ects: Number,
    semester: Number,
    maxStudents: Number,
    courseForm: {
        type: String,
        enum: ['Lecture', 'Exercise', 'Lab', 'Project'],
        default: 'Lecture'
    },
    ratings: [{
        rating: Number,
        studentId: String,
    }],
    description: String,
    image: String,
    courseTeachers: [{
        teacher: {
            id: String,
            name: String,
            image: String,
            teacherCard: {
                phone: Number,
                email: String,
                homePage: String,
            },
            degree: String,
        },
        commentCategories: [{
            category: String,
            comments: [{
                studentId: String,
                rating: Number,
                content: String,
            }],
        }],
    }],
    enrolledStudents: [String],
});


courseSchema.methods.getUnifiedCourse = function () {
    let course = this.toJSON();
    course.id = this._id;
    delete course._id;
    return course; 
}
const CourseModel = mongoose.model('Courses', courseSchema);
mongoose.set('useFindAndModify', false);




export default CourseModel;