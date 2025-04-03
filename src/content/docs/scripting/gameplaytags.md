---
title: Gameplay Tags
description: Working with Unreal's GameplayTags in Angelscript
---

Gameplay Tags are used in many unreal systems. See the [Unreal Documentation on Gameplay Tags](https://docs.unrealengine.com/5.1/en-US/using-gameplay-tags-in-unreal-engine/) for more details.

All `FGameplayTag` will automatically be bound to the global namespace `GameplayTags`. All non-alphanumeric characters, including the dot separators, are turned into underscore `_`.

```typescript
// Assuming there is a GameplayTag named "UI.Action.Escape"
FGameplayTag TheTag = GameplayTags::UI_Action_Escape;
```
