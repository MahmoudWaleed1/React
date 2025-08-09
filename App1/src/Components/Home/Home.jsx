import img1 from "../../../Images/avataaars.svg"
import style from "./Home.module.css"
import {classNames} from "../../helpers/Classes"
export default function Home() {

  return (
    <>
    <div className={classNames(style["mainCenter"])}>
      <div className="d-flex justify-content-center">
        <img src={img1} alt="Man" className={classNames(style["width-18"])} />
      </div>
      <h1 className={classNames(style["fw-700"],["text-center"])}>START FRAMEWORK</h1>
      <div className={classNames(style["iconContainer"], ["relative"], ["text-center"])}><i className="fas fa-star"></i></div>
      <h4 className="text-center fs-6">Graphic Artist - Web Designer - Illustrator</h4>
    </div>
    
    </>
  )
}
