import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class CourseWriteReview extends React.Component{
    constructor(props){
        super(props);
        this.state ={ review: "",
                      courseData: [] };
    }

    setNewReview = () => {
        var newCourseData = this.props.courses[this.props.courseIndex];
        newCourseData.reviews.push(this.state.review)
        this.setState({courseData: newCourseData})
        this.props.editCourse(this.state.courseData)
        this.props.toggleModalOpen()
    }

    render(){
        return (
            <div>
                <label>Review Test</label>
                <textarea name="reviewText" id="reviewSubmissionText"
                rows="10" col="100" maxLength="1000"
                value={this.state.review} onChange= {(event) => {this.setState({review: event.target.value})}}
                >
                </textarea>
            </div>
        )
    }
};

export default CourseWriteReview;