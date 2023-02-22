import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import {DANG_NHAP_ACTION, GET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN} from './types/QuanLyNguoiDungType'
import {history} from '../../App'


export const dangNhapAction = (thongTinDangNhap) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
            if(result.data.statusCode === 200){
                console.log(result)
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                //chuyển hướng đăng nhập về trang trước đó
                history.goBack()
            }

            
        }catch(error){
            console.log('error',error.response.data)
        }
    }
}

export const layThongTinNguoiDungAction = () =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.layThongTinNguoiDung()
            if(result.data.statusCode === 200){
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }

            
        }catch(error){
            console.log('error',error.response.data)
        }
    }
}

export const dangKyAction = (nguoiDungMoi)=>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.dangKyTaiKhoan(nguoiDungMoi)
           
                alert('Đăng ký tài khoản thành công!')
                console.log('result',result.data.content)
                history.push('/login')
            
        }catch(err){
            console.log('error',err.response.data)
        }
    }
}

export const layDanhSachNguoiDung = (maNhom) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(maNhom)
            dispatch({
                type:GET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })
        }catch(err){

        }
    }
}

export const layThongTinTaiKhoan = (taiKhoan) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan(taiKhoan)
            console.log('result thong tin taikhoan:',result.data.content)
            if(result.data.statusCode === 200){
                console.log('123')
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    thongTinTaiKhoan: result.data.content
                })
            }
            
        }catch(error){
            console.log('error',error.response.data)
        }
    }
}

export const capNhatThongTinNguoiDung = (values)=>{
    return async (dispatch) =>{
        console.log('values....',values)
        try{
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(values)
            if(result.data.statusCode === 200){
                alert('Cập nhật thành công!!')
    
                history.push('/admin/users')
            }
        }catch(err){
            console.log(err.response?.data)
            alert('Cập nhật thất bại!!')
        }
       
    }
}

