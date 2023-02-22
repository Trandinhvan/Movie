import { Fragment, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { USER_LOGIN } from "../../util/settings/config"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel"


export const HomeTemplate = (props) =>{
    const {Component,...restProps} = props
    
    useEffect(()=>{
        window.scrollTo(0,0)
    })

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Header {...propsRoute}></Header>
            <Component {...propsRoute}></Component>
            {/* <hr className="mt-5"></hr> */}
            <Footer></Footer>
        </Fragment>
    }} />
}