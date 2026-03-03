# Card Color Palette

This file provides the TSL `color` nodes for a base color palette for the **Guardians of Humanity** cards, as can be defined in `PRODUCT.md`.

These nodes can be assigned directly to the `colorNode` property of various card materials.

## TSL Code

Create a file at `packages/engine-react/src/features/canvas/components/Card/materials/colors.material.ts` and add the following exports.

```typescript
import { color } from 'three/tsl';

// Example palette for different Guardians or card types
export const GuardianAntonColor = color('#4a90e2'); // A heroic blue
export const FatherJohnColor = color('#d0a9f8'); // A mystical purple
export const GuardianAstridColor = color('#f5a623'); // A fiery orange
export const NeutralCardColor = color('#e0e0e0'); // For common cards
export const DarkEnergyColor = color('#3c004a'); // For challenge cards
export const LightEnergyColor = color('#fff8b3'); // For bonus cards

// You can also create an object to easily access them by name
export const CardColors = {
  'GuardianAnton': GuardianAntonColor,
  'FatherJohn': FatherJohnColor,
  'GuardianAstrid': GuardianAstridColor,
  'Neutral': NeutralCardColor,
  'DarkEnergy': DarkEnergyColor,
  'LightEnergy': LightEnergyColor,
};
```

### How to Use

Import the desired color and assign it to the material's `colorNode`.

```typescript
import { HolographicFoilMaterial } from './holographic-foil.material';
import { GuardianAntonColor } from './colors.material';

// Statically set the color
HolographicFoilMaterial.colorNode = GuardianAntonColor;
```

For dynamic color changes, you can use `mix()` to animate between color nodes.
