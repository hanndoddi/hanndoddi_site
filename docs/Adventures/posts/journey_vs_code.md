---
date: 2021-12-08
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
# VS Code Journey
git cli

This is document with things I`ve learned and change in VS code to adapt it to my work flow for more effecentsy and speed.

## short cuts

### A way to close and open the terminal
``ctrl+j``

## making terminal fullscreen presing again changes back to editor

- https://stackoverflow.com/questions/48511956/toggle-between-fullscreen-editor-and-terminal-in-vs-code
- 
``ctrl+shift+m`` this I had to add into the keybinding.json file.

```JSON 
{
    "key": "ctrl+alt+m",
    "command": "workbench.action.toggleMaximizedPanel"
 }
```

## focus editor terminal

- https://superuser.com/questions/1270103/how-to-switch-the-cursor-between-terminal-and-code-in-vscode 

``ctrl+<`` swicting focus between terminal and editor. Json link below

```json
    {
        "key": "ctrl+oem_102",
        "command": "workbench.action.focusActiveEditorGroup",
        "when": "terminalFocus"
    },
    {
        "key": "ctrl+oem_102",
        "command": "terminal.focus",
        "when": "!terminalFocus"
    },
```

## remaping using autohotkey or power toyes

Adding code block you have to use this topcomma *`* alot its not on my keyboard so ive remaped it I used the  qustion mark but can now see its a problem.
[topic on this matter](https://superuser.com/questions/406211/how-to-make-if-its-possible-character-on-windows-without-alt-96)

alt 96     `

come back to it later right now it's unresolved

https://www.freecodecamp.org/news/alt-codes-special-characters-keyboard-symbols-windows-list/ 
