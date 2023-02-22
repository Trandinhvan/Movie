import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import moment from 'moment'

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';

export default function Addnew(props) {

  //đặt state để xem hình trước khi load
  const [imgSrc, setImgSrc] = useState('')
  const dispatch = useDispatch()
  const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer)
  let {tenPhim} = thongTinPhim
  console.log('thong tin phim...',tenPhim)
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      maPhim:thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      // console.log('values', values)
      //tạo đối tượng formdata
      values.maNhom = GROUPID
      let formData = new FormData()
      for(let key in values){
        if(key !== 'hinhAnh'){
          formData.append(key,values[key])
        }else{
          if(values.hinhAnh !==null){
            formData.append('File',values.hinhAnh,values.hinhAnh.name)
          }
        }
      }
      //console.log ra ko thấy vì nó bảo mật vì vậy phải get
      // console.log('formData',formData.get('tenPhim'))
      dispatch(capNhatPhimUploadAction(formData))
      
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handChangeFile = async (e) => {
    //lấy file từ e
    let file = e.target.files[0]
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      await formik.setFieldValue('hinhAnh',file)
      //tạo đối tượng để đọc file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {

        console.log(e.target.result)
        setImgSrc(e.target.result)
      }
      
    }

  }

  //closure functioon
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  useEffect(()=>{
      let {id} = props.match.params
      dispatch(layThongTinPhimAction(id))
  },[])

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Thêm mới phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} />
        </Form.Item>
        <Form.Item label="Đang chiếu" >
          <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch name='sapChieu' onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu}/>
        </Form.Item>
        <Form.Item label="Hot" >
          <Switch name='hot' onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber name='danhGia' onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type='file' onChange={handChangeFile} accept='image/png, image/jpeg,image/png' />
          <br></br>
          <img src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='...' style={{ width: '150px', height: '150px' }}></img>
        </Form.Item>




        <Form.Item label="Thêm">
          <button type='submit' className='bg-blue-300 text-white p-2'>Cập nhật</button>
        </Form.Item>
      </Form>

    </>
  )
}
