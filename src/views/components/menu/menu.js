import React from 'react'
import { Link } from 'react-router-dom'

import './menu.styl'

const Menu = ({ app }) => (
  <div id='menu'>
    <Link to='/feed'>Home</Link>
    <Link to='/info'>Info</Link>
    <Link to={`/tracks${app.address}`}>Tracks</Link>
    <Link to={`/contacts${app.address}`}>Contacts</Link>
  </div>
)

export default Menu
