# React Component'leri Öğreniyoruz! 🎨

React'in en temel yapı taşlarından biri olan Component'leri öğreneceğiz. Hiç endişelenmeyin, her şeyi adım adım, dostça bir şekilde anlatacağım!

## 🌟 Component Nedir?

Component'ler, React uygulamalarının yapı taşlarıdır. Düşünün ki bir LEGO seti var ve her parça bir component. Bu parçaları bir araya getirerek harika şeyler inşa edebilirsiniz!

### 🎯 İlk Component'imizi Oluşturalım

```jsx
function MerhabaDunya() {
  return (
    <div>
      <h1>Merhaba Dünya!</h1>
      <p>Bu benim ilk React component'im! 🎉</p>
    </div>
  );
}
```

## 💫 Component Çeşitleri

### 1. Fonksiyon Component'leri

En modern ve önerilen yöntem budur:

```jsx
function SelamlamaComponent({ isim }) {
  return (
    <div>
      <h2>Merhaba {isim}! 👋</h2>
    </div>
  );
}
```

### 2. Props Kullanımı

Props, component'ler arası veri aktarımını sağlar:

```jsx
function KullaniciKart({ isim, yas, meslek }) {
  return (
    <div className="kart">
      <h3>{isim}</h3>
      <p>Yaş: {yas}</p>
      <p>Meslek: {meslek}</p>
    </div>
  );
}

// Kullanımı:
<KullaniciKart 
  isim="Ahmet" 
  yas={25} 
  meslek="Yazılımcı"
/>
```

## 🎮 State Kullanımı

State, component'in kendi içinde değişebilen verileri saklamasını sağlar:

```jsx
import { useState } from 'react';

function Sayac() {
  const [sayi, setSayi] = useState(0);

  return (
    <div>
      <h2>Sayaç: {sayi}</h2>
      <button onClick={() => setSayi(sayi + 1)}>
        Artır
      </button>
    </div>
  );
}
```

## 🔄 Component Yaşam Döngüsü

Component'lerin bir yaşam döngüsü vardır. useEffect Hook'u ile bu döngüyü yönetebiliriz:

```jsx
import { useEffect, useState } from 'react';

function VeriListesi() {
  const [veriler, setVeriler] = useState([]);

  useEffect(() => {
    // Component yüklendiğinde çalışır
    console.log('Component yüklendi!');
    
    return () => {
      // Component kaldırıldığında çalışır
      console.log('Component kaldırıldı!');
    };
  }, []); // Boş dizi: sadece bir kere çalış

  return (
    <div>
      <h2>Veri Listesi</h2>
      {/* veriler burada listelenecek */}
    </div>
  );
}
```

## 🎯 İyi Pratikler

1. Her component'i ayrı bir dosyada tutun
2. Component isimleri büyük harfle başlamalı
3. Mümkün olduğunca küçük ve tek sorumluluk sahibi component'ler yazın
4. Props'ları destructuring ile alın

## 🎉 Tebrikler!

Artık React component'lerinin temellerini öğrendiniz! Bu bilgilerle kendi component'lerinizi oluşturabilir ve onları birleştirerek harika uygulamalar geliştirebilirsiniz.

💡 **İpucu**: Component'leri anlamak zaman alabilir, bu çok normal! Önemli olan pratik yapmak ve deneme yanılma ile öğrenmek.

Hadi birlikte kodlamaya devam edelim! 🚀