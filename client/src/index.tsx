import React from 'react';
import { createRoot } from 'react-dom/client';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Provider as ReduxProvider } from 'react-redux';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './index.css';
import { store } from './app/store';
import App from './App';
import HomePage from './pages/Home';
import SelectorPage from './pages/timetable/Selector';
import TimetablePage from './pages/timetable/Timetable';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} />
              <Route path='timetable' element={<SelectorPage />}>
                <Route path='courses' element={<SelectorPage />} />
                <Route path='sections' element={<TimetablePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </DndProvider>
  </React.StrictMode >
);
