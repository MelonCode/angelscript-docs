---
title: Function Libraries
description: Using function libraries to access Unreal Engine functionality
---

Interacting with unreal from scripts often happens through function libraries.
These are exposed to script as namespaces containing a set of related functions.

For example, to set a timer you can call `System::SetTimer()`:

```angelscript
class ATimerExample : AActor
{
    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // Execute this.OnTimerExecuted() after 2 seconds
        System::SetTimer(this, n"OnTimerExecuted", 2.0, bLooping = false);
    }

    UFUNCTION()
    private void OnTimerExecuted()
    {
        Print("Timer executed!");
    }
}
```

### Common Libraries

Clicking the library will bring you to the API documentation for them, listing the available functions:

- [Math::](/api/index.html#CClass:Math) - All standard math functionality
- [Gameplay::](/api/index.html#CClass:Gameplay) - Game functionality such as streaming, damage, player handling
- [System::](/api/index.html#CClass:System) - Engine functionality such as timers, traces, debug rendering
- [Niagara::](/api/index.html#CClass:Niagara) - Spawning and controlling particle systems
- [Widget::](/api/index.html#CClass:Widget) - UMG widget functionality

### Namespace Simplification

The functions for function libraries in script are automatically taken from blueprint function library classes in C++.

Before binding, the angelscript plugin simplifies the name of the class to make a shorter namespace.
For example, the functions in the `System::` namespace are automatically sourced from the `UKismetSystemLibrary` class in C++.

Common prefixes and suffixes that get stripped automatically are:

- U...Statics
- U...Library
- U...FunctionLibrary
- UKismet...Library
- UKismet...FunctionLibrary
- UBlueprint...Library
- UBlueprint...FunctionLibrary

For some examples of how namespaces are simplified:

- `UNiagaraFunctionLibrary` becomes `Niagara::`
- `UWidgetBlueprintLibrary` becomes `Widget::`
- `UKismetSystemLibrary` becomes `System::`
- `UGameplayStatics` becomes `Gameplay::`

### Math Library

Because blueprint and C++ have fairly different ways of doing math code, we have decided to keep the `Math::` namespace in script closer to the C++ `FMath::` namespace in general.

Sticking closer to C++ math eases the transition for experienced programmers and lets code be ported between the two more easily.

This means that `UKismetMathLibrary` gets ignored for automatic binding.
