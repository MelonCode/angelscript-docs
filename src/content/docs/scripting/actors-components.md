---
title: Actors and Components
description: Creating and working with Actors and Components in Angelscript
---

Actors and components are two of the fundamental gameplay types in unreal code.

Creating a new actor or component type in script is as simple as creating a new script file and adding a class that inherits from an actor type:

```typescript
class AMyActor : AActor
{
}

class UMyComponent : UActorComponent
{
}
```

> **Note:** The script plugin automatically sets the most useful class flags for any script classes, adding a `UCLASS()` specifier is not necessary in script, but can still optionally be used to configure additional class settings.

### Default Components

Unlike in C++, script classes do not make use of their constructors for creating components.
To add a default component to the actor, use the `DefaultComponent` specifier for them.
Default components are automatically created on the actor when it is spawned.

The following class will have two components on it when placed. A scene component at the root, and the custom `UMyComponent` we declared before:

```typescript
class AExampleActor : AActor
{
    UPROPERTY(DefaultComponent)
    USceneComponent SceneRoot;

    UPROPERTY(DefaultComponent)
    UMyComponent MyComponent;
}
```

### Component Attachments

Likewise, the default attachment hierarchy is specified in `UPROPERTY` specifiers, rather than set up in a constructor. Use the `Attach =` and `AttachSocket =` specifiers.

If an explicit attachment is not specified, the component will be attached to the actor's root.

```typescript
class AExampleActor : AActor
{
    // Explicit root component
    UPROPERTY(DefaultComponent, RootComponent)
    USceneComponent SceneRoot;

    // Will be attached to SceneRoot by default, as no attachment is specified
    UPROPERTY(DefaultComponent)
    USkeletalMeshComponent CharacterMesh;

    // Will be attached to the CharacterMesh' RightHand socket
    UPROPERTY(DefaultComponent, Attach = CharacterMesh, AttachSocket = RightHand)
    UStaticMeshComponent WeaponMesh;

    // Will be attached to the WeaponMesh
    UPROPERTY(DefaultComponent, Attach = WeaponMesh)
    UStaticMeshComponent ScopeMesh;
}
```

> **Note:** You can explicitly note which component should be the default root component with the `RootComponent` specifier. If you do not add this specifier, the first component to be created will become the root.

### Default Statements

To assign default values to properties on the actor's components, you can use `default` statements:

```typescript
class AExampleActor : AActor
{
    UPROPERTY(DefaultComponent, RootComponent)
    USceneComponent SceneRoot;

    UPROPERTY(DefaultComponent)
    USkeletalMeshComponent CharacterMesh;

    // The character mesh is always placed a bit above the actor root
    default CharacterMesh.RelativeLocation = FVector(0.0, 0.0, 50.0);

    UPROPERTY(DefaultComponent)
    UStaticMeshComponent ShieldMesh;

    // The shield mesh is hidden by default, and should only appear when taking damage
    default ShieldMesh.bHiddenInGame = true;
    // The shield mesh should not have any collision
    default ShieldMesh.SetCollisionEnabled(ECollisionEnabled::NoCollision);
}
```

### Working with Components

#### Retrieving Components

If you have an actor and want to find a component of a type on it, use `UMyComponentClass::Get()`:

```typescript
AActor Actor;

// Retrieve the first skeletal mesh component we can find on the actor
USkeletalMeshComponent SkelComp = USkeletalMeshComponent::Get(Actor);

// Find the specific skeletal mesh component with this component name
USkeletalMeshComponent WeaponComp = USkeletalMeshComponent::Get(Actor, n"WeaponMesh");
```

If no component of the specified type exists, this will return `nullptr`.

Use `UMyComponentClass::GetOrCreate()` to retrieve a potential existing component, or create it if one does not exist already:

```typescript
// Find our own interaction handling component on the actor.
// If it does not exist, create it.
UInteractionComponent InteractComp = UInteractionComponent::GetOrCreate(Actor);

// Find an interaction handling component specifically named "ClimbingInteraction",
// or create a new one with that name
auto ClimbComp = UInteractionComponent::GetOrCreate(Actor, n"ClimbingInteraction");
```

#### Adding New Components

Creating a new component works similarly by calling `UMyComponentClass::Create()`.
Specifying a component name is optional, if none is specified one will be automatically generated.

```typescript
ACharacter Character;

// Create a new static mesh component on the character and attach it to the character mesh
UStaticMeshComponent NewComponent = UStaticMeshComponent::Create(Character);
NewComponent.AttachToComponent(Character.Mesh);
```

> **Tip:** If you have a dynamic `TSubclassOf<>` or `UClass` for a component class, you can also use the generic functions on actors for these operations by using
> `Actor.GetComponent()`, `Actor.GetOrCreateComponent()`, or `Actor.CreateComponent()`

### Spawning Actors

Helpers for spawning actors of a specific type are also available:

```typescript
// Spawn a new Example Actor at the specified location and rotation
FVector SpawnLocation;
FRotator SpawnRotation;
AExampleActor SpawnedActor = AExampleActor::Spawn(SpawnLocation, SpawnRotation);
```

#### Spawning a Blueprinted Actor

It is often needed to dynamically spawn an actor blueprint, rather than a script actor baseclass.
To do this, use a `TSubclassOf<>` property to reference the blueprint, and use the global `SpawnActor()` function.

An example of a spawner actor that can be configured to spawn any blueprint of an example actor:

```typescript
class AExampleSpawner : AActor
{
    /**
     * Which blueprint example actor class to spawn.
     * This needs to be configured either in the level,
     * or on a blueprint child class of the spawner.
     */
    UPROPERTY()
    TSubclassOf<AExampleActor> ActorClass;

    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        FVector SpawnLocation;
        FRotator SpawnRotation;

        AExampleActor SpawnedActor = Cast<AExampleActor>(
            SpawnActor(ActorClass, SpawnLocation, SpawnRotation)
        );
    }
}
```

### Construction Script

Actor construction script can be added by overriding the `ConstructionScript()` blueprint event.
From construction scripts, you can create new components and override properties like normal.

For example, an actor that creates a variable amount of meshes inside it based on its settings in the level could look like this:

```typescript
class AExampleActor : AActor
{
    // How many meshes to place on the actor
    UPROPERTY()
    int SpawnMeshCount = 5;

    // Which static mesh to place
    UPROPERTY()
    UStaticMesh MeshAsset;

    UFUNCTION(BlueprintOverride)
    void ConstructionScript()
    {
        Print(f"Spawning {SpawnMeshCount} meshes from construction script!");

        for (int i = 0; i < SpawnMeshCount; ++i)
        {
            // Construct a new static mesh on this actor
            UStaticMeshComponent MeshComp = UStaticMeshComponent::Create(this);
            // Set the mesh we wanted for it
            MeshComp.SetStaticMesh(MeshAsset);
        }
    }
}
```

### Getting All Actors or Components

To get all components of a particular type that are on an actor, use `Actor.GetComponentsByClass()` and pass in the array.
This function takes a `?` parameter, and will determine which component type to look for by the type of array you pass in.

For example, to get all static meshes on an actor:

```typescript
AActor Actor;

TArray<UStaticMeshComponent> StaticMeshComponents;
Actor.GetComponentsByClass(StaticMeshComponents);

for (UStaticMeshComponent MeshComp : StaticMeshComponents)
{
    Print(f"Static Mesh Component: {MeshComp.Name}");
}
```

Similarly, to get all actors of a particular type that are currently in the world, use the `GetAllActorsOfClass()` global function, and pass in an array of the type of actor you want:

```typescript
// Find all niagara actors currently in the level
TArray < ANiagaraActor > NiagaraActors;
GetAllActorsOfClass(NiagaraActors);
```

> **Note:** Getting all actors of a class requires iterating all actors in the level, and should not be used from performance-sensitive contexts.
> That is, try running it once and storing the value rather than using it every tick.

### Override Components

Unreal provides a mechanism for overriding one of a parent actor class' default components to use a child component class instead of the one specified on the parent actor.
In script, this can be accessed by using the `OverrideComponent` specifier:

```typescript
class ABaseActor : AActor
{
    // This base actor specifies a root component that is just a scene component
    UPROPERTY(DefaultComponent, RootComponent)
    USceneComponent SceneRoot;
}

class AChildActor : ABaseActor
{
    /**
     * Because static meshes are a type of scene component,
     * we can use an override component to turn the base class' root
     * scene component into a static mesh.
     */
    UPROPERTY(OverrideComponent = SceneRoot)
    UStaticMeshComponent RootStaticMesh;
}
```

> **Note:** Override components are similar to using `ObjectInitializer.SetDefaultSubobjectClass()` in a C++ constructor.
