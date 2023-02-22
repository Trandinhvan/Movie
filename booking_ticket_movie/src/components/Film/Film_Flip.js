import React from 'react'
import './Film_Flip.css'
import {PlayCircleOutlined} from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import {history} from '../../App'

export default function Film_Flip(props) {
  const {phim} = props
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
            <img src={phim.hinhAnh} alt="Avatar" style={{ width: 230, height: 200 }}  />
        </div>
        <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
          <div style={{ position:'absolute',top:0,left:0}}>
              <img src={phim.hinhAnh} alt='avatar' style={{width:230,height:200}}></img>
          </div>
          <div className='w-full h-full' style={{position:'absolute',backgroundColor:'rgba(0,0,0,.5)',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div className='rounded-full cursor-pointer'>
                <PlayCircleOutlined style={{fontSize:'50px'}} />
                <div className='text-2xl mt-2 font-bold'>{phim.tenPhim}</div>
              </div>
          </div>
        </div>
      </div>
      <div onClick={()=>{
          history.push(`detail/${phim.maPhim}`)
      }} className='text-center cursor-pointer py-2 bg-indigo-300 my-2 text-blue-100 font-bold w-full'>
        ĐẶT VÉ
      </div>
    </div>

  )
}
