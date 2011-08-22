---
title: Scala and Ruby Rosetta Stone
published: true
layout: post
---

I write a lot of Ruby at work and Scala in my spare time.
I thought others who know one language but not the other
might find a rosetta stone for the two languages useful.

For a more thorough rosetta stone for a variety of languages check
out [Rosetta Code][5].

The scope of each example is short so that it is easier to jump from
one language to the other to compare specifics.  There are a lot more
things you can do in each of these categories in both languages.  However,
if there are other examples you think should be added then fork the gist in
question and let me know about it in the comments.

* [Classes][7]
* [Mixins][8]
* [Collections][9]
* [Hash maps][10]
* [Case statements and pattern matching][11]

<a name="classes"></a>
## Classes

Here are a few examples of how you might define some basic classes in
each language.  You can see here that Scala manages to be a bit more
concise than Ruby.

#### Ruby
<script src="https://gist.github.com/1153103.js"> </script>

#### Scala
<script src="https://gist.github.com/1153076.js"> </script>

<a name="mixins"></a>
## Mixins

Both Ruby and Scala support the idea of [Mixins][3].  They are known as modules and traits in Ruby
and Scala respectively.

The examples below are mixins that specialize the results of an existing method on the target class.
Classic examples of this are [Enumerable][1] in Ruby, and [Seq][2] in Scala.  Each of these depend
on one or more methods in their target class.  Since Scala is statically typed the trait must specify
something about the class it will be mixed in to.  You can do this with both nominal (named) types and
structural types (similar to duck typing).  I show both of these in the Scala example below.

Lastly, the Ruby example depends on [in_groups_of][4] which comes from ActiveSupport (part of Rails).

#### Ruby modules
<script src="https://gist.github.com/1159939.js"> </script>

#### Scala traits
<script src="https://gist.github.com/1159921.js"></script>

<a name="collections"></a>
## Collections

Below are a few of the things you can do with collections in each language.  Scala has a bit more
flexibility here when it comes to allowing you to pick the kind of performance characteristics you
want.  However, when in doubt, just use an IndexedSeq.

Scala also provides mutable and immutable versions of their collections.  Ruby collections are mutable
but that doesn't mean that each of the methods on a Ruby array will mutate the array.  [Enumerable#map][6], for
instance will return a new array.  The convention in Ruby is that if a method ends in ! then it will mutate the
object and otherwise it will not.  This convention is mostly observed in the core and standard libraries, but not
entirely.  [Array#delete][12], for instance, is a Ruby core library method that mutates an object but does not
end with a !.

#### Ruby collections
<script src="https://gist.github.com/1159992.js"></script>

#### Scala collections
<script src="https://gist.github.com/1159981.js"></script>

<a name="hashmaps"></a>
## Hash maps

Each languages' core library comes with a hash map implementation.  Ruby calls theirs Hash and Scala theirs
Map.  Great.

Ruby has hash literals which is convenient.  Scala's flexible syntax allows a really close approximation
of hash literals, syntactically, without the addition of specialized syntax for them.

#### Ruby hashes
<script src="https://gist.github.com/1160016.js"></script>

#### Scala maps
<script src="https://gist.github.com/1160045.js"></script>

<a name="switches"></a>
## Case statements and pattern matching

I don't care much for mentioning case statements in Ruby on their own.  They are, however, the closest
corollary to [pattern matching][13] in Scala.  Scala's pattern matching support is very powerful.  I'll present
how you would accomplish some similar tasks in each and then show a few more powerful pattern matching
examples in Scala.

#### Ruby case statements
<script src="https://gist.github.com/1160828.js"></script>

#### Scala pattern matching
<script src="https://gist.github.com/1161420.js"></script>

[1]: http://www.ruby-doc.org/core/classes/Enumerable.html
[2]: http://www.scala-lang.org/api/current/index.html#scala.collection.Seq
[3]: http://en.wikipedia.org/wiki/Mixin
[4]: http://rails.rubyonrails.org/classes/ActiveSupport/CoreExtensions/Array/Grouping.html#M000833
[5]: http://rosettacode.org/wiki/Main_Page
[6]: http://www.ruby-doc.org/core/classes/Enumerable.html#M001491
[7]: #classes
[8]: #mixins
[9]: #collections
[10]: #hashmaps
[11]: #switches
[12]: http://www.ruby-doc.org/core/classes/Array.html#M000255
[13]: http://kerflyn.wordpress.com/2011/02/14/playing-with-scalas-pattern-matching/
