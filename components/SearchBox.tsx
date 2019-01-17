import React from 'react';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'lodash';
import Watch from '../models/Watch';
import '../styles/react-autosuggest.css';

interface State {
  options: Watch[];
  search: string;
  watchId: number;
}

interface Props {}

class SearchBox extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      options: [] as Watch[],
      search: '',
      watchId: NaN,
    };

    this.inputChange = debounce(this.inputChange.bind(this), 500);
  }

  async inputChange(str: string) {
    if (str === '') {
      this.setState({ options: [] as Watch[] });
    } else {
      const response = await fetch(
        `/api/watches?search_like=${str}&_sort=search&_start=0&_limit=20`,
      );
      const json = await response.json();

      this.setState({ options: json });
    }
  }

  render() {
    const { options, search } = this.state;
    return (
      <div style={{ margin: '0 10px' }}>
        <Autosuggest
          onSuggestionsClearRequested={() => {
            this.setState({ options: [] });
          }}
          suggestions={options}
          inputProps={{
            placeholder: 'Nhập tên hoặc thương hiệu để tìm kiếm...',
            onChange: (_event, { newValue }) => {
              this.setState({ search: newValue });
            },
            value: search,
            onKeyDown: (event) => {
              if (event.keyCode === 13) {
                window.location.href = encodeURI(`/list?search=${this.state.search}`);
              }
            },
          }}
          getSuggestionValue={(option) => {
            return `${option.brand} ${option.name}`;
          }}
          onSuggestionsFetchRequested={({ value }) => {
            this.inputChange(value);
          }}
          renderSuggestion={(suggestion) => {
            return (
              <div>
                {suggestion.brand}{' '}{suggestion.name}
              </div>
            );
          }}
          onSuggestionSelected={(_event, { suggestion }) => {
            this.setState({ watchId: suggestion.id }, () => {
              window.location.href = encodeURI(`/watch?id=${this.state.watchId}`);
            });
          }}
        />
      </div>
    );
  }
}

export default SearchBox;
