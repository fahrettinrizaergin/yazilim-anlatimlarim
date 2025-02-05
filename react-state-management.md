# React State Yönetimi ve Zustand Karşılaştırması! 🎯

Merhaba sevgili arkadaşlar! 👋

Bugün sizlerle birlikte React'in kendi state yönetimi ve Zustand state yönetim kütüphanesini karşılaştıracağız. Hiç endişelenmeyin, her şeyi en basit haliyle ve örneklerle anlatacağım!

## 🌟 React'in useState Hook'u

React'in kendi state yönetimi, useState hook'u ile gerçekleşir. İşte basit bir örnek:

```jsx
import { useState } from 'react';

function SepetSayaci() {
  const [urunSayisi, setUrunSayisi] = useState(0);

  return (
    <div>
      <h2>Sepetinizdeki Ürün: {urunSayisi}</h2>
      <button onClick={() => setUrunSayisi(urunSayisi + 1)}>
        Sepete Ekle
      </button>
    </div>
  );
}
```

### 📝 useState'in Özellikleri

1. **Basit ve Anlaşılır**
   - Component içinde direkt kullanım
   - React'in çekirdek özelliği
   - Öğrenmesi kolay

2. **Component Bazlı**
   - Her component kendi state'ini yönetir
   - Props ile state aktarımı gerekir
   - Component ağacında yukarı doğru veri aktarımı zor olabilir

## 🚀 Zustand ile State Yönetimi

Zustand, React için minimal ve hızlı bir state yönetim kütüphanesidir. İşte aynı örneğin Zustand versiyonu:

```jsx
import create from 'zustand';

// Store oluşturma
const useSepetStore = create((set) => ({
  urunSayisi: 0,
  urunEkle: () => set((state) => ({ urunSayisi: state.urunSayisi + 1 })),
}));

// Component
function SepetSayaci() {
  const { urunSayisi, urunEkle } = useSepetStore();

  return (
    <div>
      <h2>Sepetinizdeki Ürün: {urunSayisi}</h2>
      <button onClick={urunEkle}>
        Sepete Ekle
      </button>
    </div>
  );
}
```

### 🎯 Zustand'ın Özellikleri

1. **Merkezi State Yönetimi**
   - Tek bir yerden tüm uygulamanın state'i yönetilebilir
   - Component'ler arası veri paylaşımı kolay
   - Props drilling problemi yok

2. **Minimal ve Hafif**
   - Çok az boilerplate kod
   - Küçük bundle size
   - Hızlı öğrenme eğrisi

## 🤔 Ne Zaman Hangisini Kullanmalıyım?

### useState Kullanın:
- Basit component içi state yönetimi için
- Az sayıda component arasında veri paylaşımı gerektiğinde
- Prototip geliştirme aşamasında
- Küçük ölçekli uygulamalarda

### Zustand Kullanın:
- Büyük ölçekli uygulamalarda
- Karmaşık state yönetimi gerektiğinde
- Çok sayıda component arasında veri paylaşımı olduğunda
- Global state ihtiyacı olduğunda

## 💡 Pratik Bir Örnek

Hadi biraz daha karmaşık bir örnek yapalım - bir alışveriş sepeti:

### useState ile:
```jsx
import { useState } from 'react';

function AlisverisUygulamasi() {
  const [sepet, setSepet] = useState([]);
  const [toplam, setToplam] = useState(0);

  const urunEkle = (urun) => {
    setSepet([...sepet, urun]);
    setToplam(toplam + urun.fiyat);
  };

  return (
    <div>
      <h2>Sepet Toplamı: {toplam}₺</h2>
      <SepetListesi sepet={sepet} />
      <UrunListesi urunEkle={urunEkle} />
    </div>
  );
}

// Alt component'lere props olarak geçmek gerekiyor
function SepetListesi({ sepet }) { /* ... */ }
function UrunListesi({ urunEkle }) { /* ... */ }
```

### Zustand ile:
```jsx
import create from 'zustand';

const useStore = create((set) => ({
  sepet: [],
  toplam: 0,
  urunEkle: (urun) => set((state) => ({
    sepet: [...state.sepet, urun],
    toplam: state.toplam + urun.fiyat
  }))
}));

function AlisverisUygulamasi() {
  return (
    <div>
      <SepetToplami />
      <SepetListesi />
      <UrunListesi />
    </div>
  );
}

// Alt component'ler direkt store'a erişebilir
function SepetToplami() {
  const toplam = useStore((state) => state.toplam);
  return <h2>Sepet Toplamı: {toplam}₺</h2>;
}

function SepetListesi() {
  const sepet = useStore((state) => state.sepet);
  return /* ... */;
}

function UrunListesi() {
  const urunEkle = useStore((state) => state.urunEkle);
  return /* ... */;
}
```

## 🎉 Sonuç

Gördüğünüz gibi, her iki yaklaşımın da kendine göre avantajları var:

- **useState**: Basit, anlaşılır ve React'in doğal parçası
- **Zustand**: Güçlü, merkezi ve ölçeklenebilir

💡 **İpucu**: Projenizin ihtiyaçlarına göre seçim yapın. Küçük projeler için useState yeterliyken, büyük projelerde Zustand gibi bir state yönetim kütüphanesi işinizi çok kolaylaştıracaktır.

Hadi birlikte kodlamaya devam edelim! 🚀