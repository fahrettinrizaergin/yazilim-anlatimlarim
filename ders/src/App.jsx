import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div>
      {/* Navigasyon Menüsü */}
      <nav>
        <Link to="/">Ana Sayfa</Link> |
        <Link to="/about">Hakkımızda</Link> |
        <Link to="/contact">İletişim</Link>
      </nav>

      {/* Route Tanımlamaları */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App