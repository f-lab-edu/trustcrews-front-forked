const publicURL = process.env.NEXT_PUBLIC_URL;

/**
 * 포지션 목록 조회
 */
export async function getPositionList() {
  const response = await fetch(`${publicURL}/api/setting/position`);
  return await response.json();
}

/**
 * 기술스택 목록 조회
 */
export async function getTechStackList() {
  const response = await fetch(`${publicURL}/api/setting/tech-stack`);
  return await response.json();
}

/**
 * 기술스택 카테고리 목록 조회
 */
export async function getTechStackCategoryList() {
  const response = await fetch(`${publicURL}/api/setting/tech-stack-category`);
  return await response.json();
}

/**
 * 기술스택 카테고리-기술스택 목록 조회
 */
export async function getTechStackListWithCategory() {
  const response = await fetch(
    `${publicURL}/api/setting/tech-stack-with-category`
  );
  return await response.json();
}

/**
 * 프로젝트 크루 권한 옵션 조회
 */
export const getCrewAuthOptions = async () => {
  const response = await fetch(`${publicURL}/api/setting/crewAuth`);
  return await response.json();
}