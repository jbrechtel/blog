---
title: RoboSpecs - Android testing with Scala
published: true
layout: post
---

I recently published [Robospecs](https://github.com/jbrechtel/robospecs).  Robospecs helps you write Android applications.

Robospecs doesn't really do much itself.  The real work is done by
[Robolectric](http://pivotal.github.com/robolectric) and [Specs2](http://specs2.org).

### Robolectric

Robolectric lets you TDD your Android applications by giving you a way to run Android unit tests outside of an Android
emulator.  Normal Android "unit" tests have to be executed inside an emulator.  The android.jar files that Google provides
as part of the Android SDK cannot be used to actually execute code such as unit tests.  Every object's constructor merely
throws an exception.  Google suggests you write all of your tests using their test case which executes your code inside of
an emulator inside a real Android environment.  This is appropriate for some levels of testing, but makes a TDD workflow
quite onerous.

Robolectric provides an implementation of much of the Android components you would normally interact with and always a
means to add additional implementations yourself for Android classes which aren't covered.  Robolectric also sets up an
Android environment so your code can inflate layouts and access other resources.  See
[pivotal.github.com/robolectric](http://pivotal.github.com/robolectric) for more information.

### Specs2

Specs2 is a great testing framework for Scala.  Specs2 provides a elegant DSL for writing tests and assertions.  It's a
fantastic framework to use to test either Scala or Java code.  See [specs2.org](http://specs2.org) for more information.

### Robospecs

What Robospecs does is bridge the gap between Robolectric and Specs2.  Out of the box Robolectric provides support for
JUnit via a custom JUnitRunner.  During test runtime this JUnitRunner executes your tests using a custom Robolectric
class loader.  Robospecs provides a trait which you can mix into your specs that performs the same function.  Robospecs
is very non-invasive to your existing specs.  Check out the project page at [GitHub](http://github.com/jbrechtel/robospecs)
for more information.

### Example Project

You can find a working, albeit very simple, sample Android project on GitHub at
[https://github.com/jbrechtel/robospecs_example](https://github.com/jbrechtel/robospecs_example).  This project uses
[SBT](http://code.google.com/p/simple-build-tool/) to build.
