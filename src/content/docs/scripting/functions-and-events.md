---
title: Functions and Blueprint Events
description: Creating and using functions and events in Angelscript
---

## Plain Script Functions

Functions can be declared as methods in a class or globally.
By default any function you declare can only be called from script and is not accessible to blueprint.

```typescript
class AExampleActor : AActor
{
    void MyMethod()
    {
        MyGlobalFunction(this);
    }
}

void MyGlobalFunction(AActor Actor)
{
    if (!Actor.IsHidden())
    {
        Actor.DestroyActor();
    }
}
```

## Functions that can be called from Blueprint

To make it so a function can be called from blueprint, add a `UFUNCTION()` specifier above it.

```typescript
class AExampleActor : AActor
{
    UFUNCTION()
    void MyMethodForBlueprint()
    {
        Print("I can be called from a blueprint!");
    }
}
```

> **Note:** Unlike in C++, it is not necessary to specify `BlueprintCallable`, it is assumed by default.

## Overriding BlueprintEvents from C++

To override a Blueprint Event declared from a C++ parent class, use the `BlueprintOverride` specifier.
You will use this often to override common events such as `BeginPlay` or `Tick`:

```typescript
class AExampleActor : AActor
{
    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        Print("I am a BeginPlay override");
    }

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaSeconds)
    {
        Print("I get called every tick");
    }
}
```

The visual studio code extension has helpers for easily overriding blueprint events from parent classes.

When the cursor is within a class, you can click the Lightbulb icon (or press <kbd>Ctrl</kbd> + <kbd>.</kbd> by default) to choose a function to override.

> **Note:** For C++ functions that don't explicitly specify a `ScriptName` meta tag, some name simplification is automatically done to remove common prefixes.  
> For example, the C++ event is called `ReceiveBeginPlay`, but the preceeding `Receive` is removed and it just becomes `BeginPlay` in script.  
> Other prefixes that are removed automatically are `BP_`, `K2_` and `Received_`.

## Overriding a Script Function from Blueprint

Often you will want to create a blueprint that inherits from a script parent class.
In order to make a function so it can be overridden from a child blueprint, add the `BlueprintEvent` specifier.

```typescript
class AExampleActor : AActor
{
    UFUNCTION(BlueprintEvent)
    void OverridableFunction()
    {
        Print("This will only print if not overridden from a child BP.");
    }
}
```

> **Note:** Script has no split between `BlueprintImplementableEvent` and `BlueprintNativeEvent` like C++ has.
> All script functions require a base implementation, although it can be left empty.

### Tip: Separate Blueprint Events

One pattern that is employed often in Unreal is to have separate base and blueprint events.
This way you can guarantee that the script code always runs in addition to nodes in the child blueprint, and you will never run into issues if the blueprint hasn't done "Add call to parent function".

For example, a pickup actor might do:

```typescript
class AExamplePickupActor : AActor
{
    void PickedUp()
    {
        // We always want this script code to run, even if our blueprint child wants to do something too
        Print(f"Pickup {this} was picked up!");
        SetActorHiddenInGame(false);

        // Call the separate blueprint event
        BP_PickedUp();
    }

    // Allows blueprints to add functionality, does not contain any code
    UFUNCTION(BlueprintEvent, DisplayName = "Picked Up")
    void BP_PickedUp() {}
}
```

## Global Functions

Any script function in global scope can also have `UFUNCTION()` added to it.
It will then be available to be called from any blueprint like a static function.

This lets you create functions not bound to a class, similar to how Blueprint Function Libraries work.

```typescript
// Example global function that moves an actor somewhat
UFUNCTION()
void ExampleGlobalFunctionMoveActor(AActor Actor, FVector MoveAmount)
{
    Actor.ActorLocation += MoveAmount;
}
```

> **Tip:** Comments above function declarations become tooltips in blueprint, just like in C++

## Calling Super Methods

When overriding a script function with another script function, you can use the same `Super::` syntax from Unreal C++ to call the parent function.
Note that script methods can be overridden without needing `BlueprintEvent` on the base function (all script methods are virtual). However, when overriding a `BlueprintEvent`, you _will_ need to specify `BlueprintOverride` on the overrides.

```typescript
class AScriptParentActor : AActor
{
    void PlainMethod(FVector Location)
    {
        Print("AScriptParentActor::PlainMethod()");
    }

    UFUNCTION(BlueprintEvent)
    void BlueprintEventMethod(int Value)
    {
        Print("AScriptParentActor::BlueprintEventMethod()");
    }
}

class AScriptChildActor : AScriptParentActor
{
    // Any script method can be overridden
    void PlainMethod(FVector Location) override
    {
        Super::PlainMethod(Location);
        Print("AScriptChildActor::PlainMethod()");
    }

    // Overriding a parent BlueprintEvent requires BlueprintOverride
    UFUNCTION(BlueprintOverride)
    void BlueprintEventMethod(int Value)
    {
        Super::BlueprintEventMethod(Value);
        Print("AScriptChildActor::BlueprintEventMethod()");
    }
}
```

> **Note:** When overriding a C++ `BlueprintNativeEvent`, it is not possible to call the C++ Super method due to a technical limitation. You can either prefer creating `BlueprintImplementEvent`s, or put the base implementation in a separate callable function.
