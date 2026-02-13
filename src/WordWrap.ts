// WordWrap('Hello World', 20) -> 'Hello World'
export function WordWrapByWords(text: string, limit: number): string[] {
  const split = text.split(/\s+/g);

  let last: string[] = [];
  let tmp: string[] = [];
  let result: string[] = [];

  let join = "";
  for (const word of split) {
    last = [...tmp];
    tmp.push(word);
    join = tmp.join(" ");
    if (join.length > limit) {
      result.push(last.join(" "));
      tmp = [];
    }
  }
  result.push(join);

  return result;
}
export function WordWrap(text: string, limit: number): string[] {
  let tmp: string = "";
  let result: string[] = [];

  let addedToLine: boolean = false;

  for (const letter of text) {
    if (letter === " ") {
      if (!addedToLine) {
        tmp += letter;
      }
      addedToLine = true;
    } else {
      tmp += letter;
      addedToLine = false;
    }

    if (tmp.length == limit) {
      result.push(tmp);
      tmp = "";
    }
  }

  if (tmp.length > 0) {
    result.push(tmp);
  }

  return result;
}

// 'ab f   d'  8
// ['abc f ', 'def']
