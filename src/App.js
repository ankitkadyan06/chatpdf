import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage/>}/>
      <Route path="/chat/:selectedFile" element={<ChatPage/>}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
