import React, { useEffect, useMemo, useState } from 'react';
import { TikTokIcon } from './Icons';

const UserInfo: React.FC = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const normalizedUsername = useMemo(() => username.trim().replace(/^@/, ''), [username]);

  useEffect(() => {
    if (!normalizedUsername) {
      setAvatarUrl(null);
      setDisplayName(null);
      setFollowers(null);
      setDetailsError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      const url = `https://unavatar.io/tiktok/${encodeURIComponent(normalizedUsername)}`;
      setIsLoadingAvatar(true);
      // Attempt to preload the avatar image; if it fails, fall back
      const img = new Image();
      img.onload = () => {
        if (!controller.signal.aborted) {
          setAvatarUrl(url);
          setIsLoadingAvatar(false);
        }
      };
      img.onerror = () => {
        if (!controller.signal.aborted) {
          setAvatarUrl(null);
          setIsLoadingAvatar(false);
        }
      };
      img.src = url;
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [normalizedUsername]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_TIKTOK_API_URL as string | undefined;
    const apiKey = import.meta.env.VITE_TIKTOK_API_KEY as string | undefined;
    if (!normalizedUsername || !apiUrl || !apiKey) {
      return;
    }

    const controller = new AbortController();
    const load = async () => {
      try {
        setIsLoadingDetails(true);
        setDetailsError(null);
        const res = await fetch(`${apiUrl.replace(/\/$/, '')}/user/${encodeURIComponent(normalizedUsername)}`, {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': new URL(apiUrl).host,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`);
        }
        const data = await res.json();
        // Expecting a structure like { name: string, followers: number }
        const nameVal = (data.name || data.full_name || data.nickname || null) as string | null;
        let followersVal: number | null = null;
        const rawFollowers = data.followers ?? data.followerCount ?? data.followers_count;
        if (typeof rawFollowers === 'number') followersVal = rawFollowers;
        else if (typeof rawFollowers === 'string') {
          const parsed = parseInt(rawFollowers.replace(/[^0-9]/g, ''), 10);
          followersVal = Number.isNaN(parsed) ? null : parsed;
        }
        setDisplayName(nameVal);
        setFollowers(followersVal);
      } catch (err: any) {
        setDetailsError(err?.message || 'Failed to load details');
      } finally {
        setIsLoadingDetails(false);
      }
    };

    // Small debounce to avoid hammering API while typing
    const t = setTimeout(load, 400);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [normalizedUsername]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (normalizedUsername) {
      const searchUrl = `https://www.tiktok.com/@${normalizedUsername}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-100 rounded-lg p-4 flex items-center">
        <form onSubmit={handleSearch} className="flex-grow flex items-center space-x-2">
          <div className="relative flex-grow">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg pointer-events-none">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="bg-transparent w-full pl-5 text-lg font-medium text-gray-800 focus:outline-none"
              aria-label="TikTok Username"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shrink-0"
            disabled={!normalizedUsername}
            aria-label="Search user on TikTok"
          >
            Find
          </button>
        </form>
      </div>

      {normalizedUsername && (
        <div className="mt-3 border border-gray-200 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-black flex items-center justify-center">
            {avatarUrl && !isLoadingAvatar ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <TikTokIcon className="w-6 h-6 text-white" fill="white" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">@{normalizedUsername}</div>
            <div className="text-xs text-gray-700 truncate">{displayName || (isLoadingDetails ? 'Loading…' : 'TikTok user')}</div>
            {followers !== null && (
              <div className="text-xs text-gray-500 truncate">{followers.toLocaleString()} Followers</div>
            )}
            {!isLoadingDetails && detailsError && (
              <div className="text-[11px] text-gray-400 truncate">Details unavailable</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;