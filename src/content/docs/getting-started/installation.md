---
title: Installation
description: How to install and set up UnrealEngine-Angelscript
---

Follow these steps to set up Angelscript for Unreal Engine:

### Engine Setup

You have two options:

1. Use the pre-built engine binaries if available
2. Compile the engine yourself from source

#### Using Pre-built Binaries

If pre-built engine binaries are available for your platform, you can download them from the project's distribution channels. Follow the standard Unreal Engine installation process.

#### Compiling from Source

To compile from source:

1. Clone the UnrealEngine-Angelscript repository:

   ```bash
   git clone --recursive https://github.com/Hazelight/UnrealEngine-Angelscript.git
   ```

2. Follow the standard compilation instructions for Unreal Engine for your platform

   - For Windows, run `Setup.bat` and then `GenerateProjectFiles.bat`, then open the solution and build
   - For macOS, run `Setup.sh` and then `GenerateProjectFiles.sh`, then open the project and build
   - For Linux, run `Setup.sh` and then `GenerateProjectFiles.sh`, then use make to build

3. Once the engine is built, you can create or open a project with it

### Project Setup

Once you have the engine installed:

1. Create a new project or open an existing one with the custom engine
2. The plugin should be automatically enabled for your project

### Installing the VS Code Extension

For the best development experience, install the VS Code extension:

1. Install [Visual Studio Code](https://code.visualstudio.com/) if you haven't already
2. Install the [Unreal Angelscript Extension](https://marketplace.visualstudio.com/items?itemName=Hazelight.unreal-angelscript) from the VS Code Marketplace
3. The extension provides features like:
   - Code completion
   - Error checking
   - Go to definition
   - Find references
   - Debugging support

### Verifying Installation

To verify that everything is set up correctly:

1. Create a new script file in your project's `Script/` folder (it will be created automatically when you first open the project)
2. Add a simple actor class:
   ```typescript
   class ATestActor : AActor
   {
   }
   ```
3. Save the file and check that it appears in the Unreal Editor's Place Actors panel

### Next Steps

Now that you have installed Angelscript for Unreal Engine, you can proceed to the [Scripting Introduction](/getting-started/introduction/) to learn how to use it.
