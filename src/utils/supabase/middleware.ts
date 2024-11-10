import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

export default async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ value, name, options }) => {
						request.cookies.set(value, name);
					});
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		}
	);

	const { data: user } = await supabase.auth.getUser();

	if (!user) {
		if (
			!request.nextUrl.pathname.startsWith("/login") ||
			!request.nextUrl.pathname.startsWith("/register")
		) {
			const url = request.nextUrl.clone();
			url.pathname = "/login";

			return NextResponse.redirect(url);
		}
	}

	return supabaseResponse;
}