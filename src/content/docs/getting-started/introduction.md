---
title: Scripting Introduction
description: Introduction to scripting with Angelscript in Unreal Engine
---

This introduction will run you through how to create your first Actor class in script,
and how to interact with it in unreal and blueprint.

### Setup

Make sure you have the following set up:

- Install or compile the custom engine build for UnrealEngine-Angelscript.
- Install [Visual Studio Code](https://code.visualstudio.com/).
- Install the [Unreal Angelscript Extension](https://marketplace.visualstudio.com/items?itemName=Hazelight.unreal-angelscript) for visual studio code.

> See the [Installation](/getting-started/installation/) page for details.

### Starting the Project

- Start the custom unreal editor and open your project.  
  Opening your project will automatically create an empty `Script/` folder inside your project folder.
- Start Visual Studio Code, and from the menu `File -> Open Folder`, open your new `MyProject/Script/` folder.

### Creating the Actor Class

Within Visual Studio Code, create a new file and call it `IntroductionActor.as`.

Files with the `.as` extension placed under your project's `Script/` folder are automatically loaded by the angelscript plugin.

Inside `IntroductionActor.as`, let's declare a new Actor class:

```typescript
class AIntroductionActor : AActor
{
}
```

We've now created our first scripted Actor!

### Placing the Actor in Unreal

Immediately after hitting "Save" on our script file, it should become available within the unreal editor.

- Open the `Place Actors` panel (this can be found in Unreal's `Window` menu if you don't have it open already).
- Search for "Introduction Actor". Your new scripted actor should appear in the list.
- Place the "Introduction Actor" into your level.

![Place Actors panel showing the Introduction Actor](/img/place-actors.png)

### Adding Functionality to the Actor

We have a totally empty actor in the level now with no functionality.
As an example, let's make this actor perform a configurable countdown:

```typescript
class AIntroductionActor : AActor
{
    UPROPERTY()
    float CountdownDuration = 5.0;

    float CurrentTimer = 0.0;
    bool bCountdownActive = false;

    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // Start the countdown on beginplay with the configured duration
        CurrentTimer = CountdownDuration;
        bCountdownActive = true;
    }

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaSeconds)
    {
        if (bCountdownActive)
        {
            // Count down the timer, and
            CurrentTimer -= DeltaSeconds;

            if (CurrentTimer <= 0.0)
            {
                // The countdown was complete!
                // Print a message to the screen
                Print("Countdown was completed!");
                bCountdownActive = false;
            }
        }
    }
}
```

Some of the important things that are happening here:

- The `CountdownDuration` variable has been declared as a `UPROPERTY()`, this makes it configurable from the Unreal editor. You can select the actor in the level and change the countdown duration to be higher or lower than the default 5 seconds.  
  _See the documentation on [Properties and Accessors](/scripting/properties-and-accessors/)_  
  ![Countdown Duration setting in Unreal](/img/countdown-duration.png)
- We override the `BeginPlay` and `Tick` events to implement functionality on the actor.  
  _See the documentation on [Functions and BlueprintEvents](/scripting/functions-and-events/)_
- When BeginPlay happens, we start our countdown.
- When Tick happens, we count down the countdown and check if it's complete.
- After the countdown is done, we use `Print()` to show a message on screen.

Now, if you play the level the actor is placed in and wait 5 seconds, you will see the message appear:
![Countdown message onscreen](/img/countdown-print.png)

### Adding Components to the Actor

Right now, our Actor is still empty of any components, and only implements some functionality on tick.

Let's add some components to it! We want a `Scene Component` as the root, and then attach a `Static Mesh Component` and a `Billboard Component` to it.

Add the following at the top of your actor code:

```typescript
class AIntroductionActor : AActor
{
    UPROPERTY(DefaultComponent, RootComponent)
    USceneComponent SceneRoot;

    UPROPERTY(DefaultComponent, Attach = SceneRoot)
    UStaticMeshComponent Mesh;

    UPROPERTY(DefaultComponent, Attach = SceneRoot)
    UBillboardComponent Billboard;

    ....
}
```

When you save your script file, you should see the new components appear on the Introduction Actor you've placed in the level.

You can read more about adding components on the [Actors and Components](/scripting/actors-components/) page.

![Actor components in the editor](/img/intro-components.png)

> **Tip:** Clicking one of the _"Edit in C++"_ links in the components menu will jump your Visual Studio Code to the place the component is added in your script.  
> The angelscript plugin often hooks into Unreal's normal C++ functionality, so script classes behave like C++ classes in many ways.

### Creating a Blueprint Actor

The actor now has a Static Mesh Component, but we can't see it because no Static Mesh has been chosen on it!

We could of course select the actor in the level and choose one, but we don't want to do that for each actor we place individually.

Instead, let's create a Blueprint of our new introduction actor:

- Open the Content Browser, and click `Add -> Blueprint Class`, to use the normal way to create a new blueprint.
- When asked to pick a Parent Class, search for our "Introduction Actor" and select it:  
  ![Picking the Introduction Actor as parent](/img/bp-pickparent.png)
- Let's call our new blueprint `BP_IntroductionActor`, so it's clear that we're dealing with an actor blueprint.
- Now we can open our new blueprint and choose a mesh for its Static Mesh Component.  
  Here I am choosing the engine's standard `SM_Cube` mesh, but feel free to choose one of your own.  
  ![Choosing a static mesh](/img/choose-staticmesh.png)
- Make sure to remove the existing `IntroductionActor` from your level, and place a new `BP_IntroductionActor` in the level so we can see it!

### Calling in and out of Blueprint

Now that we have a blueprint, we can change the script to work together with its node graph:

- We will change the actor so the countdown is no longer started right away, but requires a function call to start it.
- We also add an overridable blueprint event so our actor blueprint can be notified when the countdown is finished.

In our `IntroductionActor.as`, change the script code for its BeginPlay and Tick functions to this:

```typescript
    UFUNCTION(BlueprintOverride)
    void BeginPlay()
    {
        // We no longer start the countdown on BeginPlay automatically
    }

    UFUNCTION()
    void StartCountdown()
    {
        // Start the countdown when StartCountdown() is called
        CurrentTimer = CountdownDuration;
        bCountdownActive = true;
    }

    /**
     * Declare an overridable event so the actor blueprint can
     * respond when the countdown finishes
     */
    UFUNCTION(BlueprintEvent)
    void FinishedCountdown() {}

    UFUNCTION(BlueprintOverride)
    void Tick(float DeltaSeconds)
    {
        if (bCountdownActive)
        {
            // Count down the timer, and
            CurrentTimer -= DeltaSeconds;

            if (CurrentTimer <= 0.0)
            {
                // The countdown was complete!
                // Print a message to the screen
                Print("Countdown was completed!");
                // Also: trigger a blueprint event
                FinishedCountdown();
                bCountdownActive = false;
            }
        }
    }
}
```

After saving this change, we can now open `BP_IntroductionActor`, and add nodes like this:

![Blueprint nodes for the countdown](/img/intro-bpnodes.png)

Now, the blueprint must specifically start the countdown, and when the countdown is finished the blueprint will automatically destroy the actor.

If you play the level with the blueprint placed, you will see it disappear after 5 seconds.

### Script Examples

The `UnrealEngine-Angelscript` project contains a `Script-Examples/` folder.  
Here, you can find more detailed example scripts that you can read or copy to your project.

- One good place to start is the [Example_MovingObject.as](https://github.com/Hazelight/UnrealEngine-Angelscript/blob/angelscript-master/Script-Examples/Examples/Example_MovingObject.as) actor example.

- You can also look through the [Examples Folder on Github](https://github.com/Hazelight/UnrealEngine-Angelscript/tree/angelscript-master/Script-Examples/Examples).

### Further Reading

More documentation is available on this website in the sidebar.

We recommend reading through at least the "Scripting" pages to get an overview of what can be done in scripts.

Some good starting points are:

- [Functions and BlueprintEvents](/scripting/functions-and-events/)
- [Function Libraries](/scripting/function-libraries/)
- [Differences with Unreal C++](/scripting/cpp-differences/)
