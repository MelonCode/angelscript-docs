---
title: Delegates and Events
description: Working with delegates and events in Angelscript
---

## Delegates

You must first declare a delegate type to indicate what parameters and return value your delegate wants.  
In global scope:

```typescript
// Declare a new delegate type with this function signature
delegate void FExampleDelegate(UObject Object, float Value);
```

From there, you can pass around values of your delegate type, bind them, and execute them:

```typescript
class ADelegateExample : AActor
{
    FExampleDelegate StoredDelegate;

    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // Bind the delegate so executing it calls this.OnDelegateExecuted()
        StoredDelegate.BindUFunction(this, n"OnDelegateExecuted");

        // You can also create new bound delegates by using the constructor:
        StoredDelegate = FExampleDelegateSignature(this, n"OnDelegateExecuted");
    }

    UFUNCTION()
    private void OnDelegateExecuted(UObject Object, float Value)
    {
        Print(f"Delegate was executed with object {Object} and value {Value}");
    }

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaSeconds)
    {
        // If the delegate is bound, execute it
        StoredDelegate.ExecuteIfBound(this, DeltaSeconds);
    }
}
```

> **Note:** A `delegate` declaration is equivalent to a `DECLARE_DYNAMIC_DELEGATE()` macro in C++.
> Functions bound to delegates are required to be declared as `UFUNCTION()`.

## Events

Events are similar to delegates, but can have multiple functions added to them, rather than always being bound to only one function.

Declare events with the `event` keyword in global scope, then use `AddUFunction()` and `Broadcast()`:

```typescript
event void FExampleEvent(int Counter);

class AEventExample : AActor
{
    UPROPERTY()
    FExampleEvent OnExampleEvent;

    private int CallCounter = 0;

    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // Add two functions to be called when the event is broadcast
        OnExampleEvent.AddUFunction(this, n"FirstHandler");
        OnExampleEvent.AddUFunction(this, n"SecondHandler");
    }

    UFUNCTION()
    private void FirstHandler(int Counter)
    {
        Print("Called first handler");
    }

    UFUNCTION()
    private void SecondHandler(int Counter)
    {
        Print("Called second handler");
    }

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaSeconds)
    {
        CallCounter += 1;
        OnExampleEvent.Broadcast(CallCounter);
    }
}
```

> **Note:** An `event` declaration is equivalent to a `DECLARE_DYNAMIC_MULTICAST_DELEGATE()` macro in C++.
> Functions added to events are required to be declared as `UFUNCTION()`.

### Events in Blueprint

By declaring `OnExampleEvent` as a `UPROPERTY()` in the previous example, we allow it to be accessed from blueprint.
For events this means it will appear in the `Event Dispatchers` list for actors in the level, and we can bind it from the level blueprint.

### Tip: Automatic signature generation in Visual Studio Code

If you bind a delegate or add a function to an event, and the function does not exist yet, the visual studio code extension will try to offer to create it for you.

Click the lightbulb icon or press <kbd>Ctrl</kbd> + <kbd>.</kbd>, and select the `Generate Method` option from the code actions dropdown.
