---
title: Building Android Apps with Scala - IntelliJ
published: true
layout: post
---

**note to the reader** This is the third in a series of posts about getting
started with Scala, Android and IntelliJ.  The content here assumes that you
already have a working install of IntelliJ and the Android SDK plus a project
created using simple-build-tool.  If you don't have these things then please
check out [Part 1 - Prerequisites][1] and [Part 2 - simple-build-tool][2])

## IntelliJ Plugins

Before we get started we need to install some IntelliJ plugins.

* In IntelliJ click File -> Settings
* Scroll down to Plugins
* Click the 'Available' tab
* Install the Scala, Sbt, and Android plugins
* Right click each plugin and select 'Download and Install'
* Allow IntelliJ to restart after installing the plugins

After the plugins are installed we have to configure the Sbt plugin so that
it can find the Sbt jar file.  Go to File -> Settings -> Sbt to do this.

## Creating the IntelliJ project file

Unfortunately, this part of the process requires a bit of hackery.  My
intent is to modify the Android Sbt plugin to create projects that are more
suitable from the outset and combine that the work done in the [sbt-idea][3]
plugin to automate this entire process.  Until someone does that, these are
the steps required.

Also, as I said in [Part 2][2], nothing we do here will prevent us from
building, packaging, deploying or testing our project using sbt from the
command line.  You should always be able to do that regardless of the IDE you
are using.

#### Now, let's fire up IntelliJ and create this project.

  * Create Java project from existing sources
  * Enter a name for the project
  * In the 'Project files location' field, enter the path to the root of the project.
      * This should be $project_path
      * IntelliJ should find source files in $project_path/src/main/java
  * Click ‘Next’ and you should see the Libraries list
      * There should be lots of libraries
  * Find the library named ‘lib’ and rename it to ‘scala_2.8.1’
  * Click ‘Next’ and you should the Modules list
      * There should be one module, named Main.  Rename to $project_name
  * Click ‘Next’ and you should see the Facets list
      * There should be one facet, Android
  * Click ‘Finish’

Great!  At this point, we’ve got some IntelliJ project files created which
reference the generated Java source files for the project we created in [Part 2][2].

Now we need to change a few things.  IntelliJ still doesn’t know about our
Scala source files and the IntelliJ Android plugin doesn’t know what Sbt is
doing.  Also, a meaningful ‘Run’ configuration from the IDE is nice.

## Hacking up the IntelliJ project

#### Let’s get our source tree in order first.

  * Right click on 'Scala' folder.
  * Mark directory as Source Root
  * Right click on Scala and add package, 'com.test.myproject'
  * Rename Activity.scala to MainActivity.scala  (we're trying to make IntelliJ happy)
  * put MainActivity.scala in com.test.myproject package just created

#### Configure the IntelliJ Android plugin

The Android facet expects some things to be in different places

  * Right Click on the project in the project tab and select Open Module Settings
  * Select Facets
  * Select Android
  * Select Compiler
  * In the section 'AAPT Compiler'
  * Change '$project_path/src/main/gen'  to '$project_path/src/main/java'
  * In the section 'Android Packaging Compiler'
  * Change APK Path to '$project_path/target/scala_2.8.1/myproject_2.8.1-0.1.apk'

Also in the project settings make SURE that the Scala dependecy is set to to
‘Provided’ (NOT compile, test or runtime) so that if you ever let IntelliJ
(instead of Sbt) build the project then it won't also try to generate
Dalvik bytecode for the Scala library.  The Scala library contains classes
which have more functions in them than the Dalvik bytecode conversion tool can handle.

This issue is circumvented by the Sbt build process because Sbt uses ProGuard to
remove unused classes and functions from the Scala library before converting it to
Dalvik bytecode.

Now, let's show IntelliJ how to build our project

#### (Adding a Run configuration that uses Sbt)

  * In the IntelliJ menu, click 'Run'
  * Click 'Edit Configurations'
  * Click the + in the top left and select Android application
  * Enter ‘DeployRun’ in the Name textbox where it says 'Unnamed'
  * In the Module drop down select your project.  (There should be only one item in the list)
  * Uncheck 'Make'
  * Check 'Run Sbt Action'
  * Click the ellipsis next to 'Run Sbt Action' and in the dropdown list/text box type 'package-debug'
  * Click OK to close that dialog
  * Click OK to close the Run Configuration dialog

#### You can now rebuild and run your project from IntelliJ by executing the DeployRun configuration.

You can setup other build configurations to execute additional Sbt targets.

Next time we’ll cover running your tests with the awesome [ScalaTest][4] framework
from inside IntelliJ.

   [1]: http://nevercertain.com/index.php/2011/02/scala-android-intellij-win-part-1-prerequisites
   [2]: http://nevercertain.com/index.php/2011/02/scala-android-intellij-win-part-2-simple-build-tool
   [3]: https://github.com/mpeltonen/sbt-idea
   [4]: http://www.scalatest.org/
