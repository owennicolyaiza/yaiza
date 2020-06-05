import React, { Component } from 'react';

import classnames from 'classnames';

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 1,
      imagesCount: props.images.length
    }
    this.fadeImages = this.fadeImages.bind(this);
    this.clear = this.clear.bind(this);
  }
  componentDidMount() {
    this.fadeImages();
  }

  componentWillUnmount() {
    this.clear();
  }

  clear() {
    clearInterval(this.timer);
  }

  fadeImages() {
    this.timer = setInterval(() => {
      const activeImage = this.state.activeImage < this.state.imagesCount ? this.state.activeImage : 0;
      this.setState({
        activeImage: activeImage + 1,
        nextImage: activeImage + 2
      })
    }, 2000)
  }

  render() {
    return (

      <div className="image-slider" onMouseLeave={this.fadeImages} onMouseEnter={this.clear}>
        {this.props.images.map((image, index) => {
          const imageClasses = classnames({
            'image-container': true,
            'active': this.state.activeImage === index + 1,
            'next': this.state.nextImage === index + 1
          })
          return <div className={imageClasses} key={index}>
            <img src={image} className="img-responsive" />
          </div>
        })}
      </div>

    );
  }
}

export default ImageSlider;
