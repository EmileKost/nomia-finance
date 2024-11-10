"use server";

import createClient from "@/utils/supabase/client";

const supabase = createClient();

export const login = () => {
	console.log("Logging in");
};

export const register = () => {
	console.log("Registering");
};

export const logout = () => {
	console.log("Logging out");
};

export const getUsersData = async () => {
	const { data: users } = await supabase.from("users").select();

	return users;
};
