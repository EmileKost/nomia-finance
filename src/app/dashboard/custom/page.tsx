import createClient from "@/utils/supabase/client";

export default async function CustomPage() {
	const supabase = createClient();

	const { data } = await supabase.auth.getUser();

	if (!data.user) {
		console.log("USER DOES NOT EXIST");
		// Handle redirect logic
	}

	return <div>Page within</div>;
}
