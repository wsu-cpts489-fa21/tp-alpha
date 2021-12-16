import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CourseTable extends React.Component {
  renderTable = () => {
    const table = [];
    for (let r = 0; r < this.props.courses.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.courses[r].name}</td>
          <td>{this.props.courses[r].location}</td>

          <td><button onClick={this.props.menuOpen ? null : () =>
            this.props.initiateEditCourse(r)}>
            <FontAwesomeIcon icon="eye" />
            <FontAwesomeIcon icon="edit" />
          </button></td>
          <td><button onClick={this.props.menuOpen ? null :
            () => this.props.initiateDeleteCourse(r)}>
            <FontAwesomeIcon icon="trash" />
          </button></td>
        </tr>

      );
    }

    return table;
  }

  /* searchCourseTable(searchVal) {
      searchVal = searchVal.toUpperCase(); //case insensitive
      let tr = table.getElementsByTagName("tr");
      let td, rowText, i;
      let numVisibleRows = 0;
      for (i = 1; i < tr.length; i++) {  //Loop through all table rows
        td = tr[i].getElementsByTagName("td");
        rowText = "";
          rowText += td[0].textContent; //only consider Course Name column
        if (rowText.toUpperCase().indexOf(searchVal) > -1) {
          tr[i].style.display = ""; //show row
          numVisibleRows++;
        } else {
          tr[i].style.display = "none"; //hide row
        }
      }
      if (numVisibleRows == 1) {
        courseTableCaption.textContent = "Table displaying 1 speedgolf course";
      } else {
        courseTableCaption.textContent = "Table displaying " + numVisibleRows + " speedgolf courses";
      }
    } */

  render() {
    return (
      <div id="courseModeTab" className="mode-page" role="tabpanel"
        aria-label="Course Tab" tabIndex="0">
        <h1 className="mode-page-header">Course Listings</h1>
        <table id="courseTable" className="table table-hover caption-top">
          <caption id="courseTableCaption" aria-live="polite">
            {"Displaying " + this.props.courses.length + " results"}
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
              <th scope="col" role="columnheader"
                className="cell-align-middle"
                aria-sort="none">
                View / Edit
              </th>
              <th scope="col" role="columnheader"
                className="cell-align-middle"
                aria-sort="none">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.courses == null || this.props.courses.length === 0 ?
              <tr>
                <td colSpan="4" scope="rowgroup"><i>No courses listed</i></td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>
      </div>
    );

  }
}

export default CourseTable;