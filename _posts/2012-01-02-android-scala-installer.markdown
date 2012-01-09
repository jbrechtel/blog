---
title: Android Scala Installer
published: true
layout: post
---

### Using Scala on Android

(TLDR; go here [Android Scala Installer](https://github.com/mobilemagicdevelopers/Android-Scala-Installer))

I'm a big proponent of Scala for Android development. Scala is a modern JVM language with
great Java interopability. This makes it ideal if you're tired of writing Java. I enjoy writing
elegant code and I appreciate how Scala helps me in this regard.  Scala has a number of features
that enable me to write better code, such as pattern matching, functions as first class citizens,
a powerful type system, a very comprehensive collections library and many others. the features
that Scala brings to the table.

With that said, using Scala with Android is not without its problems. Those include:

* Increased binary size (100kb to a few megs)
* Worse IDE support than Java
* Slow build times (thanks to the need to run ProGuard)

The last one, slow build times, is by far the most pernicious of these. The increase in binary
size is usually pretty small. IDE support is improving every day and it's really not in a bad
place right now with good support now in both IntelliJ and Eclipse. However, waiting about 2
minutes from clicking 'Run' in IntelliJ to seeing the application run on your device is awful.

Building a Scala application for Android takes so long because of the need to run ProGuard against
your application. Because of [limitations](http://code.google.com/p/android/issues/detail?id=7147)
in the dex file format, the Scala library jar can't be convertted to a dex file. So, ProGuard is
used to strip out unused parts of the Scala library every time you compile your Scala code. This
process is very very slow.

There are ways around this. The Scala Android SDK from EPFL contains a script that will break the
Scala standard library up into small enough chunks to be dex'ed. From there you have a couple options.

Jan Berkel [details](http://zegoggl.es/2011/07/how-to-preinstall-scala-on-your-android-phone.html)
how to add the dex'ed Scala library to your device's boot classpath so that they'll always be available.
Unfortunately this is a manual process with a few scary steps. I've put off doing it myself for some time.

Another option that I don't see anyone doing is modifying their build tool to include the dex'ed Scala library
in your Android application every time. This would make your APK about 8megs larger, but would let you skip
the ProGuard step and you could just use the normal Scala library + ProGuard when building for the market.

Lastly, [Johannes Rudolph](https://github.com/jrudolph/scala-android-libs) came up with another option
which Macarse [blogged about here](http://android-argentina.blogspot.com/2011/11/roboinstaller-install-roboguice.html).
The idea is to install the Scala standard libraries on the device as a shared library in the same way
that the Google Maps SDK is installed.  This works best for me since it's repeatable and straight-forward.

I converted the original installer to Scala and added the Scala 2.9.1 libraries plus an uninstall option.
Details for referencing the shared libraries in your project can be found on
[GitHub](https://github.com/jbrechtel/Android-Scala-Installer).

The best place to get the installer is from the [Android Market](https://market.android.com/details?id=com.mobilemagic.scalainstaller).
The installer is published under [Mobile Magic Developers](http://www.mobilemagicdevelopers.com). We will provide
bug fixes and updates to include new versions of Scala.

The installer requires root permissions and will be creating files in system directories on your device. Use it at your own
risk.
