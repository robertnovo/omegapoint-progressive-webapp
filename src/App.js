import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Images from './containers/images';

class App extends Component {
  componentWillMount() {
    this.props.loadPhotos();
    setInterval(this.props.loadPhotos, 10*1000);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Op Julbilder</h1>
          <div>TODO: SEARCH COMPONENT</div>
        </div>
        <Images />
      </div>
    );
  }
}

export default connect(null, actions)(App);
