# ReactJS Form Yönetimi

## İçindekiler
- [Kontrollü ve Kontrolsüz Bileşenler](#kontrollü-ve-kontrolsüz-bileşenler)
- [Form State Yönetimi](#form-state-yönetimi)
- [Form Olayları](#form-olayları)
- [Form Doğrulama](#form-doğrulama)

## Kontrollü ve Kontrolsüz Bileşenler

### Kontrollü Bileşen
```jsx
function KontrolluForm() {
  const [deger, setDeger] = useState('');

  const handleChange = (e) => {
    setDeger(e.target.value);
  };

  return (
    <input
      type="text"
      value={deger}
      onChange={handleChange}
    />
  );
}
```

### Kontrolsüz Bileşen
```jsx
function KontrolsuzForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue=""
    />
  );
}
```

## Form State Yönetimi

### Basit Form State
```jsx
function KayitFormu() {
  const [formData, setFormData] = useState({
    ad: '',
    email: '',
    sifre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="ad"
        value={formData.ad}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="sifre"
        type="password"
        value={formData.sifre}
        onChange={handleChange}
      />
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
```

## Form Olayları

### Temel Form Olayları
```jsx
function FormOlaylari() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemleri
  };

  const handleChange = (e) => {
    // Input değişiklik işlemleri
  };

  const handleFocus = (e) => {
    // Input odaklanma işlemleri
  };

  const handleBlur = (e) => {
    // Input odak kaybı işlemleri
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </form>
  );
}
```

## Form Doğrulama

### Temel Doğrulama
```jsx
function DogrulamaFormu() {
  const [formData, setFormData] = useState({
    email: '',
    sifre: ''
  });

  const [hatalar, setHatalar] = useState({});

  const validateForm = () => {
    const yeniHatalar = {};

    if (!formData.email) {
      yeniHatalar.email = 'Email zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      yeniHatalar.email = 'Geçerli bir email giriniz';
    }

    if (!formData.sifre) {
      yeniHatalar.sifre = 'Şifre zorunludur';
    } else if (formData.sifre.length < 6) {
      yeniHatalar.sifre = 'Şifre en az 6 karakter olmalıdır';
    }

    setHatalar(yeniHatalar);
    return Object.keys(yeniHatalar).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form gönderme işlemleri
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {hatalar.email && <span>{hatalar.email}</span>}
      </div>
      <div>
        <input
          name="sifre"
          type="password"
          value={formData.sifre}
          onChange={handleChange}
        />
        {hatalar.sifre && <span>{hatalar.sifre}</span>}
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
}
```

## En İyi Pratikler
1. Form state'ini tek bir noktada yönetin
2. Input değerlerini kontrollü bileşenlerle yönetin
3. Form doğrulamalarını submit öncesi yapın
4. Hata mesajlarını kullanıcı dostu şekilde gösterin
5. Form gönderimi sırasında loading durumunu yönetin 