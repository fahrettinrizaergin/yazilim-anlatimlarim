# React'te Layout Mantığını Öğreniyoruz! 📐

Merhaba sevgili arkadaşlar! 👋

Bugün sizlerle birlikte React uygulamalarında layout (düzen) mantığını öğreneceğiz. Hiç korkmayın, her şeyi en basit haliyle ve örneklerle anlatacağım!

## 🌟 Layout Nedir?

Layout, web sayfamızdaki elementlerin nasıl yerleşeceğini ve düzenleneceğini belirleyen yapıdır. Bir evi düşünün: odaların yerleşimi, mobilyaların düzeni... İşte web sayfalarımızdaki layout da tam olarak buna benzer!

## 📦 Flexbox ile Layout

Flexbox, modern web düzenlemesinin süper kahramanıdır! İşte basit bir örnek:

```jsx
import './FlexboxOrnek.css';

function FlexboxOrnek() {
  return (
    <div className="container">
      <div className="kutu">1</div>
      <div className="kutu">2</div>
      <div className="kutu">3</div>
    </div>
  );
}

// FlexboxOrnek.css
.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kutu {
  width: 100px;
  height: 100px;
  background-color: #61dafb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 8px;
}
```

## 🎯 Grid Sistemi

Grid sistemi, sayfayı satır ve sütunlara bölerek düzenlememizi sağlar:

```jsx
import './GridOrnek.css';

function GridOrnek() {
  return (
    <div className="grid-container">
      <header className="header">Header</header>
      <nav className="sidebar">Sidebar</nav>
      <main className="main-content">Ana İçerik</main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

// GridOrnek.css
.grid-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 10px;
}

.header { grid-area: header; background: #61dafb; }
.sidebar { grid-area: sidebar; background: #282c34; }
.main-content { grid-area: main; background: #f0f0f0; }
.footer { grid-area: footer; background: #20232a; }
```

## 📱 Responsive Tasarım

Farklı ekran boyutlarına uyum sağlayan layout'lar oluşturmak çok önemli:

```jsx
import './ResponsiveOrnek.css';

function ResponsiveOrnek() {
  return (
    <div className="responsive-container">
      <div className="kart">
        <h3>Ürün 1</h3>
        <p>Açıklama</p>
      </div>
      <div className="kart">
        <h3>Ürün 2</h3>
        <p>Açıklama</p>
      </div>
      <div className="kart">
        <h3>Ürün 3</h3>
        <p>Açıklama</p>
      </div>
    </div>
  );
}

// ResponsiveOrnek.css
.responsive-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.kart {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## 🎨 Layout Best Practices

1. **Component Bazlı Düşünün**
   - Her büyük layout parçasını ayrı bir component olarak tasarlayın
   - Yeniden kullanılabilir layout component'leri oluşturun

2. **CSS-in-JS veya Module CSS Kullanın**
```jsx
// Layout.module.css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

// Layout.js
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
```

3. **Esnek ve Uyarlanabilir Olun**
   - Sabit genişlikler yerine yüzdesel değerler kullanın
   - Media query'leri akıllıca kullanın
   - Container query'leri öğrenin (yeni CSS özelliği!)

## 💡 Önemli İpuçları

1. Layout'unuzu mobil öncelikli düşünün
2. CSS Grid ve Flexbox'ı birlikte kullanmaktan çekinmeyin
3. Sayfa yapısını planlarken kağıt-kalem kullanın
4. Accessibility'i unutmayın

## 🎉 Tebrikler!

Artık React'te temel layout mantığını öğrendiniz! Bu bilgilerle harika kullanıcı arayüzleri tasarlayabilirsiniz.

💡 **İpucu**: Layout konusu başta karmaşık gelebilir, ama pratik yaptıkça çok daha kolay gelecek. Denemekten çekinmeyin!

Hadi birlikte kodlamaya devam edelim! 🚀