import {NavLink } from "react-router-dom"
import style from "./NavBar.module.css"
import {classNames} from "../../helpers/Classes"
export default function NavBar() {
  return (
<nav className={classNames(["navbar"], ["navbar-expand-lg"],style["background"],["fixed-top"])}>
  <div className="container-fluid">
    <NavLink className={classNames(["navbar-brand"],style["brand"])} to="/home">START FRAMEWORK</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className={classNames(["navbar-nav"], ["ms-auto"], ["mb-2v"], ["mb-lg-0"],style["links"])}>
        <li className="nav-item">
          <NavLink className={classNames(["nav-link"],style["link"])} to="/about">ABOUT</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={classNames(["nav-link"],style["link"])} to="/portfolio">PORTFOLIO</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={classNames(["nav-link"],style["link"])} to="/contact">CONTACT</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
