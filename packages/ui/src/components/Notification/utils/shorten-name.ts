export function shortenName(name: string) {
  const splittedName = name.split(" ");

  let shortenName = "";
  for (let i = 0; i < 2; i++) {
    if (!splittedName[i]) continue;
    shortenName += splittedName[i].charAt(0).toUpperCase();
  }

  return shortenName;
}
