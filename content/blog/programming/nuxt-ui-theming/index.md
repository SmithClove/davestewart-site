I thought I would summarise some of the (unexplained) gymnastics going on Nuxt UI and why it seems that using primary as a color group in Tailwind UI is broken.

TL;DR; Nuxt UI creates (and therefore, overwrites) the primary and gray groups with its own values derived, from a separate color group in your TW config, which are .



The bottom line is that if you are using Nuxt UI, you can't use primary (or gray) as a color group in Tailwind.

This is because of the way Nuxt UI themes its own components by writing classes such as

 because tailwind compiles its own primary and gray color groups into the Tailwind config at build time, Unfortunately the docs don't tell you and the compiler doesn't warn of any overwriting.



internal templates such as bg-{color}-500:

https://ui.nuxt.com/getting-started/theming#colors

At build time, Nuxt UI creates its own key called primary (overwriting your key primary) with a new set of values it derives from the app.config.ts ui.color setting, which is supposed to point to an existing color group such as pink or brand. with their own 100, 200, 300, variants.

Then, when you set the color of a component using UButton color="pink" /> it points at `bg-color

This final set of colors combines the values from tailwind.config.theme.extends.colors[ui.color] with some special Tailwind  <alpha-value> alpha placeholders:

```
 "primary": {
    "50": "rgb(var(--color-primary-50) / <alpha-value>)",
    "100": "rgb(var(--color-primary-100) / <alpha-value>)",
    "200": "rgb(var(--color-primary-200) / <alpha-value>)",
    "300": "rgb(var(--color-primary-300) / <alpha-value>)",
    "400": "rgb(var(--color-primary-400) / <alpha-value>)",
    "500": "rgb(var(--color-primary-500) / <alpha-value>)",
    "600": "rgb(var(--color-primary-600) / <alpha-value>)",
    "700": "rgb(var(--color-primary-700) / <alpha-value>)",
    "800": "rgb(var(--color-primary-800) / <alpha-value>)",
    "900": "rgb(var(--color-primary-900) / <alpha-value>)",
    "950": "rgb(var(--color-primary-950) / <alpha-value>)",
    "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
  },
```

 

```
```

This setup allows Tailwind to grab these values and swap out the placeholder when it compiles the final CSS, so using something like bg-primary-500/30 in your app will generate:

.bg-primary-500\/30 {
  --alpha: 30;
  background-color: rgb(var(--color-primary-500) / --alpha);
}

I thought that might be useful to share. It's certainly