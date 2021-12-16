import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: false},
    location: {type: String, required: false},
    picture: {type: String, required: false},
    stars: 0,
    reviews: [],
    numRounds: 0,
    rank: 0
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