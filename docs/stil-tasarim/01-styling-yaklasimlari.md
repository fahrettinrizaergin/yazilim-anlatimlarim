# React Stil ve Tasarım Yaklaşımları

## İçindekiler
- [CSS Yaklaşımları](#css-yaklaşımları)
- [CSS Modules](#css-modules)
- [Styled Components](#styled-components)
- [Tailwind CSS](#tailwind-css)
- [CSS-in-JS](#css-in-js)
- [Responsive Tasarım](#responsive-tasarım)

## CSS Yaklaşımları

### Geleneksel CSS
```css
/* styles.css */
.button {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

.button:hover {
  background-color: #0056b3;
}
```

```jsx
import './styles.css';

function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}
```

### Inline Styles
```jsx
function Button({ primary }) {
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    backgroundColor: primary ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <button style={buttonStyle}>
      Click Me
    </button>
  );
}
```

## CSS Modules

### Modül Tanımlama
```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

.primary {
  background-color: #28a745;
}

.secondary {
  background-color: #6c757d;
}
```

### Modül Kullanımı
```jsx
import styles from './Button.module.css';
import classNames from 'classnames';

function Button({ primary, secondary, children }) {
  const buttonClass = classNames(styles.button, {
    [styles.primary]: primary,
    [styles.secondary]: secondary
  });

  return (
    <button className={buttonClass}>
      {children}
    </button>
  );
}
```

## Styled Components

### Temel Kullanım
```jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

// Kullanımı
function App() {
  return (
    <Container>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </Container>
  );
}
```

### Tema Kullanımı
```jsx
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
};

const Button = styled.button`
  padding: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.primary};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Themed Button</Button>
    </ThemeProvider>
  );
}
```

## Tailwind CSS

### Kurulum ve Yapılandırma
```jsx
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d'
      }
    }
  },
  plugins: []
}
```

### Kullanım Örnekleri
```jsx
function Card() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-4">Başlık</h2>
      <p className="text-gray-600">İçerik metni</p>
      <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
        Detaylar
      </button>
    </div>
  );
}
```

## CSS-in-JS

### Emotion Kullanımı
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyles = css`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Button({ children }) {
  return (
    <button css={buttonStyles}>
      {children}
    </button>
  );
}
```

## Responsive Tasarım

### Media Queries
```jsx
const Container = styled.div`
  padding: 20px;
  
  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
```

### Responsive Komponentler
```jsx
function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}

// Custom Hook
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
```

## En İyi Pratikler

1. **Tutarlı Naming Convention**
```css
/* BEM Metodolojisi */
.block {}
.block__element {}
.block--modifier {}

/* Örnek */
.card {}
.card__title {}
.card__content {}
.card--featured {}
```

2. **CSS Değişkenleri**
```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --spacing-unit: 8px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
}
```

3. **Stil Organizasyonu**
```jsx
// Styled Components ile organizasyon
const StyledButton = {
  Base: styled.button`
    /* Temel stiller */
  `,
  Primary: styled(Button)`
    /* Primary varyant */
  `,
  Secondary: styled(Button)`
    /* Secondary varyant */
  `
};

// Kullanımı
function App() {
  return (
    <div>
      <StyledButton.Primary>Primary</StyledButton.Primary>
      <StyledButton.Secondary>Secondary</StyledButton.Secondary>
    </div>
  );
}
```

4. **Performans Optimizasyonu**
```jsx
// Stil hesaplamalarını memoize et
const StyledComponent = React.memo(styled.div`
  /* Karmaşık stiller */
`);

// Dynamic styles için useMemo
function DynamicComponent({ color }) {
  const styles = useMemo(() => ({
    backgroundColor: color,
    transform: 'scale(1.1)'
  }), [color]);

  return <div style={styles} />;
}
```

5. **Tema Yönetimi**
```jsx
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    text: {
      primary: '#212529',
      secondary: '#6c757d'
    }
  },
  typography: {
    fontSize: {
      small: '12px',
      medium: '16px',
      large: '20px'
    },
    fontWeight: {
      normal: 400,
      bold: 700
    }
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
};
``` 