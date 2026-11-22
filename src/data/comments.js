const comments = [
  { id: "com-1", articleId: "art-1", userId: "user-9", parentId: null, body: "Good news for people who work late. I hope they run more trains on Friday too.", status: "APPROVED", createdAt: "2026-11-23T09:05:00+06:00" },
  { id: "com-2", articleId: "art-1", userId: "user-10", parentId: "com-1", body: "The report says they will check weekends after three months.", status: "APPROVED", createdAt: "2026-11-23T09:20:00+06:00" },
  { id: "com-3", articleId: "art-1", userId: "user-11", parentId: null, body: "Please also fix the long queue at the ticket machines in the evening.", status: "APPROVED", createdAt: "2026-11-23T09:42:00+06:00" },
  { id: "com-4", articleId: "art-1", userId: "user-12", parentId: null, body: "Buy cheap tickets here!!!", status: "PENDING", createdAt: "2026-11-23T09:50:00+06:00" },
  { id: "com-5", articleId: "art-17", userId: "user-11", parentId: null, body: "What a finish. The young keeper played very well under pressure.", status: "APPROVED", createdAt: "2026-11-22T22:15:00+06:00" },
  { id: "com-6", articleId: "art-17", userId: "user-9", parentId: null, body: "Hope the same team is picked for the test series.", status: "APPROVED", createdAt: "2026-11-22T23:01:00+06:00" },
  { id: "com-7", articleId: "art-6", userId: "user-10", parentId: null, body: "Stay safe everyone in the coastal areas.", status: "APPROVED", createdAt: "2026-11-23T06:30:00+06:00" },
  { id: "com-8", articleId: "art-14", userId: "user-12", parentId: null, body: "Prices at the market are still high for most families.", status: "APPROVED", createdAt: "2026-11-22T17:45:00+06:00" },
];

export default comments;
