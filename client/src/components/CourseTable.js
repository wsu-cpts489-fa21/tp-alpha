import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from './SearchBar';

class CourseTable extends React.Component {
    renderTable = (filter) =>{
        const table = [];
        var i = 0;
        for(let r = 0; r < this.props.courses.length; ++r){
            if(i > 99) break;
            if(this.props.courses[r].name.toUpperCase().indexOf(filter.toUpperCase()) > -1 || this.props.courses[r].location.toUpperCase().indexOf(filter.toUpperCase()) > -1){
                table.push(
                    <tr key={r}>
                      <td>{this.props.courses[r].name}</td>
                      <td>{this.props.courses[r].location}</td>
                      <td><button onClick={this.props.menuOpen ? null : () =>
                        this.props.showReviews(r)}>
                        <td>{this.props.courses[r].stars}</td>
                        <FontAwesomeIcon icon={["fas", "book-reader"]} />
                      </button></td>
            
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
                i++;
            }
        }

    return table;
  }

  render() {
    return (
      <div id="courseModeTab" className="mode-page" role="tabpanel"
        aria-label="Course Tab" tabIndex="0">
        <h1 className="mode-page-header">Course Listings</h1>
        <SearchBar filterResults={this.props.filterResults} />
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
              </tr> : this.renderTable(this.props.filter)
            }
          </tbody>
        </table>
      </div>
    );

  }
}

export default CourseTable;