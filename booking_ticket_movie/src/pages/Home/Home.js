import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Film from '../../components/Film/Film'
import MultilpleRowSlickRCC from '../../components/Film/RSlick/MultilpleRowSlickRCC'
import MultipleRowSlick from '../../components/Film/RSlick/MultipleRowSlick'
import MultipleRows from '../../components/Film/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu/HomeMenu'


export default function Home(props) {

    const dispatch = useDispatch()

    const {arrFilm} = useSelector(state => state.QuanLyPhimReducer)
    console.log('danhsach phim:',arrFilm)
    const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer)
    useEffect(()=>{
        dispatch(layDanhSachPhimAction) //dispacth function từ redux thunk
        // dispatch lên action lấy hệ thống cụm rạp
        dispatch(layDanhSachHeThongRapAction())
    },[])

    return (
        <div>
            
            <div className=''>
            <HomeCarousel></HomeCarousel>
                <section className="text-gray-600 body-font container ">
                    <div className="container px-5 py-24 mx-auto">
                            <MultipleRowSlick arrFilm={arrFilm}></MultipleRowSlick>      
                    </div>
                </section>

            </div>
            <HomeMenu heThongRapChieu= {heThongRapChieu}></HomeMenu>
        </div>
    )
}
