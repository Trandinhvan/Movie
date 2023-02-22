import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { USER_LOGIN } from '../../util/settings/config'

export default function CheckOutTemplate(props) {
    const {Component,...restProps} = props

    useEffect(()=>{
        window.scrollTo(0,0)
    })
    // console.log(restProps)
    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to='/login'></Redirect>
    } 

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Component {...propsRoute}></Component>
        </Fragment>
    }} />
}
