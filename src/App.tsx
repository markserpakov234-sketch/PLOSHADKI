import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlacePage from './pages/PlacePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/place/:id" element={<PlacePage />} />
      </Routes>
    </BrowserRouter>
  );
}
