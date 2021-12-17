import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class CourseReviews extends React.Component{

    renderTable = (courseIndex) =>{
        const table = [];
        for(let r = 0; r < this.props.courses[courseIndex].reviews.length; ++r){
                table.push(
                    <tr key={r}>
                        <td>{this.props.courses[courseIndex].reviews[r]}</td>
                        <td>{this.props.courses[courseIndex].stars[r]} 
                        <FontAwesomeIcon icon="star" /></td>
                    </tr>
                  );
        }

    return table;
  }

    render() {
        return(
            <div id="courseModeTab" className="mode-page" role="tabpanel"
                aria-label="Course Tab" tabIndex="0">
            <h1 className="mode-page-header">{"Reviews for " + this.props.courseIndex }</h1>
            <table id="courseTable" className="table table-hover caption-top">
                <caption id="courseTableCaption" aria-live="polite">
                    {"Displaying " + this.props.courses[this.props.courseIndex].reviews.length + " results"}
                </caption>
                <thead className="table-light">
                    <tr>
                    <th scope='col' role="columnheader"
                        className="sortable-header cell-align-middle"
                        aria-sort="none">
                        <button className="btn bg-transparent table-sort-btn"
                                aria-lable="Sort ascending by course name">
                        <FontAwesomeIcon icon="sort" />
                        </button>Reviews
                    </th>
                    <th scope="col" role="columnheader"
                        className="sortable-header cell-align-middle"
                        aria-sort="none">
                        <button className="btn bg-transparent table-sort-btn"
                                aria-label="Sort ascending by location">
                        <FontAwesomeIcon icon="sort" />
                        </button>Stars
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.courses == null || this.props.courses.length === 0 ?
                        <tr>
                            <td colSpan="2" scope="rowgroup"><i>No reviews listed</i></td>
                        </tr> : this.renderTable(this.props.courseIndex)
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

export default CourseReviews