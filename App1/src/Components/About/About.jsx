import style from "./About.module.css"
import {classNames} from "../../helpers/Classes"
export default function About() {
  return (
    <div className={classNames(style["container"])}>
      <h1 className={classNames(style["title"],["text-center"])}>ABOUT COMPONENT</h1>
      <div className={classNames(style["iconContainer"], ["relative"], ["text-center"])}><i className="fas fa-star my-3"></i></div>
      <div className={classNames(style["center"])}>
          <h6 className="lh-base">Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization. </h6>
          <h6 className="lh-base">Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization. </h6>
      </div>
    
    </div>
  )
}
