---
title: Structs and References
description: Working with structs and references in Angelscript
---

Classes declared in script are always types of `UObject`, and are part of unreal's normal object system and garbage collector.

You can also make structs in script, which behave as value types:

```typescript
struct FExampleStruct
{
    /* Properties with UPROPERTY() in a struct will be accessible in blueprint. */
    UPROPERTY()
    float ExampleNumber = 4.0;

    UPROPERTY()
    FString ExampleString = "Example String";

    /* Properties without UPROPERTY() will still be in the struct, but cannot be seen by blueprint. */
    float ExampleHiddenNumber = 3.0;
};
```

> **Note:** Unlike classes, structs cannot have `UFUNCTION()`s. They _can_ have plain script methods on them however, although they will not be usable from blueprint.

## Passing and Returning Structs

Structs can be passed and returned from script functions and `UFUNCTION`s as normal:

```typescript
UFUNCTION()
FExampleStruct CreateExampleStruct(float Number)
{
    FExampleStruct ResultStruct;
    ResultStruct.ExampleNumber = Number;
    ResultStruct.ExampleString = f"{Number}";

    return ResultStruct;
}

UFUNCTION(BlueprintPure)
bool IsNumberInStructEqual(FExampleStruct Struct, float TestNumber)
{
    return Struct.ExampleNumber == TestNumber;
}
```

## Struct References

By default, argument values in script functions are read-only.
That means properties of a struct parameter cannot be changed, and non-const methods cannot be called on it.

If needed, you can take a reference to a struct to modify it:

```typescript
// Change the parameter struct so its number is randomized between 0.0 and 1.0
UFUNCTION()
void RandomizeNumberInStruct(FExampleStruct& Struct)
{
    Struct.ExampleNumber = Math::RandRange(0.0, 1.0);
}
```

## Declaring Out Parameters

When a function with a struct reference is called from a blueprint node, the struct will be passed as an input value.

When you want a struct parameter to be an ouput value only, declare the reference as `&out` in script. This works to create output pins for primitives as well:

```typescript
UFUNCTION()
void OutputRandomizedStruct(FExampleStruct&out OutputStruct, bool&out bOutSuccessful)
{
    FExampleStruct ResultStruct;
    ResultStruct.ExampleNumber = Math::RandRange(0.0, 1.0);

    OutputStruct = ResultStruct;
    bOutSuccessful = true;
}
```

## Automatic References for Function Parameters

As an implementation detail: script functions never take struct parameters by value.  
When you declare a struct parameter, it is internally implemented as a const reference, as if you added `const &`.

This means there is no difference between an `FVector` parameter and a `const FVector&` parameter. Both behave exactly the same in performance and semantics.

This choice was made to improve script performance and avoid having to instruct gameplay scripters to write `const &` on all their parameters.
