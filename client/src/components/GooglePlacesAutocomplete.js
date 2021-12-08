import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import './App.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

function GooglePlacesAutocomplete() {

  const [address, setAddress] = useState('')
  const [course, setCourse] = useState({
    name: null,
    address: null
  })
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  })

  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const lat_lng = await getLatLng(results[0])
    const courseInfo = value.split(",")
    const courseName = courseInfo[0]
    const courseAddress = results[0].formatted_address

    setAddress(value)
    setCoordinates(lat_lng)
    setCourse({
      name: courseName,
      address: courseAddress
    })

    console.log(results)
    console.log(lat_lng)
    console.log(courseName)
    console.log(results[0].formatted_address)
  }

  const searchOptions = {
    types: ['establishment']
  }

  return (
    <div id="coursesModeDialog"
      className="mode-page action-dialog" role="dialog"
      aria-modal="true" aria-labelledby="courseFormHeader" tabIndex="0">
      <h1 id="courseFormHeader" className="mode-page-header">
        {this.props.mode == CourseMode.AddCourse ? "Add Course" : "Edit Course"}
      </h1>
      <form id="addCourseForm"
        onSubmit={this.handleSubmit} noValidate>
        <p>
          Lat: {coordinates.lat}
        </p>
        <p>
          Long: {coordinates.lng}
        </p>
        <div className="mb-3 centered">
          <label htmlFor="courseName" className="form-label">Course
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={searchOptions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    className="form-control centered" type="text"
                    size="50" maxLength="50"
                    {...getInputProps({
                    })}
                    value={course.name}
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
                          key={suggestion.placeId}
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
              size="50" maxLength="50" value={course.address}
              onChange={setAddress} required />
          </label>
          <div id="roundCourseDescr" className="form-text">
            Enter the course address of at most 50 characters
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
  );
}

export default GooglePlacesAutocomplete;
