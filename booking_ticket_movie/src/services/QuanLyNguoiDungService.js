import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService{
    constructor(){
        super()
    }
    dangNhap = (thongTinDangNhap)=>{
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }

    layThongTinNguoiDung = ()=>{
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    dangKyTaiKhoan = (nguoiDungMoi)=>{
        return this.post(`/api/QuanLyNguoiDung/DangKy`,nguoiDungMoi)
    }
    layDanhSachNguoiDung = (maNhom)=>{
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`)
    }
    layThongTinTaiKhoan = (taiKhoan)=>{
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?tuKhoa=${taiKhoan}`)
    }
    capNhatThongTinNguoiDung =(values)=>{
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,values)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()

// export const {layDanhSachBanner} = quanLyPhimService