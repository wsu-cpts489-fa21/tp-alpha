//////////////////////////////////////////////////////////////////////////
//ROUTES FOR PERFORMING CRUD OPERATIONS ON Course DOCUMENTS
//////////////////////////////////////////////////////////////////////////


import { Course } from "../models/Course.js";
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
    Course.insertMany(req.body, function (err, result) {
      if (err) {
        res.status(400).send({ message: 'Could not save the course', meta: err });
      }
      else {
        res.status(200).send({ message: 'Successfully saved the course', data: result });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course not added to database. " +
      "Unexpected error occurred: " + err);
  }
});

//READ courses route: Returns all courses
courseRoute.get('/courses/', async (req, res) => {
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

//READ a single course's tees
courseRoute.get('/courses/:courseId', async (req, res) => {
  console.log("in /courses route (GET) a single course data");
  try {
    let course = await Course.find({_id: req.params.courseId}).select("tees").select("-_id");
    if (!course) {
      return res.status(400).send("No course found in database");
    } else {
      return res.status(200).json(JSON.stringify(course));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking for courses" + err);
  }
});
//UPDATE course route: Updates a specific course
//in the course collection (PUT)

courseRoute.put('/courses/:courseId', async (req, res, next) => {
  console.log("in /courses (PUT) route with params = " +
    JSON.stringify(req.params) + " and body = " +
    JSON.stringify(req.body));
  if (!req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("address") ||
    !req.body.hasOwnProperty("phoneNumber") ||
    !req.body.hasOwnProperty("location") ||
    !req.body.hasOwnProperty("picture")) {
    //Body does not contain correct properties
    return res.status(400).send("PUT request on /courses formulated incorrectly." +
      "Body must contain all 5 required fields");
  }
  try {
    const status = await Course.updateOne(
      { "_id": req.params.courseId },
      { $set: req.body });
    if (status.modifiedCount != 1) {
      return res.status(400).send("Course not modified. " +
        "Course '" + req.params.courseId + "' does not exist.");
    } else {
      return res.status(201).send("Course successfully modified.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course not modified. " +
      "Unexpected error occurred: " + err);
  }
});


//DELETE course route: Deletes a specific course given by courseId

courseRoute.delete('/courses/:courseId', async (req, res, next) => {
  console.log("in /courses (delete) route with params = " +
    JSON.stringify(req.params) + " and body = " +
    JSON.stringify(req.body));
  try {
    const status = await Course.deleteOne({ _id: req.params.courseId });
    if (status.deletedCount != 1) {
      return res.status(400).send("Course not deleted. Error.");
    } else {
      return res.status(201).send("Course successfully deleted.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Course not deleted. " +
      "Unexpected error occurred: " + err);
  }
});


export default courseRoute;

