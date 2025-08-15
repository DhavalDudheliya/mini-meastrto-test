import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCallback } from "react";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "statusCode" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { data: { message: string; status: any } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data: unknown }).data === "object" &&
    (error as { data: { message?: unknown } }).data !== null &&
    "message" in (error as { data: { message?: unknown } }).data &&
    typeof (error as { data: { message: unknown } }).data.message === "string"
  );
}

export function setLocalItem(item: any, key: string) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalItem(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeLocalItem(key: string) {
  localStorage.removeItem(key);
}

export function setCookie(name: string, value: any, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/`;
}

/**
 * @description this function return true if given string is valid URL and false otherwise
 */
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
