import React, {Component} from 'react';
import { connect } from 'react-redux';
import PhotoWall from './photo-wall'

class Images extends Component {
  render() {
    if (this.props.images.length === 0) {
      return (<div>...loading...</div>)
    }
    return (
      <div className="image-container">
        <PhotoWall imagesArray={this.props.images} columns={[ 1, 3, 5 ]} padding={10} />
      </div>
    )
  }
}

function mapProps(state) {
  return {
    images: state.images
  }
}
export default connect(mapProps)(Images);
