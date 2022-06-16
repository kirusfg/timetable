import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssVarsProvider } from '@mui/joy/styles';
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
      <CssVarsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Home />} />
              <Route path='timetable' element={<Timetable />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
