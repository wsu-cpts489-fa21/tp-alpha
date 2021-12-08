import React from 'react';
import logo from '../images/sslogo2.png'
import CourseMode from './CourseMode';
import CourseTable from './CourseTable';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: CourseMode.CourseTable};        
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    render() {
        switch(this.state.mode){
        case CourseMode.CourseTable:
            return (
                <CourseTable courses={this.props.courses}
                             setMode={this.setMode}
                             toggleModalOpen={this.props.toggleModalOpen}
                             menuOpen={this.props.menuOpen}/>
            );
        }
    }   
}

export default CoursesPage;