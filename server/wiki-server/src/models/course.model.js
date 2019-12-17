import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
      },
    ects: {
        type: Number,
        min: 0,
        max: 15,
        required: true
      },
    semester: {
        type: Number,
        min: 0,
        max: 10,
        required: true
      },
    maxStudents: {
        type: Number,
        min: 0,
        required: true
      },
    courseForm: {
        type: String,
        enum: ['Lecture', 'Excercise', 'Lab', 'Project'],
        default: 'Lecture'
    },
    ratings: [{
        rating: {
            type: Number,
            min: 0,
            max: 5,
          },
        studentId: String,
    }],
    description: String,
    image:{
        type: String,
        validate: {
            validator: function(v){
                return /https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g.test(v)
            }
        } 
      },
    courseTeachers: [{
        teacher: {
            id: String,
            name: String,
            image: {
                type: String,
                validate: {
                    validator: function(v){
                        return /https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g.test(v)
                    }
                } 
              },
            teacherCard: {
                phone: Number,
                email: {
                    type: String,
                    validate: {
                        validator: function(v){
                            return /\S+@\S+\.\S+/.test(v)
                        }
                    } 
                  },
                homePage: {
                    type: String,
                    validate: {
                        validator: function(v){
                            return /https?:[\/|.|\w|\s|-]*\.*/g.test(v)
                        }
                    } 
                },
            },
            degree: String,
        },
        commentCategories: [{
            category: String,
            comments: [{
                studentId: String,
                rating: {
                    type: Number,
                    min: 0,
                    max: 5,
                  },
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