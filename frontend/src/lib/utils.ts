import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {type Cookies, redirect} from "@sveltejs/kit";
import type {AuthResponse} from "$lib/api/auth";
import {dev} from "$app/environment";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

export const redirectBack = (url: URL) => {
	const back = url.searchParams.get("return");
	if (back) {
		throw redirect(302, `/${back}`);
	}
	throw redirect(302, `/`);
}
