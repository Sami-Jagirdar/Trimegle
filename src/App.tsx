import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css'
import Home from './containers/home';
import Room from './containers/room';
import store from './redux/Store';

const App: React.FC = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room" element={<Room/>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
