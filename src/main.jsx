import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThreeJsFiberPlayground from './components/ThreeJsFiberPlayground';
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThreeJsFiberPlayground />
  </StrictMode>
);
