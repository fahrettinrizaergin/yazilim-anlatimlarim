# React Form Validasyonu: Doğrulama İşlemleri 🎯

## Form Validasyonuna Giriş 📝

Merhaba arkadaşlar! Bugün React'te form validasyonunun nasıl yapıldığını, farklı validasyon yöntemlerini ve best practice'leri inceleyeceğiz. Haydi başlayalım! 🚀

## HTML5 Yerleşik Validasyon 🌟

En basit validasyon yöntemi, HTML5'in yerleşik özelliklerini kullanmaktır:

```javascript
import React, { useState } from 'react';

function TemelValidasyonFormu() {
  const [formData, setFormData] = useState({
    email: '',
    yas: '',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderildi:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </div>
      <div>
        <label>Yaş:</label>
        <input
          type="number"
          name="yas"
          value={formData.yas}
          onChange={handleChange}
          min="18"
          max="100"
          required
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## Özel Validasyon Mantığı 🔍

Daha karmaşık validasyon kuralları için kendi mantığımızı oluşturabiliriz:

```javascript
import React, { useState } from 'react';

function OzelValidasyonFormu() {
  const [formData, setFormData] = useState({
    kullaniciAdi: '',
    sifre: '',
    sifreTekrar: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Kullanıcı adı validasyonu
    if (formData.kullaniciAdi.length < 3) {
      newErrors.kullaniciAdi = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }

    // Şifre validasyonu
    if (formData.sifre.length < 6) {
      newErrors.sifre = 'Şifre en az 6 karakter olmalıdır';
    } else if (!/\d/.test(formData.sifre)) {
      newErrors.sifre = 'Şifre en az bir rakam içermelidir';
    }

    // Şifre tekrar validasyonu
    if (formData.sifre !== formData.sifreTekrar) {
      newErrors.sifreTekrar = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form başarıyla gönderildi:', formData);
    } else {
      console.log('Form hataları var!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Kullanıcı Adı:</label>
        <input
          type="text"
          name="kullaniciAdi"
          value={formData.kullaniciAdi}
          onChange={handleChange}
        />
        {errors.kullaniciAdi && (
          <span className="error">{errors.kullaniciAdi}</span>
        )}
      </div>
      <div>
        <label>Şifre:</label>
        <input
          type="password"
          name="sifre"
          value={formData.sifre}
          onChange={handleChange}
        />
        {errors.sifre && (
          <span className="error">{errors.sifre}</span>
        )}
      </div>
      <div>
        <label>Şifre Tekrar:</label>
        <input
          type="password"
          name="sifreTekrar"
          value={formData.sifreTekrar}
          onChange={handleChange}
        />
        {errors.sifreTekrar && (
          <span className="error">{errors.sifreTekrar}</span>
        )}
      </div>
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
```

## Anlık (Real-time) Validasyon 🚦

Kullanıcı deneyimini iyileştirmek için anlık validasyon yapabiliriz:

```javascript
import React, { useState, useEffect } from 'react';

function AnlikValidasyonFormu() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      validateEmail();
    }
  }, [email, isDirty]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email alanı zorunludur');
    } else if (!emailRegex.test(email)) {
      setError('Geçerli bir email adresi giriniz');
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDirty(true);
    validateEmail();
    
    if (!error) {
      console.log('Form gönderildi:', email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          className={error ? 'error-input' : ''}
        />
        {error && <span className="error">{error}</span>}
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## Form Validasyon İpuçları 💡

1. **Kullanıcı Deneyimi**
   - Hata mesajlarını açık ve anlaşılır yazın
   - Validasyon zamanlamasını doğru seçin (blur, change, submit)
   - Başarılı durumları da gösterin (yeşil tik gibi)

2. **Performans**
   - Karmaşık validasyonlar için debounce kullanın
   - Gereksiz render'ları önleyin
   - Büyük formlar için bölümlere ayırın

3. **Güvenlik**
   - Client-side validasyonu asla tek başına yeterli görmeyin
   - XSS ve injection saldırılarına karşı input'ları temizleyin
   - Hassas verileri uygun şekilde işleyin

4. **Erişilebilirlik**
   - ARIA attribute'larını kullanın
   - Klavye navigasyonunu destekleyin
   - Ekran okuyucular için uygun hata mesajları sağlayın

## Form Validasyon Kütüphaneleri 📚

Büyük projeler için popüler form validasyon kütüphaneleri:

1. **Formik**
   - Kapsamlı form yönetimi
   - Hazır validasyon çözümleri
   - Yüksek performans

2. **React Hook Form**
   - Hafif ve performanslı
   - Kolay entegrasyon
   - Düşük bundle size

3. **Yup**
   - Şema tabanlı validasyon
   - Formik ile mükemmel uyum
   - Zengin validasyon kuralları

## Sonuç 🎉

Form validasyonu, kullanıcı deneyimi ve veri güvenliği açısından kritik öneme sahiptir. Projenizin ihtiyaçlarına göre yerleşik HTML5 validasyonu, özel validasyon mantığı veya form kütüphanelerinden uygun olanı seçebilirsiniz.

Umarım bu rehber, React'te form validasyonu konusunda size yardımcı olmuştur! Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀