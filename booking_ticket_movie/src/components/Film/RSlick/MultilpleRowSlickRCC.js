import React, { Component } from 'react'
import Slider from "react-slick";
import Film from '../Film';
import styleSlick from './MultipleRowSlick.module.css';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick['slick-prev']}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
      </div>
  
    );
  }
  
  
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styleSlick['slick-prev']}`}
  
        style={{ ...style, display: "block", left: '-50px' }}
        onClick={onClick}
      >
      </div>
    );
  }

export default class MultilpleRowSlickRCC extends Component {
    renderFilms = () => {

        return this.props.arrFilm.slice(0, 12).map((item, index) => {
          return <div className="mt-2" key={index}  >
            <Film></Film>
          </div>
        })
      }

      
  render() {
    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
    return (
        <Slider {...settings}>
            <div>{this.renderFilms()}</div>
        </Slider>
    )
  }
}
