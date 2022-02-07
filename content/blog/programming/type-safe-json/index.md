---
description: How to write expressive, destructured, and type-safe variable declarations  
date: 2021-11-01
media:
  thumbnail: ./thumbnail.png
  featured: ./featured.png
---

# 5 ways to make incoming JSON type-safe

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
- we can pass some around the app

As such, let's define the types:

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

The rest of the article will demonstrate various code-style combinations to safely map our types to the data.

## Code

The most basic way is to explicitly declare new variables:

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

But we could leverage of our existing `User` type by simplify using that:

```ts
function process (data: any) {
  const { id, name, contact }: User = data
}
```

Moving it to the parameter makes for one less step:

```ts
function process (user: User) {
  const { id, name, contact } = user
}
```

If there's some reason you can't type the parameter, you can use the keyword `as` to aid the destructure: 

```ts
function process (data: any) {
  const { id, name, contact } = data as User
}
```

If you're passing directly to a function that expects a `User` type, you can [assert](https://basarat.gitbook.io/typescript/type-system/type-assertion) the value directly in call: 

```ts
process(data as User)
```

## Conclusion

ES6 destructuring and TypeScript types make a great combination, and TypeScript's compiler is flexible enough that there's multiple, flexible ways to skin the destructuring cat.

I hope you learned something!
