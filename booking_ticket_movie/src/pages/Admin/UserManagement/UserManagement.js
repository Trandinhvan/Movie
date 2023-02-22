import React, { Fragment, useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../util/settings/config';
import { NavLink } from 'react-router-dom';
import {EditOutlined} from '@ant-design/icons'

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

export default function UserManagement() {

    const {danhSachNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)

    const dispatch = useDispatch()

    const maNhom = GROUPID

    useEffect(()=>{
        dispatch(layDanhSachNguoiDung(maNhom))
    },[])

    console.log('danhSach Nguoidung: ',danhSachNguoiDung)
    const columns = [
        {
          title: 'Tên tài khoản',
          dataIndex: 'taiKhoan',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          sorter: (a, b) => {
                let accountA = a.taiKhoan.toLowerCase().trim()
                let accountB = b.taiKhoan.toLowerCase().trim()
                if(accountA > accountB){
                    return 1
                }
                return -1
          },
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Họ tên',
          dataIndex: 'hoTen',
          sorter: (a, b) => {
            let hoTenA = a.hoTen.toLowerCase().trim()
            let hoTenB = b.hoTen.toLowerCase().trim()
            if(hoTenA > hoTenB){
                return 1
            }
            return -1
        },
        sortDirections: ['descend','ascend'],
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
          },
        {
            title: 'Chức năng',
            dataIndex: 'chucNang',
            render: (text,user)=>{
                return <Fragment>
                    <NavLink key={'1'} to={`/admin/editUser/${user.taiKhoan}`} className='mr-6 text-4xl'><EditOutlined style={{color:'blue'}} /></NavLink>
                </Fragment>
            }
        },
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    const data = danhSachNguoiDung
  return (
    <Table columns={columns} dataSource={data} onChange={onChange} />
  )
}
