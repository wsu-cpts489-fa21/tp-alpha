//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON Course DOCUMENTS
//////////////////////////////////////////////////////////////////////////

import User from "../models/User.js";
import {Round} from "../models/Round.js";
import {Course} from "../models/Course.js";
import express from 'express';
const courseRoute = express.Router();




//CREATE course route: Adds a new course (POST)
courseRoute.post('/courses/', async (req, res, next) => {
    console.log("in /courses (POST) route with params = " + 
                JSON.stringify(req.params) + " and body = " + 
                JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("name") || 
        !req.body.hasOwnProperty("address") || 
        !req.body.hasOwnProperty("phoneNumber") ||
        !req.body.hasOwnProperty("location") || 
        !req.body.hasOwnProperty("picture")) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /courses formulated incorrectly." +
        "Body must contain all 5 required fields");
    }
    try {
      const course = new Course(req.body);
      const error = course.validateSync();
      if (error) { //Schema validation error occurred
        return res.status(400).send("Course not added to database. " + error.message);
      }
      const status = await Course.insertMany(
        req.body);
      if (status.modifiedCount != 1) {
        return res.status(400).send("Course not added to database.");
      } else {
        return res.status(201).send("Course successfully added to database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Course not added to database. " +
        "Unexpected error occurred: " + err);
    } 
  });

//READ courses route: Returns all courses
courseRoute.get('/courses/', async(req, res) => {
    console.log("in /courses route (GET)");
    try {
      let courses = await Course.find({});
      if (!courses) {
        return res.status(400).send("No courses found in database");
      } else {
        return res.status(200).json(JSON.stringify(courses));
      }
    } catch (err) {
      console.log()
      return res.status(400).send("Unexpected error occurred when looking for courses" + err);
    }
  });

  export default courseRoute;