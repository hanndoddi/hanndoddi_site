# Terminal

The terminal is where I feel most at home. I prefer tools that are fast, keyboard-driven, and easy to customize.

---

## Kitty <span class="icon"></span>

My terminal emulator of choice is [Kitty](https://sw.kovidgoyal.net/kitty/). Yes, the name and cat icon won me over, but it's also genuinely fast, GPU-accelerated, and super customizable.

It works great with Neovim and supports features like:
- Tabbed layouts
- Graphics in the terminal
- Configurable keybindings
- Fast startup and rendering

#### keybinds

- ```ctrl```+```shift```+```t``` = new tab  
- ```ctrl```+```shift```+```w``` = close tab  
- ```ctrl```+```shift```+```n``` = new tab in same directory 
- ```ctrl```+```shift```+```enter``` = split window

### config

I don’t customize Kitty much. I use the MesloLGM Nerd Font to support icons, hide the border, and enable transparency. I also use a custom theme.


[My kitty config can be found here](https://github.com/hanndoddi/dotfiles/tree/main/.config/kitty)

---

## Starship 

I use [Starship](https://starship.rs/) to make my prompt clean, informative, and cat-friendly.

It gives me:
- Git integration
- Current directory, language versions, etc.
- A beautiful, minimal style

And of course it includes a cat icon.

[Find my starship.toml config here](https://github.com/hanndoddi/dotfiles/blob/main/.config/starship.toml)

---

## Zsh <span class="icon">󱎃</span>

I use [Zsh](https://www.zsh.org/) because it’s highly configurable and offers smart completion, syntax highlighting, and autosuggestions. It's a joy to use once it’s tuned right.

### Config

[Find my .zshrc config here](https://github.com/hanndoddi/dotfiles/blob/main/.zshrc)

#### keybinds

- Fuzzy finder-fzf ```ctrl+r```: search history ```ctrl+t```: search files ```alt+c```: search directories 
- In fzf I use ```ctrl+j and k``` to navigate up and down and ```ctrl+l``` to accept a line.
- In fzf-tab I do the same use ```ctrl+j and k``` to navigate up and down and ```ctrl+l``` to accept a line.
- For auto suggestion I use ```ctrl+l``` to accept.
- `ctrl+j` or `ctrl+m`: accept-line (like pressing Enter)
- ```ctrl+g```: clear screen

#### Aliases

- `lg`: open lazygit  
- `multipull`: git pull from multiple directories  
- `terminaldoom`: play Doom in the terminal, why? because every terminal needs Doom.


---

## Terminal Tools <span class="icon"></span>

These are some of the tools I use regularly in the terminal:

- [`git`](https://git-scm.com/): for version control and collaborating across projects  
- [`glow`](https://github.com/charmbracelet/glow): to preview Markdown directly in the terminal  
- [`fzf`](https://github.com/junegunn/fzf): fuzzy finder for quick file and history navigation  
- [`batcat`](https://github.com/sharkdp/bat): a better `cat` with syntax highlighting and line numbers  
- [`lazygit`](https://github.com/jesseduffield/lazygit): a TUI for Git that’s simple and powerful  
- `hollywood`: to look like a hacker

These tools help me move fast, automate tasks, and stay in flow.
