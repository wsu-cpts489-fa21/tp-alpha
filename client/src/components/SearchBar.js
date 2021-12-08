import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

class SearchBar extends React.Component {

  handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  handleOnFocus = () => {
    console.log('Focused')
  }

  formatResult = (item) => {
    return item
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  }
    
    render() {
       return (
        <ReactSearchAutocomplete
            items={this.props.courses}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
    ); 
  }
}

export default SearchBar;