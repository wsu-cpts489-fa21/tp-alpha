import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CourseMode from './CourseMode';
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
                btnIcon: "calendar",
                btnLabel: "Add Course"
            };
        } else {
            this.state = this.props.courseData;
            this.state.btnIcon = "edit";
            this.state.btnLabel = "Update Course";
        }
    }

    handleChange = (value) => {
        this.setState({ value });
    };

    handleSelect = async (value) => {
        const results = await geocodeByAddress(value)
        const courseInfo = value.split(",")
        const courseName = courseInfo[0]
        const courseAddress = results[0].formatted_address
        const latLng = await getLatLng(results[0])
        const location = latLng.lat + ", " + latLng.lng
        this.setState({
            // ...this.state,
            name: courseName,
            address: courseAddress,
            location: location
        })
        console.log(this.state.name)
        console.log(results)
        console.log(latLng)
    };

    searchOptions = {
        types: ['establishment']
    }

    // handleChange = (event) => {
    //     const name = event.target.name;
    //     if (name === "seconds") {
    //         const newSec = (event.target.value.length < 2 ? "0" + 
    //         event.target.value : event.target.value);
    //         const newSGS = this.computeSGS(this.state.strokes, this.state.minutes, 
    //                                     newSec);
    //         this.setState({seconds: newSec, SGS: newSGS});
    //     } else if (name === "strokes") {
    //         const newStrokes = event.target.value;
    //         const newSGS = this.computeSGS(newStrokes, this.state.minutes, 
    //         this.state.seconds);
    //         this.setState({strokes: newStrokes, SGS: newSGS});
    //     } else if (name === "minutes") {
    //         const newMin = event.target.value;
    //         const newSGS = this.computeSGS(this.state.strokes, newMin, 
    //             this.state.seconds);
    //         this.setState({minutes: newMin, SGS: newSGS});
    //     } else {
    //         this.setState({[name]: event.target.value});
    //     }
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ btnIcon: "spinner", btnLabel: "Saving..." }, this.handleSubmitCallback);
    }

    handleSubmitCallback = async () => {
        const newCourse = { ...this.state };
        delete newCourse.btnIcon;
        delete newCourse.btnLabel;
        delete newCourse.value;
        const res = await this.props.saveCourse(newCourse);
        this.props.toggleModalOpen();
        this.props.setMode(CourseMode.CourseTable);
    }

    render() {
        return (
            <div id="coursesModeDialog"
                className="mode-page action-dialog" role="dialog"
                aria-modal="true" aria-labelledby="courseFormHeader" tabIndex="0">
                <h1 id="courseFormHeader" className="mode-page-header">
                    {this.props.mode == CourseMode.AddCourse ? "Add Course" : "Edit Course"}
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
                                            value={this.state.value}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
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
                                size="50" maxLength="50" value={this.state.address} required />
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
                                size="50" maxLength="50" value={JSON.stringify(this.state.location)} />
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