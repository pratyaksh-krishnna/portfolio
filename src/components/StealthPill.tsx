export default function StealthPill() {
    return (
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md px-3 py-1.5 text-[11px] sm:text-xs text-white/80">
            <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="truncate">
                Building at Stealth<span className="hidden sm:inline"> · open to collaborations</span>
            </span>
        </div>
    );
}
