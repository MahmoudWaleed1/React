import { useState } from "react"
import img1 from "../../../Images/poert1.png"
import img2 from "../../../Images/port2.png"
import img3 from "../../../Images/port3.png"
import style from "./Portfolio.module.css"
import {classNames} from "../../helpers/Classes"


export default function Portfolio() {
  const [selectedImg, setSelectedImg] = useState(null);

  const portfolioImages = [img1, img2, img3, img1, img2, img3]
  return (
    <div className={classNames(style["container"],["mb-4"])}>
      <h1 className={classNames(style["title"],["text-center"])}>PORTFOLIO COMPONENT</h1>
      <div className={classNames(style["iconContainer"], ["relative"], ["text-center"])}><i className="fas fa-star my-3"></i></div>
    <div className={classNames((selectedImg && style["eventsNone"]), ["row"], ["g-5"])}>

        {portfolioImages.map((img, index) => (
          <div className="col-md-4" key={index}>
            <div className={classNames(style["item"],["rounded-3"])} onClick={() => setSelectedImg(img)}>
              <i className="fas fa-plus"></i>
              <img src={img} alt="img" className={classNames(["w-100"], ["rounded-3"], ["card"])}/>
            </div>
          </div>

        ))}
      </div>
      
      {selectedImg && (
        <div className={classNames(style["lightBox"])} onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="img" />
        </div>
      )}
    </div>
  )
}
