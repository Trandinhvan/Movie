import { connection } from "../.."
import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe"
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingAction"
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType"


export const layChiTietPhongVeAction = (maLichChieu) => {

    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
            if (result.status === 200) {
                // console.log('result:',result)
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            console.log('err', error)
            console.log('err', error.response?.data)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch,getState) => {
        try {
            dispatch(DISPLAY_LOADING_ACTION)

            const result = await quanLyDatVeService.datVe(thongTinDatVe)
            // console.log('result dat ve',result.data.content)
            //ĐẶT VÉ thành công gọi api load lại phòng vé
            //đợi load xong phòng vé mới tắt cái loading
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({ type: DAT_VE_HOAN_TAT })
            await dispatch(HIDE_LOADING_ACTION)

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin
            await connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu)
            dispatch({
                type: CHUYEN_TAB
            })
        } catch (err) {
            dispatch(HIDE_LOADING_ACTION)
            console.log(err.response.data)
        }
    }
}

export const datGheAction = (ghe,maLichChieu) => {
    return async (dispatch,getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })

        //call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan
        console.log('ds ghế dd:',danhSachGheDangDat)
        console.log('tài khoản:',taiKhoan)
        console.log('mã lích chiếu',maLichChieu)

        //biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

        //call api của signalR
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu)
    }
}