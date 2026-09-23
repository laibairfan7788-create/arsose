import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Sector from './pages/Sector';
import Contact from './pages/Contact';
import { Dashboard, Login } from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App(){const {pathname}=useLocation();const admin=pathname.startsWith('/admin');const content=<Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<Sector/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin/login" element={<Login/>}/><Route path="/admin" element={<Dashboard/>}/><Route path="*" element={<NotFound/>}/></Routes>;return admin?content:<Layout>{content}</Layout>}
