---
title: Mixin Methods
description: Adding methods to existing types in Angelscript
---

It's possible in script to declare a method on a type outside the class body.
This can be useful either to add methods to types from C++, or to separate out functionality from different systems.

To do this, declare a global function with the `mixin` keyword.
The first parameter of the mixin function is filled with the object it is called on.

```typescript
// Mixin method that teleports any actor
// The first, 'Self' parameter gets set to the actor it is called on
mixin void ExampleMixinTeleportActor(AActor Self, FVector Location)
{
    Self.ActorLocation = Location;
}

void Example_MixinMethod()
{
    // Call the mixin method on an actor
    // Note how ActorReference is passed into Self automatically
    AActor ActorReference;
    ActorReference.ExampleMixinTeleportActor(FVector(0.0, 0.0, 100.0));
}
```

When creating mixins for structs, you can take a reference to the struct as the first parameter.
This allows changes to be made to it:

```typescript
mixin void SetVectorToZero(FVector& Vector)
{
    Vector = FVector(0, 0, 0);
}

void Example_StructMixin()
{
    FVector LocalValue;
    LocalValue.SetVectorToZero();
}
```

> **Note:** It is also possible to create mixin functions from C++ with bindings.  
> See [Script Mixin Libraries](/cpp-bindings/mixin-libraries) for details.
