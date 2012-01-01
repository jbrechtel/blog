---
title: What TDD is and is not
published: true
layout: post
---

### Let's define "practicing TDD"

[Test driven development](http://c2.com/cgi/wiki?TestDrivenDevelopment) itself
is [well defined](http://en.wikipedia.org/wiki/Test-driven_development).

However, since software development methodolgies are like religions you can't be
considered a practitioner unless you follow the practice 100% of the time.  Just like religion.  Right?

(Also, who cares if you're considered a practitioner?  Why does that matter?)

This is absurd anyways.  I take baths.  I am not, however, taking a bath right now.
Does that mean I do not bathe?

Let's get rid of this ridiculous notion of saying when and how often you should practice TDD.
Just do it when you can imagine a net benefit to doing so.  How's that?  If you don't THINK
there is a reason to TDD a particular piece of functionality then DON'T!  Do not make TDD a
dogma.  It's that simple.

Like any practice, as you continue to write tests and write them before actual code you'll get
better at it.  You'll think more about how you'll test the software you're going to write.  Over
time a new skill will develop and you'll find yourself covering more kinds of functionality with
tests.

#### Sometimes you don't have much choice

You'll also find social pressure on teams pushes the practice of TDD.  This is an
unfortunate reality that I do not know the answer for.  Teams adopt practices for the
sake of quality and consistency.  Individuals do not always agree with team decisions.  My
suggestion here is to try TDD for a reasonable amount of time, ask questions, give it a fair shake.
If you really cannot find any value in TDD afterwards, then you should do what you can to
leave that team.

While I'm sure they are out there, I've not met someone who has learned and practiced TDD
from someone else that did not find value in it.  Having team members experienced with TDD
is crucial here.  Simply following the TDD cycle will not result in good tests.  This takes
time and experience.

### What TDD is *NOT*

These are a collection of myths and strawmen about TDD.  They come up from time to time
in various forms.  None of them present a reason to ignore the practice.

#### A means of changing software with zero impact.

High automated test coverage with good unit tests reduces the delay of some feedback
regarding the impact of changes.  Writing tests first encourages both high test
coverage by ensuring the tests actually get written.  It also forces the developer to
think about clients of the code before writing the code which helps reduce coupling.
Higher coupling, by its nature, increases impact of changes so reducing this helps
as well.

Unfortunately nothing can remove the impact itself.  The impact of changing software fans
out along many different axis, only some of which are even partially covered by automated
testing.

#### A practice that yields benefits when followed blindly

Unit tests can be a source of problems.  Test suites that are full of brittle tests which
are just reverse implementations of the actual code provide no benefit.  Tests which take
so long to run that they only get executed once a day or once a week aren't helping you reduce
delays in feedback.  Both of these can arise from a team practicing TDD without reason.

This point is actually quite obvious.  After all, why would you follow any practice blindly?

Dictating that a developer practice TDD when that developer isn't convinced of any reason to
do so will result in exactly that.  If your team isn't convinced of the benefits of any practice
that it employs then you have a very serious problem.  That is the problem that should be addressed
first.  Doing otherwise is a crucial mistake.

#### An end

The practice of TDD itself is not a benefit.  If you can achieve the benefits that TDD
provides without the practice then there's no reason to employ the practice.  There are
also scenarios where you do not need the benefits that TDD provides.

### But WHY does it matter if you write the tests FIRST?

Frequently asked, seldom answered clearly.

If you do not practice TDD then the idea of writing tests before writing code may sound absurd.
Why on earth would you do that?  I'm used to writing CODE first!  This is amplified by the fact that
we (humans) are really bad at estimating the time-cost of things we don't do regularly.  Ok ok, I'm
rambling without answering the question.  Why write tests first?

Writing tests first yields benefits that writing tests after does not.

Those benefits are:

* Better test coverage.  I'm human, I will inevitably fail to cover branches of code with tests
if I write them after the fact.  I am less likely to do this with the TDD cycle.

* I end up thinking more about the code I'm going to write before I write it.  The reason this is good
is that once code is written and working then I'm less likely to change it.  Code that hasn't been
written is cheaper to change than code that has.

* I know immediately if the code is difficult to test and can evaluate whether or not this is incidental
or inherent difficulty.  This relates to the previous point but is more specific.

### Conclusion

I and many others have found TDD to be an extremely useful practice.  It helps ensure high test coverage,
it provides you with early smells about bad design.  Writing tests first feels foreign and this makes us
feel like it's silly and could only work for the trivial examples you see in books and screencasts.  This
feeling is WRONG.  I have been on large (30+ developer), medium and small teams which have employed TDD
successfully.  Our code coverage was always high (85% is the worst coverage number I recall, usually higher
than 90%).  TDD *ONLY* works when it is employed thoughtfully with intent.  It WILL be a net loss on productivity
otherwise.  TDD is not a silver bullet, a dogma or an end.  TDD is simply a useful practice.
