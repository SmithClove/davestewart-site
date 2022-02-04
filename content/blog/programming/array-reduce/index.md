---
description: Leverage this versatile, flexible method to write more expressive, chainable and reusable JavaScript
---

# Array.reduce() explained so you'll actually get it

## Intro

If you're reading this article perhaps you're you think `Array.reduce()` is:

- too complicated
- too confusing
- not necessary

If so, allow me to explain-away confusing parts and show you a new way to look at a JavaScript method I use all the time.

In this article, you will learn:

- a more intuitive way to write `Array.reduce()` in your everyday code 
- how reduce is only a little further away from `map` and `forEach`
- how chaining is a valuable and expressive way to process or convert data 
- some real world examples which hopefully will make you see the light

I'm going to assume that you're comfortable with basic loops and Array methods, and I will attempt to contrast these simpler concepts and bring you onboard with this rather wonderful built-in JavaScript construct.

> Note that ***you will be able to copy and paste all the code to the console*** to test that it works in practice (and for that reason, I will be using the keyward `var` not `let` or `const` in these examples).

## The arguments against reduce

### It's confusing

MDN introduces reduce like so:

> The reduce() method executes a user-supplied “reducer” callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

Other sources describe it more simply as:

> A way to reduce an array to a single value

The method signature is as follows:

```js
array.reduce(function (accumulator, currentValue, currentIndex?, array?) {
  // accumulator will be the first value of the array
  // currentValue will be the second value of the array
  // the function will be called one less than the length of the array
})
```

However, you can also call reduce with an `initialValue`:

```js
array.reduce(function (accumulator, currentValue, currentIndex?, array?) {
  // accumulator will be the initialValue
  // currentValue will be the first value of the array
  // the function will be called the same number of times as the length of the array
}, initialValue)
```

Finally, the typical example "sums the values of an array" and uses the more confusing first form:

```js
var values = [1,2,3,4,5]
var total = values.reduce((accumulator, currentValue) => accumulator + currentValue)
console.log(total) //15
```


Let's look at the confusing aspects here:

- [the concept](#the-concept) (what does it mean to convert (reduce) multiple items to a single value?)
- [the callback parameters](#the-callback-parameters)' names and purpose (`accumulator`, `value` ... wtf!?)
- [the dual form](#the-dual-form) of the function (do yourself a favour, prefer the second form where possible!)
- [the example](#the-example) (is it significant that the array is a triangle number?)

In the next few sections, I'll tackle these issues one by one...

### The concept

The example given is to **sum the values of an array**:

```js
console.log(1 + 2 + 3 + 4 + 5) // 15
```

If you wanted to do that with a loop, you would do the following:

```js
var values = [1,2,3,4,5]
var total = 0
for (let i = 0; i < values.length; i++) {
  total += values[i]
}
console.log(total) // 15
```

### The callback parameters

Remember, the reduce example was:

```js
var values = [1,2,3,4,5]
var total = values.reduce((accumulator, currentValue) => accumulator + currentValue)
console.log(total) //15
```

As an initial learning exercise, this code isn't the easiest to tinker with, so let's...

- use a normal function rather than an arrow function
- change the parameter names
- add some logging 

...just to make things clearer:

```js
var values = [1,2,3,4,5]
var total = values.reduce(function (total, value, index) {
  console.log({ index, value, total })
  total += value
  return total
})
console.log({ total }) // 15
```
```
{index: 1, value: 2, total: 1}
{index: 2, value: 3, total: 3}
{index: 3, value: 4, total: 6}
{index: 4, value: 5, total: 10}
15
```

Note that on each call of the function:

- the `value` parameter is added to the `total` parameter
- the returned `total` parameter is fed back in to the function, and "accumulates", hence the (crap) name
- the final `total` is correct

But! Did you notice how the initial value

### The dual form


```js
var values = [1,2,3,4,5]
var total = values.reduce(function (accumulator, value) {
  console.log(value, accumulator)
  accumulator += value
  return accumulator
}, 0)
console.log(total) //15
```





Whilst this is a reasonable example for reduce...

```js
var values = [1,2,3,4,5]
var total = values.reduce((accumulator, value) => accumulator + value)
console.log(total) //15
```

... it is generally not something I never need to do.

Whilst this is a reasonable example for reduce – it processes 5 numbers in an array and returns a single number – it's generally not something I never need to do.



Let's review the typical beginner's example again:

For the record – **I agree with you** – this example is simple too esoteric:

- it uses the first form of the method (which is the confusing one)
- you will probably never need to calculate a triangle number in the real world
- a `for` loop would absolutely be clearer here

The only reason I can type it without thinking is that I've done it a lot.

By way of comparison, let's take a look at a for loop:

```js
var values = [1,2,3,4,5]
var total = 0
for (let i = 0; i < values.length; i++) {
  total += values[i]
}
console.log(total) //15
```



### The example



Rather, let me describe some everyday `reduce` use cases I use often:

- grab the lowest or highest value from a list of values
- optionally filter values from an array, depending on a given condition
- pick values from an array of objects and return them as a single object
- convert an array to an object or vice versa

Firstly, hopefully you can see how all these operations could convert an array into a "single value" – which _could_ be a number – but for me is usually a new array, or an object and it will be easier start thinking in terms of object conversion going forwards (as that's what most of the [examples](#examples) will cover).

Secondly, all these operations could just as easily use a `for` loop, or a combination of `filter` and `map` so in the following section, I'll combine these ideas and show you something you can begin to get your teeth into.

### The example

Let's review the typical beginner's example again:

```js
var values = [1,2,3,4,5]
var total = values.reduce((accumulator, value) => accumulator + value)
console.log(total) //15
```

For the record – **I agree with you** – this example is simple too esoteric:

- it uses the first form of the method (which is the confusing one)
- you will probably never need to calculate a triangle number in the real world
- a `for` loop would absolutely be clearer here

The only reason I can type it without thinking is that I've done it a lot.

By way of comparison, let's take a look at a for loop:

```js
var values = [1,2,3,4,5]
var total = 0
for (let i = 0; i < values.length; i++) {
  total += values[i]
}
console.log(total) //15
```

There's no doubt, if you don't know array reduce, this **feels** more tangible; you can picture the variables in your head and imagine how they interact with each other.

As a not-yet-convert, that's certainly an argument _against_, but certainly not a killer blow.


### The dual form

The previous example used the first form of the method (no optional `initialValue`) so let's try the second form of the method, and see how that works instead:

```js
var values = [1,2,3,4,5]
var total = values.reduce(function (accumulator, value) {
  accumulator += value
  return accumulator
}, 0)
console.log(total) //15
```

Now there are several things to notice here:

- generally, when you pass in an initial value, it's visually clearer to use a proper `function` (sometimes called a "closure") rather than an arrow function (`=>`)
- this is because you'll be writing the function over several lines; first updating the `accumulator` then returning it
- finally, the `initialValue` is supplied as `0` rather than assumed; this **immediately** makes it clearer what is going on

The takeaway for this is: if you are confused by the first form of the method, **always supply the initial value** (the second form of the function)

Just to clear something up, **you can use a function for the first form of the method**:

```js
var values = [1,2,3,4,5]
var total = values.reduce(function (accumulator, value) {
  accumulator += value
  return accumulator
})
console.log(total) //15
```

### The callback parameters

OK, here is hopefully where you get your first "bingo" moment... you can ***simply change the name of the confusing parameters*** to something that makes it more clear what you are doing in the function.

Before we


- rather than `accumulator` use 

> Feel free to skip ahead to the examples section if you are still unclear how reduce works for you




## The arguments for


```js
function getColorsMap (svg) {
  const matches = svg.match(/ fill="(.+?)"/g)
  if (matches) {
    const colors = matches
      .map(match => match.match(/"(.+)"/, (match, matches) => matches[0].toLowerCase()))
      .filter(color => color !== 'none')
    return uniq(colors)
  }
  return []
}

function getColorsReduce (svg) {
  const matches = svg.match(/ fill="(.+?)"/g)
  if (matches) {
    return matches.reduce((colors, attr) => {
      const color = attr.match(/"(.+?)"/)[1].toLowerCase()
      if (color !== 'none' && colors.indexOf(color) === -1) {
        colors.push(color)
      }
      return colors
    }, [])
  }
  return []
}


function pickFor (input, keys) {
  const output = {}
  for (let i = 0; i < keys.length; i++) {
    output[keys[i]] = input[keys[i]]
  }
  return output
}

function pickForOf (input, keys) {
  const output = {}
  for (const key of keys) {
    output[key] = input[key]
  }
  return output
}

function pickForEach (input, keys) {
  const output = {}
  keys.forEach(key => {
    output[key] = input[key]
  })
  return output
}

function pickReduce (input, keys) {
  return keys.reduce((output, key) => {
    output[key] = input[key]
    return output
  }, {})
}

function pickWhile (input, keys) {
  const output = {}
  let i = 0
  while (i < keys.length) {
    output[keys[i]] = input[keys[i]]
    i++
  }
  return output
}

function pickWhileReverse (input, keys) {
  const output = {}
  let i = keys.length
  while (--i >= 0) {
    output[keys[i]] = input[keys[i]]
  }
  return output
}

const input = { a: 1, b: 2, c: 3, d: 4, e: 5 }

const result = pickWhileReverse(input, ['a', 'c', 'e'])
console.log(result)


pickFor(input, ['a', 'c', 'e'])
pickForOf(input, ['a', 'c', 'e'])
pickForEach(input, ['a', 'c', 'e'])
pickReduce(input, ['a', 'c', 'e'])
pickWhile(input, ['a', 'c', 'e'])
pickWhileReverse(input, ['a', 'c', 'e'])
```
