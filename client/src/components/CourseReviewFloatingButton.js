import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGolfBall } from '@fortawesome/free-solid-svg-icons'

const CourseReviewFloatingButton = (props) => {

    return (
        <button id="coursesReviewModeActionBtn" type="button"
            className="float-btn" onClick={props.action}>
            <FontAwesomeIcon icon={faGolfBall} />
            &nbsp;{props.label}
        </button>
    );
}

export default CourseReviewFloatingButton;