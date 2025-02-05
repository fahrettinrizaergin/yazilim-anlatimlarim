# ReactJS Component Kullanımı

## İçindekiler
- [Bileşen (Component) Nedir?](#bileşen-component-nedir)
- [Fonksiyonel Bileşenler](#fonksiyonel-bileşenler)
- [Class Bileşenleri](#class-bileşenleri)
- [Props Kullanımı](#props-kullanımı)
- [Children Props](#children-props)

## Bileşen (Component) Nedir?
React'te bileşenler, kullanıcı arayüzünü oluşturan bağımsız, yeniden kullanılabilir kod parçalarıdır. Bir bileşen, kendi mantığını ve görünümünü kapsülleyen JavaScript fonksiyonu veya sınıfıdır.

## Fonksiyonel Bileşenler
```jsx
function Welcome(props) {
  return <h1>Merhaba, {props.name}</h1>;
}

// Ok fonksiyonu ile
const Welcome = (props) => {
  return <h1>Merhaba, {props.name}</h1>;
};
```

## Class Bileşenleri
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Merhaba, {this.props.name}</h1>;
  }
}
```

## Props Kullanımı
Props (properties), bileşenlere veri aktarmak için kullanılan özel React nesneleridir.

```jsx
function Welcome(props) {
  return <h1>Merhaba, {props.name}</h1>;
}

// Kullanımı
<Welcome name="Ahmet" />
```

## Children Props
Children prop'u, bileşen etiketleri arasında kalan içeriği temsil eder.

```jsx
function Container(props) {
  return <div className="container">{props.children}</div>;
}

// Kullanımı
<Container>
  <h1>Başlık</h1>
  <p>İçerik</p>
</Container>
```

## En İyi Pratikler
1. Bileşen isimleri büyük harfle başlamalıdır
2. Her bileşen tek bir sorumluluğa sahip olmalıdır
3. Bileşenler mümkün olduğunca küçük ve yeniden kullanılabilir olmalıdır
4. Props'lar değişmez (immutable) olarak kabul edilmelidir 