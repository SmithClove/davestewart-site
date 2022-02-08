---
description: Destructure raw JSON whilst automatically adding type information
date: 2021-11-01
media:
  thumbnail: ./thumbnail.png
  featured: ./featured.png
---

# 7 code-style variations for strongly-typed JSON

## Intro

I don't know about you, but I like my JSON data to get _typed_ as soon as possible.

Whether I wrap it, assign it or destructure it, it's great to be able to see properties pop up as you type.

Whilst exploring ways to do this, I've been consistently surprised how flexible TypeScript's compiler can be – especially in regard to destructuring – so a while ago I started noting the various ways to do it.


## Dataset

Let's say you have some contact data with  **top-level** and **nested** properties:

```ts
const data = {
  "id": 1,
  "name": "joe",
  "contact": {
    "email": "joe@bloggs.com",
    "phone": "020 0000 0000"
  }
}
```

_For the sake of momentum let's assume this data is safe; either it's hardcoded JSON or has been sanitised._

It would be good to get it fully typed, so:

- TypeScript will complain if we try to do something we shouldn't
- we can dot-into both top level and nested data
- we can pass it around the app

Let's begin by defining the types:

```ts
type User = {
  id: number,
  name: string,
  contact: Contact
}

type Contact = {
  email: string,
  phone: string
}
```

The rest of the article will demonstrate variations in code-style to safely map our types to the data.

## Code

The naive way would be to assign types manually:

```ts
function process (data: any) {
  const id: number = data.id
  const name: string = data.name
  const contact: any = data.contact
}
```

But we can do better than that, as we've already have some type information:

```ts
function process (data: any) {
  const id: number = data.id
  const name: string = data.name
  const contact: Contact = data.contact
}
```

If destructuring is your thing, you can do that too:

```ts
function process (data: any) {
  const { id, name, contact }: { id: number, name: string, contact: Contact } = data
}
```

But we're duplicating effort, as we could leverage our existing `User` type:

```ts
function process (data: any) {
  const { id, name, contact }: User = data
}
```

Moving the type to the parameter makes for one less step:

```ts
function process (user: User) {
  const { id, name, contact } = user
}
```

We can even destructure within the parameter!

```ts
function process ({ id, name, contact }: User) {
  // ...
}
```

If there's some reason you can't type the parameter, you can `as` to [assert](https://basarat.gitbook.io/typescript/type-system/type-assertion) before you destructure: 

```ts
function process (data: any) {
  const { id, name, contact } = data as User
}
```

If you're passing to a function that expects a `User` type, you can assert inline within the call: 

```ts
process(data as User)
```

## Conclusion

ES6 destructuring and TypeScript types make a great combination, and TypeScript's compiler is flexible enough that there's multiple ways to type values with a terse and expressive style.

I hope you learned something!
