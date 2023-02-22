import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const initialState = {
    arrFilm:[
        {
            "maPhim": 10856,
            "tenPhim": "Spy x Family",
            "biDanh": "spy-x-family",
            "trailer": "https://youtu.be/rzRUlBcmsDo?t=1",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/spy-x-family_gp01.jpg",
            "moTa": "Spy x Family Des",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-11-02T11:03:57.317",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
          },
    ],
    dangChieu:true,
    sapChieu:true,
    arrFilmDefault: [],
    filmDetail:{},
    thongTinPhim:{}
}

export const QuanLyPhimReducer = (state = initialState,action) => {
  switch (action.type) {

  case SET_DANH_SACH_PHIM:{
    state.arrFilm = action.arrFilm;
    state.arrFilmDefault = state.arrFilm
    return {...state}
  }
  case SET_FILM_DANG_CHIEU:{
    state.dangChieu = !state.dangChieu;

    state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu );
    return {...state}
  }
  case SET_FILM_SAP_CHIEU:{
    state.sapChieu = !state.sapChieu;

    state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu );
    return {...state}
  }
  case SET_CHI_TIET_PHIM:{
    return {...state,filmDetail:action.filmDetail}
  }

  case SET_THONG_TIN_PHIM:{
    return {...state,thongTinPhim:action.thongTinPhim}
  }

  default:
    return state
  }
}
