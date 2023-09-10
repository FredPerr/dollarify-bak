type ReplacementsType = { [key: string]: string };

function format(str: string, replacements: ReplacementsType): string {
  for (const key in Object.keys(replacements))
    str = str.replace(key.toString(), replacements[key]);
  return str;
}

export default format;
