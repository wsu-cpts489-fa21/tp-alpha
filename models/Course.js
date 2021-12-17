import mongoose from 'mongoose';
import {TeeSchema} from './Tee.js';

const CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: false},
    location: {type: String, required: false},
    picture: {type: String, required: false},
    stars: [],
    reviews: [],
    numRounds: 0,
    rank: 0,
    tees:[TeeSchema]
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