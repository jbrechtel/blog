---
title: SBT is not usable
published: true
layout: post
tags: swdev scala sbt build-tools
---

### SBT - (Not so) [Simple Build Tool](http://www.scala-sbt.org)

SBT is not usable. In this post I'll back that claim up and explain what to do about it.

I spent the last week helping a project team during their [Iteration Zero](http://foo.com). The team is building a web application using [Play](http://www.playframework.org) powered by several micro-services using another Scala web framework. They are using SBT as their build tool. My mission was to help them get some of their build related infrastructure bits going such as running unit, functional and integration tests, and packaging the respective applications for deployment.

Since I haven't spent time with SBT in quite a while I had to re-learn some of its concepts. My pair and I even stumbled across a [gist of mine](http://foo.com) while searching for how to serialize a task's dependencies. Even though this wasn't my first time with SBT I, unfortunately, made many of the same mistakes understanding it.

If you come from tools like Rake, Ant, Nant or Leiningen then SBT will seem quite foreign. Actually, I'm not sure which, if any other, build tool would be comparable to SBT.

##### SBT has a few things going for it

* REPL for experimenting with tasks
* Elegant architecture

##### ...and a few pain points

* Steep learning curve
* Operator abuse
* Very different from other build tools

Throughout this past week I kept thinking that, while I appreciate the elegance of SBT's core concepts, I feel like SBT requires more attention (at least in the early stages) than I'm used to with a build tool. With tools like Rake, you can often just grab a few examples and go. Need to write a task that depends on two other tasks with Rake? No problem. Need to extend what another task already does? Copy and paste.

With SBT, that approach only works for the most trivial of tasks.

An example of what I mean by that is, with Rake I can define a task like so:

<pre><code class="ruby">task :foo do
  puts "hi"
end
</code></pre>

and in SBT's defense, they make it really easy too
<pre><code class="scala">TaskKey[Unit]("foo") {
  println("hi")
}
</code></pre>

Easy, right? Well, sort of. This only works in SBT's build.sbt file. If you want to put this in the project's project.scala build definition, then you've got more things to consider.

<pre><code class="scala">val fooTask = TaskKey[Unit]("foo")
val foo = fooTask := {
  println("hi")
}

val project = Project(id = "Foo", base = file(","), settings = Seq(foo))
</code></pre>

WTF is := doing? The docs explain it pretty clearly, that's associating some code with the task key.Ok, but now I've got two separate concepts:  the task key and the resulting combination of task key and code. Which do I add to my project? And why do I have to add them to my project?

Well, as it turns out you add the combination to your project. In this case, that's foo, not fooTask. If you understand that the classes which make up SBT's core concepts are immutable then this isn't very surprising.

Ok, so creating a task wasn't too bad now let's try creating a task which depends on another task.

Now let's see what's involved in making a task that returns Unit but also depends on running tests first.

First we'll do it in build.sbt

##### build.sbt

<pre><code class="scala">barTask := { println("tests ran!") }

barTask &lt;&lt;= barTask.dependsOn(test in Test)
</code></pre>

Again, pretty easy, right? Now what about a scala build definition?

##### Project.scala

<pre><code class="scala">lazy val project = Project(id = "Foo", base = file("."),
                           settings = Seq(afterTestTask1, afterTestTask2))

val afterTestTask1 = barTask := { println("tests ran!") }
val afterTestTask2 = barTask &lt;&lt;= barTask.dependsOn(test in Test)
</code></pre>

A few things to note here:

* This sucks and is probably a dumb way to do it
* The order of afterTestTask1 and afterTestTask2 appear in the project settings seq matters
* The two afterTestTasks seem to be unrelated to each other

In fact, there is a better way to write it

<pre><code class="scala">lazy val project = Project(id = "Foo", base = file("."),
                           settings = Seq(afterTestTask))

val afterTestTask = barTask &lt;&lt;= (test in Test) map { _ => println("tests ran!") }
</code></pre>

The difference here is that I'm creating the task using the &lt;&lt;= operator. It is not obvious that you need to do this because the &lt;&lt;= operator is used for defining tasks that take other tasks as inputs. However, for some unknown-to-me reason, you cannot call dependsOn on a task defined with :=. This is what I would think you'd want to write, but it doesn't compile:

<pre><code class="scala">lazy val project = Project(id = "Foo", base = file("."),
                           settings = Seq(afterTestTask))

val afterTestTask = (barTask := { println("tests ran!") }) dependsOn (test in Test)
</code></pre>

What's probably happening here is that SBT is folding over its settings sequence to compose the final task depenency graph.

### Mini-rant about operator abuse

Also, those feelings that this tool isn't worth the investment didn't mix well with the operator abuse. Why "~=" for transformation and "&lt;&lt;=" for composition? I'm sure there are good reasons but I don't know them and the docs don't tell me. I've gotten used to having mnemonics to help me remember things and these arbitrary operators work against that.

### What does 'usable' mean anyways?

SBT isn't usable in the same way that other build tools are usable. SBT isn't grab-n-go. Sit down and stay for a while. Read the whole menu before you order. There *is* a barrier to entry and you should acknowledge that.

I think you have to 'know' a tool like SBT before it will work well for you. If you're always just throwing things together, making the occasional edit to your build file here and there then SBT is going to be very painful for you where other tools like Rake and Ant will not.

### Things I would do differently

If you're picking up SBT now then I'd say you should avoid my mistakes by starting with SBT's core concepts and how they relate, specifically:

* Keys
* Settings
* Tasks
* Scopes
* Projects

The [docs](http://www.scala-sbt.org) are pretty good for learning about these topics if you seek these topics out directly. Make sure you avoid the tempting quick examples in the docs though, they are the path to madness if you use them too early.

Don't try to 'use' SBT. Learn SBT first.

### Conclusion

I hope this post doesn't come across as <i>SBT sucks and Rake is awesome</i> because that isn't what I intend. What I'd like to drive home is that SBT is fundamentally different from other build tools thus you should approach understanding it in a fundamentally different way. Spend more up front time understanding SBT than you might with another build tool. Once I started doing that the road got a lot smoother.
