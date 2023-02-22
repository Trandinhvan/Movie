import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import style from './CheckOut.module.css';
import './CheckOut.css'
import { CheckOutlined, CloseOutlined, UserOutlined ,SmileOutlined,HomeOutlined} from '@ant-design/icons'
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
//
import { Button, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment'
import { connection } from '../..';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { NavLink } from 'react-router-dom';

function CheckOut(props) {

  const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

  const {chiTietPhongVe,danhSachGheDangDat,danhSachGheKhachDat} = useSelector(state => state.QuanLyDatVeReducer)
  // console.log('chi tiết phòng vé:',chiTietPhongVe)
  console.log('dsgdd:',danhSachGheDangDat)

  const dispatch = useDispatch()

  useEffect(()=>{
      const action = layChiTietPhongVeAction(props.match.params.id)
      dispatch(action)

        //có 1 client naof thực hiện đặt vế thanhf ccoong mình sẽ laawgns nghe và load lại phòng vé.
        connection.on('datVeThanhCong',()=>{
            dispatch(action)
        })

        //vừa vào trang load tất cả ghế của các người khác đang đặt.
        connection.invoke('loadDanhSachGhe',props.match.params.id)

      //load danh sách ghế đang đặt từ server về.(lawngs nghe tín hiệu từ server trả về)
      connection.on('loadDanhSachGheDaDat',(dsGheKhachDat)=>{
            console.log('danh sách ghế khách đặt',dsGheKhachDat)
            //Bước 1: loại mình ra khỏi danh sách.
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)

            //Bước 2: gộp ds ghế khách đặt ở tất cả user thành 1 mảng chung.

            let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
                let arrGhe = JSON.parse(item.danhSachGhe)
                return [...result,...arrGhe]
            },[])

            //Đưa dữ liệu khách đặt cập nhật redux.
            arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe')

            dispatch({
                type:'DAT_GHE',
                arrGheKhachDat
            })

            //cai đặt sự kiện khi reload trang.
            window.addEventListener('beforeunload',clearGhe)
            return () =>{
                clearGhe()
                window.removeEventListener('beforeunload')
            }
      })
  },[])

  const clearGhe = function(event){
    connection.invoke('huyDat',userLogin.taiKhoan,props.match.params.id)
  }


  const {thongTinPhim,danhSachGhe} = chiTietPhongVe

  const renderGhe = ()=>{
      return danhSachGhe.map((ghe,index)=>{
          let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '' 
          let classGheDaDat = ghe.daDat === true ? 'gheDaDat': ''
          let classGheDangDat =''
          // kiểm tra xem từng ghế render nó có đang nằm trong mảng đang đặt ko
          let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
          
        // kiểm tra từng ghế render xem có phải là ghế khách đặt ko
        let classGheKhachDat = '';
        let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
        if(indexGheKD !== -1){
            classGheKhachDat = 'gheKhachDat';
        }

          let classGheDaDuocDat = ''
          if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat){
                classGheDaDuocDat = 'gheDaDuocDat'
          }

          if(indexGheDD != -1){
            classGheDangDat = 'gheDangDat'
          }

          return <Fragment key={index}>
                <button onClick={()=>{
                    const action = datGheAction(ghe,props.match.params.id)
                    dispatch(action)
                }} disabled={ghe.daDat || classGheKhachDat !==''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}>
                    {ghe.daDat  ? classGheDaDuocDat != '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : classGheKhachDat !=='' ? <SmileOutlined  style={{ marginBottom: 7.5, fontWeight: 'bold' }} />  :  ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
          </Fragment>
      })
  }

  return (
    <div className='min-h-screen mt-5'>
        <div className='grid grid-cols-12'>
            <div className='col-span-9'>
                <div className='flex flex-col items-center mt-5'>
                    <div className="bg-black " style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                    </div>
                    <div>
                      {renderGhe()}
                    </div>
                </div>
                <div className="mt-5 flex justify-center">
                    <table className='divide-y divide-gray-200 w-2/3'>
                        <thead className='bg-gray-50 p-5'>
                            <tr>
                                <th>Ghế chưa đặt</th>
                                <th>Ghế đang chọn</th>
                                <th>Ghế đã đặt</th>
                                <th>Ghế vip</th>
                                <th>Ghế mình đặt</th>
                                <th>Ghế khách đang đặt</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            <tr className='text-center'>
                                <td><button className='ghe text-center'>00</button></td>
                                <td><button className='ghe gheDangDat text-center'>00</button></td>
                                <td><button className='ghe gheDaDat text-center'><CloseOutlined></CloseOutlined></button></td>
                                <td><button className='ghe gheVip text-center'>00</button></td>
                                <td><button className='ghe gheDaDuocDat text-center'><UserOutlined></UserOutlined></button></td>
                                <td><button className='ghe gheKhachDat text-center'><UserOutlined></UserOutlined></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='col-span-3'>
            <h3 className="text-green-400 text-center text-4xl"> {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                    }, 0).toLocaleString()} đ</h3>
                <hr></hr>
                <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
                <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} </p>
                <hr></hr>
                <div className='flex flex-row my-5'>
                  <div className='w-4/5'>
                    <span className='text-red-400'>Ghế </span>
                    {_.sortBy(danhSachGheDangDat,['stt']).map((gheDD,index)=>{
                        return <span key={index} className='text-green-500 text-xl'>{gheDD.stt} </span>
                    })}

                  </div>
                  <div className='text-right'>
                    <span className='text-green-800 text-lg'>
                        {danhSachGheDangDat.reduce((tongTien,ghe,index)=>{
                            return tongTien += ghe.giaVe
                        },0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <hr></hr>
                <div className='my-5'>
                    <i>Email</i><br></br>
                    {userLogin.email}
                </div>
                <div className='my-5'>
                    <i>Số điện thoại</i><br></br>
                    {userLogin.soDT}
                </div>
                <hr></hr>
                <div className='mb-0 flex flex-col justify-end items-center'>
                    <div onClick={()=>{
                        const thongTinDatVe = new ThongTinDatVe()
                        thongTinDatVe.maLichChieu = props.match.params.id
                        thongTinDatVe.danhSachVe = danhSachGheDangDat
                        const action = datVeAction(thongTinDatVe)
                        // console.log('thông tin đặt vé: ',thongTinDatVe)
                        dispatch(action)
                    }} className='bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer'>
                        ĐẶT VÉ
                    </div>
                </div>
            </div>
        </div>
    </div>
  )


}



// 

export default function CheckOutTab(props){

    const {tabActive} = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(()=>{
        return ()=>{
            dispatch({
                type:'CHANGE_TAB_ACTIVE',
                number:'1'
            })
        }
    },[])

    const operations =  <Fragment>
            {!_.isEmpty(userLogin) ? <Fragment>
                <button onClick={()=>{
                history.push('/profile')
            }}> <div style={{width:50,height:50,display:'flex',justifyContent:'center',alignItems:'center'}}  className='ml-5 text-2xl rounded-full bg-red-200'>{userLogin.taiKhoan.substr(0,1)}</div> Hello ! {userLogin.taiKhoan}</button>
                <button className='text-blue-700' onClick={()=>{
                    localStorage.removeItem(USER_LOGIN)
                    localStorage.removeItem(TOKEN)
                    history.push('/home')
                    window.location.reload()
                }}>Đăng xuất</button>
            </Fragment>  : ''}
            
               
        </Fragment>
    

    return (<div className='p-5'>
        <Tabs tabBarExtraContent={operations} onChange={(key)=>{
            dispatch({
                type:'CHANGE_TAB_ACTIVE',
                number:key
            })
        }} defaultActiveKey={'1'} activeKey={tabActive}>
            <TabPane tab='01 CHỌN GHẾ & THANH TOÁN' key={'1'}>
                <CheckOut {...props}></CheckOut>
            </TabPane>
            <TabPane tab='02 KẾT QUẢ ĐẶT VÉ' key={'2'}>
                <KetQuaDatVe {...props}></KetQuaDatVe>
            </TabPane>
            <TabPane tab={<div className="text-center" style={{display:'flex', justifyContent:'center',alignItems:'center'}}><NavLink to="/"><HomeOutlined style={{marginLeft:10,fontSize:25}} /></NavLink></div>} key="3">
            </TabPane>
        </Tabs>
    </div>
        
    )       
}

function KetQuaDatVe(props){

    const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer)

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('123')
        const action = layThongTinNguoiDungAction()
        dispatch(action)
    },[])

    const renderTicketItem = ()=>{
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                        <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className='p-5'>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-700">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn nhé!</p>
                </div>
                <div className="flex flex-wrap -m-2">

                    {renderTicketItem()}

                    
                </div>
            </div>
        </section>

    </div>
}

