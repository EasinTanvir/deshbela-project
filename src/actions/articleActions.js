"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkArticle, readArticleForm } from "@/lib/articleForm";
import { canReporterEdit } from "@/lib/articleStatus";
import { getCurrentUser } from "@/lib/currentUser";
import { createArticle, deleteArticle, getReporterArticle, updateArticle } from "@/lib/reporterData";

async function getReporter() {
  const user = await getCurrentUser();
  return user && user.roleId === "role-reporter" ? user : null;
}

function loginAgain(previousState) {
  return {
    status: "error",
    round: previousState.round + 1,
    errors: { form: "Please log in again as a reporter." },
    values: previousState.values,
  };
}

export async function saveNewArticle(previousState, formData) {
  const user = await getReporter();
  if (!user) return loginAgain(previousState);

  const values = readArticleForm(formData);
  const { errors, photo, tagIds } = await checkArticle(user.id, values, null);

  if (Object.keys(errors).length > 0) {
    return { status: "error", round: previousState.round + 1, errors, values };
  }

  const status = values.intent === "submit" ? "IN_REVIEW" : "DRAFT";
  await createArticle(user.id, { ...values, tagIds }, photo, status, new Date().toISOString());

  revalidatePath("/reporter", "layout");
  redirect(`/reporter/articles?saved=${values.intent === "submit" ? "submitted" : "draft"}`);
}

export async function saveArticleChanges(previousState, formData) {
  const user = await getReporter();
  if (!user) return loginAgain(previousState);

  const values = readArticleForm(formData);
  const articleId = formData.get("articleId");
  const article = typeof articleId === "string" ? await getReporterArticle(user.id, articleId) : null;

  if (!article || !canReporterEdit(article.status)) {
    return {
      status: "error",
      round: previousState.round + 1,
      errors: { form: "This article is with the editor and can not be changed now." },
      values,
    };
  }

  const { errors, photo, tagIds } = await checkArticle(user.id, values, article.id);
  if (Object.keys(errors).length > 0) {
    return { status: "error", round: previousState.round + 1, errors, values };
  }

  const status = values.intent === "submit" ? "IN_REVIEW" : article.status;
  await updateArticle(article.id, { ...values, tagIds }, photo, status, new Date().toISOString());

  revalidatePath("/reporter", "layout");
  redirect(`/reporter/articles?saved=${values.intent === "submit" ? "submitted" : "draft"}`);
}

export async function deleteDraft(formData) {
  const user = await getReporter();
  if (!user) return;

  const articleId = formData.get("articleId");
  const article = typeof articleId === "string" ? await getReporterArticle(user.id, articleId) : null;
  if (!article || article.status !== "DRAFT") return;

  await deleteArticle(article.id);
  revalidatePath("/reporter", "layout");
  redirect("/reporter/articles?saved=deleted");
}
