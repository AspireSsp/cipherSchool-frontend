import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './componant/Login';
import SignupPage from './componant/SignUp';
import Dashbord from './componant/MyNav'
import VideoScreen from './componant/VideoScreen';

function App() {
  return (
    <div >
      <BrowserRouter>
        {/* <MyNav /> */}
        {/* <VideoScreen /> */}
        {/* <Login /> */}
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video/player/:id" element={<VideoScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
