---
date: 2025-03-24
authors: [Þórarinn]
description: >
  let reverse this elf
#draft: true
categories:
  - terminal
  - journey
---

# 🔍 Round 1: Reverse Engineering an .elf file

In this session, we explored how to **reverse engineer an Arduino blink sketch** from its **compiled binary files** using various tools like **GDB, avr-objdump, and strings**.

![elf](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/bcd161ac-814c-4827-94fc-f6e63e584f9d/d351a5x-0570f2e5-f1c4-4fad-abab-db6902e5e29e.jpg){width=50%}

<!-- more -->
---

## 1️⃣ Extracting and Viewing Compiled Code  

When you compile an **Arduino `.ino` sketch**, it goes through several stages: 

### Arduino Compilation Process (Step-by-Step)
When you upload or verify a sketch in the Arduino IDE, this is what happens:

1️⃣ You write your .ino file

- This is your original Arduino sketch with comments.
  
2️⃣ Arduino converts the .ino file into a .cpp file

- Adds #include <Arduino.h> at the top.
- Adds function prototypes automatically.
- Keeps all your comments and formatting.
- This is what you see inside /tmp/arduino/sketches/.
  
3️⃣ The .cpp file is compiled into an .elf file

- The compiler removes comments since they are not needed for execution.
- The resulting .elf file is a binary with debugging symbols (if enabled).
- GDB reads this .elf file, which is why comments don’t appear in list setup.

4️⃣ The .elf file is turned into a .hex file

- The .hex file is the final machine code that gets uploaded to your Arduino.

### table with the stages

| **File Type** | **Stage** | **Contains?** |
|--------------|----------|--------------|
| `.ino` | Original Sketch | ✅ Full code with comments |
| `.cpp` | Converted C++ Code | ✅ Code + comments (before compilation) |
| `.elf` | Compiled Binary with Debug Symbols | ❌ No comments, but keeps function names |
| `.hex` | Final Machine Code | ❌ Just raw instructions |

Run this command to disassemble with function names and register info:

```bash
avr-objdump -d -m avr sketch_feb18a_binary_view.ino.elf
```
- This will show labels for functions, making it easier to follow.

### Enable Debug Symbols in Arduino

To check if the ELF file contains debugging symbols (source code references), run:

```bash
avr-readelf -S sketch_feb18a_binary_view.ino.elf
```

Look for a section like .debug_info or .stab. If these are missing, it means the debug symbols were removed during compilation.

If you enable "verbose output during compile", it will:
> To do this go to Arduino Preferences and check "show verbose output during ```compile``` 

- Show the exact compiler commands used by the Arduino IDE.
- Help verify whether the -g flag is actually applied after modifying platform.txt.
- Allow you to see which files are being compiled and linked.

### CPP

To locate the **temporary `.cpp` file** generated by the Arduino IDE, use:  
```bash
find /tmp/arduino/sketches/ -name "*.cpp"
```
Then open it:

```bash
cat /tmp/arduino/sketches/XXX/sketch.ino.cpp
```
This file contains your full Arduino sketch before compilation.

### avr-objdump 

Since the .elf file now has debugging info, let's try disassembling it with source code mixed in:
```bash
avr-objdump -S -m avr /tmp/arduino/sketches/8534B750395F4456786188B674E891FB/sketch_feb18a_binary_view.ino.elf
```

To dump the entire source code mixed with assembly, run:

```bash
avr-objdump -SC -m avr /tmp/arduino/sketches/8534B750395F4456786188B674E891FB/sketch_feb18a_binary_view.ino.elf > full_code.txt
```


## 🛠 2️⃣ Using GDB to Analyze the Compiled .elf File

To debug the compiled Arduino binary, we used GDB (avr-gdb):

```bash
avr-gdb /tmp/arduino/sketches/XXX/sketch.ino.elf
```
### Useful GDB commands

```gdb
list                # list code 10 lines at a time
list 1              # restart list to start from beginning
list setup          # Shows the setup() function
list loop           # Shows the loop() function
info functions      # Lists all functions in the binary
print variable      # Prints a variable's value
directory /tmp/...  # Points GDB to the correct source folder
quit                # end the session

```
If you want to see the full file, use:

```gdb
while 1
  list
end
```

✅ This allowed us to recover partial C code and inspect program execution.

## 3️⃣ Extracting Hidden Comments from the Compiled Binary

Since normal comments are stripped during compilation, we found ways to embed hidden messages that survive in the binary.

✅ Trick: Using PROGMEM to Hide Comments

```cpp
const char debug_comment1[] PROGMEM = "Þetta er falið comment.";
const char debug_comment2[] PROGMEM = "Er ekki Reverse engineering skemmtilegt!";
```

✅ Finding Hidden Messages in the Binary

```bash
strings sketch.elf | grep "ekki"
```
or

```bash
avr-objdump -s -j .progmem sketch.elf | grep "Þetta"
```

🔥 This confirmed that "hidden comments" survived compilation. 🔥

## 4️⃣ Exploring the .hex File

The ```.hex``` file is the final machine code that gets uploaded to the Arduino. Unlike ```.elf```, it does not contain function names or debug symbols.

We learned that reverse engineering a ```.hex``` file is possible, but harder because:

- Only raw machine instructions are left
- Function names are gone
- We must reconstruct functions manually

## 🛠 Tools Used

| Tool          | Purpose                             |
|---------------|-------------------------------------|
| GDB (avr-gdb) | Debugging compiled .elf files, listing functions, stepping through code.      |
| avr-objdump   | Disassembly + mixed C/assembly view |
| strings       | Searching for hidden messages       |
| avr-objcopy   | Converting .hex to raw binary       |


## Next Steps: Reverse Engineering the .hex File (Round 2)

Goal: analyze and recover code from a .hex file without using an .elf

- Can we reconstruct setup() and loop() manually?
- Can we find hidden PROGMEM messages in .hex?
- Can we understand raw machine code without function names?

😈 Let’s dig deeper into low-level reverse engineering.

## Summary 
- Recovered ```.cpp`` files from Arduino's temp build directory.
- Used GDB to analyze and extract function names from ```.elf```.
- Embedded "hidden comments" using PROGMEM and successfully extracted them from the binary.
- Explored ```.hex``` files and prepared for the next phase: pure machine code reversing.

