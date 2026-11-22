const categories = [
  { id: "cat-1", parentId: null, name: "National", slug: "national" },
  { id: "cat-2", parentId: null, name: "International", slug: "international" },
  { id: "cat-3", parentId: null, name: "Politics", slug: "politics" },
  { id: "cat-4", parentId: null, name: "Economy", slug: "economy" },
  { id: "cat-5", parentId: null, name: "Sports", slug: "sports" },
  { id: "cat-6", parentId: null, name: "Technology", slug: "technology" },
  { id: "cat-7", parentId: null, name: "Entertainment", slug: "entertainment" },
  { id: "cat-8", parentId: "cat-1", name: "Dhaka", slug: "dhaka" },
  { id: "cat-9", parentId: "cat-1", name: "Education", slug: "education" },
  { id: "cat-10", parentId: "cat-4", name: "Banking", slug: "banking" },
  { id: "cat-11", parentId: "cat-5", name: "Cricket", slug: "cricket" },
  { id: "cat-12", parentId: "cat-5", name: "Football", slug: "football" },
  { id: "cat-13", parentId: "cat-7", name: "Film", slug: "film" },
  { id: "cat-14", parentId: "cat-7", name: "Music", slug: "music" },
];

export default categories;
