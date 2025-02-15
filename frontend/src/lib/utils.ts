import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {type Cookies, redirect} from "@sveltejs/kit";
import type {AuthResponse} from "$lib/api/auth";
import {dev} from "$app/environment";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const buildReturnParam = (url: URL) => {
	const param = "return=";
	const link = url.searchParams.has("return") ? url.searchParams.get("return")! : url.pathname.slice(1);
	return param + encodeURIComponent(link);
}

export const setAuthCookies = (response: AuthResponse, cookies: Cookies) => {
	const date = new Date();
	date.setMonth(date.getMonth() + 1);
	cookies.set("accessToken", response.accessToken, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		expires: date
	});
}

export const deleteAuthCookies = (cookies: Cookies) => {
	cookies.delete("accessToken", {
		path: "/"
	});
}

export const redirectBack = (url: URL) => {
	const back = url.searchParams.get("return");
	if (back) {
		throw redirect(302, `/${back}`);
	}
	throw redirect(302, `/`);
}
