# React Form State Yönetimi 📋

## Giriş 🎯

Merhaba değerli geliştirici arkadaşlarım! Bugün React'te form state yönetimini derinlemesine inceleyeceğiz. Karmaşık formları nasıl yönetebileceğimizi, pratik örneklerle ve dostane bir yaklaşımla ele alacağız. 🤗

## Temel Form State Yönetimi 🌱

### Basit Örnek

```javascript
import React, { useState } from 'react';

function BasitForm() {
  const [formData, setFormData] = useState({
    kullaniciAdi: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="kullaniciAdi"
        value={formData.kullaniciAdi}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}
```

## Karmaşık Form State Yönetimi 🔄

### İç İçe (Nested) Form Verileri

```javascript
import React, { useState } from 'react';

function KarmasikForm() {
  const [formData, setFormData] = useState({
    kisisel: {
      ad: '',
      soyad: ''
    },
    iletisim: {
      email: '',
      telefon: ''
    },
    adres: {
      sehir: '',
      ulke: ''
    }
  });

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <form>
      <div>
        <h3>Kişisel Bilgiler</h3>
        <input
          value={formData.kisisel.ad}
          onChange={(e) => handleNestedChange('kisisel', 'ad', e.target.value)}
        />
        <input
          value={formData.kisisel.soyad}
          onChange={(e) => handleNestedChange('kisisel', 'soyad', e.target.value)}
        />
      </div>
      {/* Diğer form alanları... */}
    </form>
  );
}
```

## Dinamik Form Alanları 🔄

### Dinamik Input Listesi

```javascript
import React, { useState } from 'react';

function DinamikForm() {
  const [hobiler, setHobiler] = useState(['']);

  const handleHobiChange = (index, value) => {
    const yeniHobiler = [...hobiler];
    yeniHobiler[index] = value;
    setHobiler(yeniHobiler);
  };

  const hobiEkle = () => {
    setHobiler([...hobiler, '']);
  };

  const hobiSil = (index) => {
    setHobiler(hobiler.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Hobileriniz</h3>
      {hobiler.map((hobi, index) => (
        <div key={index}>
          <input
            value={hobi}
            onChange={(e) => handleHobiChange(index, e.target.value)}
          />
          <button type="button" onClick={() => hobiSil(index)}>Sil</button>
        </div>
      ))}
      <button type="button" onClick={hobiEkle}>Yeni Hobi Ekle</button>
    </div>
  );
}
```

## Form State Organizasyonu İçin İpuçları 💡

### 1. State'i Mantıksal Gruplara Ayırın

```javascript
const [kisiselBilgiler, setKisiselBilgiler] = useState({...});
const [iletisimBilgileri, setIletisimBilgileri] = useState({...});
const [tercihler, setTercihler] = useState({...});
```

### 2. Custom Hook Kullanımı

```javascript
function useFormState(initialState) {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setState(initialState);
  };

  return [state, handleChange, resetForm];
}

// Kullanımı
function MyForm() {
  const [formData, handleChange, resetForm] = useFormState({
    ad: '',
    email: ''
  });

  return (
    <form>
      <input name="ad" value={formData.ad} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="button" onClick={resetForm}>Sıfırla</button>
    </form>
  );
}
```

## Form State Validasyonu 🛡️

```javascript
function ValidasyonluForm() {
  const [formData, setFormData] = useState({
    email: '',
    sifre: ''
  });

  const [hatalar, setHatalar] = useState({});

  const validateForm = () => {
    const yeniHatalar = {};

    if (!formData.email.includes('@')) {
      yeniHatalar.email = 'Geçerli bir email adresi giriniz';
    }

    if (formData.sifre.length < 6) {
      yeniHatalar.sifre = 'Şifre en az 6 karakter olmalıdır';
    }

    setHatalar(yeniHatalar);
    return Object.keys(yeniHatalar).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form gönderme işlemleri
      console.log('Form gönderiliyor:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={/* ... */}
        />
        {hatalar.email && <span className="hata">{hatalar.email}</span>}
      </div>
      <div>
        <input
          type="password"
          name="sifre"
          value={formData.sifre}
          onChange={/* ... */}
        />
        {hatalar.sifre && <span className="hata">{hatalar.sifre}</span>}
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## Performans İyileştirmeleri 🚀

### 1. Debounce Kullanımı

```javascript
import { debounce } from 'lodash';

function PerformansliForm() {
  const handleChange = debounce((value) => {
    // API çağrısı veya ağır işlemler
    console.log('Değer güncellendi:', value);
  }, 500);

  return (
    <input
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Yazın..."
    />
  );
}
```

### 2. useMemo ile Hesaplamaları Optimize Etme

```javascript
import React, { useState, useMemo } from 'react';

function HesaplamaliForm() {
  const [formData, setFormData] = useState({
    fiyat: '',
    adet: ''
  });

  const toplamTutar = useMemo(() => {
    return Number(formData.fiyat) * Number(formData.adet);
  }, [formData.fiyat, formData.adet]);

  return (
    <div>
      <input
        type="number"
        name="fiyat"
        value={formData.fiyat}
        onChange={/* ... */}
      />
      <input
        type="number"
        name="adet"
        value={formData.adet}
        onChange={/* ... */}
      />
      <p>Toplam: {toplamTutar} TL</p>
    </div>
  );
}
```

## Form State Yönetimi İçin Best Practices 🌟

1. **State'i Düzenli Tutun**
   - İlgili alanları gruplandırın
   - Anlamlı isimlendirmeler kullanın
   - Gereksiz state'lerden kaçının

2. **Validasyon Stratejisi**
   - Anlık (inline) validasyon
   - Submit sırasında validasyon
   - Server-side validasyon

3. **Hata Yönetimi**
   - Kullanıcı dostu hata mesajları
   - Hataları görsel olarak belirgin yapın
   - Form durumunu açık şekilde gösterin

4. **Performans**
   - Gereksiz render'ları önleyin
   - Büyük formları parçalara bölün
   - Lazy loading kullanın

## Sonuç 🎉

Form state yönetimi, React uygulamalarının önemli bir parçasıdır. Doğru yaklaşımları kullanarak ve best practice'leri takip ederek, karmaşık formları bile etkili bir şekilde yönetebilirsiniz.

Umarım bu rehber, form state yönetimi konusunda size yardımcı olmuştur! Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀