export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  avatar?: string;
  badge?: string;
}

export const weeklyLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "Rajesh Kumar",
    points: 789,
    badge: "🥇"
  },
  {
    rank: 2,
    username: "Priya Sharma",
    points: 756,
    badge: "🥈"
  },
  {
    rank: 3,
    username: "Demo",
    points: 732,
    badge: "🥉"
  },
  {
    rank: 4,
    username: "Amit Patel",
    points: 698,
    badge: "🏆"
  },
  {
    rank: 5,
    username: "Sunita Singh",
    points: 654,
    badge: "⭐"
  },
  {
    rank: 6,
    username: "Vikram Gupta",
    points: 621,
    badge: "🌟"
  },
  {
    rank: 7,
    username: "Kavita Reddy",
    points: 587,
    badge: "💚"
  },
  {
    rank: 8,
    username: "Rohit Joshi",
    points: 543,
    badge: "♻️"
  },
  {
    rank: 9,
    username: "Meera Iyer",
    points: 512,
    badge: "🌱"
  },
  {
    rank: 10,
    username: "Arjun Nair",
    points: 487,
    badge: "🎯"
  }
];

export const getLeaderboardData = () => {
  return weeklyLeaderboard;
};

export const getUserRank = (username: string): number | null => {
  const user = weeklyLeaderboard.find(entry => entry.username === username);
  return user ? user.rank : null;
};
