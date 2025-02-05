# React Performans Optimizasyonu: Code Splitting 🚀

## Giriş 🎯

Merhaba arkadaşlar! Bu yazımızda React uygulamalarında çok önemli bir performans optimizasyon tekniği olan Code Splitting (Kod Bölme) konusunu ele alacağız. Büyük uygulamaları nasıl daha hızlı ve verimli hale getirebileceğimizi öğreneceğiz. Hadi başlayalım! 💪

## Code Splitting Nedir? 🤔

Code Splitting, uygulamamızın tüm kodunu tek bir büyük bundle yerine, daha küçük parçalara bölerek, sadece ihtiyaç duyulduğunda yüklenmesini sağlayan bir tekniktir. Bu sayede:

- İlk yükleme süresi kısalır
- Kullanıcı deneyimi iyileşir
- Gereksiz kod yüklemesi önlenir

## React.lazy ve Suspense ile Code Splitting 📦

### Temel Kullanım

```javascript
import React, { Suspense } from 'react';

// Lazy loading ile bileşen import edilir
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <h1>Ana Sayfa</h1>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### Pratik Örnek: Route Bazlı Code Splitting

```javascript
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Sayfalar lazy loading ile import edilir
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Ana Sayfa</Link>
          <Link to="/about">Hakkımızda</Link>
          <Link to="/dashboard">Panel</Link>
        </nav>

        <Suspense fallback={<div>Sayfa Yükleniyor...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
```

## Dinamik Import Kullanımı 🔄

### Olay Tabanlı Code Splitting

```javascript
import React, { useState } from 'react';

function ModalExample() {
  const [showModal, setShowModal] = useState(false);
  const [ModalComponent, setModalComponent] = useState(null);

  const handleClick = async () => {
    // Modal bileşeni sadece butona tıklandığında yüklenir
    const { default: Modal } = await import('./Modal');
    setModalComponent(() => Modal);
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Modalı Aç</button>
      {showModal && ModalComponent && <ModalComponent />}
    </div>
  );
}
```

## İyi Uygulama Örnekleri 🌟

### 1. Bileşen Bazlı Bölümleme

```javascript
// ❌ Yanlış Kullanım: Çok sık kullanılan bileşenlerde
const Header = React.lazy(() => import('./Header')); // Gereksiz

// ✅ Doğru Kullanım: Büyük ve nadir kullanılan bileşenlerde
const VideoPlayer = React.lazy(() => import('./VideoPlayer'));
const ImageEditor = React.lazy(() => import('./ImageEditor'));
```

### 2. Route Bazlı Bölümleme

```javascript
// routes.js
import React from 'react';

export const routes = [
  {
    path: '/',
    component: React.lazy(() => import('./pages/Home')),
  },
  {
    path: '/analytics',
    component: React.lazy(() => 
      import('./pages/Analytics')
        .then(module => {
          // Analytics sayfası yüklenirken ek işlemler yapılabilir
          console.log('Analytics modülü yüklendi');
          return module;
        })
    ),
  }
];
```

## Performans İpuçları 💡

1. **Doğru Yerde Kullanın**
   - Ana sayfa gibi hemen yüklenmesi gereken sayfalarda kullanmayın
   - Büyük ve nadir kullanılan bileşenlerde kullanın
   - Admin paneli gibi yükleme süresinin kritik olmadığı alanlarda kullanın

2. **Yükleme Deneyimini İyileştirin**
   - Anlamlı loading göstergeleri kullanın
   - Skeleton screens ekleyin
   - Yükleme sürelerini optimize edin

3. **Preload Stratejileri**
   ```javascript
   // Mouse hover olduğunda önceden yükleme
   const handleMouseEnter = () => {
     const componentPromise = import('./HeavyComponent');
     // Yükleme başlar ama render edilmez
   };
   ```

## Yaygın Hatalar ve Çözümleri ⚠️

### 1. Çok Fazla Bölümleme

```javascript
// ❌ Aşırı bölümleme
const Button = React.lazy(() => import('./Button')); // Gereksiz
const Card = React.lazy(() => import('./Card')); // Gereksiz

// ✅ Mantıklı bölümleme
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
```

### 2. Hata Yönetimi Eksikliği

```javascript
// ✅ Doğru kullanım: Hata yönetimi eklenmiş
function MyComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <HeavyComponent />
      </ErrorBoundary>
    </Suspense>
  );
}
```

## Gerçek Dünya Örneği 🌍

```javascript
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

// Ana bileşenler hemen yüklenir
import Header from './components/Header';
import Footer from './components/Footer';

// Büyük sayfalar lazy loading ile yüklenir
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));

function ECommerce() {
  return (
    <div>
      <Header />
      
      <ErrorBoundary>
        <Suspense 
          fallback={
            <Loading message="Sayfa yükleniyor..."
                    spinner={true} />
          }
        >
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </div>
  );
}
```

## Sonuç 🎉

Code Splitting, React uygulamalarınızın performansını önemli ölçüde artırabilecek güçlü bir tekniktir. Doğru yerde ve doğru şekilde kullanıldığında, kullanıcı deneyimini büyük ölçüde iyileştirir. Önemli olan, uygulamanızın ihtiyaçlarına göre dengeli bir code splitting stratejisi belirlemektir.

Umarım bu rehber, React'te code splitting konusunu anlamanıza ve projelerinizde etkili bir şekilde kullanmanıza yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀