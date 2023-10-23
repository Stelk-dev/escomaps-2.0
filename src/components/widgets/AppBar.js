import React from 'react'
import { CgMenu } from 'react-icons/cg';
import { AiOutlineSearch } from 'react-icons/ai';
import img from '../../assets/escomaps_logo.png';

export default function AppBar(props) {
  return (
    <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px'}}>
        {/* Menu */}
        <CgMenu style={{color: 'white', fontSize: 22}} onClick={props.showSidebar}/>

        {/* Logo */}
        <img src={img} style={{width: 180, objectFit: 'contain'}} alt='logo_escort' />
        
        {/* Search icon */}
        <AiOutlineSearch style={{color: 'white', fontSize: 22}}/>
    </div>
  )
}
