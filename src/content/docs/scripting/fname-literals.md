---
title: FName Literals
description: Using FName literals for efficient name handling in Angelscript
template: "splash"
---

A lot of unreal systems use `FName` to efficiently pass around arbitrary
names without having to copy and compare strings a lot. The name struct itself
is just an index into a name table, and creating an `FName` from a string does
a table lookup or inserts a new entry into the table.

A common pattern in C++ is to declare a global/static variable for an `FName`
constant to use, so that the name table lookup only happens once at startup.

In angelscript, this pattern is simplified by using name literals.
Any string that is declared as `n"NameLiteral"` will be
initialized at angelscript compile time, removing
the nametable lookup from runtime.

Name literals have many uses. An example of using a name literal to bind
a delegate to a `UFUNCTION()` in angelscript:

```typescript
delegate void FExampleDelegate();

class ANameLiteralActor : AActor
{
    TMap<FName, int> ValuesByName;

    void UseNameLiteral()
    {
        FName NameVariable = n"MyName";
        ValuesByName.Add(NameVariable, 1);

        FExampleDelegate Delegate;
        Delegate.BindUFunction(this, n"FunctionBoundToDelegate");
        Delegate.ExecuteIfBound();

        // Due to the name literal, no string manipulation happens
        // in calls to UseNameLiteral() during runtime.
    }

    UFUNCTION()
    void FunctionBoundToDelegate()
    {
        Print("Delegate executed");
    }
}
```
