import { Component } from "react";

class Carousel extends Component {
  // This is equivalent to useState, all the variales we wanna track state, we ll take that inside the state object
  state = {
    active: 0,
  };

  // In Class-Based components we derive default props here
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: Number(e.target.dataset.index),
    });
  };

  render() {
    const { active } = this.state; // Here we have to define again
    const { images } = this.props; // These are the props

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              alt="animal thumbnail"
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
