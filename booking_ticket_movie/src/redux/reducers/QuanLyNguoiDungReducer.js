import { TOKEN, USER_LOGIN } from "../../util/settings/config"
import { DANG_NHAP_ACTION, GET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "../actions/types/QuanLyNguoiDungType"

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    thongTinNguoiDung:{

    },
    danhSachNguoiDung:[],
    thongTinTaiKhoan:[
      {
        "taiKhoan": "11111111a",
      "hoTen": "longBB",
      "email": "lo@gmail.com",
      "soDt": "0313465695",
      "matKhau": "1234567",
      "maLoaiNguoiDung": "QuanTri"
      }
    ]
}

export const QuanLyNguoiDungReducer = (state = initialState,action) => {
  switch (action.type) {

  case DANG_NHAP_ACTION:{
    const {thongTinDangNhap} = action
    localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap))
    localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)
    return { ...state,userLogin: thongTinDangNhap}

  }
  case SET_THONG_TIN_NGUOI_DUNG:{
    state.thongTinNguoiDung = action.thongTinNguoiDung
    return {...state}
  }
  case GET_DANH_SACH_NGUOI_DUNG:{
    return {...state,danhSachNguoiDung:action.danhSachNguoiDung}
  }
  case SET_THONG_TIN_TAI_KHOAN:{
    state.thongTinTaiKhoan = action.thongTinTaiKhoan
    return {...state}
    // return {...state,thongTinTaiKhoan:action.thongTinTaiKhoan}
  }
  default:
    return state
  }
}
