import { ref, onValue, set, update, runTransaction } from "firebase/database";
import { db } from "../firebase.config";

// Database shape (Firebase Realtime Database):
//
// users/{uid}: {
//   userName: string,
//   email: string,
//   streaks:        { easy: number, normal: number, hard: number, impossible: number }, // live/current streak
//   highestStreaks: { easy: number, normal: number, hard: number, impossible: number }, // personal best per difficulty
//   bestRank: number | null // best (lowest) world rank ever achieved
// }

export const DIFFICULTIES = ["easy", "normal", "hard", "impossible"];

export const EMPTY_STREAKS = { easy: 0, normal: 0, hard: 0, impossible: 0 };

// Default data written for a brand new account.
export function newUserRecord(userName, email) {
  return {
    userName,
    email,
    streaks: { ...EMPTY_STREAKS },
    highestStreaks: { ...EMPTY_STREAKS },
    bestRank: null,
  };
}

// Call when a guess is correct. Bumps the live streak for that difficulty
// and, if it's a new personal best, bumps highestStreaks too.
export function recordCorrectGuess(uid, difficulty, newStreakValue) {
  if (!uid) return;

  set(ref(db, `users/${uid}/streaks/${difficulty}`), newStreakValue);

  runTransaction(ref(db, `users/${uid}/highestStreaks/${difficulty}`), (current) => {
    if (current === null || newStreakValue > current) {
      return newStreakValue;
    }
    return current;
  });
}

// Call when a guess is wrong / the player skips - the live streak drops
// back to zero, but highestStreaks (the personal best) is left untouched.
export function resetCurrentStreak(uid, difficulty) {
  if (!uid) return;
  set(ref(db, `users/${uid}/streaks/${difficulty}`), 0);
}

// Subscribe to a single user's full record. Returns an unsubscribe function.
export function subscribeUserData(uid, callback) {
  const userRef = ref(db, `users/${uid}`);
  return onValue(userRef, (snapshot) => callback(snapshot.val()));
}

// Sum of all four highestStreaks values - this is what "total streak" /
// world ranking is based on.
export function totalStreak(highestStreaks) {
  const hs = highestStreaks || {};
  return DIFFICULTIES.reduce((sum, key) => sum + (hs[key] || 0), 0);
}

// Subscribe to every user in the database and get back a sorted leaderboard
// (highest total streak first). Returns an unsubscribe function.
export function subscribeLeaderboard(callback) {
  const usersRef = ref(db, "users");
  return onValue(usersRef, (snapshot) => {
    const allUsers = snapshot.val() || {};

    const leaderboard = Object.entries(allUsers)
      .map(([uid, data]) => ({
        uid,
        userName: data?.userName || "Trainer",
        total: totalStreak(data?.highestStreaks),
      }))
      .sort((a, b) => b.total - a.total);

    callback(leaderboard, allUsers);
  });
}

// If the given rank is better (numerically lower) than the stored bestRank,
// persist it. Pass the current record's bestRank (or null/undefined) in.
export function maybeUpdateBestRank(uid, rank, currentBestRank) {
  if (!uid || rank == null) return;
  if (currentBestRank == null || rank < currentBestRank) {
    update(ref(db, `users/${uid}`), { bestRank: rank });
  }
}
