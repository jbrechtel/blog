---
title: My HP Envy 14 is 'meh'
layout: post
---

I recently bought an [HP Envy 14][1]. I followed news about the laptop before
it was release and was pretty excited. It's a nice size for me (14.5 inches),
has a really good screen, was touted to get something like 6 hours battery
life, solid build for a non-Macbook, and decent internals. Even with all this,
I KNEW that a Macbook would suite me better. You see, I’m a recovering .NET
developer. I’ve grown to really appreciate the flexibility of a Unix-based
development and deployment environment. I’ve also had a fair number of
laptops. Some Dell, some HP, and some Macbooks. My work-issued laptop is a
Macbook Pro 15 and I’ve owned a Macbook Pro 13 (but sold it shortly after
getting the MBP 15 from work). The Good

  * Beautiful screen. The screen on this is a little brighter than my MBP 15 and has a higher resolution (1600x900)
  * Good keyboard. Has chic-let style keys that I really like.
  * Touchpad is pretty good after installing [this][2] (though not as good as my MBP)
  * Nice size, 14.5inches. Very portable.
  * Looks nice IMHO
  * Can drive 2 external monitors.  Mine won’t power the laptop display and 2 monitors at the same time, but [others can][3].

The Bad

  * Battery life. I get 3 hours normally. This sucks and is nowhere near
HP's original claims. I know that everyone says you should cut advertised
battery life in half but this is getting more and more ridiculous as
advertised battery life is going up.

  * Switchable graphics.  Most of the time, in Windows, you can’t switch to
the integrated graphics.  You press the button in their cheesy switching app
and nothing happens.  It really just shouldn’t be this hard.  In Linux,
however, I can always make it switch cards.  Unfortunately the ATI drivers
aren’t there yet in Linux.

  * Can’t drive any external monitors unless using the discrete graphics card.
This wouldn’t be so bad for me if I could use the discrete graphics card in
Linux.

  * USB peripherals cannot wake the computer up from hibernate, or sleep
(unless they were plugged in when it went to sleep).  My MBP 15 can do this
and I really appreciate that ability.  Without this, I have to open the lid
just to get it to wake up, then close it, then subsequently wake it up all
over again with the peripherals.

  * Linux support isn’t quite there yet.  The Linux ATI driver support for the
discrete card in this laptop is a work in progress.  You can see the progress
that Alex Deucher is making [here][4].  That branch is for acceleration
support for this line of cards from ATI….not this specific card.

In the end, while I’m not thrilled with my purchase of this laptop, I can’t
say that I’m super let down.  This is still the nicest laptop that I have
owned.  It is serving its purpose of giving me a good place to work on side
projects outside of my work laptop and to sharpen my .NET saw.  None of the
problems I have with the laptop are show-stoppers, though if I were still
travelling a lot then the battery life would be a bigger downside.

   [1]: http://www.shopping.hp.com/webapp/series/category/notebooks/ENVY14_series/3/computer_store
   [2]: http://code.google.com/p/envy14-trackpad-app/
   [3]: http://forum.notebookreview.com/6421176-post2308.html
   [4]: http://cgit.freedesktop.org/xorg/driver/xf86-video-ati/log/?h=evergreen_accel
