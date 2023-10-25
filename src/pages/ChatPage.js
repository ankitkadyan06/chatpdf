import React from 'react'
import SideBar from '../components/ChatPage/SideBar'
import Preview from '../components/ChatPage/Preview'
import ChatBot from '../components/ChatPage/ChatBot'

const ChatPage = () => {
  return (
    <div className='flex md:flex-row flex-col w-full'>
      <div className='w-full md:w-[15%]'>
      <SideBar/>
      </div>
      <div className='w-full md:w-[43%]'>
      <Preview />
      </div>
      <div className='w-full md:w-[42%]'>
      <ChatBot/>
      </div>
    </div>
  )
}

export default ChatPage
