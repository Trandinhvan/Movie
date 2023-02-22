import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../../redux/actions/types/QuanLyPhimType';
import Film from '../Film';
import Film_Flip from '../Film_Flip';
import styleSlick from './MultipleRowSlick.module.css'


const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", color: 'black' }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", color: 'black' }}
            onClick={onClick}
        />
    );
}



 



export default function MultipleRowSlick(props) {
    
    const dispacth = useDispatch()

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
        prevArrow: <SamplePrevArrow />
    };

    const renderFilms = () => {
        return props.arrFilm.slice(0,12).map((film, index) => {
            return <div className='mt-2' key={index} >
                {/* <Film phim={film}></Film> */}
                <Film_Flip phim={film}></Film_Flip>
            </div>

        })
    }

    const {dangChieu,sapChieu} = useSelector(state => state.QuanLyPhimReducer)
    
  let activeClassDC = dangChieu===true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

    return (
        <div>
            <button type="button" className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`} onClick={()=>{
                dispacth({
                    type: SET_FILM_DANG_CHIEU
                })
            }}>PHIM ĐANG CHIẾU</button>
            <button type="button" className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={()=>{
                dispacth({
                    type: SET_FILM_SAP_CHIEU
                })
            }}>PHIM SẮP CHIẾU</button>
            <Slider {...settings}>
                {renderFilms()}
            </Slider>
        </div>

    )
}
