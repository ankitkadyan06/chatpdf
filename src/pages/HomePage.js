import React from 'react'
import HeadingContent from '../components/Homepage/HeadingContent'
import DropBox from '../components/Homepage/DropBox'
import '../components/assets/css/HomePage.css'

const HomePage = () => {
  return (
    <div className='homeBackground'>
      <HeadingContent/>
      <DropBox />
    </div>
  )
}

export default HomePage
