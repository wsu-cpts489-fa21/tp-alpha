import React from 'react';
import CourseMode from './CourseMode';
import CourseTable from './CourseTable';
import CourseFloatingButton from './CourseFloatingButton';
import CourseForm from './CourseForm';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: CourseMode.CourseTable,
                        courseEditId: -1,
                        courseDeleteId: -1 };
    }

    setMode = (newMode) => {
        this.setState({ mode: newMode });
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
        }
    }
}

export default CoursesPage;