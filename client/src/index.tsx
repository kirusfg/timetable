import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './index.css';
import { store } from './app/store';
import App from './App';
import Home from './pages/Home';
import Timetable from './pages/Timetable';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
              <Route path='timetable' element={<Timetable />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
