---
title: The Scala landscape
published: true
layout: post
---

TLDR; SBT+(Vim || IntelliJ || Eclipse)+Play, but there are lots of good options. 

### Scala overview

Below is an overview of what's going on with Scala today (9/8/2012) for a Scala newcomer. This post will be quickly outdated and may not be very useful if you're using Scala today.

### Typesafe Stack
[http://typesafe.com/stack/download](http://typesafe.com/stack/download)

The Typesafe Stack is the official 
The Typesafe Stack is the 'official' Scala toolchain. Official as in it's endorsed by the company that maintains Scala, Typesafe. It includes SBT for building, Play for web apps, and Akka for middleware. I haven't had an opportunity to use either Play or Akka in anger but I've heard lots of good things. Akka in particular is very cool.

The Typesafe stack also includes a tool called 'giter8' that will create SBT projects for you based on templates found in GitHub.


### Build tools
[Zinc, Scala incremental compiler](https://github.com/typesafehub/zinc)

For a while SBT was the only reasonable option to use for Scala because otherwise compilation times were slow for medium-large codebases. SBT is fast because it has an incremental compiler. Recently SBT's incremental compiler was been extracted to a separate, standalone library that other build tools can use. The Scala plugin for Maven uses it and I believe Gradle does as well. So as far as I know, today the good options for building are SBT, Maven, and I think Gradle.

### SBT
[SBT Getting started](https://github.com/harrah/xsbt/wiki/Getting-Started-Welcome)

SBT stands for Simple Build Tool. It's....interesting. I wouldn't describe it as 'simple' though. It goes to great lengths to provide this notion of a functionally pure environment for running build tasks. This means the mental model you need when writing SBT tasks is quite unlike what you've come across in other build tools. Steep ramp up.

On the other hand, when you just need it to build your project and not do any custom stuffs then it's pretty handy. SBT is like Maven in that it expects Maven's standard directory structure by default and will just build your code correctly if you adhere to that structure (src/main/scala/, src/test/scala).

SBT has some neat features like a REPL for executing tasks and dropping into a Scala REPL with your code+dependencies on the classpath. SBT also supports triggered execution so you can do things like have it run your tests anytime a source file changes.

SBT also comes with dependency management (supports Maven and Ivy repositories). It has built in tasks for things like running your app's main() so you don't have to write a massive classpath for all of your dependencies' dependencies' dependencies.

SBT has a pretty healthy set of plugins too, everything from Android build support, generating IntelliJ and Eclipse project files, proguard, etc...

### IDEs
[Eclipse](http://scala-ide.org/)
[IntelliJ](http://confluence.jetbrains.net/display/SCA/Scala+Plugin+for+IntelliJ+IDEA)

Both IntelliJ and Eclipse have excellent Scala support. I tend to use Vim to edit Scala code but I do check out IntelliJ and Eclipse from time to time. Support for each IDE is actively maintained and they have both gotten mature in the past year.

### Implicit.ly
[Implicit.ly](http://notes.implicit.ly/)

Implicit.ly aggregates Scala library updates in one place. It's useful for finding out about new Scala libraries or just getting an idea what's out there. Of course, you can always use existing Java libraries with Scala but sometimes you might want something with a more idiomatic Scala interface.

### Community
[Scala Mailing Lists](http://www.scala-lang.org/node/199)
[Twitter Scala List](https://twitter.com/#!/jbrechtel/scala)

The Twitter list I posted above is a pretty good cross section of the Scala community. The rest of the community is on the Scala mailing lists.

For the most part the mailing lists are good. Sometimes good threads get pulled into the abyss though. It happens more often than it should, so just watch out. Generally the mailing lists are really good.

### Scala Improvement Process
[Scala SIPs](http://docs.scala-lang.org/sips/index.html)

Scala's official process for changing the language is via the 'Scala Improvement Process'. This is pretty great because it makes these changes more transparent and easier to participate in. Each change (or SIP) gets a document on the SIP site and you can follow changes to the document itself over time and participate in discussion about the SIP on the mailing list. The latest fancy features such as string interpolation and macros were done this way.
