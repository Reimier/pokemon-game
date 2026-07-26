import "./ranking-card.css";

const difficultyStreaks = [
  { label: "Easy", streak: 24, color: "#0065d1" },
  { label: "Normal", streak: 17, color: "#05a13c" },
  { label: "Hard", streak: 9, color: "#ee7e1c" },
  { label: "Impossible", streak: 3, color: "#EE1C25" },
];

const worldRank = 128;

function RankingCard() {
  return (
    <div className="ranking-card">
      <div className="ranking-header">
        <h3>
          <i class="fa-solid fa-chart-simple"></i> Your Rankings
        </h3>
        <span className="ranking-subtitle">Personal Bests</span>
      </div>

      <div className="world-rank">
        <i className="fa-solid fa-earth-americas"></i>
        <div className="world-rank-text">
          <span className="world-rank-label">Current Ranking</span>
          <span className="world-rank-value">#{worldRank}</span>
        </div>
      </div>

      <ul className="streak-list">
        {difficultyStreaks.map((d) => (
          <li className="streak-item" key={d.label}>
            <span className="streak-difficulty" style={{ color: d.color }}>
              {d.label}
            </span>
            <span className="streak-value">
              <i className="fa-solid fa-fire"></i> {d.streak}
            </span>
          </li>
        ))}
      </ul>

      <div className="ranking-footer">
        <i class="fa-solid fa-circle-question"></i> Ranking is based on total streak in all difficulty
      </div>
      <div className="ranking-footer">
      Disclaimer:
This is an unofficial, open-source fan project created solely for educational and portfolio purposes. All Pokémon names, images, and character assets belong to Nintendo, Game Freak, and The Pokémon Company. This project is not affiliated with or endorsed by Nintendo. Data powered by PokéAPI.
      </div>
    </div>
  );
}

export default RankingCard;
