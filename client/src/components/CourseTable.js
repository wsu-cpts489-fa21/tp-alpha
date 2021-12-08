import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CourseTable extends React.Component {
    renderTable = () =>{
        const table = [];
        for(let r = 0; r < this.props.courses.length; ++r){
            table.push(
                <tr key={r}>
                    <td>{this.props.courses[r].name}</td>
                    <td>{this.props.courses[r].location}</td>
                </tr>

            );
        }

        return table;
    }

    render() {
        return (
            <div id="courseModeTab" className="mode-page" role="tabpanel"
                aria-label="Course Tab" tabIndex="0">
            <h1 className="mode-page-header">Course Listings</h1>
            <table id="courseTable" className="table table-hover caption-top">
                <caption id="courseTableCaption" aria-live="polite">
                    {"Displaying " + 0 + " results"}
                </caption>
                <thead className="table-light">
                    <tr>
                    <th scope='col' role="columnheader"
                        className="sortable-header cell-align-middle"
                        aria-sort="none">
                        <button className="btn bg-transparent table-sort-btn"
                                aria-lable="Sort ascending by course name">
                        <FontAwesomeIcon icon="sort" />
                        </button>Course Name
                    </th>
                    <th scope="col" role="columnheader"
                        className="sortable-header cell-align-middle"
                        aria-sort="none">
                        <button className="btn bg-transparent table-sort-btn"
                                aria-label="Sort ascending by location">
                        <FontAwesomeIcon icon="sort" />
                        </button>Location
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.courses == null || this.props.courses.length === 0 ?
                        <tr>
                            <td colSpan="2" scope="rowgroup"><i>No courses listed</i></td>
                        </tr> : this.renderTable()
                    }
                </tbody>
            </table>
            </div>
        );
        
    }
}

export default CourseTable;