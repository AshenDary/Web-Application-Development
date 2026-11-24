import { useEffect, useState } from 'react';
import { Check, LockKeyhole } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { EmptyState, ErrorMessage, PageHeader, Spinner } from '../components/ui';
import PixelStar from '../components/ui/PixelStar';

const tiers = [
  { name: 'Broker Affiliate', threshold: 250, perk: 'Silent Checkout', detail: 'Saved checkout preferences for eligible orders.' },
  { name: 'Syndicate Member', threshold: 1000, perk: 'Whisper Network', detail: 'Opt-in early notices for new arrivals.' },
  { name: 'Ghost', threshold: 5000, perk: 'Black Tier', detail: 'Invite-only inventory access.' },
];

const formatPoints = (value) => `${value.toLocaleString()} pts`;

function RewardRow({ title, description, badge, icon }) {
  return (
    <li className="rewards-row">
      <div className="rewards-row-copy">
        <h3>{icon}{title}</h3>
        <p>{description}</p>
      </div>
      <span className="rewards-points-badge">{badge}</span>
    </li>
  );
}

export default function Rewards() {
  const [rewards, setRewards] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const points = user?.points ?? 0;
  const currentTier = [...tiers].reverse().find((tier) => points >= tier.threshold);
  const nextTier = tiers.find((tier) => points < tier.threshold);
  const previousThreshold = currentTier?.threshold ?? 0;
  const progress = nextTier
    ? Math.round(((points - previousThreshold) / (nextTier.threshold - previousThreshold)) * 100)
    : 100;

  useEffect(() => {
    const controller = new AbortController();
    api('/rewards', { signal: controller.signal })
      .then(({ rewards: items }) => setRewards(items))
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message);
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageHeader title="Rewards" icon={PixelStar} />
      <div className="rewards-layout">
          <section aria-labelledby="points-heading" className="card rewards-balance p-5 sm:p-6">
            <h2 id="points-heading" className="rewards-heading">Street Cred balance</h2>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <p className="text-4xl font-semibold tabular-nums tracking-tight">
                {points.toLocaleString()} <span className="text-base font-normal text-black">pts</span>
              </p>
              <p className="text-sm font-medium text-black">{currentTier?.name ?? 'Standard'}</p>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800" role="progressbar" aria-label="Progress toward next member tier" aria-valuenow={progress}>
              <div className="h-full bg-zinc-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-black">
              {nextTier ? `${formatPoints(nextTier.threshold - points)} to ${nextTier.name}` : 'All member tiers unlocked'}
            </p>
          </section>

          <section aria-labelledby="tiers-heading" className="min-w-0">
            <h2 id="tiers-heading" className="rewards-heading mb-3">Member tiers</h2>
            <ul className="card rewards-list">
              {tiers.map((tier) => (
                <RewardRow
                  key={tier.name}
                  title={tier.name}
                  description={`${tier.perk}. ${tier.detail}`}
                  badge={formatPoints(tier.threshold)}
                  icon={points >= tier.threshold
                    ? <Check size={16} aria-label="Unlocked" role="img" />
                    : <LockKeyhole size={16} aria-label="Locked" role="img" />}
                />
              ))}
            </ul>
          </section>
        <section aria-labelledby="rewards-heading" className="min-w-0">
          <h2 id="rewards-heading" className="rewards-heading mb-3">Available rewards</h2>
          {error ? <div role="alert"><ErrorMessage>{error}</ErrorMessage></div>
            : !rewards ? <Spinner label="Loading rewards…" />
            : rewards.length === 0 ? <EmptyState>No rewards available.</EmptyState>
            : (
              <ul className="card rewards-list">
                {rewards.map((reward) => (
                  <RewardRow key={reward._id} title={reward.name} description={reward.description} badge={reward.unlocked ? 'Unlocked' : formatPoints(reward.pointsRequired)} icon={<PixelStar />} />
                ))}
              </ul>
            )}
        </section>
      </div>
    </>
  );
}
