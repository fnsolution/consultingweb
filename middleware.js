import { NextResponse } from "next/server";

const legacyPaths = new Set([
  "/무상진단",
  "/개인재무설계",
  "/부동산관리",
  "/인사제도",
  "/정부지원사업",
]);

export function middleware(request) {
  const { pathname } = request.nextUrl;

  let normalizedPath = pathname;

  try {
    normalizedPath = decodeURIComponent(pathname);
  } catch {
    normalizedPath = pathname;
  }

  if (legacyPaths.has(normalizedPath)) {
    return NextResponse.redirect(new URL("/contact", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/무상진단",
    "/개인재무설계",
    "/부동산관리",
    "/인사제도",
    "/정부지원사업",
    "/%EB%AC%B4%EC%83%81%EC%A7%84%EB%8B%A8",
    "/%EA%B0%9C%EC%9D%B8%EC%9E%AC%EB%AC%B4%EC%84%A4%EA%B3%84",
    "/%EB%B6%80%EB%8F%99%EC%82%B0%EA%B4%80%EB%A6%AC",
    "/%EC%9D%B8%EC%82%AC%EC%A0%9C%EB%8F%84",
    "/%EC%A0%95%EB%B6%80%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85",
  ],
};
