import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks'
  };

  componentDidMount = () => {
    const url = `http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${
      process.env.REACT_APP_MM_APP_KEY
    }`;
    const bypassCorsUrl = `https://cors-anywhere.herokuapp.com`;
    // return axios(url, {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: true,
    //     credentials: 'same-origin',
    //   })
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
