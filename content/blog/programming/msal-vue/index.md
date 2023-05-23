---
description: Architect a Vue JS app secured with Microsoft Authentication Library
date: 2023-02-28
media:
  opengraph: ./msal-featured.png
  featured: ./msal-featured.png
  thumbnail: ./msal-thumbnail.png
---

# A guide to MSAL authentication in Vue

## Overview

The [Microsoft Authentication Library](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview) (MSAL) is Microsoft's own OAuth solution for the [Microsoft identity platform]() that in _theory_ provides a simple and robust login solution.  The **reality** is that getting it working is a [cavalcade](https://twitter.com/dave_stewart/status/1626992942433853445) [of](https://twitter.com/badsyntax/status/1627207936874250240) [pain](https://twitter.com/aleksejdix/status/1627333214439186434).

In this post I'll:

- cover a long list of [MSAL gotchas](#msal-gotchas)
- share a no-fluff, modular [MSAL / Vue Demo](https://github.com/davestewart/msal-vue-demo)
- walk through the [steps I took](#msal-vue-demo) to get it working

## MSAL gotchas

> ***Note:*** this post is aimed at frontend developers aiming to implement MSAL in Vue, and assumes you (or a backend team member) have **already** configured your [tenant](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant), [scopes](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-expose-web-apis#add-a-scope), [redirects](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow#redirect-uris-for-single-page-apps-spas), etc.

### GitHub repo

The [MSAL for JS](https://github.com/AzureAD/microsoft-authentication-library-for-js) repo is **big**; there's many supported frameworks, lots of code, lots of docs, and lots of samples. 

Here's where to find the good stuff:

```
+- lib
|  +- browser/docs            <-- docs on browser wrapper, i.e. MSAL interface, walkthorugh
|  +- common/docs             <-- docs on common operations, i.e. authorities, requests
|  +- core/docs               <-- docs on core operations, i.e. scopes, errors 
+- samples
   +- msal-browser-samples/*  <-- vanilla, typescript, vue 3 samples
   +- msal-core-samples/*     <-- vanilla, react samples
```

For the platform-specific libraries, check the `README`s as well as the `docs/*.md` for each, there's lots of hidden technical information should you wish to dig for it.

### Docs

Confusingly, there are several sets of docs...

On the [Microsoft Identity Platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/) site:

- An [overview of the library](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
- An [SPA hub](https://learn.microsoft.com/en-us/azure/active-directory/develop/index-spa) which only has code for Angular and React

On the [GitHub](https://github.com/AzureAD/microsoft-authentication-library-for-js) repo at `/lib/<framework>/docs`:

- framework-specific docs for [Angular](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular) and [React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react), hidden deep in the individual wrapper folders
- core docs for the main [Browser](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser) implementation used for all other frameworks

### Samples

Unlike the deeply nested docs, you'll find the [samples](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples) placed at the root level of the GitHub repo.

Most of them seem unnecessarily verbose, with concerns such as IE compatibility and 3rd-party UI libraries, with poor modularity, spaghetti abstractions, and obtuse core code; it's hard to tell how MSAL does its job, and impossible to easily extract to your own code.

There is a single [Vue 3 sample](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/vue3-sample-app) in the browser samples folder, but it does too many things and the MSAL code is so deeply entwined with the Vue code, that it's hard to understand how the two libraries really work together.

If you attempt to extract code to your own application, it seems to [blow up in your face](https://stackoverflow.com/questions/66405214/browserautherror-interaction-in-progress-interaction-is-currently-in-progress) for no good reason, and going back to the ambiguous docs and bloated samples makes you [question your sanity as a developer](https://stackoverflow.com/questions/66405214/browserautherror-interaction-in-progress-interaction-is-currently-in-progress#comment128695641_66405987).

### MS Graph and accounts

You'll see a lot of passing of `accounts` and references to Microsoft Graph [in the samples](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-browser-samples/VanillaJSTestApp2.0/app/onPageLoad/graph.js).

Account data is needed in two places:

1. to set an "active" account so tokens can be acquired without passing `account` data each time
2. if you're using MS Graph in your app

If you're not using MS Graph, you can ignore all the `callMSGraph()` code; consider it a Microsoft platform-specific implementation of a `GET /user/` API which you will of course set up manually in your app.

### Configuration and options

There are several classes of configuration and options to think about in MSAL:

- `auth` - the `clientId`, `authorities` and `scopes` you get from the dashboard
- `redirects` full redirect `URI`s that should exactly match those listed in the dashboard
- `library` - additional parameters determining how the library should work (tip: you don't need many)
- `requests` - options to be passed (at least including `scope`) to login and logout calls

One other point to bear in mind is, MSAL implements OAuth 2, which means that some MSAL options are a superset of [OAuth 2](https://www.valentinog.com/blog/oauth2/#terminology) options; worth knowing if auth isn't your thing, as you may want to google further than just "MSAL".


### Logging and errors

MSAL [logging](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/logging.md) is actually very useful, additionally you can [hook into events](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/events.md) to see what is being called and when.

Read the console for errors, and the repo's [explanations and resolutions](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md) for browser auth errors; they may or may not answer your questions, but good to know it's there.

### Redirect or popup interaction

MSAL supports two authentication ["interactions"](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md#choosing-an-interaction-type), **redirect** or **popup**.

Even though the docs state ["It is not recommended to use both interaction types in a single application"](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md#choosing-an-interaction-type:~:text=It%20is%20not%20recommended%20to%20use%20both%20interaction%20types%20in%20a%20single%20application) every sample demonstrate **both** interactions in a single codebase, with verbose branching and logic to handle both scenarios.

This is frustrating, as the architecture and code required to trigger and complete both interactions is quite different, which makes the samples feel overwhelming, and grasping what is included vs what is necessary is much more difficult than it should be.

Additionally, redirect flow has [specific problems](#problems-specific-to-redirects) which I'll cover in the next section. 

***TL;DR stick to popup interaction if you value your sanity***.

### Problems specific to redirects

Even though redirect flow is fully supported, there are things you need to know.

Firstly, there are sometimes seemingly [unrecoverable MSAL errors](https://stackoverflow.com/questions/68726691/browserautherror-interaction-in-progress-unable-to-fix-regardles-of-solution); these can require session data and sometimes cookies to be cleared in order to continue.

Secondly, MSAL clears the location `hash` which **will** trigger any global Vue Router route guards; this can interrupt any currently-executing guard logic before it has finished.    

Finally, redirect flow **must** return you to a pre-registered URL, which means additional work to if you wanted to go somewhere else. One solution is to [pass and receive custom state](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request) such as the page path, then handle that in the redirect handler.

### Single page applications

MSAL has some quirks regarding routing in SPAs which requires some additional workarounds.

Firstly, when MSAL handles an authentication redirect, it clears the location `hash`. This route modification **will** re-trigger global Vue Router route guards, which can be problematic if a global route guard is _already_ handling the login.

Secondly, when using popup interaction, MSAL will need to [hook into your router](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/navigation.md) which it does via a somewhat cumbersome class extension. It can handle internal (SPA routes) and external (navigating to MS Identity platform) and both are specific to chosen [interaction](#redirect-or-popup-interaction) type.

### Initialising the library

If you've read the MSAL docs, you may still not be clear if and when you're supposed to call `handleRedirectPromise()`.

The short answer is, **yes, always call it**.

The longer answer is:

- call it once
- call it whether you use popup or redirect flows
- call it whether or not you are handling a login redirect
- call it before any other MSAL functions
- call it and await the response
- call it _either_ when
  - the page loads
  - before you mount your app
  - if using route guards, before your first route navigation

The dirty secret seems to be that **this is MSAL's initialization function** _as well as_ the function to handle redirects.

Additionally, see the section on [redirects](#problems-specific-to-redirects) and [SPAs](#single-page-applications) as the handling function has some side effects.

### Required implementation

Note that MSAL handles storage and expiry of the token, so you do not need to manually store or calculate any values yourself.

But there is work to:

- initialize the library
- handle login and logout
- handle the token acquisition flow
- place the token acquisition function
- handle errors


## MSAL / Vue Demo

> You can find the code for the demo at [github.com/davestewart/msal-vue-demo](https://github.com/davestewart/msal-vue-demo).

### Aims

Having trawled through the multiple Microsoft samples, and picked and complained my way through the fairly muddled [Vue 3 sample](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/vue3-sample-app) I wanted to create a brand-new repo with the following aims:

Regarding authentication:

- use popup interaction to avoid issues with redirects
- use route guards to authenticate routes 

Making the code simple:

- put MSAL interaction in one place 
- use absolute bare-minimum dependencies, markup and code
- use services and stores to separate logic and state
- use a single interaction type to prevent code bloat

Making the repo transferable:

- use standard vue architecture to make it familiar
- use env files to prevent hard-coding

### Architecture

The key parts of this demo are:

- [Setup](#setup) - env variables and config files
- [Services](#services) - services for logic (api, auth)
- [Stores](#stores) - stores for state (auth, user)
- [Router](#router) - route guards, authentication and root hooks

Check each of the sections for explanations, with links to lines of code in the repo.

### Setup

The demo uses [env](https://github.com/davestewart/msal-vue-demo/blob/main/example.env) variables and [config](https://github.com/davestewart/msal-vue-demo/tree/main/src/config) files to configure both MSAL and your API.

The repo's [configuration](https://github.com/davestewart/msal-vue-demo#configuration) section explains how this all fits together.

Note that MSAL requires very little configuration to get going, really just the [auth](https://github.com/davestewart/msal-vue-demo/blob/main/src/config/auth.ts#L10-L20) credentials. The additional [logging](https://github.com/davestewart/msal-vue-demo/blob/main/src/config/auth.ts#L22-L49) config can be simplified or omitted (though it is very useful in development). 

### Services

I like to separate state from logic, and keep the footprint of dependencies within the app as small as possible.

[Services](https://github.com/davestewart/msal-vue-demo/tree/main/src/services) are the right place to do this:

- The [Auth](https://github.com/davestewart/msal-vue-demo/blob/main/src/services/auth.ts) service encapsulates all MSAL interaction and is called _only_ from auth [store](https://github.com/davestewart/msal-vue-demo/blob/main/src/stores/auth.ts#L14) and [Api](https://github.com/davestewart/msal-vue-demo/blob/main/src/services/api.ts#L21) service
- The [Api](https://github.com/davestewart/msal-vue-demo/blob/main/src/services/api.ts) service has a minimal fetch implementation that can be called from [anywhere](https://github.com/davestewart/msal-vue-demo/blob/main/src/stores/user.ts#L7)

Note that the Auth service's only public members are:

- `initialize()`
- `login()`
- `logout()`
- `getToken()`

(See the individual methods for comments and info).

Also note the simplicity of the service; it uses the popup interaction only, so no need for branching, alternate logic, config and additional error handling.

### Stores

With [services](#services) doing all the hard work to fetch data, [stores](https://github.com/davestewart/msal-vue-demo/tree/main/src/stores) are the right place to store it; this way services stay clean, and data is easily accessible from the rest of the application:

- the [auth](https://github.com/davestewart/msal-vue-demo/blob/main/src/stores/auth.ts) store wraps [Auth](https://github.com/davestewart/msal-vue-demo/blob/main/src/services/auth.ts) service calls, and exports reactive state, errors and methods
- the [user](https://github.com/davestewart/msal-vue-demo/blob/main/src/stores/user.ts) store manages API calls and stores user data separately from auth

Regarding state, **stores** should be preferred to **services** as they are **reactive**; any change in state triggers updates in views and components.

### Router

The [Router](https://github.com/davestewart/msal-vue-demo/blob/main/src/router/index.ts) is where most of the magic happens:

- guarded and unguarded routes are declared
- a single global route guard handles authentication
- a single logic branch handles initialisation

I use some simple [helpers](https://github.com/davestewart/msal-vue-demo/blob/b87b3d6b4f6fe45ba65f759f515772cb37652be8/src/router/helpers.ts#L6-L30) to make the routes config more easily readable; note the `hook()` helper to handle login and logout.

Note the [route guard](https://github.com/davestewart/msal-vue-demo/blob/main/src/router/index.ts#L34-L65) itself, it handles quite simply the following scenarios:

- 404
- guarded
  - initialization
  - authorised
  - unauthorised
- unguarded

The `NavigationClient` required by MSAL to hook into the rooter is implemented as a [VueNavigationClient](https://github.com/davestewart/msal-vue-demo/blob/main/src/router/index.ts#L34) and passed to the store and into the service, in the one-time initialization step.

The class itself has only one method that is used in popup flow, and that is the `navigateInternal()` method which [converts any full redirect URIs](https://github.com/davestewart/msal-vue-demo/blob/main/src/router/helpers.ts#L53-L59) to paths that the Vue Router can safely handle.

## Conclusion

Whilst the premise of MSAL is simple, the challenge of implementing it is sadly not.

I hope this repo will go some way to making it clear how logic and state can be separated, and how it's simpler to see what is going on once that's the case.

Whilst it may also be possible to successfully implement **redirect flow** in a clearer and more simplified codebase, I'll leave that as a challenge to the reader (or may come back to this in future and attempt to implement in another branch).

**If you found this post helpful, or you have anything to add which may help others, do please leave a comment.**

For now, I'll just say, ***happy authenticating***!

### Addendum

Whilst I'm here, a couple of awesome OAuth 2 resources for reference:

- [Understanding OAuth 2 with PKCE in Single-Page Applications (2020)](https://www.valentinog.com/blog/oauth2)
- [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified)

Additionally, I've been recommended this library if you decide to give up on MSAL altogether (I don't blame you) which you can use with the Microsoft Identity Platform:

- https://github.com/authts/oidc-client-ts

