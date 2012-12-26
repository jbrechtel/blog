---
title: Why types matter
published: false
layout: post
tags: swdev types
---

### Type checkers -- we've all got em....right?

I'd like to punch the next person I hear say dynamic languages suck because you have check types all over the place....and that's why you should use statically typed languages instead. I've heard people make this argument many times, but even if you don't believe me...don't worry, I'm not setting up a strawman to defend dynamic languages here.

This is an example of people inferring a plausible story about the benefit of static typing. There must be a benefit, right? An easy explanation to jump to is the first thing that that comes to mind when you think about what the type checker does.....thus we think when you remove the type checker from your compiler then you end up writing one in your code*.

*NO*

While I won't deny that some people do this, I will argue that if you're doing that then it's a code smell and a half.

(there's a disconnect between these two paragraphs)

Dynamic typing proponents miss this too. Looking at it from their side it's easy to say "I don't need the verbosity of statically typed languages, I'll just avoid passing the wrong types around and if I fail at this then my unit tests will catch it indirectly."

What about the kinds of errors that are elimnated by types? This is frequently alluded to when talking about static vs dynamic typing. Many people infer that this refers to simply preventing the wrong type from being passed. The truth is more subtle than that.

### Encoding state in types AKA the real value of types

I don't value static typing because it keeps me from passing an Integer to methods that expect a Person. Their real value comes from more nuanced type hierarchies.

For example:

(scala, tic-tac-toe? UnstartedGame, InProgressGame, FinishedGame)

An alternative to this design might simply have a Game class with methods to tell you the internal state of the object. A design like that would require more imperative state validation, explicit handling (and testing!) of objects that might show up in the wrong place with the wrong state. If you're not letting your type checker do this work for you then You're Doing It Wrong (tm).

* - Of course, the problem with explaining people's behavior by their attraction to narratives is that....well you're often telling yourself a seductive narrative as well.
