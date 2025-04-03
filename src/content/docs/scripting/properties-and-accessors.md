---
title: Properties and Accessors
description: Working with properties and property accessors in Angelscript
---

## Script Properties

Properties can be added as variables in any script class.
The initial value of a property can be specified in the class body.

By default any plain property you declare can only be used from script and is not accessible to blueprint or in the editor.

```typescript
class AExampleActor : AActor
{
    float ScriptProperty = 10.0;
}
```

## Editable Properties

To expose a property to unreal, add a `UPROPERTY()` specifier above it.

```typescript
class AExampleActor : AActor
{
    // Tooltip of the property
    UPROPERTY()
    float EditableProperty = 10.0;
}
```

> **Note:** It is not necessary to add `EditAnywhere` to properties in script. Unlike in C++, this is assumed as the default in script.

To be more specific about where/when a property should be editable from the editor UI, you can use one of the following specifiers:

```typescript
class AExampleActor : AActor
{
    // Can only be edited from the default values in a blueprint, not on instances in the level
    UPROPERTY(EditDefaultsOnly)
    float DefaultsProperty = 10.0;

    // Can only be edited on instances in the level, not in blueprints
    UPROPERTY(EditInstanceOnly)
    FVector InstanceProperty = FVector(0.0, 100.0, 0.0);

    // The value can be seen from property details anywhere, but *not* changed
    UPROPERTY(VisibleAnywhere)
    FName VisibleProperty = NAME_None;

    // This property isn't editable anywhere at all
    UPROPERTY(NotEditable)
    TArray<int> VisibleProperty;
}
```

## Blueprint Accessible Properties

When a property is declared with `UPROPERTY()`, it also automatically becomes usable within blueprint.

To limit the blueprint from reading or writing to the property, you can use one of the following specifiers:

```typescript
class AExampleActor : AActor
{
    // This property can be both read and written from blueprints
    UPROPERTY()
    float BlueprintProperty = 10.0;

    // This property can use `Get` nodes in blueprint, but not `Set` nodes
    UPROPERTY(BlueprintReadOnly)
    float ReadOnlyProperty = 0.0;

    // This property cannot be accessed by blueprint nodes at all
    UPROPERTY(BlueprintHidden)
    int NoBlueprintProperty = 5;
}
```

> **Note:** It is not necessary to add `BlueprintReadWrite` to properties in script. Unlike in C++, this is assumed as the default in script.

## Categories

It can be helpful to specify a `Category` for your properties.
Categories help organize your properties in the editor UI:

```typescript
class AExampleActor : AActor
{
    UPROPERTY(Category = "First Category")
    float FirstProperty = 0.0;

    UPROPERTY(Category = "Second Category")
    float SecondProperty = 0.0;

    UPROPERTY(Category = "Second Category|Child Category")
    FString ChildProperty = "StringValue";
}
```

## Property Accessor Functions

Script methods that start with `Get..()` or `Set..()` can use the `property` keyword to allow them to be used as if they are properties.
When the property value is used within other code, the appropriate Get or Set function is automatically called:

```typescript
class AExampleActor : AActor
{
    // The `property` keyword lets this function be used as a property instead
    FVector GetRotatedOffset() const property
    {
        return ActorRotation.RotateVector(FVector(0.0, 1.0, 1.0));
    }

    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // This automatically calls GetRotatedOffset() when used as a property
        Print("Offset at BeginPlay: "+RotatedOffset);
    }
}
```

### Property Accessors in C++ Binds

Note that _all_ C++ binds can be used as property accessors regardless.
That means that any C++ function that starts with `Get...()` can be accessed as a property.

This lets you access things such as `Actor.ActorLocation` as a property.
For C++ binds, both forms are valid, so `ActorLocation` and `GetActorLocation()` produce the same result.

## Access Modifiers

If you want a property or function to be `private` or `protected` in script, each individual property needs to be specified that way:

```typescript
class AExampleActor : AActor
{
    private FVector Offset;
    protected bool bIsMoving = false;

    bool IsMoving() const
    {
        return bIsMoving;
    }

    protected void ToggleMoving()
    {
        bIsMoving = !bIsMoving;
    }
}
```

Properties that are `private` cannot be accessed at all outside the class they are declared in.
Properties that are `protected` can only be accessed by the class itself and its children.

> **Tip:** Access modifiers work for functions as well as for properties.
