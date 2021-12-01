import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    course: {type: String, required: true},
    type: {type: String, required: true, enum: ['practice','tournament']},
    holes: {type: Number, required: true, min: 1, max: 18},
    strokes: {type: Number, required: true, min: 1, max: 300},
    minutes: {type: Number, required: true, min: 1, max: 240},
    seconds: {type: Number, required: true, min: 0, max: 60},
    notes: {type: String}
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true
    } 
  });
  

const Course = mongoose.model("Course",CourseSchema);
export {CourseSchema, Course};