---
title: Subsystems
description: Creating and using subsystems in Angelscript
---

# Subsystems

Subsystems are one of unreal's ways to collect common functionality into easily accessible singletons.
See the [Unreal Documentation on Programming Subsystems](https://docs.unrealengine.com/5.1/en-US/programming-subsystems-in-unreal-engine/) for more details.

## Using a Subsystem

Subsystems in script can be retrieved by using `USubsystemClass::Get()`.

```angelscript
void TestCreateNewLevel()
{
    auto LevelEditorSubsystem = ULevelEditorSubsystem::Get();
    LevelEditorSubsystem.NewLevel("/Game/NewLevel");
}
```

> **Note:** Many subsystems are _Editor Subsystems_ and cannot be used in packaged games.
> Make sure you only use editor subsystems inside [Editor-Only Script](/scripting/editor-script/).

## Creating a Subsystem

To allow creating subsystems in script, helper base classes are available to inherit from that expose overridable functions.
These are:

- `UScriptWorldSubsystem` for world subsystems
- `UScriptGameInstanceSubsystem` for game instance subsystems
- `UScriptLocalPlayerSubsystem` for local player subsystems
- `UScriptEditorSubsystem` for editor subsystems
- `UScriptEngineSubsystem` for engine subsystems

For example, a scripted world subsystem might look like this:

```angelscript
class UMyGameWorldSubsystem : UScriptWorldSubsystem
{
    UFUNCTION(BlueprintOverride)
    void Initialize()
    {
        Print("MyGame World Subsystem Initialized!");
    }

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaTime)
    {
        Print("Tick");
    }

    // Create functions on the subsystem to expose functionality
    UFUNCTION()
    void LookAtMyActor(AActor Actor)
    {
    }
}

void UseMyGameWorldSubsystem()
{
    auto MySubsystem = UMyGameWorldSubsystem::Get();
    MySubsystem.LookAtMyActor(nullptr);
}
```

Any `UFUNCTION`s you've declared can also be accessed from blueprint on your subsystem:

![](/img/scripted-subsystem.png)

## Local Player Subsystems

In case of local player subsystems, you need to pass which `ULocalPlayer` to retrieve the subsystem for into the `::Get()` function:

```angelscript
class UMyPlayerSubsystem : UScriptLocalPlayerSubsystem
{
}

void UseScriptedPlayerSubsystem()
{
    ULocalPlayer RelevantPlayer = Gameplay::GetPlayerController(0).LocalPlayer;
    auto MySubsystem = UMyPlayerSubsystem::Get(RelevantPlayer);
}
```

> **Note:** It is also possible to directly pass an `APlayerController` when retrieving a local player subsystem.
