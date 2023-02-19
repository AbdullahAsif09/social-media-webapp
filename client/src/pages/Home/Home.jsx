import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Feeds from '../../components/Feeds/Feeds.js'
import Leftbar from '../../components/Left-Sidebar/Leftbar'
import "./Home.scss"
import Rightbar from '../../components/Right-Sidebar/Rightbar'
import Share from '../../components/share/Share'
function Feed() {
  return (
    <div className='home-container'>
        <Navbar />
        <div className='home'>
        <Leftbar />
        <div className='home-feed'>
        <Feeds />
        </div>
        <Rightbar />
        </div>
    </div>
  )
}

export default Feed