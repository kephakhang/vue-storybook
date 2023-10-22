import { type MaybeRef, ref, toValue, watchEffect } from "vue";

const avatarColors = [
  "#FFACF2",
  "#62B0D9",
  "#FFACAC",
  "#FFA167",
  "#B8F7EF",
] as const;

function getRandomColor() {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}

// TODO(sun.lee): If user avatar should use same color in the whole pages, we could change this function using pinia.
export function useAvatarColors(colorKeys: MaybeRef<string[]>) {
  const initialKeys = new Set(toValue(colorKeys));
  const colors = ref(
    Array.from(initialKeys).reduce<
      Record<string, (typeof avatarColors)[number]>
    >((acc, key) => {
      acc[key] = getRandomColor();
      return acc;
    }, {})
  );

  watchEffect(() => {
    const newKeys = new Set(toValue(colorKeys));
    const clonedColors = { ...colors.value };
    newKeys.forEach((key) => {
      if (!clonedColors[key]) clonedColors[key] = getRandomColor();
    });
    colors.value = clonedColors;
  });

  return colors;
}
