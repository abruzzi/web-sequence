function until(arr, fn) {
  const l = arr.length;
  let i = 0;
  while (i < l && !fn(arr[i])) {
    i++;
  }
  return arr.slice(0, i);
}

function ensure(condition, message) {
  if (typeof condition === 'function') {
    if (!condition()) {
      throw message
    }
  }
}

const isEmpty = str => !str || str.trim() === '';
const isComment = (line) => line && line.trim().startsWith('//');

const NEW_PARTICIPANT = 'NewParticipant';
export default {
  addCode: (code, newCode) => {
		ensure(() => !isEmpty(code), 'code should not be empty.');
		ensure(() => !isEmpty(newCode), 'newCode should not be empty.');


		if (newCode === NEW_PARTICIPANT) {
      const lines = code.split('\n');
      const leadingCommentLines = until(lines, line => !isEmpty(line) && !isComment(line));
      const remainingLines = lines.slice(leadingCommentLines.length)
      const all = leadingCommentLines.concat([NEW_PARTICIPANT]).concat(remainingLines);
      return all.join('\n');
    }

    return `${code}\n${newCode}`;
  }
};
