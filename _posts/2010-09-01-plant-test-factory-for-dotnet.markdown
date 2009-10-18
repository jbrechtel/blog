---
title: Plant Test Factory for .NET
layout: post
---

[Plant][1] is a test factory for .NET 4.0. I created Plant because factories
like this are something that I've gotten very used to in Ruby.  As I started
writing more and more tests in my C# projects, I noticed that I was writing
more and more helper test methods to create commonly used model objects in my
tests.  This would often lead to ad-hoc and abused chunks of code that became
harder and harder to maintain.  The Ruby ecosystem has good answers to this
problem, there’s [factory_girl][2] and [machinist][3].  I couldn’t find
anything like that for .NET.  [NBuilder][4] is in that area, but feels too
heavy handed for what I wanted.

###### Goals

The primary goal of this tool is to allow you to write smaller and more
focused tests.  I find this beneficial because, like most other things in
software, tests with fewer concerns tend to be easier to maintain and provide
more value.  Tests which test less are more resistant to illegitimate
failures. A secondary goal of mine is to keep Plant’s syntax as lightweight
and concise as possible.  Code with less noise is easier to understand and
code that’s easier to understand helps you get your job done.  C# doesn’t
always make this easy.  Not being able to assign a delegate to an anonymous
type forces me to require users to use a special class for some things (i.e.
LazyProperty).  As this project grows, I’ll do my best to keep the syntax
readable.

###### Direction

The only client of the Plant project at the moment is pretty small and will
likely never use all of Plant’s features.  However, instead of dreaming up
features that I think will one day be useful for Plant I decided to copy
factory_girl’s feature-set.   I’ve used factory_girl quite a bit in the past
and found almost every one of its features useful at some point or another.
So far I’ve got several of factory_girl’s features implemented, one it doesn’t
have (creation via constructor parameters), and there are several Plant is
still missing.

**Plant’s features at the time of this writing are**

  * Object creation via properties
  * Object creation via constructor arguments
  * Overriding default property and constructor argument values
  * Module object definition
  * Lazily evaluated property and constructor argument values

**Upcoming features**

  * Allowing multiple named definitions for one object
  * Sequenced properties (you can do this today with lazy properties, but I want to make it easier)
  * Lazy associations (again, something you can do today with lazy properties, but the syntax can be more concise and explicit)
  * Allow user to specify after-creation actions to be taken on created objects (like saving them to a database)

**Scenarios that Plant does not support**

  * Constructor arguments whose names differ only in capitalization.
  * Indexed properties
  * Refactoring.  Since properties are passed around using anonymous objects,
refactoring tools will miss them.  This can be fixed for properties but not
for constructor arguments.  I’m not sure what the right answer is here.

  * Open generic types (You can tell Plant how to create a Foo<string>, but
not a Foo<T> where T is specified at time of creation.

Find it on Github here: [http://github.com/jbrechtel/plant][1] (the current
release is tagged 0.1.0 [here][5]) It will be available on [Nu][6] shortly.

   [1]: http://github.com/jbrechtel/plant

   [2]: http://github.com/thoughtbot/factory_girl

   [3]: http://github.com/notahat/machinist

   [4]: http://nbuilder.org/

   [5]: http://github.com/jbrechtel/plant/tree/0.1.0

   [6]: http://nu.wikispot.org/

