const roles = [
  { id: "role-reader", name: "Reader", permissions: ["comment", "react", "bookmark"] },
  { id: "role-reporter", name: "Reporter", permissions: ["article.create", "article.submit", "media.upload"] },
  { id: "role-editor", name: "Editor", permissions: ["article.review", "article.publish", "comment.moderate"] },
  { id: "role-admin", name: "Administrator", permissions: ["all"] },
];

export default roles;
