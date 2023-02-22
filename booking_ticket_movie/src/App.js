import './App.css';
import {createBrowserHistory} from 'history'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import { Route, Router, Switch } from 'react-router-dom';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckOutTemplate from './templates/CheckOutTemplate/CheckOutTemplate';
import CheckOut from './pages/CheckOut/CheckOut';
import React, { lazy, Suspense } from 'react';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime/Showtime';
import Addnew from './pages/Admin/Films/Addnew/Addnew';
import Edit from './pages/Admin/Films/Edit/Edit';
import UserManagement from './pages/Admin/UserManagement/UserManagement';
import EditUser from './pages/Admin/UserManagement/EditUser';

// const CheckOutTemplateLazy = lazy(()=> import('./templates/CheckOutTemplate/CheckOutTemplate'))

export const history = createBrowserHistory()


function App() {
  return (
    <Router history={history}>
        <Loading></Loading>
        <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />
          {/* <UserTemplate path='/register' exact Component={Register}></UserTemplate> */}
          <HomeTemplate path='/profile' exact Component={Profile}></HomeTemplate>
          <CheckOutTemplate path='/checkout/:id' exact Component={CheckOut}></CheckOutTemplate>
          {/* <Suspense fallback={<div>Loading...</div>}>
            <CheckOutTemplateLazy path='/checkout/:id' exact Component={CheckOut}></CheckOutTemplateLazy>
          </Suspense> */}

          <UserTemplate path = '/login' Component={Login}></UserTemplate>
          <UserTemplate path = '/register' Component={Register}></UserTemplate>
          <AdminTemplate path ='/admin/editUser/:id' Component={EditUser}></AdminTemplate>

          {/* admin */}
          <AdminTemplate path='/admin' exact Component={Dashboard}></AdminTemplate>
          <AdminTemplate path='/admin/films' exact Component={Films}></AdminTemplate>
          <AdminTemplate path='/admin/films/showtime/:id/:tenPhim' exact Component={Showtime}></AdminTemplate>
          <AdminTemplate path='/admin/films/addnew' Component={Addnew}></AdminTemplate>
          <AdminTemplate path='/admin/films/edit/:id' Component={Edit}></AdminTemplate>
          <AdminTemplate path='/admin/users' Component={UserManagement}></AdminTemplate>
          {/* <AdminTemplate path='/admin/films/editUser/:taiKhoan' Component={EditUser}></AdminTemplate> */}

          <HomeTemplate path="/" exact Component={Home} />

        </Switch>
    </Router>
  );
}

export default App;
