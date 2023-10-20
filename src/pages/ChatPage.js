import React from 'react'
import SideBar from '../components/ChatPage/SideBar'
import Preview from '../components/ChatPage/Preview'
import ChatBot from '../components/ChatPage/ChatBot'

const ChatPage = () => {
  return (
    <div className='flex'>
      <div className='w-[20%]'>
      <SideBar/>
      </div>
      <div className='w-[40%]'>
      <Preview/>
      </div>
      <div className='w-[40%]'>
      <ChatBot/>
      </div>
    </div>
  )
}

export default ChatPage
