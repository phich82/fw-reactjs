import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App, Home, NotFound, Test } from '../modules';

export const AppRouting = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route path='home?brand=envy' element={<Home />} />
        <Route path='test' element={<Test />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
