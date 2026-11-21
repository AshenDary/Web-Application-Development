import { useEffect, useState } from 'react';
import { Check, LockKeyhole, ShieldCheck } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { EmptyState, ErrorMessage, PageHeader, Spinner } from '../components/ui';

const tiers = [
	{ name: 'Broker Affiliate', threshold: 250, perk: 'Silent Checkout', detail: 'Saved checkout preferences for eligible orders.' },
	{ name: 'Syndicate Member', threshold: 1000, perk: 'Whisper Network', detail: 'Opt-in early notices for new arrivals.' },
	{ name: 'Ghost', threshold: 5000, perk: 'Black Tier', detail: 'Invite-only inventory access.' },
];

export default function Rewards() {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const { user } = useAuth();
	const points = user?.points ?? 0;
	const currentTier = [...tiers].reverse().find((tier) => points >= tier.threshold);
	const nextTier = tiers.find((tier) => points < tier.threshold);
	const previousThreshold = currentTier?.threshold ?? 0;
	const progress = nextTier ? Math.min(100, Math.round(((points - previousThreshold) / (nextTier.threshold - previousThreshold)) * 100)) : 100;

	useEffect(() => { api('/rewards').then(setData).catch((requestError) => setError(requestError.message)); }, []);

	return <><PageHeader title="Rewards" eyebrow="Member access" />
		<section className="mb-8 grid overflow-hidden rounded-ui border border-zinc-800 bg-zinc-950/80 lg:grid-cols-[1.25fr_.75fr]"><div className="p-6 sm:p-8"><p className="font-mono text-xs tracking-[0.16em] text-zinc-500">STREET CRED BALANCE</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><p className="font-mono text-4xl font-semibold tracking-tight text-zinc-100">{points.toLocaleString()} <span className="text-base font-normal text-zinc-500">PTS</span></p><p className="font-mono text-xs text-amber-100">{currentTier?.name ?? 'STANDARD'}</p></div><div className="mt-7 h-1.5 overflow-hidden bg-zinc-800"><div className="h-full bg-amber-200 transition-all duration-500" style={{ width: `${progress}%` }}/></div><p className="mt-3 font-mono text-xs text-zinc-500">{nextTier ? `${Math.max(nextTier.threshold - points, 0).toLocaleString()} PTS TO ${nextTier.name.toUpperCase()}` : 'MAXIMUM MEMBER ACCESS'}</p></div><div className="border-t border-zinc-800 bg-zinc-900/30 p-6 sm:border-l sm:border-t-0 sm:p-8"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center border border-emerald-400/25 bg-emerald-400/5 text-emerald-200"><ShieldCheck size={18}/></div><div><p className="text-sm font-semibold">{currentTier?.perk ?? 'Standard access'}</p><p className="mt-0.5 text-xs text-zinc-500">{currentTier?.detail ?? 'Make an acquisition to earn Street Cred.'}</p></div></div></div></section>
		<section className="mb-10 grid gap-px overflow-hidden rounded-ui border border-zinc-800 bg-zinc-800 lg:grid-cols-3">{tiers.map((tier) => { const unlocked = points >= tier.threshold; return <div key={tier.name} className="bg-zinc-950/95 p-6"><div className="flex items-center justify-between gap-3"><p className="font-semibold">{tier.name}</p>{unlocked ? <Check size={17} className="text-emerald-200"/> : <LockKeyhole size={16} className="text-zinc-600"/>}</div><p className="mt-8 font-mono text-xs text-amber-100">{tier.threshold.toLocaleString()} PTS</p><p className="mt-2 text-sm font-medium text-zinc-200">{tier.perk}</p><p className="mt-1 text-sm text-zinc-500">{tier.detail}</p></div>; })}</section>
		{error ? <ErrorMessage>{error}</ErrorMessage> : !data ? <Spinner label="Loading rewards…"/> : data.rewards.length ? <section><p className="mb-4 font-mono text-xs tracking-[0.16em] text-zinc-500">AVAILABLE REWARDS</p><div className="grid gap-3 sm:grid-cols-2">{data.rewards.map((reward) => <div className="card flex items-center justify-between gap-4 p-5" key={reward._id}><div><p className="font-medium">{reward.name}</p><p className="mt-1 text-sm text-zinc-500">{reward.description}</p></div><span className={`font-mono text-xs ${reward.unlocked ? 'text-emerald-200' : 'text-zinc-500'}`}>{reward.unlocked ? 'UNLOCKED' : `${reward.pointsRequired.toLocaleString()} PTS`}</span></div>)}</div></section> : <EmptyState>No rewards available.</EmptyState>}</>;
}
