/**
 * 현재 단어에 입력된 키워드가 포함이 되는 지 여부를 확인하고 searchList에 추가한다.
 * @param {string} word - highlight 하고 싶은 string
 * @param {string} ref - ref로 설정할 string (ref를 기준으로 focus 및 검색을 하기 때문에)
 * @param {string} searchCompleteKeyword - 검색을 시작할 때 사용될 keyword
 * @param {string[]} searchList - 검색 항목에 기틀이 되는 list
 * @param {string[]} setSearchList - push 된 list를 새로운 searchList로 설정함
 */
function getHasKeywordJS(
  word,
  ref,
  searchCompleteKeyword,
  searchList,
  setSearchList
) {
  if (
    searchCompleteKeyword.trim().length > 0 &&
    word.toLowerCase().includes(searchCompleteKeyword) &&
    !searchList.includes(ref)
  ) {
    searchList.push(ref);
    setSearchList(searchList);
    return true;
  }

  return false;
}

/**
 * highlight 하고 싶은 단어와 단어의 ref로 설정할 string을 넣어준다.
 * @param {string} word - highlight 하고 싶은 string
 * @param {string} ref - ref로 설정할 string (ref를 기준으로 focus 및 검색을 하기 때문에)
 * @param {string} searchCompleteKeyword - 검색이 시작될 때 넘길 keyword
 * @param {string[]} searchList - 검색 항목에 기틀이 되는 list
 * @param {number} focusPosition - list 중에 현재 어디에 focus 되어 있는 지 표시
 */
function setHighlightJS(
  word,
  ref,
  searchCompleteKeyword,
  searchList,
  focusPosition
) {
  let focusClassVisible = false;
  if (
    searchList.length > 0 &&
    searchList.indexOf(ref) >= 0 &&
    searchList.indexOf(ref) === focusPosition - 1
  ) {
    focusClassVisible = true;
  }

  const regex = new RegExp(searchCompleteKeyword, "gi");
  const result = word.replace(
    regex,
    (match, index) => String.raw`
      <span
        id="${ref}-${index}"
        class="highlight ${focusClassVisible ? "focus" : ""}"
        tabindex="0"
      >
        ${match}
      </span>
    `
  );
  return result;
}

export default {
  setHighlightJS,
  getHasKeywordJS,
};
