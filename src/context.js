import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: aciton => {
      this.setState(state => reducer(state, aciton));
    }
  };

  componentDidMount = () => {
    const url = `http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${
      process.env.REACT_APP_MM_APP_KEY
    }`;
    const bypassCorsUrl = `https://cors-anywhere.herokuapp.com`;
    axios
      .get(`${bypassCorsUrl}/${url}`)
      .then(res => {
        //console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;
export default Consumer;
