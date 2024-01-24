export const toCapitaliseFirstLetter = (word: string) => {
  if (word === undefined || word === null) {
    return word;
  }
  if (typeof word.charAt(0) === 'string') {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
  }
  return word;
};
