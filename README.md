# Bling

A basic Blockchain implementation written in TypeScript

### Motivation
-----

This project is motivated by the desire to better understand the fundamental concepts behind blockchain structures as well as a desire to play with TypeScript and Javascript build tools

### Usage
-----
This project uses the [Gulp](https://gulpjs.com/) build tool. The default Gulp task entails the `build`, `test`, and `run` tasks

```
gulp
```

This will produce Javascript files in the `built/local` directory, then you may invoke the test with

```
node main.js
```

The `test` generates a small chain, asserts that is is valid, then mutates the data in one block and then asserts that the chain is no longer valid

### Future
----

In no particular order:

 * experiment with a functional programming style
 * implement a browser hosted interface

### Credits
----
This TypeScript implementation was inspired and heavily influenced by this video

* [Creating a blockchain with Javascript](https://www.youtube.com/watch?v=zVqczFZr124\) )
