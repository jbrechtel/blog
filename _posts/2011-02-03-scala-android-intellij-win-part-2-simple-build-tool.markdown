---
title: Building Android Apps with Scala - simple-build-tool
layout: post
---

This is part 2 in my series on getting started with Android development in
Scala using IntelliJ.  If you haven't already then check out [Part 1 -
Prerequisites][1].  This post will cover getting your project created and
using simple-build-tool to perform various tasks such as compiling, testing,
packaging, and getting your app on a device.  By the end of this post you'll
be able to deploy your app to an Android device or package it for the market
each with a single command.

## A quick aside before we begin

This part of the series purposefully leaves out IntelliJ.  I strongly believe
that a GUI tool should not be required to compile, test, or deploy your code.
My principal reason for this is so that I am always able to practice
[continuous integration][2].  Requiring a GUI to build my software would
prevent me from automating that process in any manageable way.  The secondary
reason for eschewing dependency on a GUI is so that I am free to pick
whichever GUI or plain editor I want with as little hassle as possible.  You
can apply everything in this post whether your IDE/editor is [IntelliJ][3],
[Eclipse][4], [Vim][5], [Emacs][6], or <insert your favorite editor here>.

## Creating our project

To create a new Android project, we’ll use the create_project script from
jberkel’s android-plugin.  This will create the initial [simple-build-tool][7]
project structure including our project and plugins files. The create_project
script has two required arguments: <name> and <pkg>

  * name: The name of the project and ultimately the name of the directory where the project will reside.
  * pkg: The Java package name to be used for our Android project.

Let’s call our project awesomepad and the package com.kickass.awesomepad
Execute the following commands from our OS’s command line:

    cd $root
    ./opt/android-plugin/script/create_project awesomepad com.kickass.awesomepad


**Now that we've got an Sbt project setup.  Let’s update the project dependencies
next.**


    cd $root/awesomepad
    sbt update

(Note:  If the ‘sbt’ command is not found then please follow the instructions
on the Sbt wiki [Setup ][8]page first) At this point, it would be prudent (but
not required) to familiarize yourself with how Sbt works.  The
[BuildConfiguration][9] page of Sbt’s wiki  is a good place to start. For the
rest of this post, all commands should be executed from the $root/awesomepad
directory.

## Using simple-build-tool

In this post I’ll often tell you to execute an Sbt task from a shell like this

    sbt <task name>

That’s not the optimal way to interact with Sbt while we're
actually working.  The Sbt console provides a shell from which we can launch
tasks.  If we use the Sbt console then we won’t have to wait for the JVM or
Scala compiler to start each time we execute a task. To start the Sbt
console just execute ‘sbt’ by itself from the project root.  Once inside
the console we can start a task by just typing the task name and hitting
enter. Also, check out [TriggeredExecution][10].  Very cool. Ok, now for more
Android stuff

## Some Android specific simple-build-tool tasks

jberkel’s android-plugin comes with several very handy tasks to help with
Android development.

  * package-debug - Builds a debug APK that we can deploy to our phone.
  * start-emulator - Starts the app on an emulator, if one is running.
  * reinstall-emulator - Reinstalls the app on an emulator, if running.
  * reinstall-device - Reinstalls the app on an attached Android device.
  * start-device - Starts the app’s default activity on an attached Android device.
  * sign-release  - Builds a signed APK that is suitable for publishing to the market.

Here are some non-Android specific Sbt tasks that are also good to know

  * clean - Deletes any compiled files and other artifacts.
  * compile - Compiles the project
  * test-compile - Compiles the tests
  * test - Executes the project's tests

When running all of the above tasks Sbt will automatically recompile if
relevant source files have changed.  However, it doesn’t know that changes to
AndroidManifest.xml should cause a repackaging so when we change that file
we'll often want to perform another package-debug or clean.

## Deploying to our Android device

To deploy the project to a device just run the start-device task while a
device is connected over USB.

    sbt start-device

This will cause the project to be compiled, packaged, installed on an attached
device and then its default activity started.  If we were writing a widget,
live wallpaper or something else without a default activity then we'd just
use the reinstall-device task instead.

#### When this doesn’t work...

On Linux commands that interact with attached Android devices may report the following error

    **[error] error: insufficient permissions for device**

This means our Android Debug Bridge (adb) daemon does not have the right
permissions.  There are two ways to fix this.

* **Option 1)**
_We can Google “adb udev insufficient permissions” and find the correct udev rules to possibly
make this work then update our udev rules and reboot.  Find out something is
wrong with our freshly updated udev rules and repeat the cycle until we give up and select
Option 2._

* **Option 2)**
_Just run adb as root.  Execute the following commands_

    $root/opt/android-sdk/platform-tools/adb kill-server
    sudo $root/opt/android-sdk/platform-tools/adb start-server

IMHO it's best to execute the second line during boot.

To do this on Ubuntu just put this in /etc/rc.local.  Everything in rc.local runs as root so 'sudo' isn't needed there.

Once adb is running with proper permissions then the start-device and reinstall-device tasks should work fine.

## Running Tests

At this point the project has two separate directories for tests.  One is an
Android test project used for functional testing that can be found in
$root/awesomepad/src/tests.  The other is a ScalaTest project for unit testing
that is located at $root/awesomepad/src/tests.  I’m going to cover running the
unit tests and skip the Android test project for another post where I’ll cover
Android testing in depth. To run the unit tests just run the test Sbt task.

    sbt test

This will cause the project to be compiled and the ScalaTest specs in
$root/awesomepad/src/tests to be executed with a command line test runner.
This test runner has rather crude output with very long stack traces when
things fail.  The formatting isn’t as nice as something like [RSpec][11], but
don’t worry because it will get better whenever we’re running these in
IntelliJ.

## Packaging for the Market

Preparing the app for the market is pretty straight forward.  Before we
actually release the app on the market it's important to should read the [Preparing to
Publish][12] checklist over at the Android Developer site. The only step we’re
concerned with right now is: [Obtain a suitable private key][13].  If you
don’t have a private key already then follow those instructions until you get
to step “2. Compile the application in release mode”. At this point you should
have .keystore file.  We’ll assume the name is awesomepad.keystore. Now we
need to tell our Sbt project about this file so that the Sbt tasks for
signing the app know where to find it.

  * Copy awesomepad.keystore to $root/awesomepad/awesomepad.keystore
  * Edit $root/awesomepad/project/build/Awesomepad.scala
  * Inside MainProject, override the keystore method to return “awesomepad.keystore”
    * override def keystore = “awesomepad.keystore”
  * Set the keyalias val equal to whatever keyalias you used when creating the key earlier
    * val keyalias = “myKeyAlias”

_Note: My instructions here run somewhat counter to the conventions provided
by the android-plugin.  By default the AndroidProject sbt plugin, specifically
the MarketPublish trait, assumes that the keystore is a file in our home
directory name “.keystore”.  This way there's can have one keystore for all of
projects and our project file only needs to specify the key alias we
want to use._ _This is all well and good, however it means that our project
source tree does not contain everything we need to release or update our app in
the market.  I’d rather everything be in a single source tree so that I have
less to keep up with.  You say potato, I say potato...well you get the idea._
Now that we’ve gotten a private key and told our Sbt project about it we
can run the sign-release task and Sbt will create an apk signed with that key.

    sbt sign-release

After running that command we'll be prompted for the keystore password.
Enter the password for the keystore and then a signed apk is waiting for us in
$root/awesomepad/target/scala_2.8.1.

That’s it for this time, check back later
for part 3 where I’ll talk about setting up IntelliJ to use all of these
wonderful Sbt tasks and then finally part 4 where we will use IntelliJ’s
test runner to run our project’s unit tests.

   [1]: http://nevercertain.com/index.php/2011/02/scala-android-intellij-win-part-1-prerequisites/

   [2]: http://martinfowler.com/articles/continuousIntegration.html

   [3]: http://www.jetbrains.com/idea/

   [4]: http://www.eclipse.org/

   [5]: http://www.vim.org/

   [6]: http://www.gnu.org/software/emacs/

   [7]: http://code.google.com/p/simple-build-tool/

   [8]: http://code.google.com/p/simple-build-tool/wiki/Setup

   [9]: http://code.google.com/p/simple-build-tool/wiki/BuildConfiguration

   [10]: http://code.google.com/p/simple-build-tool/wiki/TriggeredExecution

   [11]: http://rspec.info/

   [12]: http://developer.android.com/guide/publishing/preparing.html

   [13]: http://developer.android.com/guide/publishing/app-signing.html#cert

