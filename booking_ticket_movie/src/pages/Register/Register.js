import React from 'react'
import { NavLink } from 'react-router-dom'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';

export default function Register() {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      maNhom:'',
      hoTen: '',
      email: '',
      soDt:'',
    },
    onSubmit: values => {
        // console.log('values',values)
        // values.maNhom = GROUPID
        // let formData = new FormData()
        // for(let key in values){
        //   // if(key !== 'nhapLaiMatKhau'){
        //   //   formData.append(key,values[key])
        //   // }
        //   formData.append(key,values[key])

        // }
        console.log('values nè:',values)
        dispatch(dangKyAction(values))
    },
  });


  return (
      <form onSubmit={formik.handleSubmit}  className="lg:w-1/2 xl:max-w-screen-sm">
                    
                    <div style={{marginTop:'0px'}} className="px-3 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <h3 className="text-center text-3xl  text-indigo-900 font-display font-semibold lg:text-left
              xl:text-bold">Đăng ký</h3>
                        <div className="">
                            <div>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                                    <input name='taiKhoan' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Nhập tên tài khoản" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Mật khẩu
                                        </div>
                                    </div>
                                    <input name='matKhau' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập mật khẩu" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Nhập lại mật khẩu
                                        </div>
                                    </div>
                                    <input name='maNhom' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='password' placeholder="Nhập lại mật khẩu" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Họ tên
                                        </div>
                                    </div>
                                    <input name='hoTen' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Vd: Trần Đình Văn" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Email
                                        </div>
                                    </div>
                                    <input name='email' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='email' placeholder="Vd: van12345@gmail.com" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Số điện thoại
                                        </div>
                                    </div>
                                    <input name='soDt' onChange={formik.handleChange}  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type='text' placeholder="Số điện thoại" />
                                </div>
                                <div className="mt-10 flex justify-around">
                                    <button className="bg-indigo-500 text-gray-100 p-4 w-50 rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                        ĐĂNG KÝ
                                    </button>
                                    {/* <button className="bg-indigo-500 text-gray-100 p-4 w-50 rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                        ĐĂNG NHẬP
                                    </button> */}
                                </div>
                            </div>
                      
                        </div>
                    </div>
                </form>

  )
}
