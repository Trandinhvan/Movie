import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
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
import { capNhatThongTinNguoiDung, layThongTinTaiKhoan } from '../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../util/settings/config';

export default function EditUser(props) {

    const {thongTinTaiKhoan} = useSelector(state => state.QuanLyNguoiDungReducer)
    console.log('thongtinTaiKhoan:',thongTinTaiKhoan)
    let {hoTen,taiKhoan,matKhau,email,soDt,maLoaiNguoiDung} = thongTinTaiKhoan[0]
    console.log('hoten....',hoTen)
    // console.log('tttk ho ten...',thongTinTaiKhoan[0].hoTen)
    const dispatch = useDispatch()

   
    

    const formik = useFormik({
      enableReinitialize:true,
        initialValues: {
          taiKhoan: taiKhoan,
          matKhau: matKhau,
          maNhom:GROUPID,
          hoTen: hoTen,
          email: email,
          soDt:soDt,
          maLoaiNguoiDung:maLoaiNguoiDung,
        },
        onSubmit: values => {
            dispatch(capNhatThongTinNguoiDung(values))
            
        },
      });
    
      useEffect(()=>{
        let {id} = props.match.params
        dispatch(layThongTinTaiKhoan(id))
    },[])
    

    const [value, setValue] = useState('quanTri');
    const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
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
      size={componentSize}>
        <Form.Item label='Tài khoản'>
            <Input onChange={formik.handleChange} name='taiKhoan' value={formik.values.taiKhoan}></Input>
        </Form.Item>
        <Form.Item label='Mật khẩu'>
            <Input onChange={formik.handleChange} name='matKhau' value={formik.values.matKhau}></Input>
        </Form.Item>
        <Form.Item label='Họ tên'>
            <Input onChange={formik.handleChange} name='hoTen' value={formik.values.hoTen}></Input>
        </Form.Item>
        <Form.Item label='Email'>
            <Input onChange={formik.handleChange} name='email' value={formik.values.email}></Input>
        </Form.Item>
        <Form.Item label='Số điện thoại'>
            <Input onChange={formik.handleChange} name='soDt' value={formik.values.soDt}></Input>
        </Form.Item>
        <Form.Item label='Mã nhóm'>
            <Input onChange={formik.handleChange} name='maNhom' value={formik.values.maNhom}></Input>
        </Form.Item>
        <Form.Item label='Loại người dùng'>
            <Radio.Group onChange={onChange} defaultValue={formik.values.maLoaiNguoiDung} value={value}>
                <Radio onChange={formik.handleChange} value={'quanTri'}>Quản trị</Radio>
                <Radio onChange={formik.handleChange} value={'khachHang'}>Khách hàng</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item>
        <button type='submit' className='bg-blue-300 ml-24 text-white p-2'>Cập nhật</button>
        </Form.Item>
    </Form>

  )
}
