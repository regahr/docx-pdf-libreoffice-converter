/**
 * For removing n character from the end of a string
 * @param {string} str main string
 * @param {string} char the character to be removed
 * @returns string
 */
export const removeTrailingChar = (str, char) => {
  if (!str || !char) return str;
  let processedString = str;
  let isEndWith = processedString.endsWith(char);
  while (isEndWith) {
    processedString = processedString.slice(0, -1);
    isEndWith = processedString.endsWith(char);
  }

  return processedString;
};

export const getShortName = (name, maxLength = 26) => {
  if (!name) return name;
  const names = name.replace(/[-_?&@(),.#$%'=*^!]/g, '').split(' ');

  let counter = 0;
  while (names.join(' ').length > maxLength && counter < names.length) {
    for (let i = names.length - 1; i >= 0; i -= 1) {
      if (names[i].length > 1) {
        const newName = `${names[i][0]}`;
        names[i] = newName;
        break;
      }
    }
    counter += 1;
  }

  return names.map((s) => s.trim()).join(' ');
};
