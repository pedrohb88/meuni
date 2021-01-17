import React from 'react';
import Autosuggest from 'react-autosuggest';

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {`${suggestion.name} (${suggestion.acronym})`}
  </div>
);

class SuggestionFieldCollege extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.props.onCollegeChange(suggestion._id);
    return `${suggestion.acronym} - ${suggestion.name}`;
  };


  // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : this.props.suggestionValues.filter(s => {

      if(s.name.toLowerCase().indexOf(inputValue) != -1)
        return true;

      if(s.acronym && s.acronym.toLowerCase().indexOf(inputValue) != -1)
        return true;

      return false;
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default SuggestionFieldCollege;