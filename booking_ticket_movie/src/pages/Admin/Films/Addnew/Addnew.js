import React, { useState } from 'react'
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
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';

export default function Addnew(props) {

  //đặt state để xem hình trước khi load
  const [imgSrc, setImgSrc] = useState('')
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
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
          formData.append('File',values.hinhAnh,values.hinhAnh.name)
        }
      }
      //console.log ra ko thấy vì nó bảo mật vì vậy phải get
      // console.log('formData',formData.get('tenPhim'))
      dispatch(themPhimUploadHinhAction(formData))
      
    }
  })

  const handleChangeDatePicker = (value) => {
    console.log('datepicker', moment(value).format('DD/MM/YYYY'))
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handChangeFile = (e) => {
    //lấy file từ e
    let file = e.target.files[0]
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      //tạo đối tượng để đọc file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {

        console.log(e.target.result)
        setImgSrc(e.target.result)
      }
      formik.setFieldValue('hinhAnh',file)
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
          <Input name='tenPhim' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name='trailer' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name='moTa' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu" >
          <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch name='sapChieu' onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>
        <Form.Item label="Hot" >
          <Switch name='hot' onChange={handleChangeSwitch('hot')} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber name='danhGia' onChange={handleChangeInputNumber('danhGia')} />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type='file' onChange={handChangeFile} accept='image/png, image/jpeg,image/png' />
          <br></br>
          <img src={imgSrc} alt='...' style={{ width: '150px', height: '150px' }}></img>
        </Form.Item>




        <Form.Item label="Thêm">
          <button type='submit' className='bg-blue-300 text-white p-2'>Thêm phim</button>
        </Form.Item>
      </Form>

    </>
  )
}
