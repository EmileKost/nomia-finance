import { NextRequest } from "next/server";
import updateSession from "./utils/supabase/middleware";

export default async function middleware(request: NextRequest) {
	return await updateSession(request);
}
