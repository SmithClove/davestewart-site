---
description: Use styling to reformat standard formatting
---

# Upgrade your WorkFlowy formatting with Stylish

```css
.content u {
  padding: 2px 5px 4px;
  text-decoration: none !important;
  border-radius: 4px;
  font-weight: normal;
  font-style: normal;
}

:root {
  --pink: #ffd6f7;
  --orange: #ffdf37;
  --yellow: #fffb2f;
  --green: #baff50;
  --blue: #61fdff;
}

.content u {
  background: var(--stripes);
}

.content i u {
  background: var(--green)
}

.content b u {
  background: var(--blue)
}

.content b i u {
  background: var(--pink)
}
```

Stripes:

```css
:root {
  --stripes: repeating-linear-gradient(
    -45deg,
    var(--yellow),
    var(--yellow) 3px,
    var(--green) 3px,
    var(--green) 6px
  );
}

.content u {
  background: var(--stripes);
}
```

Animated stripes:

```css

@keyframes slide {
  from { background-position: 0 0; }
  to { background-position: 8.49px 0; }
}

.content u {
  background: var(--stripes);
  transition: 1s background;
  animation: slide .3s linear infinite;
}
```
