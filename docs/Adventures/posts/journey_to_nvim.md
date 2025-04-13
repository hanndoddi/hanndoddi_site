---
date: 2024-12-08
#authors: [Þórarinn]
description: >
  let problemsolve
#draft: true
#categories:
#  - YouTube Videos
#  - Material for MkDocs
#tags:
#  - YouTube
#  - Material for MkDocs
---

Markdown Enhancements for Neovim
Live Preview – View your Markdown in a browser while editing.
Auto-Completion & Formatting – Ensure lists, tables, and checkboxes auto-complete.
Folding & TOC Generation – Easily navigate large Markdown files.
Better Syntax Highlighting – Improve readability.
Keybindings – Speed up workflow (e.g., bold, italics, code blocks).
Exporting – Convert Markdown to HTML, PDF, or other formats.



# things to fix

Your :checkhealth output reveals a few issues that we should address:

Critical Issues
nvim-treesitter requires Neovim 0.10 or newer

You're using Neovim 0.9.x or older (but Treesitter needs 0.10+).
Solution: Upgrade Neovim to the latest version.
Task lists ([ ] and [x]) still aren't working

The correct setting for task lists in vim-markdown is:
lua
Copy
Edit
vim.g.vim_markdown_task_lists = 1
Solution: Ensure this is inside your config = function() block.
Warnings You Might Want to Fix
luarocks not installed

Fix: If you need luarocks, install it:
bash
Copy
Edit
sudo apt install luarocks
Otherwise, disable it in your Lazy.nvim config:
lua
Copy
Edit
opts.rocks.enabled = false
pynvim is outdated (0.5.0 instead of 0.5.2)

Fix: Update it with:
bash
Copy
Edit
pip3 install --upgrade pynvim
fd is missing (used by Telescope for better file searching)

Fix: Install it with:
bash
Copy
Edit
sudo apt install fd-find
neovim npm package is missing (for Node.js plugins)

Fix: Install it with:
bash
Copy
Edit
npm install -g neovim
Perl provider warning (Neovim::Ext module missing)

If you don’t use Perl in Neovim, disable it in init.lua:
lua
Copy
Edit
vim.g.loaded_perl_provider = 0
Otherwise, install the missing module:
bash
Copy
Edit
cpan install Neovim::Ext
Next Steps
Upgrade Neovim first (this is the biggest issue).
Sync Lazy.nvim again:
bash
Copy
Edit
nvim
:Lazy sync
Re-test task lists (- [ ] Task)
If still not working, try :verbose set conceallevel? inside Neovim.
Let me know if you need help upgrading Neovim! 🚀