---
title: Subsystems
description: Creating and using subsystems in Angelscript
---

[Subsystems](https://docs.unrealengine.com/5.0/en-US/unreal-engine-subsystems/) are a Unreal's way to create singletons that collect common functionality. They can be accessed by using the `USubsystemClass::Get()` method:

```typescript
// World Subsystem
UWorldSubsystem MySubsystem = UMyWorldSubsystem::Get();
// Game Instance Subsystem
UMyGameInstanceSubsystem GISubsystem = UMyGameInstanceSubsystem::Get();
// Local Player Subsystem
UMyLocalPlayerSubsystem LPSubsystem = UMyLocalPlayerSubsystem::Get();
// Engine Subsystem
UMyEngineSubsystem EngineSubsystem = UMyEngineSubsystem::Get();
// Editor Subsystem, only available in editor
UMyEditorSubsystem EditorSubsystem = UMyEditorSubsystem::Get();
```

> **Note:** Subsystems can be created in script as well as in C++.

> **Warning:** Many subsystems are editor specific and cannot be used in packaged game builds. You need to make sure that the subsystem you're using is in a runtime module and not in an editor-only module.

## Creating Subsystems in Script

```typescript
// A world subsystem
class UMyWorldSubsystem : UWorldSubsystem
{
    // USubsystem interface
    UFUNCTION(BlueprintOverride)
    void Initialize(FSubsystemCollectionBase& Collection)
    {
        // Initialization code
    }

    UFUNCTION(BlueprintOverride)
    void Deinitialize()
    {
        // Cleanup code
    }
    // End USubsystem interface

    // My custom method that calls into other subsystems
    UFUNCTION()
    void MyCustomMethod()
    {
        // We can access other subsystems.
        UGameplayStatics::GetGameInstance(this).GetSubsystem(UMyGameInstanceSubsystem::StaticClass());
    }
}

// A game instance subsystem
class UMyGameInstanceSubsystem : UGameInstanceSubsystem
{
    // ...
}

// A local player subsystem
class UMyLocalPlayerSubsystem : ULocalPlayerSubsystem
{
    // ...
}

// An engine subsystem
class UMyEngineSubsystem : UEngineSubsystem
{
    // ...
}

// An editor subsystem
class UMyEditorSubsystem : UEditorSubsystem
{
    // ...
}
```
