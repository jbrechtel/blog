---
title: Writing a genetic algorithm in Clojure
published: true
layout: post
tags: swdev clojure genetic-algorithms complexity-theory
---

Interested in Clojure and genetic algorithms? You're in the right place. Let's implement a simple genetic algorithm (GA) in Clojure.

### Generic algorithms

<div style="float:right">
  <img alt="DNA" src="/images/dna.JPG"/>
</div>
While I've been part of a team that used a GA in one of our projects, I wasn't really involved in the coding or design of it. Genetic algorithms are one of those things that I understood at a high level but not the details.

![Clojure](/images/clojure.png)

[Clojure](http://clojure.org/) is a modern LISP that runs on the JVM. I chose Clojure for this task mostly because I'm interested in learning the language but also because it seems very natural to me to model a genetic algorithm in terms of things Clojure is good at. Those things being functional transforms and lazy infinite sequences.


### Robby the Robot

We'll base our GA on Melanie Mitchell's (MM) Robby the Robot described in her excellent book on [Complexity Theory](http://en.wikipedia.org/wiki/Complexity_theory): [Complexity, a Guided Tour](http://amzn.to/UcFoSM).

### Robby's world

Robby lives in a two-dimensional, rectangular world divided into squares. Each square may be clean or dirty. Robby's job is to clean these squares, not run into walls and not waste time trying to clean squares that aren't dirty. Robby's [fitness](http://en.wikipedia.org/wiki/Fitness_function) is determined by the actions he takes.

##### Fitness
* Clean dirty square: 10 points
* Run into wall: -5 points
* Clean a clean square: -1 point

### Robby's DNA

MM doesn't go in detail about the code she wrote to implement Robby the Robot, but she does talk about the underlying data structures she used. She does this so that the reader can understand how [crossover](http://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)) (i.e. breeding) works in a genetic algorithm.

Robby's DNA comprises 243 genes which represent each possible state of his world and which action he'll take in each of those states. His world is only composed of what he can see and he can only see the immediately adjacent squares in the cardinal directions and the square he is currently occupying. MM implementation used an array of ints to represent this. Each index represented a state and the integer in that position of the array represented the action. The possible actions are

#### Robby's actions
* Clean
* Move north
* Move south
* Move east
* Move west
* Move in a random direction (Yes, Robby has free will!)
* Stop

MM describes how she implemented crossover in terms of this datastructure. When given two parents to breed she simply picks a random index within their DNA (from 0 to 242) and takes up to that index from the first parent and everything after that index from the second parent. The result is a new child.

I decided to use the same sort of datastructure in my implementation except I'd use keywords instead of ints to improve readability. Mimicking her datastructure turned out to be somewhat painful...I'll describe later.

### Datastructure overview

The execution consists of many instances of two datastructures: rooms and agents.

#### Room

A room is a randomly generated vector of vectors where each cell can either be :dirty or :clean. Rooms are square and coordinates map to vector indicies. A 4x4 room may look like this

<code>
[[:clean :clean :dirty :clean]
 [:dirty :dirty :clean :clean]
 [:clean :clean :clean :clean]
 [:dirty :clean :dirty :clean]]
</code>

#### Agent

An agent is a vector of actions (or you could say an association of integer to action). An agent may look like this

<code>
[:north :south :east :north :stop :stop :clean :west :random :east :random :east
 :west :random :stop :clean etc...]
</code>

Scoring an agent against a room means putting the agent at position (0,0) in the room, determining which action the agent would take given the state of the agent at that position in the room, taking that action, and repeating 199 more times. Remember that when an agent takes an action it may change position, change its state (i.e. cleaning a dirty square) or may do nothing (by bumping into a wall, stopping or cleaning a clean square).

### Wait a minute...

We're clearly missing something. How does our program know what a given gene in an agent's genome does? For example, when our agent is on a dirty square and surrounded by clean squares which index into its genome do we examine to discover which action it should take?

At this point we could decide to change the agent datastructure to be a mapping of state to action. However, I decided to keep it this way for two reasons.

* It's easier (and probably faster?) to perform crossover during breeding with a vector than a map.
* This more closely mimicks the datastructures that MM used.

So let's talk about how we specify which state each gene in Robby's DNA represents.

#### Going from a state to an action

First I need a way to represent a state given an agent, room and position. For that I used this function.

<script src="https://gist.github.com/4215778.js"> </script>

Now we need to associate states like that with indices into Robby's genome.

Robby's genome has 243 entries in it so writing the mapping by hand is out of the question.
I would need a way to map a given state (e.g. north:clean south:clean west:dirty east:clean current:dirty) to a given action using a given agent's genome. Essentially this means I needed a way to convert that state to an index in the agent's array of genes. To do this I decided to build a map with states for keys and array indices as values.

This map would have 243 entries in it so writing it by hand was out of the question. I know what I really need is an array of each state and from that I can pretty easily construct a map using the reduce function (Clojure's left fold). Luckily I had a hunch that Clojure's [for](http://clojure.github.com/clojure/clojure.core-api.html#clojure.core/for) function would be a list comprehension that takes an arbitrary number of lists. This lets me write what would be an ugly set of nested for loops in Java or C# in a pretty concise way.

After that I looked around for an easier way to build a map from an array and found the handy [zipmap](http://clojure.github.com/clojure/clojure.core-api.html#clojure.core/zipmap) function.

The end result looked like this

<script src="https://gist.github.com/4118377.js"> </script>

Now I could go from an agent, room and coordinates in that room to derive an action that agent should take. 

She uses the evolved algorithm to demonstrate the ingenuity of evolution.


[jvm]: The JVM is great.
