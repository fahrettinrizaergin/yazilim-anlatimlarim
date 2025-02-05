# ReactJS Router Kurulumu ve Kullanımı

## İçindekiler
- [React Router Nedir?](#react-router-nedir)
- [Kurulum](#kurulum)
- [Temel Kullanım](#temel-kullanım)
- [Route Parametreleri](#route-parametreleri)
- [Nested Routes](#nested-routes)
- [Programatik Yönlendirme](#programatik-yönlendirme)

## React Router Nedir?
React Router, React uygulamalarında sayfa yönlendirmesi ve navigasyon işlemlerini yönetmek için kullanılan standart routing kütüphanesidir.

## Kurulum

```bash
# npm ile kurulum
npm install react-router-dom

# yarn ile kurulum
yarn add react-router-dom
```

## Temel Kullanım

### Router Yapılandırması
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Link Kullanımı
```jsx
import { Link, NavLink } from 'react-router-dom';

function Navigasyon() {
  return (
    <nav>
      <Link to="/">Ana Sayfa</Link>
      <NavLink 
        to="/hakkimizda"
        className={({ isActive }) => isActive ? 'aktif' : ''}
      >
        Hakkımızda
      </NavLink>
    </nav>
  );
}
```

## Route Parametreleri

### Dinamik Route Tanımlama
```jsx
function App() {
  return (
    <Routes>
      <Route path="/urun/:id" element={<UrunDetay />} />
    </Routes>
  );
}
```

### Parametre Kullanımı
```jsx
import { useParams } from 'react-router-dom';

function UrunDetay() {
  const { id } = useParams();

  return (
    <div>
      <h1>Ürün ID: {id}</h1>
    </div>
  );
}
```

## Nested Routes

### İç İçe Route Tanımlama
```jsx
function App() {
  return (
    <Routes>
      <Route path="/panel" element={<PanelLayout />}>
        <Route index element={<PanelAnaSayfa />} />
        <Route path="profil" element={<Profil />} />
        <Route path="ayarlar" element={<Ayarlar />} />
      </Route>
    </Routes>
  );
}

function PanelLayout() {
  return (
    <div>
      <nav>{/* Panel navigasyonu */}</nav>
      <Outlet /> {/* İç route'ların render edileceği yer */}
    </div>
  );
}
```

## Programatik Yönlendirme

### useNavigate Hook'u
```jsx
import { useNavigate } from 'react-router-dom';

function GirisFormu() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş işlemleri
    navigate('/panel');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form içeriği */}
    </form>
  );
}
```

### Location ve Search Params
```jsx
import { useLocation, useSearchParams } from 'react-router-dom';

function AramaSayfasi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const arananKelime = searchParams.get('q');

  return (
    <div>
      <h1>Arama Sonuçları: {arananKelime}</h1>
      <button onClick={() => setSearchParams({ q: 'yeni-arama' })}>
        Yeni Arama
      </button>
    </div>
  );
}
```

## En İyi Pratikler
1. Route'ları merkezi bir dosyada tanımlayın
2. Lazy loading kullanarak route'ları ihtiyaç halinde yükleyin
3. 404 sayfası için catch-all route kullanın
4. NavLink ile aktif linkleri vurgulayın
5. Route parametrelerini doğrulayın ve hata yönetimi yapın 