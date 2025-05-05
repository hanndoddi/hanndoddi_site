
# Terminal

The terminal is where I feel most at home. I prefer tools that are fast, keyboard-driven, and easy to customize.

---

## Kitty :fontawesome-solid-cat:

My terminal emulator of choice is [Kitty](https://sw.kovidgoyal.net/kitty/){:rel="nofollow"} . Yes, the name and cat icon won me over, but it's also genuinely fast, GPU-accelerated, and super customizable.

It works great with Neovim and supports features like:

- Tabbed layouts
- Graphics in the terminal
- Configurable keybindings
- Fast startup and rendering

### Kitty Keybindings

| Shortcut            | Action                  |
| ------------------- | ----------------------- |
| `kitty_mod + e`     | Open new split window   |
| `kitty_mod + t`     | Open new tab            |
| `kitty_mod + n`     | Open new tab (same dir) |
| `kitty_mod + w`     | close tab/window        |
| `kitty_mod + enter` | pen new split window    |
| `kitty_mod + f2`    | open kitty config       |
| `kitty_mod + f5`    | reload kitty config     |

_(kitty_mod `Ctrl + Shift`)_

### config

I don’t customize Kitty much. I use the MesloLGM Nerd Font to support icons, hide the border, and enable transparency. I also use a custom theme.

[My kitty config can be found here](https://github.com/hanndoddi/dotfiles/tree/main/.config/kitty){:rel="nofollow"}

### Appearance

- **Font:** `MesloLGM Nerd Font`
- **Opacity:** `background_opacity 0.9`
- **Logo:** Custom transparent logo: `/path/to/logo.png`
- **Window Decorations:** Disabled (`hide_window_decorations 1`)

### Navigation & Layout (Cinnamon)

| Shortcut          | Action                            |
| ----------------- | --------------------------------- |
| `Super + ←/→/↑/↓` | Tile window to side or corner     |
| `Super + Down`    | Unmaximize / Restore tiled window |
| `Alt + F8`        | Resize window with arrow keys     |
| `Alt + Space`     | Window menu (move, resize, etc.)  |

I use `nvim` as my default terminal editor.  
You can check out my full Neovim setup [here](./editors/nvim.md).

---

## Starship :simple-starship:

I use [Starship](https://starship.rs/){:rel="nofollow"} to make my prompt clean, informative, and cat-friendly.

It gives me:

- Git integration
- Current directory, language versions, etc.
- A beautiful, minimal style

And of course it includes a cat icon.

[Find my starship.toml config here](https://github.com/hanndoddi/dotfiles/blob/main/.config/starship.toml){:rel="nofollow"}

---

## Zsh :shell:

I use [Zsh](https://www.zsh.org/){:rel="nofollow"} because it’s highly configurable and offers smart completion, syntax highlighting, and autosuggestions. It's a joy to use once it’s tuned right.

### Config

[Find my .zshrc config here](https://github.com/hanndoddi/dotfiles/blob/main/.zshrc){:rel="nofollow"}

#### keybinds

- Fuzzy finder-fzf `ctrl+r`: search history `ctrl+t`: search files `alt+c`: search directories
- In fzf I use `ctrl+j and k` to navigate up and down and `ctrl+l` to accept a line.
- In fzf-tab I do the same use `ctrl+j and k` to navigate up and down and `ctrl+l` to accept a line.
- For auto suggestion I use `ctrl+l` to accept.
- `ctrl+j` or `ctrl+m`: accept-line (like pressing Enter)
- `ctrl+g`: clear screen

#### Aliases

- `lg`: open lazygit
- `multipull`: git pull from multiple directories
- `terminaldoom`: play Doom in the terminal, why? because every terminal needs Doom.

---

## Terminal Tools :fontawesome-solid-toolbox:

These are some of the tools I use regularly in the terminal:

- [`git`](https://git-scm.com/){:rel="nofollow"} : for version control and collaborating across projects
- [`glow`](https://github.com/charmbracelet/glow){:rel="nofollow"} : to preview Markdown directly in the terminal
- [`fzf`](https://github.com/junegunn/fzf){:rel="nofollow"} : fuzzy finder for quick file and history navigation
- [`batcat`](https://github.com/sharkdp/bat){:rel="nofollow"} : a better `cat` with syntax highlighting and line numbers
- [`lazygit`](https://github.com/jesseduffield/lazygit){:rel="nofollow"} : a TUI for Git that’s simple and powerful
- [Yazi](https://github.com/sxyazi/yazi) — Terminal file manager with fast navigation and image previews.
- [hollywood](https://github.com/dustinkirkland/hollywood) - to look like a hacker

These tools help me move fast, automate tasks, and stay in flow.

!!! tip "Command got you confused?"
    Paste it into [explainshell.com](https://explainshell.com/){:rel="nofollow"} to see what each part does.

