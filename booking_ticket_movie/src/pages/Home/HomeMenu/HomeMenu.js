import React, { Fragment, useEffect, useState } from 'react'
import { Radio, Space, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function HomeMenu(props) {
    const [tabPosition, setTabPosition] = useState('left');
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    console.log(props.heThongRapChieu)

    const renderHeThongRap = ()=>{
        return props.heThongRapChieu.map((item,index)=>{
            return <TabPane tab={<img src={item.logo} className='rounded-full' width='50' alt=''></img>} key={index}>
                <Tabs tabPosition={tabPosition} >
                    {item.lstCumRap?.map((cumRap,index)=>{
                        return <TabPane tab={
                        <div style={{widht:'300px',display: 'flex'}}>
                            <img src={'https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg'}  width='50' alt=''></img><br></br>
                            <div className="text-left ml-2">
                                    {cumRap.tenCumRap}
                                    <p className="text-red-200">Chi tiết</p>
                                </div>
                        </div>
                    }  
                        key={index}>

                            {cumRap.danhSachPhim.slice(0,5).map((phim,index)=>{
                                return <Fragment key={index}>
                                    <div className="my-5"  >
                                    <div style={{display:'flex'}}>
                                        <img style={{ height: 75, width: 75 }} src={phim.hinhAnh} alt={phim.hinhAnh} onError={(e)=>{
                                            e.target.onError =null;
                                            e.target.src= 'https://picsum.photos/75/75'
                                        }}></img>
                                        
                                        <div className="ml-2">
                                                <h1 className="text-2xl text-green-700" >{phim.tenPhim}</h1>
                                                <p>{cumRap.diaChi}</p>
                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink className="text-2xl text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }




    return (
        <>
            <div className='container'>
                <Tabs tabPosition={tabPosition}>
                    {renderHeThongRap()}
               
                </Tabs>
            </div>
            
                
        </>
    )
}
