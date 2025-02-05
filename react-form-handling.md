# React Form İşlemleri: Controlled vs Uncontrolled Components 📝

## Form İşlemlerine Giriş 🎯

Merhaba arkadaşlar! Bugün React'te form işlemlerinin nasıl yapıldığını ve iki önemli yaklaşım olan Controlled ve Uncontrolled component'leri inceleyeceğiz. Bu konuyu günlük hayattan örneklerle, dostane bir şekilde ele alacağız! 🤗

## Controlled Components (Kontrollü Bileşenler) 🎮

Controlled component'ler, form elemanlarının değerlerinin React state'i tarafından kontrol edildiği bileşenlerdir. Yani, her değişiklik React tarafından yönetilir.

```javascript
import React, { useState } from 'react';

function KayitFormu() {
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    yas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderildi:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          name="isim"
          value={formData.isim}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Yaş:</label>
        <input
          type="number"
          name="yas"
          value={formData.yas}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
```

### Controlled Components'in Avantajları 🌟

1. **Anlık Doğrulama**: Değerleri anında kontrol edebilir ve hataları gösterebilirsiniz
2. **Form Değerlerini Yönetme**: Değerleri istediğiniz gibi manipüle edebilirsiniz
3. **Kolay Veri Takibi**: Form durumunu her an bilirsiniz

## Uncontrolled Components (Kontrolsüz Bileşenler) 🎲

Uncontrolled component'ler, form elemanlarının değerlerinin DOM tarafından yönetildiği bileşenlerdir. React'in müdahalesi minimum düzeydedir.

```javascript
import React, { useRef } from 'react';

function HizliAramaFormu() {
  const aramaInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const aramaMetni = aramaInputRef.current.value;
    console.log('Arama yapılıyor:', aramaMetni);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Hızlı Arama:</label>
        <input
          type="text"
          ref={aramaInputRef}
          defaultValue=""
          placeholder="Aramak istediğiniz kelime..."
        />
      </div>
      <button type="submit">Ara</button>
    </form>
  );
}
```

### Uncontrolled Components'in Avantajları 🌟

1. **Basitlik**: Daha az kod yazarsınız
2. **Performans**: State güncellemesi olmadığı için daha hızlı çalışır
3. **DOM Entegrasyonu**: Bazı DOM API'ları ile çalışmak daha kolaydır

## Ne Zaman Hangisini Kullanmalı? 🤔

### Controlled Components Kullanın:
- Form değerlerini anlık olarak kontrol etmeniz gerekiyorsa
- Karmaşık form validasyonları yapacaksanız
- Form değerlerini manipüle edecekseniz
- Birden fazla input'un birbiriyle etkileşimi varsa

### Uncontrolled Components Kullanın:
- Basit formlar için
- Dosya yükleme işlemleri için
- Performans kritik ise
- Legacy kod entegrasyonu yapıyorsanız

## Pratik Örnek: Karma Yaklaşım 🎯

```javascript
import React, { useState, useRef } from 'react';

function KarmaForm() {
  // Controlled için state
  const [email, setEmail] = useState('');
  
  // Uncontrolled için ref
  const dosyaInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('dosya', dosyaInputRef.current.files[0]);

    console.log('Form gönderiliyor...');
    // API çağrısı burada yapılır
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email (Controlled):</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Dosya (Uncontrolled):</label>
        <input
          type="file"
          ref={dosyaInputRef}
        />
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## İpuçları ve Best Practices 💡

1. **Form State Yönetimi**
   - Büyük formlar için formik veya react-hook-form gibi kütüphaneler kullanın
   - State'i organize edin ve mantıklı gruplara ayırın

2. **Performans Optimizasyonu**
   - Çok sık güncellenen inputlar için debounce kullanın
   - Büyük formlarda gereksiz render'ları önleyin

3. **Erişilebilirlik**
   - Label'ları unutmayın
   - Uygun ARIA attribute'larını ekleyin
   - Klavye navigasyonunu destekleyin

4. **Hata Yönetimi**
   - Kullanıcı dostu hata mesajları gösterin
   - Form gönderiminde loading durumunu yönetin
   - Başarılı/başarısız durumları için feedback verin

## Sonuç 🎉

Form işlemleri, web uygulamalarının vazgeçilmez bir parçasıdır. Controlled ve Uncontrolled component'lerin her ikisinin de kendi kullanım alanları vardır. Önemli olan, projenizin ihtiyaçlarına göre doğru yaklaşımı seçmektir.

Umarım bu rehber, React'te form işlemlerini daha iyi anlamanıza yardımcı olmuştur! Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀