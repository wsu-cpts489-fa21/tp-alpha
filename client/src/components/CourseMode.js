/* CourseMode: The enumerated type for course modes. */

const CourseMode = {
    CourseTable: "CourseTable",
    AddCourse: "AddCourse",
    EditCourse: "EditCourse",
    CourseReview: "CourseReview",
    WriteReview: "WriteReview",
    testReview: "testReview"
};

Object.freeze(CourseMode); //This ensures that the object is immutable.

export default CourseMode;