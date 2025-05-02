---
date: 2025-04-21
#authors: [Þórarinn]
description: >
   Exploring Rofi - window switcher and Application launcher
#draft: true
categories:
  - Linux Mint
#tags:
#  - YouTube
#  - Material for MkDocs
---


# Exploring Rofi – Window Switcher and Application Launcher

I've been noticing I mainly use the start menu to type in the app I want to use, so I started looking into better alternatives I could replace the start menu with. I came across **Ulauncher** and **Rofi** — both looked really nice, but I decided to go with **Rofi** since it can not only open apps, but also act as a run dialog, SSH launcher, file switcher, and even run custom scripts like “connect to Wi-Fi” or “change audio source”.

![rofi](./cover-rofi.jpg)

<!-- more -->

## Installing Rofi

Installing Rofi was straightforward using `apt`:

```bash
sudo apt update
sudo apt install rofi
```

I could now run it in the terminal with:

```bash
rofi -show drun
```

Next step was to configure it like I do most of my keyboard navigation these days — using `Ctrl + j/k` to move down and up, and `Ctrl + l` to accept.

---

## Configuring Rofi

I created a config file in my `.config` directory:

```bash
mkdir -p ~/.config/rofi
rofi -dump-config > ~/.config/rofi/config.rasi
```

### Remap keys (Ctrl+j/k/l), enable icons, and set theme

In the config file, I added the following configuration block. Rofi uses a custom styling format called `.rasi`, which is similar to CSS. I had to unbind some default keys to make j/k/l work, and I enabled icon support and set the font to my Nerd Font. I also applied the Monokai theme (might change that later).

```c
@theme "/usr/share/rofi/themes/Monokai.rasi"

configuration {
  // Unbind default conflicting keybindings
  kb-remove-to-eol:       "";
  kb-mode-complete:       "";
  kb-accept-entry:        "";

  // Remap movement and accept keys
  kb-row-down:            "Down,Control+j";
  kb-row-up:              "Up,Control+k";
  kb-accept-entry:        "Return,Control+l";

  // Allow Super to cancel (close Rofi)
  kb-cancel:              "Escape,Super_L";

  // Enable icons and set font
  show-icons:             true;
  font: "JetBrainsMono Nerd Font 12";
}
```

---

## Binding the Super Key to Launch Rofi

To make the **Super key** open Rofi, I first had to disable its default behavior in Linux Mint.

1. **Right-click the Start menu → Configure → Behavior**
2. Under “Keyboard shortcut to open and close the menu,” I replaced `Super L` with `Super L + M` (so I can still open it with another shortcut if needed)

Then I added a custom keyboard shortcut:

1. Go to **Settings → Keyboard → Shortcuts → Custom Shortcuts**
2. Add a new shortcut:
   - **Name:** Launch Rofi App
   - **Command:** `rofi -show drun`
   - **Shortcut:** `Super L`

---

## Rofi as a Window Switcher

Next, I wanted to use Rofi to switch between windows — similar to `Alt + Tab`, but fuzzy and faster.

I set it up like this:

1. Go to **Settings → Keyboard → Shortcuts → Custom Shortcuts**
2. Add a new shortcut:
   - **Name:** Rofi Window Switcher
   - **Command:** `rofi -show window`
   - **Shortcut:** `Super + V`

---

## Rofi Wi-Fi Menu with Super + W

One of the features I really wanted was a quick way to connect to Wi-Fi networks from the keyboard. I found [ericmurphyxyz/rofi-wifi-menu](https://github.com/ericmurphyxyz/rofi-wifi-menu){:rel="nofollow"} , a great minimal script that uses `nmcli` and Rofi to present available Wi-Fi networks in a clean interface.

I cloned it into my Rofi config folder to keep things tidy:

```bash
cd ~/.config/rofi
git clone https://github.com/ericmurphyxyz/rofi-wifi-menu.git
```

To launch it from a keybinding, I created a custom shortcut using:

```bash
/bin/bash /home/thorarinn/.config/rofi/rofi-wifi-menu/rofi-wifi-menu.sh
```

And bound it to `Super + W`.

I also made a small tweak to the script to show the currently connected Wi-Fi network at the top of the list:

```bash
# Add this near the top of the script
current_ssid=$(nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d':' -f2)
if [ -n "$current_ssid" ]; then
    connection_info="  Connected to: $current_ssid"
else
    connection_info="睊  Not connected"
fi

# Prepend this line to the list passed into rofi
chosen_network=$(echo -e "$connection_info
$toggle
$wifi_list" | uniq -u | rofi -dmenu -i -selected-row 1 -p "Wi-Fi SSID: ")
```

This way I can see which network I'm currently connected to before switching.

---

## Making Rofi Close When Pressing Super Again

Once Rofi opens, global keyboard shortcuts like `Super` are no longer detected by Cinnamon — because Rofi has focus. So I configured Rofi to treat **`Super` as a cancel key** (like Escape).

This way:
- Press `Super` → Rofi opens
- Press `Super` again → Rofi closes

That toggle behavior is made possible by this line in the Rofi config:

```rasi
kb-cancel: "Escape,Super_L";
```

I also applied this same logic for `Super + W` and `Super + V`, so all my Rofi menus now open and close cleanly with the same key combo.

---

## Emoji Picker ⛏️

I was originally looking for an emoji picker that worked with Rofi. I explored both [`Mange/rofi-emoji`](https://github.com/Mange/rofi-emoji){:rel="nofollow"}  and [`fdw/rofimoji`](https://github.com/fdw/rofimoji){:rel="nofollow"} , but since there wasn’t a simple `apt` package for either 😵‍💫 I figured I might as well just use something that was easier to install — and honestly, it didn’t need to be part of the Rofi setup anyway.

So I found **Emote** in the Linux Mint Software Manager, and it works great for what I want. I use the default shortcut `Ctrl + Alt + E`, which is especially nice because I can hit it with one hand. 😎🖖

---

## Audio Output Switcher with Rofi

I wrote a small script that uses `pactl` to list and switch audio outputs. When launched, it shows a list of audio sinks and sets the default when one is selected.

Saved it here: `~/.config/rofi/rofi-audio-switch/rofi-audio-switch.sh`:

```bash
#!/bin/bash

sinks=$(pactl list short sinks | awk '{print $2}')
default_sink=$(pactl info | grep 'Default Sink' | awk '{print $3}')
chosen_sink=$(echo "$sinks" | rofi -dmenu -p "Select Audio Output (Current: $default_sink)")

if [ -n "$chosen_sink" ]; then
    pactl set-default-sink "$chosen_sink"
    notify-send "Audio Output Switched" "Now using: $chosen_sink"
fi
```

Make it executable:

```bash
chmod +x ~/.config/rofi/rofi-audio-switch/rofi-audio-switch.sh
```

Then bind to `Super + A` via **Settings → Keyboard → Shortcuts**.

---

## Bluetooth Menu with Rofi

I’m using [`nickclyde/rofi-bluetooth`](https://github.com/nickclyde/rofi-bluetooth){:rel="nofollow"} , which integrates `bluetoothctl` into a nice Rofi interface.

Cloned to: `~/.config/rofi/rofi-bluetooth`

```bash
git clone https://github.com/nickclyde/rofi-bluetooth ~/.config/rofi/rofi-bluetooth
chmod +x ~/.config/rofi/rofi-bluetooth/rofi-bluetooth
```

Test it:

```bash
~/.config/rofi/rofi-bluetooth/rofi-bluetooth
```

Bind it to `Super + B` in **Settings → Keyboard → Shortcuts**.

This lets me toggle paired devices with one key combo. Smooth.

---

## Working on

!!! info
    currently I have not tyred the calculator menu and not sure I have a need for it. I'll add some photos later or never. I also would like to add a clock, calendar and battery status.

## Final Thoughts

With Rofi fully integrated into my workflow, I now have:

### Rofi Keybindings Overview

Here's how I currently use Rofi and related tools, mapped to convenient keybindings for speed and accessibility:

| Shortcut         | Action                 | Command / Tool                                      | Speed     |
|------------------|------------------------|-----------------------------------------------------|-----------|
| `Super`          | App launcher           | `rofi -show drun`                                   | ⚡ Fast    |
| `Super + V`      | Window switcher        | `rofi -show window`                                 | ⚡ Fast    |
| `Super + W`      | Wi-Fi menu             | Custom script: `rofi-wifi-menu.sh`                  | 🕐 Medium |
| `Super + A`      | Audio output switcher  | Custom script: `rofi-audio-switch.sh`               | ⚡ Fast    |
| `Super + B`      | Bluetooth device menu  | Custom script: `rofi-bluetooth`                     | ⚡ Fast    |
| `Ctrl + Alt + E` | Emoji picker           | GUI App: Emote                                      | ⚡ Fast    |


And all of them feel native and responsive, with full Nerd Font icon support and a sleek Monokai theme that I customized a little.

Rofi is one of those tools that rewards customization and can scale with you as your needs evolve. Highly recommend diving into it if you’re looking for a faster, more keyboard-friendly way to move around Linux Mint.

All my config can be found  [here in my dotfiles](https://github.com/hanndoddi/dotfiles/tree/main/.config/rofi){:rel="nofollow"} 