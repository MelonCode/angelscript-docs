---
title: Formatted Strings
description: String formatting in Angelscript with f-strings
---

Scripts have support for writing formatted string literals in order to place the value of variables or expressions within a string.
This can be especially useful for logging or debugging.

The syntax and format specifiers are heavily inspired by [Python's f-string feature](https://peps.python.org/pep-0498/).

Formatted strings are declared with the prefix `f""`, and expression values to interpolate are contained within `{}`.
Curly braces inside formatted strings can be escaped by doubling up. That is, `f"{{"` is equivalent to `"{"`.

An example of some of the usages:

```typescript
// Format Strings begin with f" and can hold expressions
// inside braces to replace within the string.
Print(f"Called from actor {GetName()} at location {ActorLocation}");

// Adding a = at the end of the expression will print the expression first
// For example:
Print(f"{DeltaSeconds =}");
// This prints:
//   DeltaSeconds = 0.01

// Format specifiers can be added following similar syntax to python's f-strings:
Print(f"Three Decimals: {ActorLocation.Z :.3}"); // Format float at three decimals of precision

Print(f"Extended to 10 digits with leading zeroes: {400 :010d}"); // 0000000400
Print(f"Hexadecimal: {20 :#x}"); // 0x14
Print(f"Binary: {1574 :b}"); // 11000100110
Print(f"Binary 32 Bits: {1574 :#032b}"); // 0b00000000000000000000011000100110

// Alignment works too
Print(f"Aligned: {GetName() :>40}"); // Adds spaces to the start of GetName() so it is 40 characters
Print(f"Aligned: {GetName() :_<40}"); // Adds underscores to the end of GetName() so it is 40 characters

// You can combine the equals with a format specifier
Print(f"{DeltaSeconds =:.0}");
// This prints:
//   DeltaSeconds = 0

// Enums by default print a full debug string
Print(f"{ESlateVisibility::Collapsed}"); // "ESlateVisibility::Collapsed (1)"
// But the 'n' specifier prints only the name of the value:
Print(f"{ESlateVisibility::Collapsed :n}"); // "Collapsed"
```
