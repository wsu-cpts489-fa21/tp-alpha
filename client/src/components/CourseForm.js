import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CourseMode from './CourseMode';
import AddTeeModal from './AddTeeModal';
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.mode === CourseMode.AddCourse) {
            this.state = {
                name: "",
                address: "",
                phoneNumber: "",
                location: "",
                picture: "",
                stars: [],
                reviews: [],
                numRounds: 0,
                rank: 0,
                tees: [],
                btnIcon: "calendar",
                btnLabel: "Add Course",
                isAddTee: false
            };
        } else {
            this.state = this.props.courseData;
            this.state.btnIcon = "edit";
            this.state.btnLabel = "Update Course";
        }
    }

    handleChange = (value) => {
        const courseInfo = value.split(",")
        const courseName = courseInfo[0]
        this.setState({ value: courseName });
    };

    // getPhoneNum = async(placeID) => {
    //     const responsePhoneNum = await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeID +
    //     "&fields=name%2Crating%2Cformatted_phone_number&key=" + process.env.REACT_APP_GOOGLE_API_KEY)

    //     const phoneNumJSON = await responsePhoneNum.json()

    //     const getPhoneNum = await fetch(phoneNumJSON.result.formatted_phone_number)
    //     console.log(getPhoneNum)
    // }

    handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const courseInfo = value.split(",")
        const courseName = courseInfo[0]
        const courseAddress = results[0].formatted_address
        const latLng = await getLatLng(results[0])
        const location = latLng.lat + ", " + latLng.lng
        // const pID = results[0].place_id
        // this.getPhoneNum(pID)
        this.setState({
            // ...this.state,
            name: courseName,
            address: courseAddress,
            location: JSON.stringify(location)
        })
        console.log(this.state.name)
        console.log(results)
        console.log(latLng)
        // console.log(pID)
    };

    searchOptions = {
        types: ["establishment"]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ btnIcon: "spinner", btnLabel: "Saving..." }, this.handleSubmitCallback);
    }

    handleSubmitCallback = async () => {
        console.log(this.state.tees);
        const newCourse = { ...this.state };
        delete newCourse.btnIcon;
        delete newCourse.btnLabel;
        delete newCourse.value;
        const res = await this.props.saveCourse(newCourse);
        this.props.toggleModalOpen();
        this.props.setMode(CourseMode.CourseTable);
    }

    handleClickAddTee = (event) => {
        event.preventDefault()
        console.log("Click")
    }

    renderTeesTable = () => {
        const table = [];
        for (let r = 0; r < this.state.tees.length; ++r) {
            table.push(
                <tr key={r}>
                    <td>{this.state.tees[r].name}</td>
                    <td>{this.state.tees[r].golfingYardage}</td>
                    <td>{this.state.tees[r].runningYardage}</td>
                    <td>{this.state.tees[r].numHoles}</td>
                    <td>{this.state.tees[r].timePar}</td>

                </tr>

            );
        }

        return table;
    }

    addTee = (data) => {
        this.setState({tees: [...this.state.tees, data]});
    }

    render() {
        return (
            <div id="coursesModeDialog"
                className="mode-page action-dialog" role="dialog"
                aria-modal="true" aria-labelledby="courseFormHeader" tabIndex="0">
                <h1 id="courseFormHeader" className="mode-page-header">
                    {this.props.mode == CourseMode.AddCourse ? "Add Course" : "View / Edit Course"}
                </h1>
                <form id="addCourseForm"
                    onSubmit={this.handleSubmit} noValidate>
                    <div className="mb-3 centered">
                        <label htmlFor="roundDate" className="form-label">Course
                            {/* <input id="roundDate" name="date"
                                className="form-control centered" type="text"
                                aria-describedby="roundDateDescr" value={this.state.course}
                                onChange={this.handleChange} required /> */}
                            <PlacesAutocomplete
                                value={this.state.value}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                searchOptions={this.searchOptions}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            className="form-control centered" type="text"
                                            size="50" maxLength="50"
                                            {...getInputProps({
                                            })}
                                            value={this.state.name}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </label>
                        <div id="roundDateDescr" className="form-text">
                            Enter a course name of at most 50 characters
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="courseAddress" className="form-label">Address
                            <input id="courseAddress" name="address"
                                className="form-control centered" type="text"
                                aria-describedby="roundCourseDescr"
                                size="50" maxLength="50" defaultValue={this.state.address} required />
                        </label>
                        <div id="roundCourseDescr" className="form-text">
                            Enter the course address of at most 50 characters
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="coursePhoneNum" className="form-label">Phone Number
                            <input id="coursePhoneNum" name="phoneNum"
                                className="form-control centered" type="text"
                                aria-describedby="coursePhoneNum"
                                size="10" maxLength="10" />
                        </label>
                        <div id="coursePhoneNum" className="form-text">
                            Enter the course phone number (optional)
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="courseGeolocation" className="form-label">Geolocation
                            <input id="courseGeolocation" name="geolocation"
                                className="form-control centered" type="text"
                                aria-describedby="courseGeolocation"
                                size="50" maxLength="50" defaultValue={this.state.location} />
                        </label>
                        <div id="coursePhoneNum" className="form-text">
                            Enter the course geolocation (optional)
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="coursePic" className="form-label">
                            Course Picture
                            <img id="coursePicImage"
                                className="fm-profile-pic" height="46" width="auto" />
                            <input id="coursePic"
                                className="form-control centered"
                                name="coursePic"
                                type="file"
                                accept=".png, .gif, .jpg"
                                aria-describedby="coursePicDescr"
                            />
                        </label>
                        <div id="coursePicDescr" className="form-text">
                            A picture of the course (optional)
                        </div>
                    </div>
                  
                    <table id="courseTable" className="table table-hover caption-top">
                        <thead className="table-light">
                            <tr>
                                <th scope='col' role="columnheader"
                                    className="cell-align-middle"
                                    aria-sort="none">
                                 Name
                                </th>
                                <th scope="col" role="columnheader"
                                    className=" cell-align-middle"
                                    aria-sort="none">
                                    Golfing Yardage
                                </th>
                                <th scope="col" role="columnheader"
                                    className="cell-align-middle"
                                    aria-sort="none">
                                    Running Yardage
                                </th>
                                <th scope="col" role="columnheader"
                                    className="cell-align-middle"
                                    aria-sort="none">
                                    Number of Holes
                                </th>
                                <th scope="col" role="columnheader"
                                    className="cell-align-middle"
                                    aria-sort="none">
                                    Tee Time Par
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tees == null || this.state.tees.length === 0 ?
                                <tr>
                                    <td colSpan="5" scope="rowgroup"><i>No tees for this course</i></td>
                                </tr> : this.renderTeesTable()
                            }
                        </tbody>
                    </table>
                    <div className="mb-3 centered">
                        <label className="form-label">
                            Tee
                        </label>
                        <div>
                            <AddTeeModal 
                                addTee ={this.addTee}/>
                        </div>
                        <div className="form-text">
                            Course Tee Information (optional)
                        </div>
                    </div>
                    <div className="mode-page-btn-container">
                        <button type="submit" className="mode-page-btn action-dialog action-button">
                            <FontAwesomeIcon icon={this.state.btnIcon} className={this.state.btnIcon == "spinner" ? "fa-spin" : ""} />
                            <span>&nbsp;{this.state.btnLabel}</span>
                        </button>
                        <button type="button"
                            className="mode-page-btn-cancel action-dialog cancel-button"
                            onClick={() => {
                                this.props.setMode(CourseMode.CourseTable);
                                this.props.toggleModalOpen();
                            }}>
                            <FontAwesomeIcon icon="window-close" />
                            <span>&nbsp;Cancel</span>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CourseForm