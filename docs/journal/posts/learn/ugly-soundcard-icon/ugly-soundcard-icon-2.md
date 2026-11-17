---
date: 2023-03-03
authors: [Þórarinn]
description: >
  Diagnosing and repairing an overheating RP2040-based Seeed Studio XIAO board.
#draft: true
categories:
  - Journal
  - Linux
---
# The Ugly Soundcard Icon

It started with a small annoyance.

Every Bluetooth speaker I paired in Blueman showed this little circuit board icon some classic `audio-card` from the 90s instead of anything resembling a speaker. It wasn’t breaking anything, it just looked wrong. And once I noticed it, I couldn’t stop noticing it. Even though I only open Blueman for a split second to connect a speaker, it was still there in the background and in my head.

So naturally I thought: how hard can it be?

That’s how the rabbit hole started.

------

## The Obvious Things That Didn’t Work

First instinct: right-click the device in Blueman and look for preferences. There was an “Icon: audio-card” line, but no edit button. Just a read-only window staring back at me.

Fine. I’ll fix it manually.

Blueman stores device data in `/var/lib/bluetooth/`. Each paired device gets its own folder, and inside there’s an `info` file:

```bash
[General]
Name=ht
Class=0x240414
SupportedTechnologies=BR/EDR;
```

No `Icon=` field, so I added one:

```bash
Icon=audio-speakers
```

Restarted Bluetooth. Opened Blueman.

Same ugly soundcard.

Next idea was to change `Class=`. I had noticed my headphones showed the correct icon and used a different class. After some experimenting, that actually changed things but not in a useful way. The label switched to “Headphones” and the icon followed. Technically working, but not what I wanted.

------

## Going Deeper

At this point I stopped guessing and started looking at how Blueman actually decides which icon to show.

I found this in `ManagerDeviceList.py`:

```bash
surface = self._make_device_icon(device["Icon"], ...)
```

So Blueman just uses whatever icon it gets. That means the decision happens earlier in the stack. BlueZ.

After digging around, I eventually landed here:

```bash
/usr/share/wireplumber/scripts/monitors/bluez.lua
local icon_map = {
  ["microphone"] = "audio-input-microphone",
  ["headset"]    = "audio-headset",
  ["headphone"]  = "audio-headphones",
  ["speaker"]    = "audio-speakers",
}
local f = properties["device.form-factor"]
icon = icon_map[f] or "audio-card"
```

That’s where it happens.

WirePlumber assigns the icon based on `device.form-factor`. If the device doesn’t report one and most cheap Bluetooth speakers don’t it falls back to `audio-card`.

Which explains everything.

The `Icon=` and `Class=` changes I had been making weren’t really relevant here. I considered patching this script, but that felt fragile and likely to break on updates. Dead end.

------

## Finding the Icon

Now that I knew what icon was being used, the next question was where it actually came from.

I’m using Mint-Y-Sand. It doesn’t include `audio-card`, so it falls back to Papirus. Both themes have proper icons like `audio-speakers` and `audio-headphones`, just not mapped the way I wanted.

My first idea was to override Papirus locally by copying a speaker icon into:

```bash
~/.local/share/icons/Papirus/
```

renaming it to `audio-card.svg`, and updating the cache.

That didn’t work.

Turns out GTK doesn’t treat that as a proper theme unless it has a valid `index.theme`. So even though the file was there, it was never actually used.

------

## What Actually Worked

At this point I was close. Instead of patching existing themes, I created a small custom theme that inherits from Mint-Y-Sand and overrides just the one icon I care about.

```bash
mkdir -p ~/.local/share/icons/Mint-Y-Sand-Custom/devices/48

cp /usr/share/icons/Papirus/48x48/devices/audio-speakers.svg \
   ~/.local/share/icons/Mint-Y-Sand-Custom/devices/48/audio-card.svg
```

Then:

```bash
# ~/.local/share/icons/Mint-Y-Sand-Custom/index.theme

[Icon Theme]
Name=Mint-Y-Sand-Custom
Inherits=Mint-Y-Sand
Directories=devices/48

[devices/48]
Size=48
Type=Fixed
```

Update the cache:

```
gtk-update-icon-cache ~/.local/share/icons/Mint-Y-Sand-Custom/
```

Switch to the new theme in system settings.

That was it. Blueman now shows an actual speaker icon. Something I only look at for a second, but still a lot nicer.

------

## Why This Works

GTK icon lookup follows a chain: active theme, then its parents, then fallbacks.

By creating a proper theme that inherits from Mint-Y-Sand, we insert ourselves at the top of that chain. GTK finds our `audio-card` first and never reaches Papirus.

The earlier attempt failed because I was just dropping files into a folder that GTK didn’t consider a real theme, so it never looked there.

Everything lives in `~/.local/`, so it survives system updates without touching anything system-wide.

------

## Cleanup

```bash
rm -rf ~/.local/share/icons/Papirus/
```

------

## Final Thought

One small annoyance turned into an evening of digging through WirePlumber Lua scripts, GTK theme inheritance, and BlueZ internals just to fix an icon.

For something I look at for half a second.

Worth it.

Because this is why I use Linux.

If something annoys me, I can change it. Not wait for an update or hope someone else fixes it, just dig in and figure it out. Sometimes it takes a minute, sometimes it turns into something like this, but in the end it’s my system and I get to shape it.

Once you get used to that, it’s hard to go back.
