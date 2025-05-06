---
date: 2025-04-04
authors: [Þórarinn]
description: >
  A personal journey from fear to familiarity with Neovim. I use Neovim btw!
categories:
  - Journey
  - nvim
---

# Journey to Neovim

I remember the feeling of opening Vim for the first time some years ago when I switched to Linux. It felt like being transported into another dimension an *empty* one with no way out. After closing my terminal in panic, I never dared touch it again. Later, when I described what I had experienced to a programmer friend, he just smiled and said, “It’s cool though.” So I looked into it a bit, but it was overwhelming.

Now, years later, I’m much more comfortable in the terminal. And after recently redoing my Zsh setup, the idea of trying Vim again came back but this time through Neovim: a modern version of Vim with a strong community and Lua-based configuration.

![nvim](https://live.staticflickr.com/769/31775329181_edef5862c3_b.jpg)

<!-- more -->

At the time, I knew almost nothing about Lua other than it was used in Roblox. Still, I got a bit too ambitious. I thought, “Sure, I can just build my perfect setup!” I wanted it to look good, work well with Markdown, and support embedded electronics workflows.

So I asked AI to help me make the perfect config.

That quickly turned into an overwhelming pile of errors and crashes.

Still determined (my friend *did* say Neovim was good), I looked into pre-configured setups like LazyVim. But I couldn’t really wrap my head around them everything felt too abstract and bloated. I gave up again.

---

## Kickstarting the Journey

Then came **March 28th, 2025** nearly 28 days later.

I was confused, exhausted, and wondering: *Why do people even use this thing?*

That’s when I stumbled upon a huge cloth banner on the web that said **KICKSTART** and found TJ DeVries’ video*“The Only Video You Need to Get Started with Neovim.”*

<!-- Yes, this is a 28 Days Later reference and maybe I was the pilot all along -->


Finally something that worked out of the box *and* was simple enough to understand and modify.

Kickstart gave me a few good weeks of productivity and confidence. Then I felt ready to take the leap again and build something of my own.

I had seen people structure their configs with modular directories, keeping each plugin and setting neatly organized. That’s when I finally found the tutorial I *wished* I had found on day one: **Josean Martinez’s 2024 Neovim guide**, paired with a video that walked through the setup step-by-step. It led me to a clean, modular layout that just made sense.

---

## Where I Am Now

Months later, I feel like I’ve had the vaccine.

I'm on a never-ending journey to shape Neovim to fit the way I think and work. I’m more familiar with Lua, and I’m comfortable navigating buffers and using Vim motions. I feel equally at home in Neovim as I ever did in VS Code.

In fact, I find myself reaching for Neovim more and more and opening VS Code less and less.

VS Code is still a solid editor. Sure, it’s not fully open source (Codium is a thing, if that matters to you), but what I’ve learned and what many others have said is this:

> Don’t try to make Neovim exactly like VS Code. If that’s your goal, you might as well just use VS Code.

Both are great tools like a helicopter and an airplane. They both fly, but they handle differently, and choosing one over the other depends on your destination and how you want to get there.

Is Neovim the helicopter or the jet?

That’s up to you to decide.


## Details about my current setup

You’ll find information about the Neovim setup I use today under [How I Work](../../How-I-Work/technical/OS/editors/nvim.md). It’s evolving and changing all the time.

If you want to look back at where it started the disaster configs, the LazyVim phase, Kickstart, or snapshots along the way you can browse the commit history in my [dotfiles](https://github.com/hanndoddi/dotfiles).
