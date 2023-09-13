// +page.server.ts
import { tutorials } from '$db/tutorials';
import type { Actions, PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async function () {
	console.log('>>>> start');
	const data = await tutorials
		.find(
			{},
			{
				projection: {
					_id: String,
					title: String,
					state: Number
				}
			}
		)
		.toArray();
	data.forEach((item) => {
		if (item.title.length > 14) {
			item.length = item.title.length * 0.7;
		} else {
			item.length = item.title.length * 0.8;
		}
	});

	const loadData = JSON.parse(JSON.stringify(data));
	return {
		tutorials: loadData
	};
};

export const actions: Actions = {
	editUser: async ({ request }: any) => {
		console.log('>>>> editUser start');
		const values = await request.formData();
		const state = Number.parseInt(values.get('state'));
		const newState = state > 1 ? 0 : state + 1;
		const _id: string = values.get('id');
		const objectId = new ObjectId(_id);

		await tutorials.updateOne(
			{ _id: objectId },
			{
				$set: {
					state: newState
				}
			}
		);
		return { success: true };
	}
};
