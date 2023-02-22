import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService{
    constructor(){
        super()
    }
    layDanhSachBanner = ()=>{
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = ()=>{
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    layDanhSachPhimSearch = (tenPhim)=>{
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
    }

    themPhimUploadHinh = (formData) =>{
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData)
    }

    layThongTinFilm = (maPhim) =>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?maPhim=${maPhim}`)
    }

    capNhatPhimUpload = (formData)=>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }

    xoaPhim = (maPhim) =>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?maPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()

// export const {layDanhSachBanner} = quanLyPhimService