import React, { useEffect, useState } from "react";
import './Nav.css'

function Nav() {
  const [show, handleShow] = useState(false)

useEffect (() => {
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    handleShow(true)
  } else handleShow(false)
})
return () => {
  window.removeEventListener('scroll')
}
}, [])

  return (
    <div className={`nav ${show && "nav_black"}` }>
      <img className='nav_image' src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" alt="NetfLix Logo" />
      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" alt="NetfLix Logo" /> */}

    </div>
  );
}

export default Nav;
