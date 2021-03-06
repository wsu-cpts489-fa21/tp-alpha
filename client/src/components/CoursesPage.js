import React from 'react';
import CourseMode from './CourseMode';
import CourseTable from './CourseTable';
import CourseFloatingButton from './CourseFloatingButton';
import CourseForm from './CourseForm';
import CourseReviews from './CourseReviews';
import CourseWriteReview from './CourseWriteReview';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: CourseMode.CourseTable,
                        courseEditId: -1,
                        courseDeleteId: -1,
                        courseIndex: 0 };
    }

    setMode = (newMode) => {
        this.setState({ mode: newMode });
    }

    showReviews = (courseVal) =>{
        this.setState({courseIndex: courseVal},
                        this.props.toggleModalOpen)
        this.setMode(CourseMode.CourseReview)
    }

    addReview = (courseIndex, newCourseData) => {
        this.props.passCourseEditId(courseIndex);
        this.props.editCourse(newCourseData);
    }
    initiateEditCourse = (val) => {
        this.setState({courseEditId: val,
                       mode: CourseMode.EditCourse}, 
                       this.props.toggleModalOpen);
        this.props.passCourseEditId(val);
    }
    
    initiateDeleteCourse = (val) => {
        this.props.deleteCourse(val);
        this.setState({courseDeleteId: val})
        //() => alert("Confirm delete!"));
        
    }

    render() {
        switch (this.state.mode) {
            case CourseMode.CourseTable:
                return (
                    <>
                        <CourseTable
                        courses={this.props.courses}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        filter={this.props.filter}
                        filterResults={this.props.filterResults}
                        initiateDeleteCourse={this.initiateDeleteCourse}
                        initiateEditCourse={this.initiateEditCourse}
                        showReviews={this.showReviews}
                        />
                        <CourseFloatingButton
                            label={"Add Course"}
                            menuOpen={this.props.menuOpen}
                            action={() => this.setState({ mode: CourseMode.AddCourse },
                                this.props.toggleModalOpen)} />
                    </>
                );
            case CourseMode.AddCourse:
                return (
                <CourseForm mode={this.state.mode}
                        courseData={null}
                        saveCourse={this.props.addCourse}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CourseMode.EditCourse:
                return (
                    <CourseForm mode={this.state.mode}
                    editId = {this.state.courseEditId}
                    courseData={this.props.courses[this.state.courseEditId]}
                    saveCourse={this.props.editCourse}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CourseMode.CourseReview:
                return(
                    <>
                        <CourseReviews mode={this.state.mode}
                        courses={this.props.courses}
                        courseIndex = {this.state.courseIndex}
                        showReviews = {this.showReviews}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen}
                        />

                        <CourseFloatingButton
                            label={"Write Review"}
                            menuOpen={this.props.menuOpen}
                            action={() => this.setState({ mode: CourseMode.WriteReview},
                                this.props.toggleModalOpen)} />

                        <button
                            label={"Exit Reviews"}
                            menuOpen={this.props.menuOpen}
                            onClick={() => this.setState({ mode: CourseMode.CourseTable },
                                this.props.toggleModalOpen)} />
                    </>
                );
            case CourseMode.WriteReview:
                return(
                    <>
                        <CourseWriteReview mode={this.state.mode}
                        courses={this.props.courses}
                        setMode={this.setMode}
                        courseIndex={this.props.courseVal}
                        editCourse={this.props.editCourse}
                        toggleModalOpen={this.props.toggleModalOpen}
                        />

                        <CourseFloatingButton
                            label={"Submit"}
                            menuOpen={this.props.menuOpen}
                            action={() => this.setState({ mode: CourseMode.CourseReview },
                                this.props.toggleModalOpen)} />

                        <button
                            label={"Cancel"}
                            menuOpen={this.props.menuOpen}
                            onClick={() => this.setState({ mode: CourseMode.CourseReview },
                                this.props.toggleModalOpen)} />
                        

                    </>
            );
        }
    }
}

export default CoursesPage;