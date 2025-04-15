---
date: 2022-12-08
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

# git terminal journey

This is document with usefull things I've learned in the terminal mostly git stuff but also includes some general terminal stuff. As a terminal I'm using GitBash.

[good git cheat sheet](https://wizardzines.com/git-cheat-sheet.pdf)

<!-- more -->

## git command to see commit tree

Git log is a usefull comannd to list commit history

With command below you can get a more grapic view of this history.

 ``git log --graph --oneline --all``

 - https://stackoverflow.com/questions/1064361/unable-to-show-a-git-tree-in-terminal
 - https://gitready.com/intermediate/2009/01/26/text-based-graph.html
 - https://stackoverflow.com/questions/1838873/visualizing-branch-topology-in-git
 - https://www.geeksforgeeks.org/how-to-visualizing-branch-topology-in-git/
 - 

## doble tapping tab shows all posiiblities

*doble tapping tab*

 **Display all 2588 possibilities? (y or n)**

- https://unix.stackexchange.com/questions/171489/shell-display-all-2588-possibilities


## git add dot

 seams like it better to use git add . when pushing to github so it looks at the .gitinre file.

 [What does the 'git add .' ('git add' single dot) command do?](https://stackoverflow.com/questions/16969768/what-does-the-git-add-git-add-single-dot-command-do)
 

## Undoing things in git

### way 1 git reset

doing git reset head~<nr steps> --hard this goes back and deleates all changes

### way 2 git checkout

doing git checkout to the commit youwant and then doing a commit naming a new branch. When that is done you rename the main brach to some thing like old-main.
aafter that you can rename the branch made to main.

- google
  - git how to move main to another branch without merge
  - git how to create a branch

- [great video what to do](https://www.youtube.com/watch?v=H2DuJNWbqLw)
- [hot to name branch](https://stackoverflow.com/questions/74574422/git-how-move-main-branch-to-another-branch-and-clean-the-main-branch)
- 


### What's the difference between HEAD^ and HEAD~

adding ~ behind head moves back the numer of steps you want you can also add commit id.

- https://stackoverflow.com/questions/2221658/whats-the-difference-between-head-and-head-in-git



