---
title: XCode - Some thoughts
published: true
layout: post
---

Warning:  This is a bit of a rant.  It's mostly intended to be therapeutic for myself.

Our team has recently started down the road of writing a native iPhone app.
I'm very happy about this.  I've been wanting to have write an iPhone app for
some time and haven't had the opportunity to.  Having done a fair amount of Android
work and really enjoyed the platform's API I wanted a first hand account of how iPhone
compared to that.

So far, I have no major issues with Cocoa applications on iOS.  Building the UI is, for
the most part, much more straight forward here.  Apple has taken great care to make it easy
to build pretty UIs on iPhone.  This shows.  However, I haven't yet written enough code yet to
compare the two platforms SDKs.  One reason I haven't written enough is XCode....

### XCode 4

So, fate would have it that XCode 4 got released a few days before we started to play
our iPhone app cards.  On the surface, this seemed opportune because it's supposedly a big improvement
over XCode 3.  Unfortunately we quickly learned that also means that most of
the help we could find on the internet for common tasks were not applicable to XCode 4.

** Zombies (AKA: Night of the living option key) **

Very soon into our Objective-C foray we discovered we were calling methods on an object
whose memory had been freed.  In hindsight the solution is obvious:  retain the object then
release it once we're done with it.  However we wanted a general way to combat this problem so
we quickly came upon the idea of turning on Zombies.  Zombies are a neat feature of Objective-C
that allow you to find out exactly where you're talking to objects that have been freed.  This
is super useful to a budding Objective-C developer.

How do you turn them on?  You simply set the NSZombieEnabled environment variable to YES.

That sounds easy enough, environment variables are pretty straight forward and it can't be THAT
different from XCode 3 to 4 can it?

We spent a few minutes hunting for the word 'Environment' in the GUI to no avail.
We googled for this issue and found almost nothing but directions for doing it in XCode 3.x.
Then we finally found this post on StackOverflow.

[http://stackoverflow.com/questions/2190227/nszombieenabled-in-latest-xcode](http://stackoverflow.com/questions/2190227/nszombieenabled-in-latest-xcode)

Already frustrated, imagine our reaction when the instructions say 'Click the Product Menu and HOLD DOWN THE OPTION KEY'.

Granted we later found a more direct way to get to the menu in question, but from this changed our
opinion of XCode's UI from 'frustrating' to 'comically bad'.

**Schemes, Configurations, and Targets, oh my! **

This morass of concepts for building a project is maddening.  Apple could really take some
direction from the Ruby world here and adopt/create a humane build configuration tool like Rake.

Building projects does not require this much complexity.  Adding this Scheme concept which is only
configurable in the GUI does developers a disservice.  GUIs are fine when you're manipulating graphical
things, but they are outright hostile to editing text.  Schemes are essentially a grouping of targets and
build configurations, which themselves comprise text settings.  If Apple wants to provide some GUI editor
for these settings, then fine, but at least separate them into different files that are each human editable
and mergeable by my VCS tool!

Is configuring the build for an application really this hard?
I've done .NET, Java, Scala, and Ruby projects in the past and we've never needed this many concepts.
We generally have a single build, with some customizations for different environments
(development, testing, production, etc..).  Introducing complications beyond this has never yielded any fruit
in my experience.

Now, I understand that there's a fundamental difference between XCode projects and the others that I mentioned.
XCode projects may target a variety of architectures while the others I mentioned all run in a VM.  However, that's
the only fundamental difference from what I can tell and it's pretty easy to address with a build flag or an environment
variable, IMHO.

**Merging **

Maybe I'm missing something, but XCode's project config file presents a really annoying hurdle to collaboration.

* Any change to it by multiple people causes merge conflicts
* It occasionally changes without you explicitly changing any project settings
* It's not something you should attempt to merge by hand
* XCode crashes immediately when the file becomes invalid (say, you do a "git pull" and there's a merge conflict)

I don't know if these problems have always existed in XCode or if they're new to XCode 4.  Hopefully they're new to
XCode 4 and Apple will fix them in an update.

**xcconfig files, some hope **

Thanks to the super useful (and not at all obvious) info presented by Rob Napier [here](http://robnapier.net/blog/build-system-1-build-panel-360)
we were able to abandon the terrible XCode project file for most of our build settings in favor of
configuration specific xcconfig files.  This improved our situation a fair amount.  Now there are fewer settings
in the amorphous blob that is the XCode project file.

xcconfig files let you specify build settings in a simple NAME=VALUE format.  You can associate them to
specific build configurations (Release, Debug, etc...).  To do so in XCode 4:

* Click on your project in the Project Navigator (this should be the root of the project tree)
* Select your project in the resulting window
* Expand the desired configuration
* There should be a dropdown showing all of the xcconfig files in your project.  Select the appropriate one.

**XCode 4 is pretty **

One final thing that I actually like about XCode 4 is that it's pretty.  Apple puts nice graphical
touches on their products and XCode 4 is no exception.  I appreciate the smooth and polished animations
for things like highlighting [ ]'s as you type them.  The transition effect used for displaying the auto-complete
is also quite pleasant.  While I can't put my finger on a specific benefit of these features I must say that I do like them.

**No draggable and dockable tool windows??**

I really like the way XCode handles tool windows.  There are 3 of them (the ones on the left, bottom and right ).
You always know where they are and hiding/showing them is done using a few easy to see buttons on the toolbar.
I think Apple really got this right whereas most other IDEs seem to allow you infinite flexibility in this area
and that tends to hurt.  You'll never wonder where that stupid tool window went in XCode or why the hell it's
docked on the top of the screen instead of the middle.  +1 XCode.

## Conclusion

While I do dislike XCode, it isn't the worst thing in the world and it even has some positives over others.
I've tried worse IDEs (pretty much anything built on top of Eclipse that isn't just plain Eclipse),
but I've also used much better ones that enabled rather than stifled modern development practices.
In the end I can live with XCode and appreciate some of its niceties.  However, I find it unfortunate that
XCode lacks some of the things I've come to find really valuable.
