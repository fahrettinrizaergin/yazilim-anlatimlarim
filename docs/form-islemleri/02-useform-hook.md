# React Hook Form Kullanımı

## İçindekiler
- [React Hook Form Nedir?](#react-hook-form-nedir)
- [Kurulum](#kurulum)
- [Temel Kullanım](#temel-kullanım)
- [Form Doğrulama](#form-doğrulama)
- [Form State ve Hata Yönetimi](#form-state-ve-hata-yönetimi)

## React Hook Form Nedir?
React Hook Form, React uygulamalarında form yönetimini kolaylaştıran, performanslı ve esnek bir form kütüphanesidir. Gereksiz render'ları önler ve form validasyonunu kolaylaştırır.

## Kurulum

```bash
# npm ile kurulum
npm install react-hook-form

# yarn ile kurulum
yarn add react-hook-form
```

## Temel Kullanım

### Basit Form Örneği
```jsx
import { useForm } from 'react-hook-form';

function KayitFormu() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('ad')} />
      <input {...register('email')} type="email" />
      <input {...register('sifre')} type="password" />
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
```

## Form Doğrulama

### Doğrulama Kuralları
```jsx
function DogrulamaFormu() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('ad', {
          required: 'Ad alanı zorunludur',
          minLength: {
            value: 2,
            message: 'Ad en az 2 karakter olmalıdır'
          }
        })}
      />
      {errors.ad && <span>{errors.ad.message}</span>}

      <input
        {...register('email', {
          required: 'Email alanı zorunludur',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Geçerli bir email adresi giriniz'
          }
        })}
        type="email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('sifre', {
          required: 'Şifre alanı zorunludur',
          minLength: {
            value: 6,
            message: 'Şifre en az 6 karakter olmalıdır'
          }
        })}
        type="password"
      />
      {errors.sifre && <span>{errors.sifre.message}</span>}
    </form>
  );
}
```

## Form State ve Hata Yönetimi

### Watch ve Form State
```jsx
function FormState() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm();

  // Input değerlerini izleme
  const watchedFields = watch(['email', 'sifre']);
  console.log(watchedFields);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('sifre')} type="password" />
      
      {/* Form durumu gösterimi */}
      {isDirty && <p>Form değiştirildi</p>}
      {isSubmitting && <p>Form gönderiliyor...</p>}
      
      <button type="submit" disabled={isSubmitting}>
        Gönder
      </button>
    </form>
  );
}
```

### Özel Doğrulama
```jsx
function OzelDogrulama() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('sifre', {
          required: 'Şifre zorunludur'
        })}
        type="password"
      />
      
      <input
        {...register('sifreTekrar', {
          required: 'Şifre tekrarı zorunludur',
          validate: (value) => {
            const { sifre } = getValues();
            return sifre === value || 'Şifreler eşleşmiyor';
          }
        })}
        type="password"
      />
      {errors.sifreTekrar && <span>{errors.sifreTekrar.message}</span>}
    </form>
  );
}
```

## Gelişmiş Özellikler

### Form Reset ve Varsayılan Değerler
```jsx
function GelismisForm() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ad: 'John Doe',
      email: 'john@example.com'
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // Form reset
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('ad')} />
      <input {...register('email')} type="email" />
      <button type="submit">Gönder</button>
      <button type="button" onClick={() => reset()}>
        Sıfırla
      </button>
    </form>
  );
}
```

## En İyi Pratikler
1. Form validasyonunu mümkün olduğunca HTML5 validasyonu ile destekleyin
2. Karmaşık validasyonlar için yup veya zod gibi şema validasyon kütüphaneleri kullanın
3. Form state'ini izlemek için watch fonksiyonunu dikkatli kullanın
4. Büyük formlarda defaultValues kullanarak performansı artırın
5. Form gönderimi sırasında isSubmitting durumunu kontrol edin 