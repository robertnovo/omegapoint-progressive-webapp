import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Images from './containers/images';

class App extends Component {
  componentWillMount() {
    setInterval(this.props.loadPhotos, 2000);
    // this.props.loadPhotos();
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
