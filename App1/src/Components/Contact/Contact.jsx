import style from "./Contact.module.css"
import {classNames} from "../../helpers/Classes"
export default function Contact() {
  return (
  <div className={classNames(style["container"],["mb-4"])}>
      <h1 className={classNames(style["title"],["text-center"])}>CONTACT SECTION</h1>
      <div className={classNames(style["iconContainer"], ["relative"], ["text-center"])}><i className="fas fa-star my-3"></i></div>
      <form action="" className={classNames(style["form"],["mt-5"])}>
        <input className={classNames(style["input"])} type="text" name="text" placeholder="userName"/>
        <input className={classNames(style["input"])}  type="text" name="age" placeholder="userAge"/>
        <input className={classNames(style["input"])}  type="email" name="email" placeholder="userEmail"/>
        <input className={classNames(style["input"])}  type="password" name="pass" placeholder="userPassword"/>
        <button className={classNames(style["btn"])}>send Message</button>
      </form>
      </div>
      
  )
}
