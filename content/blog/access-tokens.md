---
description: Authorisation flow seems complex and but a simple analogy can explain it
draft: true
---

# Auth flow explained using a bar analogy

![](https://images.ctfassets.net/cdy7uua7fh8z/2nbNztohyR7uMcZmnUt0VU/2c017d2a2a2cdd80f097554d33ff72dd/auth-sequence-auth-code.png)

## Preamble

Have actually been doing a lot of auth stuff in the few months.

You can use sessionStorage, which is the same, but is deleted when the tab is closed.

HTTP cookies can have a property called httponly (set on the server I think) which means they can't be accessed in Javascript, so document.cookie won't show them, but if you go to the browser toolbar icon and click "cookies" you will see them there.

https://owasp.org/www-community/HttpOnly

As for doing Auth yourself, you can do. I've been doing that on one project and we've rewritten it 3 times using various Auth "flows". It's been a great learning experience, but a massive ball ache.

There are so many "Auth as a Service" players out there now, that it's just as easy to use them.

If you are going to go with any of the usual flows, you'll probably need to understand access tokens and refresh tokens at least.

They basically describe the mechanism of logging in with (normally) a username and password, then getting an "access token" in exchange (think when you hand over your bank card at a bar and they give you a tab card instead).

Then, each time you go to the bar to get a drink (hit an API endpoint) you show them your tab card (access token) and they give you a drink (API data).

This is instead of giving your  (bank card) on every trip, which makes it safer, as you're not sending it over the wire (getting your wallet out) each time.

Most websites set an "expiry time" on access tokens (that is, you can only use the tab card they give you for the next hour). This value (in ms) is given to you when you first log in, along with a "refresh token" (secret word, say "banana") which will allow you to get a new access token (tab card) when the old one runs out (because the bar uses different color tab cards throughout the day).

It is up to you to store the access token, refresh token, and expires in (you generally add the current time and store an "expires at" time) in your app (so you put the card in your wallet, remember the secret word, and set your phone alarm to remind you when your tab card will no longer be valid).

Note that the "access token" will have a short "expiry" time (say, 15 minutes) and the refresh token will have a much longer expiry time (say, months). This is because your access token could be compromised (you might drop the card on the floor) so the bar will only accept that it is your access token (your card) if you can also provide the longer-lived refresh token (the word "banana", that you memorised).

So back to the bar analogy.

Your phone ran out of juice, and you've been nursing your pint, but you finally go back to the bar and ask for another.

They tell you your tab (access token) has expired but your can get more drinks if you can prove who you are by telling the manager the secret word, which they will compare with what they wrote down with your access token.

You call the refresh endpoint (speak to the manager) with your access token (your card) and refresh token (tell him the word banana) and you get back a new access token (he gives you a new card; it's pink this time).

You then put the new card in your wallet (save to sessionStorage) and set an alarm on your watch this time (update the expires at time, also in sessionStorage).

Note that if someone had seen your card at the bar (compromised your access token over wifi) and started ordering drinks to table 5 (making API requests with the compromised access token), they would only be able to do this until the tab card expired (the access token has expired) then they would need to tell the manager the secret word (refresh the access token) which they can't as you never showed anyone.

Sorry that is SUCH a long explanation; it was kind of fun for me to keep going with it once I started as I've been working on it so much recently!

Maybe I'll make a blog post :P

Anyway, long story short; don't worry too much about whether it's localStorage or sessionStorage, just get the code working for now as it all seems very confusing before you've done it a bunch of times.

And you're right, there is a lot of conflicting info out there, as well as lots of terms which just don't help. Auth0, which is supposed to make it simpler, in many cases just makes it seem more confusing.

However, the links from this page re. flows are great:

- https://auth0.com/docs/flows

The first link in each section will show you the actual flow that happens from client to server (this is what you replicate in code).

In an ideal world, you will use a client library to do this for you, but in my investigations very few existed, and the few that did required such setup and knowledge (which I now, ironically have) to get going, that it was easier to write the calls from scratch.

Not sure how much help that is, for the amount of words written!

LNK if I can help more
