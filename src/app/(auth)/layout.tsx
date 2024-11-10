import { getUsersData } from "./actions";

export default async function AuthLayout() {
	const users = await getUsersData();

	return <div>Layout</div>;
}
