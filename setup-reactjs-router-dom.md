# React Router DOM Kurulumu ve Kullanımı 🚀

Merhaba arkadaşlar! 👋

Bugün sizlerle birlikte React uygulamalarında sayfa yönetimini sağlayan React Router DOM'u öğreneceğiz. Hiç endişelenmeyin, her şeyi adım adım, dostça bir şekilde anlatacağım!

## 📦 Kurulum

Öncelikle React Router DOM'u projemize ekleyelim. Terminal'de proje klasörünüze gidip şu komutu çalıştırın:

```bash
npm install react-router-dom
```

## 🛠 Temel Kullanım

### 1. Router'ı Projeye Ekleyelim

İlk olarak `main.jsx` dosyamızı düzenleyeceğiz:

```jsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### 2. Sayfalarımızı Oluşturalım

Örnek olarak birkaç sayfa component'i oluşturalım. `src/pages` klasörü altında:

```jsx
// src/pages/Home.jsx
const Home = () => {
  return <h1>Ana Sayfa 🏠</h1>
}

export default Home

// src/pages/About.jsx
const About = () => {
  return <h1>Hakkımızda 📝</h1>
}

export default About

// src/pages/Contact.jsx
const Contact = () => {
  return <h1>İletişim 📞</h1>
}

export default Contact
```

### 3. Route'ları Tanımlayalım

`App.jsx` dosyamızı düzenleyelim:

```jsx
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
```

## 🎯 Önemli Kavramlar

### 1. Link Komponenti
`<Link>` komponenti, sayfalar arası gezinmeyi sağlar. Normal HTML `<a>` etiketi yerine bunu kullanmalıyız çünkü sayfayı yenilemeden gezinmemizi sağlar.

### 2. useNavigate Hook'u
Programatik olarak sayfa yönlendirmesi yapmak için:

```jsx
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // login işlemleri...
    navigate('/dashboard') // başka sayfaya yönlendir
  }

  return <button onClick={handleLogin}>Giriş Yap</button>
}
```

### 3. URL Parametreleri
Dinamik route'lar için URL parametrelerini kullanabilirsiniz:

```jsx
// App.jsx'te route tanımı
<Route path="/user/:id" element={<UserProfile />} />

// UserProfile.jsx
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()
  return <h1>{id} numaralı kullanıcı profili</h1>
}
```

## 💡 İpuçları

1. **Nested Routes (İç İçe Route'lar)**
   Component'lerinizi daha düzenli hale getirmek için iç içe route'lar kullanabilirsiniz.

2. **404 Sayfası**
   Tanımlı olmayan route'lar için bir 404 sayfası ekleyin:
   ```jsx
   <Route path="*" element={<NotFound />} />
   ```

3. **Active Link Stili**
   `NavLink` komponenti ile aktif linki stillendirebilirsiniz:
   ```jsx
   <NavLink 
     to="/about" 
     className={({ isActive }) => isActive ? 'active' : ''}
   >
     Hakkımızda
   </NavLink>
   ```

## 🎉 Tebrikler!

Artık React Router DOM'un temel kullanımını öğrendiniz! Bu bilgilerle çok sayfalı React uygulamaları geliştirebilirsiniz.

### 🚀 Sırada Ne Var?
- Daha karmaşık routing senaryoları
- Protected routes (korumalı rotalar)
- Route'larda veri yükleme
- ve daha fazlası!

---

💡 **İpucu**: Route'larınızı organize ederken, kullanıcı deneyimini düşünün. Mantıklı URL yapıları ve kolay navigasyon, uygulamanızı daha kullanıcı dostu yapar.

Hadi birlikte öğrenmeye devam edelim! 🌟