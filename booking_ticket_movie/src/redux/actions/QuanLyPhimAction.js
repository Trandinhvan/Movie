import { history } from "../../App"
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType"


export const layDanhSachPhimAction = async (dispatch) =>{
    try{
        const result = await quanLyPhimService.layDanhSachPhim()
  
        //sau khi lấy dl về đưa lên reducer.
        dispatch({
            type: SET_DANH_SACH_PHIM,
            arrFilm:result.data.content
        })
    }catch(errors){
        console.log(errors)
    }
}
//search
export const layDanhSachPhimSearAction = (tenPhim)  =>{
    return async (dispatch) => {
        try{
            const result = await quanLyPhimService.layDanhSachPhimSearch(tenPhim)
      
            //sau khi lấy dl về đưa lên reducer.
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm:result.data.content
            })
        }catch(errors){
            console.log(errors)
        }
    }
    
}

export const themPhimUploadHinhAction =  (formData) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.themPhimUploadHinh(formData)
            alert('Thêm phim thành công!')
            console.log('result',result.data.content)
        }catch(err){
            console.log(err.response?.data)
        }
    }
    
}

export const layThongTinPhimAction = (maPhim)=>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.layThongTinFilm(maPhim)
            // console.log('result',result.data.content)
            dispatch({
                type:SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        }catch(err){
            console.log(err.response?.data)
        }
    }
}

export const capNhatPhimUploadAction = (formData)=>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.capNhatPhimUpload(formData)
            alert('Cập nhật phim thành công!')

            dispatch(layDanhSachPhimAction)
            history.push('/admin/films')
        }catch(err){
            console.log(err.response?.data)
            alert('Cập nhật thất bại!')
        }
    }
}

export const xoaPhimAction = (maPhim) =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyPhimService.xoaPhim(maPhim)
            alert('Xóa phim thành công!')
            dispatch(layDanhSachPhimAction)
        }catch(err){
            console.log(err)
        }
    }
}