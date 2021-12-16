import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SearchBar extends React.Component {
    constructor(props){
      super(props);
      this.state = {inputVal: ""}
    }

    clearSearchBar = () =>{
      this.setState({inputVal: ""})
    }

    render() {
       return (
         <div>
          <input type="text" value={this.state.inputVal} onChange={event=>{this.setState({inputVal: event.target.value}); this.props.filterResults(this.state.inputVal)}} id="courseSearch" placeholder="Search for course.."></input>
          <button id="closeSearchBar" type="button" className='navbar-btn' onClick={()=>{this.clearSearchBar(); this.props.filterResults("")}}><FontAwesomeIcon icon="times" color="red" className="navbar-searchClear-btn"/></button>
        </div>
    ); 
  }
}

export default SearchBar;