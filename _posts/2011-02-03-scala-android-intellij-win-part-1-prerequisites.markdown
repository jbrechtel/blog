---
title: Building Android Apps with Scala - pre-requisites
excerpt: What software you'll need
layout: post
---

This is the first in a series of blog posts about getting started with
[Android][1], [Scala][2], [IntelliJ][3] and [simple-build-tool][4].  Hopefully
this will help people who are interested in building Android apps, but don't
want to write Java get started.  Also, if you're already building Android
apps, but would like a more expressive language while staying close to the
metal then Scala is a great alternative to Java.  By the end of this series,
you should be able to build, deploy and package your Scala Android apps both
from the command line and IntelliJ. My primary development environment is
Ubuntu Linux but I will provide **platform specific instructions** where
appropriate. These instructions assume that you have Java 1.6 installed and
its environment variables setup. We'll be putting everything (except for
IntelliJ on Windows and OSX) into the same directory on your system.  On my
development machine that directory is /home/jbrechtel/opt.  Throughout this
post I'll refer to this directory as $opt. I would suggest the following
locations for $opt, by platform


<table>
	<tr>
		<th>Linux</th>
		<td>
		/home/username/opt
		</td>
	</tr>
	<tr>
		<th>
		OS X
		</th>
		<td>
		/Users/username/opt
		</td>
	</tr>
	<tr>
		<th>
		Windows
		</th>
		<td>
		C:\Users\username\opt
		</td>
	</tr>
</table>
Ok, let's start with..

##Getting Scala

Head over to[ http://www.scala-
lang.org/downloads][5] and download the package for your platform.

  * Extract the Scala package to $root/scala.
  * Set the SCALA_HOME environment variable to $root/scala
    * Linux: Add “export SCALA_HOME=$root/scala” to your .bash_profile
    * OS X: See [http://snipurl.com/apple_environment][6]
    * Windows: Start -> Run -> “setx SCALA_HOME=$root/scala”
  * Add $root/scala/bin to your system’s path

Now, that’s it for Scala.  You should now be able to start a command prompt on
your OS and type ‘scala’ to get a handy Scala REPL for testing things out.

##Getting IntelliJ IDEA

Next we’ll get our IDE.  IntelliJ IDEA has pretty
good Scala support though it’s not without its flaws as we’ll see throughout
this series. First, point your browser at
[http://www.jetbrains.com/idea/download/index.html][7] and download IntelliJ
for your platform.  As of version 10.0 the Community Edition (read: Free) of
IntelliJ IDEA supports both Android and Scala development.  For great justice!
Install the IntelliJ IDEA package.  For Windows and OSX, IntelliJ installs
like a normal application which I presume you already know how to do. For
those of you on Linux:

  * **Extract the tar.gz for IntelliJ to $root/opt/idea**
  * **To launch IntelliJ just execute $root/opt/idea/bin/idea.sh**

I suggest creating a menu shortcut in Gnome, KDE, or XFCE to the idea.sh
script.  There are a number of IntelliJ icons in that bin folder which you can
use for the menu icon.  The files are named idea_CE{16-128}.png.

##Getting the Android SDK

Let’s go get the Android SDK.  Obviously we need this to build
Android applications.  We’ll only be grabbing the Android 2.1 platform here,
but the Android SDK manager makes the other platform versions easy to get and
install. The Android SDK can be found here:[http://developer.android.com/sdk/index.html][1].
Download the package for your platform from that site.

_Note for Windows users:  It looks like Google
has made things easier on you by providing an installer.  I’m not familiar
with the installer, but it probably does everything you need it to do.
However, the instructions below are written with the zip package in mind._

  * Extract the downloaded file to $root/opt/android-sdk
  * Set the ANDROID_SDK_HOME environment variable to $root/opt/android-sdk
    * See the ‘Getting Scala’ section above for instructions per platform.
  * Launch the Android SDK Manager
    * Linux: **$root/opt/android-sdk/tools/android**
    * OSX: **$root/opt/android-sdk/tools/android**
    * Windows: **$root/opt/android-sdk/SDK Manager.exe**

The Android SDK Manager is used to download the various Android platforms and
other third party addons such as the Google Maps SDK and the Samsung Galaxy
Tab SDK.  For now we're just concerned with the Android 2.1 platform. Once the
SDK Manager is running follow these steps:

  * Click 'Available Packages'
  * Expand 'Android Repository'
  * Check the box that says 'Android SDK Tools, revision 7'
  * Click 'Install Selected'
  * Click 'Accept All' to accept all licenses
  * Click 'Install'

Now the SDK Manager will download the Android 2.1 platform (also known as
revision 7 or API Level 7 in Android parlance).  If you receive a prompt about
ADB needing to be restarted then just click ‘Yes’.  Afterwards you can close
any dialogs and the SDK Manager. Once that is complete, move on to the next
section.

##simple-build-tool

[simple-build-tool][7] / SBT is a (as the name
suggests) build tool for Scala.  It provides all the things you might expect
from a modern build system such as:

  * dependency management (both managed and unmanaged dependencies are supported)
  * a DSL (in Scala) for configuring your targets and other aspects of the project
  * testing integration

simple-build-tool has a few things that I consider killer features:

  * A console/REPL with your entire project at your fingertips.
  * Triggered task execution (e.g. run tests automatically when source changes)

Download SBT by going [http://code.google.com/p/simple-build-tool/][4] then
download the latest version in the ‘Downloads’ section on the right side of
the page. SBT has really good instructions for getting started on their
project site.  Check it out [http://code.google.com/p/simple-build-
tool/wiki/Setup][8]

##jberkel’s android-plugin for SBT

Once you have SBT
installed, you should grab the awesome android plugin for SBT.  This plugin
primarily provides two things

  * A script for creating a new Android project that SBT can compile
  * Several handy SBT targets for doing things like packaging your app for the market and deploying to your device.

You can find this plugin on GitHub [https://github.com/jberkel/android-plugin][9].
Go there then click on 'Downloads'.  Download verion 0.5.1 (newer version should work if available).

  * Go to [https://github.com/jberkel/android-plugin][9]
  * Click Downloads
  * Download the latest version (at the time of writing that was 0.5.1)
  * Extract it to $root/opt/android-plugin

Then you'll have the latest version of the Android project plugin locally.
We'll use this in the next post to create our Sbt project with Android support.

**That’s it for now!**

Now, at this point you've got all of the required software installed.
Let's review.

  * _IntelliJ_
    * If you're using OS X or Windows then IntelliJ is installed as a regular application.
    * If you're using Linux then IntelliJ is installed in $root/opt/intellij
  * _Scala 2.8.1_ is installed to $root/opt/scala
  * _Android SDK (and the Android 2.1 platform)_ is installed to $root/opt /android-sdk
  * _simple-build-tool_ is installed according to the instructions on their site
  * jberkel’s android-plugin for SBT

Next time we’ll cover creating the Android SBT project using jberkel’s
fantastic android-plugin and also doing things like deploying the app to your
phone and packaging it for the market. In the third post we’ll talk about
setting up IntelliJ to edit the code in that project and launch your SBT
targets. In the final post of this series we’ll go over how getting started
unit testing in IntelliJ with ScalaTest. See you next time

   [1]: http://developer.android.com/sdk/index.html
   [2]: http://www.scala-lang.org/
   [3]: http://www.jetbrains.com/idea/
   [4]: http://code.google.com/p/simple-build-tool/
   [5]: http://www.scala-lang.org/downloads
   [6]: http://snipurl.com/apple_environment
   [7]: http://www.jetbrains.com/idea/download/index.html
   [8]: http://code.google.com/p/simple-build-tool/wiki/Setup
   [9]: https://github.com/jberkel/android-plugin
   [10]: https://github.com/jberkel/android-plugin.git
