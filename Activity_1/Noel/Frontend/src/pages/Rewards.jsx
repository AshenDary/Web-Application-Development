import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { EmptyState, ErrorMessage, PageHeader, Spinner } from '../components/ui';

export default function Rewards() {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		api('/rewards')
			.then(setData)
			.catch((requestError) => setError(requestError.message));
	}, []);

	return <>
		<PageHeader title="Rewards" eyebrow="Points and benefits"/>
		{error
			? <ErrorMessage>{error}</ErrorMessage>
			: !data
				? <Spinner label="Loading rewards…"/>
				: data.rewards.length
					? <div className="grid gap-4 sm:grid-cols-2">
						{data.rewards.map((reward) => <div className="card p-5" key={reward._id}>
							<p className="font-medium">{reward.name}</p>
							<p className="mt-2 text-sm text-zinc-400">{reward.description}</p>
							<p className="mt-3">{reward.pointsRequired} points · {reward.unlocked ? 'Unlocked' : 'Locked'}</p>
						</div>)}
					</div>
					: <EmptyState>No rewards available.</EmptyState>}
	</>;
}
