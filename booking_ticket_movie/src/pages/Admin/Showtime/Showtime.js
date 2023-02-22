import { Button, Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction'
import { useFormik } from 'formik';
import moment from 'moment';
import { Cascader } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
export default function Showtime(props) {

  const [state,setState] = useState({
      heThongRapChieu:[],
      cumRapChieu: []
  })

  useEffect( () => {
    async function fetchData(){
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
            ...state,
            heThongRapChieu: result.data.content
        })
        console.log('data',state.heThongRapChieu)
    } catch (error) {

    }
    }
    fetchData()
}, [])

  const formik =  useFormik({
    initialValues:{
        maPhim:props.match.params.id,
        ngayChieuGioChieu:'',
        maRap:'',
        giaVe:''
    },
    onSubmit : async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);

        alert(result.data.content);

    }catch(error) {
        console.log('error',error.response?.data)
    }
    }
})

const handleChangeHeThongRap = async (value) => {
    // console.log('maHaThongRap: ',value)
    //từ hệ thống rạp call api lấy thông tin htr.
    try{
        let result = await quanLyRapService.layThongTinCumRap(value)

        //gán giá trị giữ nguyễn cái hệ thống rạp
        setState({
          ...state,
          cumRapChieu:result.data.content
        })
    }catch(err){
        console.log(err.response?.data)
    }

}

  const handleChangeCumRap = (value)=>{
      formik.setFieldValue('maRap',value)
  }

  const onChangeDate = (values) => {

    formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log('values',moment(values).format('DD/MM/YYYY hh:mm:ss'));
}

const onOk = (values) => {
  formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
  console.log('values',moment(values).format('DD/MM/YYYY hh:mm:ss'));
}

const onchangeInputNumber = (value) => {
  formik.setFieldValue('giaVe',value)
}

let film = {};
    if(localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

  return (
    <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}
                

            >
                <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
                <img src={film.hinhAnh} alt='...' width={200} height={100} />
                <Form.Item label="Hệ thống rạp">
                    <Select options={state.heThongRapChieu?.map((htr,index)=>( {label:htr.tenHeThongRap,value:htr.maHeThongRap}))} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                </Form.Item>


                <Form.Item label="Cụm rạp">
                  <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRap,value:cumRap.maCumRap}) )} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                </Form.Item>

                <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                </Form.Item>
               
                <Form.Item label="Giá vé">
                    <InputNumber onChange={onchangeInputNumber} />
                </Form.Item>
                <Form.Item label="Chức năng">
                    <Button htmlType="submit">Tạo lịch chiếu</Button>
                </Form.Item>
            </Form>
  )
}
