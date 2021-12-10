import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGolfBall } from '@fortawesome/free-solid-svg-icons'

const CourseFloatingButton = (props) => {

    return (
        <button id="coursesModeActionBtn" type="button"
            className="float-btn" onClick={props.action}>
            <FontAwesomeIcon icon={faGolfBall} />
            &nbsp;{props.label}
        </button>
    );
}

export default CourseFloatingButton;