# because.js


## Overview

`because.js` is a Javascript client library that helps programmers get
interesting data from the [BCS HTTP
services](https://github.com/boundlessgeo/bcs): coordinates for street
addresses (geocoding) turn-by-turn directions (routing), discovery and metadata
for basemaps available through Boundless, and more.

`because.js` wraps these HTTP services for convenient use from Javascript. It
abstracts away many of the details of authentication, how HTTP requests are
constructed and sent, and how HTTP responses are parsed. Instead of
re-implementing all these details in every new project and for each additional
service, a programmer building on this library provides a higher-level
specification of what data is wanted, and gets the results back as convenient
Javascript objects.

Besides making it faster and easier to get started, using a client library has
benefits for maintainability. Whenever improvements are needed, they can be
made in the library, for the shared benefit of all the projects that use it.
When the upstream services change, the library can change to accommodate this,
instead of each project individually somehow discovering and making the
necessary adjustments.

To use because.js and the BCS services, you first need credentials, which you
can get by signing up at [Boundless
Connect.](https://connect.boundlessgeo.com/)

If you're interested in because.js, you would probably be even more interested
in [the Boundless Web SDK](https://github.com/boundlessgeo/sdk).

If you want to consume the BCS services from Python, you may be interested in
[Because for Python](https://github.com/harts-boundless/because).


## Installing

These instructions assume you already have signed up with [Boundless
Connect.](https://connect.boundlessgeo.com/)

The source code for because.js is managed using git, and published on GitHub.
To download the code, use git to clone the repository from GitHub:

    git clone https://github.com/harts-boundless/because.js.git

When this is cloned, you can find a usable UMD module in the cloned repo
directory, as `dist/because.js`.

This bundle may be a little out of date. If you want to make sure you have a
fresh bundle reflecting the latest state of the original code in `src/` then
see the below section on "How to build."

## Usage Examples

### Getting a Because object

The easy way to use the library starts by creating an object which is an
instance of `Because`. In normal situations where you want to use the
production deployment of the BCS APIs, you could just do something like this:

```
let bcs = new Because();
```

If you want to use the API deployed in the test environment (recommended for
developers inside Boundless), you can specify that here:

```
let bcs = new Because("test");
```

If you want to use the API deployed in the dev environment (not recommended for
anyone other than developers on BCS itself)

```
let bcs = new Because("dev");
```

To turn on "debug mode" (usually not needed unless you're developing the
library itself), you can pass true as the second argument:

```
let bcs = new Because("dev", true);
```

### Login

Once you have an instance of `Because`, several services like routing and
geocoding require a token to work. The `Because` object will automatically
fetch, cache and send that token if you use the `login` method.

Like all of the methods that perform I/O operations in this library, `login`
returns a promise object, which has the standard Promises/A+ interface.

Here's a simple example of how you could create and use a promise from ES5:

```
var promise = bcs.login(username, password);
promise.then((jwt) => {
    console.log("logged in with jwt", jwt);
});

-or- you can use a key
var promise = bcs.login(undefined, undefined,key);
promise.then((keyvalidatedata) => {
    console.log("logged in with key", keyvalidatedata);
});
```

or, if we want to dispense with the intermediate variable:

```
bcs.login(username, password).then((jwt) => {
    console.log("logged in with jwt", jwt);
});

-or-

bcs.login(undefined, undefined,key).then((keyvalidatedata) => {
    console.log("logged in with key", keyvalidatedata);
});
```

If you want to catch errors in the same ES5 style:

```
bcs.login(username, password).then((jwt) => {
    console.log("logged in with jwt", jwt);
}).catch((error) => {
    console.log("got an error", error);
});

-or-

bcs.login(undefined, undefined,key).then((keyvalidatedata) => {
    console.log("logged in with key", keyvalidatedata);
}).catch((error) => {
    console.log("got an error", error);
});

```

Since the interface returns a promise, you can also use ES2017 async/await:

```
async myLogin(username, password) {
    try {
        let jwt = await bcs.login(username, password);
        console.log("logged in with jwt", jwt);
    }
    catch (error) {
        console.log("got an error", error);
    }
}

-or-

async myLogin(key) {
    try {
        let keyvalidatedata = await bcs.login(undefined, undefined,key);
        console.log("logged in with key", keyvalidatedata);
    }
    catch (error) {
        console.log("got an error", error);
    }
}
```

In any case, once login is finished, you can access a list of roles for the
logged in user. 

This is automatically sent at every login, so it doesn't incur any additional
HTTP requests. It is also saved automatically as a property on the `Because`
instance. 

```
bcs.login(username, password).then((jwt) => {
    console.log("logged in with jwt roles", bcs.jwt.roles);
    console.log("same as", jwt.roles);
});

-or-

bcs.login(undefined, undefined,key).then((keyvalidatedata) => {
    console.log("key roles", keyvalidatedata.roles);
});
```

Typical uses for this role list would include changing the GUI to reflect which
options might be available or disabled for the logged-in user.


### Routing


```
let start = "6100 Pennsylvania Ave, Washington, DC";
let mid = [38.862092, -76.959320];
let end = "3100 Pennsylvania Ave, Washington, DC";
let waypoints = [start, mid, end];
let provider = "mapbox";
let route = await bcs.routing.route(waypoints, provider);
```

If you are using ES5, you would use the promise's .then() method instead of
`await`.


### Geocoding

```
let address = "6100 Pennsylvania Ave, Washington, DC";
let provider = "mapbox";
let geocodes = await bcs.geocoding.geocode(address, provider);
```

If you are using ES5, you would use the promise's .then() method instead of
`await`.

### Reverse Geocoding

```
let lat = 0.0;
let lon = 0.0;
let loc = [lat, lon];
let provider = "mapbox";
let geocodes = await bcs.geocoding.reverse_geocode(loc, provider);
```

If you are using ES5, you would use the promise's .then() method instead of
`await`.

### Basemaps Discovery

```
let basemaps = await bcs.basemaps.basemaps();
```

If you are using ES5, you would use the promise's .then() method instead of
`await`.

### Search

```
let text = "geoserver";
let results = await bcs.search.search(text);
```

You can also pass a list of categories (special strings) as the second
argument, to specify what categories to search in.

If you are using ES5, you would use the promise's .then() method instead of
`await`.


### Key Management
#### Data Types

````
Organization
(
    public id: number,
    public name: string,
    public created: number,
    public members: User[],
    public administrators: User[],
    public apiKeys: ApiKey[],
    public errorCode: number| undefined,
    public errorMessage: string| undefined
)

ApiKey
(
      public id: number,
      public key: string,
      public created: number,
      public expires: number,
      public authorizedRoles: UserRole[],
      public parentOrganizationId: number,
      public errorCode: number| undefined,
      public errorMessage: string| undefined
 )
 
 UserRole
 (
    public id: number,
    public key: string,
    public description: string
 )
 
 User
 (
    public id: number,
    public email: string,
    public roles: UserRole[],
    public created: number,
    public parentOrganizationId: number
)
 
 

````


#### Get Organizations

```
let results = await bcs.keys.get_organizations();
```

#### Get Roles

```
let results = await bcs.get_roles();
```

#### Create Key

```
const orgid = "Boundless";
const expirequantity = 6;
const expireunit = "MONTH"; //DAY, WEEK, MONTH, YEAR
const roles = "MAPZEN_GEOCODE,MAPBOX_ROUTE,TREND_SETTER";
let results = await bcs.keys.create_key(orgid,expirequantity,expireunit,roles);
```
#### Edit Key

```
const orgid = "Boundless";
const expirequantity = 6;
const expireunit = "MONTH"; //DAY, WEEK, MONTH, YEAR
const roles = "MAPZEN_GEOCODE,MAPBOX_ROUTE,TREND_SETTER";
let results = await bcs.keys.update_key(keyid,expirequantity,expireunit,roles);
```
#### Delete Key

```
const keyid = 67;
let results = await bcs.keys.delete_key(keyid);
```
#### Create Organization

```
const name = "Boundless";
let results = await bcs.keys.create_organization(name);
```
#### Delete Organization

```
const organizationid = 67;
let results = await bcs.keys.delete_organization_byid(organizationid);
```

## Example Project

If you want to find some example code to look at, you can find an extended
usage example containing some demos under `example/`.

See `example/README.md` for instructions on how to run the example.

This example code uses ES2015, React, and material-ui, but all this is just to
provide an example. As far as just using the library, you can use ES5 or ES2015
or TypeScript, and you can use any frontend frameworks or libraries you need.


## How to build

To build because.js, you'll first need to [install Node and
npm](https://docs.npmjs.com/getting-started/installing-node) if you don't have
them already. You should also [install
Yarn](https://yarnpkg.com/lang/en/docs/install/) if you don't have that.

All of the project's build tasks are automated with GNU `make`.

If you just want to generally compile things and run tests, you can simply run:

    make

To build a single bundle including all of the capabilities of because.js, run:

    make dist/because.js

This should create the JS bundle `dist/because.js` and the accompanying
sourcemap `dist/because.js.map`. Only `dist/because.js` is needed to use the
library, but it is useful for debugging to have the sourcemap available
alongside the bundle.

The file `dist/because.js` is a [UMD module.](https://github.com/umdjs/umd) If
you don't know or care what that means, just know that you can just include it
in the normal `<script>` way and this will define a global variable `because`.
(If you don't want a global, then use a module loader.)

There are multiple ways to use `because.js` (e.g. as CommonJS or ES2015
modules) but the bundle is the simplest, in the sense that it does not require
an additional build step or loader to get a result in the browser.


## Build tools

This section is for those who are interested in the internal details of how the
project is built. If you just want to use `because.js`, you can safely ignore
this section.

As already mentioned, the entry point and overall orchestration of build tasks
is done with GNU `make`. For those who are unfamiliar, the essence of `make`
is that you edit `Makefile` to define rules for making files. Each rule
has a list of other files that must exist as prerequisites, and some shell
commands that are run to actually make that file. `make` then checks to see
which files to generate (based on which output files are older than the input
files they're based on) and resolves the order to build things in. It's a
time-tested, language-agnostic tool.

The project code located under `src/` is written in
[Typescript](https://www.typescriptlang.org/docs/tutorial.html). Typescript is
a language very similar to Javascript (ES2015), except that it has type
annotations, and a few other minor features. The type checking particularly
helps control the propagation of funky values like undefined, null or NaN.
Importantly for our purposes, Typescript compiles to normal Javascript and is
generally pretty close to the semantics of Javascript.

Typescript code is both typechecked and compiled down to Javascript code using
the excellent Typescript compiler, `tsc`. Options for `tsc` are in files
conventionally named `tsconfig.json`. For just one example, some of this
projects' `tsconfig.json` files direct `tsc` to look for Typescript `.ts` files
under `src/`, turn them into ES5 code packaged as CommonJS modules, and output
these as `.js` files into `lib/`.

For some capabilities, like promises, `tsc` cannot generate downlevel code
(e.g. ES5) without the help of a polyfill. So we use a few polyfills,
like `es6-promise`.

Other aspects like concatenation/bundling/minification are handled by
[webpack](https://webpack.github.io/) together with the loader plugin for
webpack named [ts-loader](https://github.com/TypeStrong/ts-loader).

Build dependencies are managed by `yarn`, which is a package management tool
similar to `npm`.


## Running Tests

Automated tests are discovered and run by [mocha](https://mochajs.org/) with
the help of [ts-mocha](https://www.npmjs.com/package/ts-mocha) to eliminate
most of the friction of doing mocha tests with Typescript. The tests are
written using [chai](http://chaijs.com/) using `assert()`.

To kick off a run of the tests, use

    make test

Test coverage is measured using
[istanbul](https://www.npmjs.com/package/istanbul) via its command-line
interface, [nyc](https://www.npmjs.com/package/nyc).


## Running Style Checks

Code smells and style problems are detected in the Typescript source code using
[tslint](https://palantir.github.io/tslint/). This is a little more rigorous
than `tsc`, also bringing in stylistic issues and usages that are likely to
indicate errors even if they do compile.

You can start a lint pass on the source code with

    make lint

The options are conventionally in files called `tslint.json`. In this project,
tslint configuration is kept in two files for slightly different purposes:
`config/tslint.json` is specifies a base set of syntactic rules that can be run
quickly, while `config/tslint.typechecked.json` is a superset of those rules
which adds rules that require type checking, and therefore take a little more
time and require a little more configuration.


## Building Docs

API reference docs are built using [Typedoc](http://typedoc.org/).

These docs would be of little use to anyone except people working on
because.js.

As of this writing, this build configuration is currently not working.

The configuration for typedoc is in `config/typedoc.json` and depends on the
base `config/tsconfig.json`. Typedoc can be finicky about the locations of
configuration files, so be careful about making changes.


## Watch

Run `make watch` to start a process that watches the source tree for changes
and triggers rebuilds of `dist/because.js` (via wepack). This is useful if you
are making edits to the library in `src/`.
