# ReactJS Layout Kullanımı

## İçindekiler
- [Layout Nedir?](#layout-nedir)
- [Layout Bileşenleri](#layout-bileşenleri)
- [Sayfa Düzeni Oluşturma](#sayfa-düzeni-oluşturma)
- [Responsive Layout](#responsive-layout)

## Layout Nedir?
Layout, bir React uygulamasında sayfaların genel yapısını ve düzenini belirleyen bileşenlerdir. Header, footer, sidebar gibi tekrar eden yapıları ve sayfa düzenini yönetmek için kullanılır.

## Layout Bileşenleri

### Ana Layout Bileşeni
```jsx
function MainLayout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <nav>{/* Navigasyon içeriği */}</nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        {/* Footer içeriği */}
      </footer>
    </div>
  );
}
```

### Dashboard Layout Örneği
```jsx
function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        {/* Sidebar menüsü */}
      </aside>
      
      <div className="content">
        <header className="dashboard-header">
          {/* Dashboard header içeriği */}
        </header>
        
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Sayfa Düzeni Oluşturma

### Grid Sistem Kullanımı
```jsx
function GridLayout() {
  return (
    <div className="grid-container">
      <div className="grid-item">İçerik 1</div>
      <div className="grid-item">İçerik 2</div>
      <div className="grid-item">İçerik 3</div>
    </div>
  );
}
```

### Flex Layout Kullanımı
```jsx
function FlexLayout() {
  return (
    <div className="flex-container">
      <div className="flex-item">Sol Panel</div>
      <div className="flex-item">Ana İçerik</div>
      <div className="flex-item">Sağ Panel</div>
    </div>
  );
}
```

## Responsive Layout
```css
/* Örnek responsive CSS */
.layout {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 250px 1fr;
  }
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 250px 1fr 250px;
  }
}
```

## En İyi Pratikler
1. Layout bileşenlerini modüler ve yeniden kullanılabilir şekilde tasarlayın
2. Responsive tasarım için medya sorguları kullanın
3. CSS Grid ve Flexbox'ı etkin şekilde kullanın
4. Layout bileşenlerini ayrı dosyalarda tutun
5. Sayfa içeriğini children prop'u ile aktarın 