# React Form İşlemleri: useForm Hook Kullanımı 📝

## Giriş 🎯

Bugün React'te form işlemlerini çok daha kolay ve etkili bir şekilde yönetmemizi sağlayan `useForm` hook'unu inceleyeceğiz. Bu hook, react-hook-form kütüphanesinin bir parçası olup, form yönetimini oldukça basitleştiriyor. Hadi başlayalım! 🚀

## react-hook-form Nedir? 🤔

react-hook-form, React uygulamalarında form yönetimini kolaylaştıran, performanslı ve kullanımı kolay bir kütüphanedir. Gereksiz render'ları önler ve form validasyonlarını basitleştirir.

## Basit Bir Form Örneği 🎈

```javascript
import { useForm } from 'react-hook-form';

function KayitFormu() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form verileri:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>İsim:</label>
        <input
          {...register('isim', { required: 'İsim alanı zorunludur' })}
        />
        {errors.isim && <span>{errors.isim.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email alanı zorunludur',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Geçerli bir email adresi giriniz'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
```

## useForm Hook'unun Temel Özellikleri 🌟

### 1. Form Kayıt İşlemi (register)

```javascript
// Basit kayıt
{...register('alanAdi')}

// Validasyon kuralları ile kayıt
{...register('alanAdi', {
  required: 'Bu alan zorunludur',
  minLength: { value: 3, message: 'En az 3 karakter giriniz' },
  maxLength: { value: 20, message: 'En fazla 20 karakter giriniz' }
})}
```

### 2. Form Durumu (formState)

```javascript
const { formState: { errors, isDirty, isSubmitting } } = useForm();
```

### 3. Form Değerlerini İzleme (watch)

```javascript
function IzlemeliForm() {
  const { register, watch } = useForm();
  const watchSehir = watch('sehir');

  return (
    <div>
      <select {...register('sehir')}>
        <option value="">Seçiniz</option>
        <option value="istanbul">İstanbul</option>
        <option value="ankara">Ankara</option>
      </select>
      
      {watchSehir === 'istanbul' && (
        <select {...register('ilce')}>
          <option value="kadikoy">Kadıköy</option>
          <option value="besiktas">Beşiktaş</option>
        </select>
      )}
    </div>
  );
}
```

## Gelişmiş Form Örneği 🚀

```javascript
import { useForm } from 'react-hook-form';

function GelismisForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      ad: '',
      email: '',
      yas: '',
      sifre: '',
      sifreTekrar: ''
    }
  });

  const sifre = watch('sifre');

  const onSubmit = async (data) => {
    try {
      // API çağrısını simüle edelim
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form gönderildi:', data);
      reset(); // Formu sıfırla
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Ad Soyad:</label>
        <input
          {...register('ad', {
            required: 'Ad Soyad zorunludur',
            minLength: {
              value: 3,
              message: 'Ad Soyad en az 3 karakter olmalıdır'
            }
          })}
        />
        {errors.ad && <span className="hata">{errors.ad.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email zorunludur',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Geçerli bir email adresi giriniz'
            }
          })}
        />
        {errors.email && <span className="hata">{errors.email.message}</span>}
      </div>

      <div>
        <label>Yaş:</label>
        <input
          type="number"
          {...register('yas', {
            required: 'Yaş zorunludur',
            min: { value: 18, message: 'Yaşınız 18\'den büyük olmalıdır' },
            max: { value: 100, message: 'Geçerli bir yaş giriniz' }
          })}
        />
        {errors.yas && <span className="hata">{errors.yas.message}</span>}
      </div>

      <div>
        <label>Şifre:</label>
        <input
          type="password"
          {...register('sifre', {
            required: 'Şifre zorunludur',
            minLength: {
              value: 6,
              message: 'Şifre en az 6 karakter olmalıdır'
            }
          })}
        />
        {errors.sifre && <span className="hata">{errors.sifre.message}</span>}
      </div>

      <div>
        <label>Şifre Tekrar:</label>
        <input
          type="password"
          {...register('sifreTekrar', {
            required: 'Şifre tekrarı zorunludur',
            validate: value =>
              value === sifre || 'Şifreler eşleşmiyor'
          })}
        />
        {errors.sifreTekrar && (
          <span className="hata">{errors.sifreTekrar.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Gönderiliyor...' : 'Kayıt Ol'}
      </button>
    </form>
  );
}
```

## Önemli İpuçları ve Best Practices 💡

1. **Form Başlangıç Değerleri**
   ```javascript
   const { register } = useForm({
     defaultValues: {
       ad: 'John',
       email: 'john@example.com'
     }
   });
   ```

2. **Koşullu Validasyon**
   ```javascript
   {...register('telefon', {
     validate: (value) => {
       if (!value && !watch('email')) {
         return 'Email veya telefon zorunludur';
       }
       return true;
     }
   })}
   ```

3. **Form Sıfırlama**
   ```javascript
   const { reset } = useForm();
   
   // Formu tamamen sıfırla
   reset();
   
   // Belirli değerlerle sıfırla
   reset({
     ad: 'John',
     email: 'john@example.com'
   });
   ```

4. **Performans İyileştirmeleri**
   - `shouldUnregister` özelliğini kullanarak gereksiz alan kayıtlarını önleyin
   - Büyük formlarda `defaultValues` kullanın
   - Gereksiz render'ları önlemek için `watch` kullanımını optimize edin

## Sonuç 🎉

react-hook-form ve useForm hook'u, React uygulamalarında form yönetimini çok daha kolay ve etkili hale getiriyor. Performanslı yapısı, kolay validasyon özellikleri ve zengin API'si ile modern web uygulamalarında form işlemlerini yönetmek artık çok daha keyifli!

Umarım bu rehber, useForm hook'unu anlamanıza ve projelerinizde etkili bir şekilde kullanmanıza yardımcı olmuştur. Sorularınız varsa, sormaktan çekinmeyin. Birlikte öğrenmeye devam! 🚀