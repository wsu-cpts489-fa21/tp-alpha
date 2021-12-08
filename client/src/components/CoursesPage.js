import React from 'react';
import CourseMode from './CourseMode';
import CourseTable from './CourseTable';
import CourseFloatingButton from './CourseFloatingButton';
import CourseForm from './CourseForm';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: CourseMode.CourseTable };
    }

    setMode = (newMode) => {
        this.setState({ mode: newMode });
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
        }
    }
}

export default CoursesPage;