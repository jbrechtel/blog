---
title: Genetic algorithms in Clojure
published: true
layout: post
tags: swdev clojure genetic-algorithms complexity-theory
---

I implemented a simple genetic algorithm in Clojure to better familiarize myself with both concepts.

### Generic algorithms

<div style="float:right">
  <img alt="DNA" src="/images/dna.JPG"/>
</div>
While I've been part of a team that used a GA in one of our projects, I wasn't really involved in the coding or design of it. Genetic algorithms are one of those things that I understood at a high level but not the details.

![Clojure](/images/clojure.png)

[Clojure](http://clojure.org/) is a modern LISP that runs on the JVM. I chose Clojure for this task mostly because I'm interested in learning the language but also because it seems very natural to me to model a genetic algorithm in terms of things Clojure is good at. Those things being functional transforms and lazy infinite sequences.


### Robby the Robot

I'm reading Melanie Mitchell's excellent book on [Complexity Theory](http://en.wikipedia.org/wiki/Complexity_theory): [Complexity, a Guided Tour](http://amzn.to/UcFoSM). In this book the author describes a very simple problem which she evolved a strategy using a genetic algorithm. She names her robot 'Robby'. Let's talk about Robby.

### Robby's world

Robby lives in a two-dimensional, rectangular world divided into squares. Each square may be clean or dirty. Robby's job is to clean these squares, not run into walls and not waste time trying to clean squares that aren't dirty. Robby's [fitness](http://en.wikipedia.org/wiki/Fitness_function) is determined by the actions he takes.

##### Fitness
* Clean dirty square: 10 points
* Run into wall: -5 points
* Clean a clean square: -1 point

### Robby's DNA

Melanie Mitchell doesn't go in detail about the code she wrote to implement Robby the Robot, but she does talk about the underlying data structures she used. She does this so that the reader can understand how [crossover](http://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)) (i.e. breeding) works in a genetic algorithm.

Robby's DNA comprises 243 genes which represent each possible state of his world and which action he'll take in each of those states. His world is only composed of what he can see and he can only see the immediately adjacent squares in the cardinal directions and the square he is currently occupying. Melanie Mitchell's implementation used an array of ints to represent this. Each index represented a state and the integer in that position of the array represented the action. The possible actions are

#### Robby's actions
* Clean
* Move north
* Move south
* Move east
* Move west
* Move in a random direction (Yes, Robby has free will!)
* Stop

Melanie Mitchell describes how she implemented crossover in terms of this datastructure. When given two parents to breed she simply picks a random index within their DNA (from 0 to 242) and takes up to that index from the first parent and everything after that index from the second parent. The result is a new child.

I decided to use the same sort of datastructure in my implementation except I'd use keywords instead of ints to improve readability. Mimicking her datastructure turned out to be somewhat painful...I'll describe later.

### Writing some code

With a clear understanding of the problem I'm trying to solve and what my core datastructures would look like, I started to write some code.

#### Mapping a state to an action

I would need a way to map a given state (e.g. north:clean south:clean west:dirty east:clean current:dirty) to a given action using a given agent's genome. Essentially this means I needed a way to convert that state to an index in the agent's array of genes. To do this I decided to build a map with states for keys and array indices as values.

This map would have 243 entries in it so writing it by hand was out of the question. I know what I really need is an array of each state and from that I can pretty easily construct a map using the reduce function (Clojure's left fold). Luckily I had a hunch that Clojure's [for](http://clojure.github.com/clojure/clojure.core-api.html#clojure.core/for) function would be a list comprehension that takes an arbitrary number of lists. This lets me write what would be an ugly set of nested for loops in Java or C# in a pretty concise way.

After that I looked around for an easier way to build a map from an array and found the handy [zipmap](http://clojure.github.com/clojure/clojure.core-api.html#clojure.core/zipmap) function.

The end result looked like this

<script src="https://gist.github.com/4118377.js"> </script>

She uses the evolved algorithm to demonstrate the ingenuity of evolution.


[jvm]: The JVM is great.
