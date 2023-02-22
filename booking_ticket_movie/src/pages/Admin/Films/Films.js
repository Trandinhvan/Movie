import React, { Fragment, useEffect } from 'react'
import { Button, Calendar, Table } from 'antd';

import { AudioOutlined,SearchOutlined,EditOutlined,DeleteOutlined,CalendarOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, layDanhSachPhimSearAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;



export default function Films(props) {

    const {arrFilmDefault} = useSelector(state => state.QuanLyPhimReducer)
    const dispatch = useDispatch();

    console.log('arrFilmDefault', arrFilmDefault);

    useEffect(() => {
        dispatch(layDanhSachPhimAction)
    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend','ascend'],
            width:'15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            width:'15%',
            render: (text,film,index) =>{
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e)=>{
                        e.target.onError = null;
                        e.target.src =`https://picsum.photos/id/${index}/50/50`
                    }}></img>
                </Fragment>
            }
        },
        
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width:'20%',
            sorter:(a,b) =>{
                let phimA = a.tenPhim.toLowerCase().trim()
                let phimB = b.tenPhim.toLowerCase().trim()
                if(phimA > phimB){
                    return 1
                }
                return -1
            },
            sortDirections: ['descend','ascend']
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width:'25%',
            render: (text,film)=>{
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}
                </Fragment>
            }
        },
        {
            title: 'Chức năng',
            dataIndex: 'maPhim',
            width:'25%',
            render: (text,film)=>{
                return <Fragment>
                    <NavLink key={'1'} to={`/admin/films/edit/${film.maPhim}`} className='mr-6 text-4xl'><EditOutlined style={{color:'blue'}} /></NavLink>
                    <span style={{cursor:'pointer'}} key={'2'}  className='text-4xl' onClick={()=>{
                        if(window.confirm(`Bạn có muốn xóa phim ${film.tenPhim}??`)){
                              dispatch(xoaPhimAction(film.maPhim))             
                        }
                    }}><DeleteOutlined style={{color:'red'}}></DeleteOutlined></span>
                    <NavLink key={'2'} to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} className='ml-6 text-4xl' onClick={()=>{
                        localStorage.setItem('filmParams',JSON.stringify(film))
                    }}><CalendarOutlined style={{color:'green'}} /></NavLink>
                </Fragment>
            }
        },
    ];
    const data = arrFilmDefault 
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const onSearch = (value) => {
        dispatch(layDanhSachPhimSearAction(value))
    }
    return (
        <div className='container'>
            <h3 className='text-4xl'>Quản lý phim</h3>
            <Button onClick={()=>{
                history.push('/admin/films/addnew')
            }} className='mb-5'>Thêm phim</Button>
            <Search
                className='mb-1'
                placeholder="Tìm kiếm phim"
                size="large"
                enterButton={<SearchOutlined />}
                onSearch={onSearch}
            />
            <Table rowKey={'maPhim'} columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
