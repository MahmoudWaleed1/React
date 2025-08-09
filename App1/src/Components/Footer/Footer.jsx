import React from 'react'
import style from "./Footer.module.css"
import {classNames} from "../../helpers/Classes"

export default function Footer() {
  return (
    <div className={classNames(style['footer'])}>
    <div className={classNames(["d-flex"], ["justify-content-center"], ["align-items-center"], ["text-center"], style["container"])}>
      <div className={classNames(["w-25"], ["d-flex"], ["justify-content-center"], ["align-items-center"], ["flex-column"], style["location"])}>
            <h3>LOCATION</h3>
            <h6 className='text-center mb-3'>2215 John Daniel Drive</h6>
            <h6>Clark, MO 65243</h6>
      </div>
      <div className={classNames(style["web"],['w-25'])}>
            <h3>AROUND THE WEB</h3>
            <div className="icons d-flex gap-2 align-items-center justify-content-center flex-wrap">
                <div className={classNames(style["iconContainer"], ["d-flex"], ["justify-content-center"], ["align-items-center"], ["rounded-circle"])}>
                    <i className='fab fa-facebook'></i>
                </div>
                 <div className={classNames(style["iconContainer"], ["d-flex"], ["justify-content-center"], ["align-items-center"], ["rounded-circle"])}>
                    <i className='fab fa-twitter'></i>
                </div>
                 <div className={classNames(style["iconContainer"], ["d-flex"], ["justify-content-center"], ["align-items-center"], ["rounded-circle"])}>
                    <i className='fab fa-linkedin'></i>
                </div>
                 <div className={classNames(style["iconContainer"], ["d-flex"], ["justify-content-center"], ["align-items-center"], ["rounded-circle"])}>
                    <i className='fas fa-globe'></i>
                </div>
            </div>
      </div>
      <div className="freelance w-25">
            <h3>ABOUT FREELANCER</h3>
            <h6 className='text-center'>Freelance is a free to use, licensed Bootstrap theme created by Route </h6>
      </div>
    </div>
    <div className={classNames(style['copyright'])}>
      <h6>Copyright © Your Website 2021</h6>
    </div>
    </div>
  )
}
