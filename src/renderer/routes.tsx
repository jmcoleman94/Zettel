import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Page1 from './views/Page1';
import Page2 from './views/Page2';

export default function appRoutes() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Page1" Component={Page1} />
        <Route path="/Page2" Component={Page2} />
      </Routes>
    </MemoryRouter>
  );
}
