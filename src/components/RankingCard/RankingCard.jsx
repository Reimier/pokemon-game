import { useEffect, useState } from "react";
import "./ranking-card.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import {
  EMPTY_STREAKS,
  maybeUpdateBestRank,
  subscribeLeaderboard,
} from "../../utils/streakService";

const DIFFICULTY_META = [
  { key: "easy", label: "Easy", color: "#0065d1" },
  { key: "normal", label: "Normal", color: "#05a13c" },
  { key: "hard", label: "Hard", color: "#ee7e1c" },
  { key: "impossible", label: "Impossible", color: "#EE1C25" },
];

function RankingCard() {
  const [uid, setUid] = useState(null);
  const [highestStreaks, setHighestStreaks] = useState(EMPTY_STREAKS);
  const [worldRank, setWorldRank] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUid(u ? u.uid : null));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const unsubLeaderboard = subscribeLeaderboard((leaderboard, allUsers) => {
      const rankIndex = leaderboard.findIndex((entry) => entry.uid === uid);
      const rank = rankIndex === -1 ? null : rankIndex + 1;
      setWorldRank(rank);

      const myData = allUsers[uid];
      setHighestStreaks(myData?.highestStreaks || EMPTY_STREAKS);

      maybeUpdateBestRank(uid, rank, myData?.bestRank);
    });

    return () => unsubLeaderboard();
  }, [uid]);

  return (
    <div className="ranking-card">
      <div className="ranking-header">
        <h3>
          <i className="fa-solid fa-chart-simple"></i> Your Rankings
        </h3>
        <span className="ranking-subtitle">Personal Bests</span>
      </div>

      <div className="world-rank">
        <i className="fa-solid fa-earth-americas"></i>
        <div className="world-rank-text">
          <span className="world-rank-label">Current Ranking</span>
          <span className="world-rank-value">{worldRank ? `#${worldRank}` : "—"}</span>
        </div>
      </div>

      <ul className="streak-list">
        {DIFFICULTY_META.map((d) => (
          <li className="streak-item" key={d.key}>
            <span className="streak-difficulty" style={{ color: d.color }}>
              {d.label}
            </span>
            <span className="streak-value">
              <i className="fa-solid fa-fire"></i> {highestStreaks[d.key] || 0}
            </span>
          </li>
        ))}
      </ul>

      <div className="ranking-footer">
        <i className="fa-solid fa-circle-question"></i> Ranking is based on total streak in all difficulty
      </div>
      <div className="ranking-footer">
      Disclaimer:
This is an unofficial, open-source fan project created solely for educational and portfolio purposes. All Pokémon names, images, and character assets belong to Nintendo, Game Freak, and The Pokémon Company. This project is not affiliated with or endorsed by Nintendo. Data powered by PokéAPI.
      </div>
    </div>
  );
}

export default RankingCard;
