"use client";
import { useState } from "react";
import { HeartIcon } from "../../icons/heart-icon";
import { BookmarkIcon } from "../../icons/save-icon";
import { cn } from "@/lib/utils";

const LikeSaveCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(3211);

  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-card p-6 text-card-foreground",
        "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]"
      )}
    >
      <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 text-center" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-9 p-1 items-center justify-center rounded-full border border-transparent bg-background transition hover:bg-muted focus-visible:outline-dashed focus-visible:ring-0 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-pressed={isLiked}
            aria-label={isLiked ? "Unlike" : "Like"}
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            }}
          >
            <HeartIcon animate={isLiked ? "liked" : "unliked"} />
          </button>
          <span className="text-base font-medium text-[#ff6360]">
            {likeCount}
          </span>
        </div>
        <button
          type="button"
          className="flex size-9 p-1 items-center justify-center rounded-full border border-transparent bg-background transition hover:bg-muted focus-visible:outline-dashed focus-visible:ring-0 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? "Unsave" : "Save"}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <BookmarkIcon
            animate={isBookmarked ? "bookmarked" : "unbookmarked"}
          />
        </button>
      </div>
    </div>
  );
};

export default LikeSaveCard;
