import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CourseTable extends React.Component {
    renderTable = () =>{
        const table = [];

        return table;
    }

    searchCourseTable(searchVal) {
        searchVal = searchVal.toUpperCase(); //case insensitive
        let tr = table.getElementsByTagName("tr");
        let td, rowText, i, j;
        let numVisibleRows = 0;
        for (i = 1; i < tr.length; i++) {  //Loop through all table rows
          td = tr[i].getElementsByTagName("td");
          rowText = "";
            rowText += td[0].textContent; //only consider Course name Column
          if (rowText.toUpperCase().indexOf(searchVal) > -1) {
            tr[i].style.display = ""; //show row
            numVisibleRows++;
          } else {
            tr[i].style.display = "none"; //hide row
          }
        }
        if (numVisibleRows == 1) {
          roundsTableCaption.textContent = "Table displaying 1 speedgolf course";
        } else {
          roundsTableCaption.textContent = "Table displaying " + numVisibleRows + " speedgolf courses";
        }
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
                    
                    <tr>
                        <td colSpan="2" scope="rowgroup"><i>No courses listed</i></td>
                    </tr>
                </tbody>
            </table>
            </div>
        );
        
    }
}

export default CourseTable;