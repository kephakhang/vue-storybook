import { type Ref, ref, watch } from "@vue/composition-api";
import { type AvatarColor, avatarColors } from "~/types/Notification";

export function useAvatarColors(keyRefs: Ref<Set<string>>) {
  const getRandomColor = () => {
    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  };
  const colors = ref<Record<string, AvatarColor>>(
    Array.from(keyRefs.value).reduce<Record<string, AvatarColor>>(
      (acc, key) => {
        acc[key] = getRandomColor();
        return acc;
      },
      {}
    )
  );

  watch(keyRefs, () => {
    const keys = Array.from(keyRefs.value);
    const newColors = { ...colors.value };
    keys.forEach((key) => {
      if (!newColors[key]) newColors[key] = getRandomColor();
    });
    colors.value = newColors;
  });

  return colors;
}
