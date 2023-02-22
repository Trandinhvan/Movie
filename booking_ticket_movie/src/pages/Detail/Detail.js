import React, { useEffect, useState } from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/style/circle.css'
import { Tabs, Rate } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useSelector, useDispatch } from 'react-redux'
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction'
import moment from 'moment'
import { StarOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Detail(props) {

  const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    // lấy thông tin param từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id))
  }, [])

  const [tabPosition, setTabPosition] = useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={5} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-5 col-start-3'>
            <div className='grid grid-cols-3'>
              <img className='col-span-1' src={filmDetail.hinhAnh} style={{ width: 200, height: 350 }} alt=''></img>
              <div className='col-span-2 ml-5'>
                <p className='text-sm'>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD : MM : YYYY')}</p>
                <p className='text-3xl leading-10'>{filmDetail.tenPhim}</p>
                <p className='leading-6'>{filmDetail.moTa}</p>
              </div>
            </div>

          </div>

          <div className='col-span-4'>
            <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
            <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10} %</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>


        <Tabs defaultActiveKey="1" centered >
          <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
            <div className='mt-20 ml-60 w-2/3 bg-white p-5 container'>
              <Tabs tabPosition={'left'}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return <TabPane tab={<div><img src={htr.logo} width={50} height={50} alt={htr.logo}></img></div>} key={index}>
                    {/*  */}
                    {htr.cumRapChieu?.map((cumRap, index) => {
                      return <div className='mt-5' key={index}>
                        <div className='flex flex-row'>
                          <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                          <div className="ml-2">
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                            <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                          </div>
                        </div>
                        <div className='thong-tin-lich-chieu grid-cols-4'>
                          {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold mr-3">
                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                            </NavLink>
                          })}
                        </div>


                      </div>
                    })}
                  </TabPane>
                })}


              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
            Thông tin
          </TabPane>
          <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
            Đánh giá
          </TabPane>
        </Tabs>
      </CustomCard>




    </div>

  )
}
