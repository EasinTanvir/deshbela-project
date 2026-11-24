"use client";

import Link from "next/link";
import { useActionState } from "react";
import FormField from "@/components/common/FormField";
import MediaImage from "@/components/common/MediaImage";

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function ArticleForm({ action, articleId, initialValues, options, draftLabel = "Save as draft" }) {
  const [state, formAction, pending] = useActionState(action, {
    status: "idle",
    round: 0,
    errors: {},
    values: initialValues,
  });
  const { errors, values } = state;

  function fieldProps(field) {
    return {
      id: `article-${field}`,
      name: field,
      defaultValue: values[field] || "",
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `article-${field}-error` : `article-${field}-hint`,
      className: `${fieldClass} ${errors[field] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form key={state.round} action={formAction} noValidate className="space-y-6">
      {articleId && <input type="hidden" name="articleId" value={articleId} />}

      {Object.keys(errors).length > 0 && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form || "Please fix the marked fields below."}
        </p>
      )}

      <FormField id="article-title" label="Headline" error={errors.title}>
        <input type="text" {...fieldProps("title")} />
        <p id="article-title-hint" className="mt-1 text-xs text-muted">
          A short, clear headline. Between 10 and 150 letters.
        </p>
      </FormField>

      <FormField id="article-slug" label="Web address" error={errors.slug}>
        <div className="flex">
          <span className="hidden shrink-0 items-center border border-r-0 border-line bg-surface px-3 text-sm text-muted sm:flex">
            /news/
          </span>
          <input type="text" {...fieldProps("slug")} />
        </div>
        <p id="article-slug-hint" className="mt-1 text-xs text-muted">
          Small letters, numbers and dashes. Leave it empty to make it from the headline.
        </p>
      </FormField>

      <FormField id="article-categoryId" label="Section" error={errors.categoryId}>
        <select {...fieldProps("categoryId")}>
          <option value="">Choose a section</option>
          {options.sections.map((section) => (
            <optgroup key={section.id} label={section.name}>
              <option value={section.id}>{section.name}</option>
              {section.children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <p id="article-categoryId-hint" className="sr-only">
          The section where the story will appear.
        </p>
      </FormField>

      <FormField id="article-summary" label="Summary" error={errors.summary}>
        <textarea rows={3} {...fieldProps("summary")} />
        <p id="article-summary-hint" className="mt-1 text-xs text-muted">
          One or two sentences. It is shown under the headline and in search results.
        </p>
      </FormField>

      <FormField id="article-body" label="Story" error={errors.body}>
        <textarea rows={14} {...fieldProps("body")} />
        <p id="article-body-hint" className="mt-1 text-xs text-muted">
          Leave an empty line between paragraphs. At least 50 words to send for review.
        </p>
      </FormField>

      <fieldset aria-describedby={errors.photoId ? "article-photoId-error" : undefined}>
        <legend className="mb-1 text-sm font-semibold text-ink">Photo</legend>
        {options.photos.length === 0 ? (
          <p className="text-sm text-muted">
            You have no photos yet.{" "}
            <Link href="/reporter/media" className="font-semibold text-brand hover:underline">
              Upload one in My media
            </Link>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <li>
              <label className="flex aspect-[4/3] cursor-pointer items-center justify-center border border-line text-sm text-muted has-[:checked]:border-2 has-[:checked]:border-ink">
                <input type="radio" name="photoId" value="" defaultChecked={!values.photoId} className="sr-only" />
                No photo
              </label>
            </li>
            {options.photos.map((photo) => (
              <li key={photo.id}>
                <label className="block cursor-pointer border border-line p-1 has-[:checked]:border-2 has-[:checked]:border-ink">
                  <input
                    type="radio"
                    name="photoId"
                    value={photo.id}
                    defaultChecked={values.photoId === photo.id}
                    className="sr-only"
                  />
                  <span className="relative block aspect-[4/3] bg-surface">
                    <MediaImage file={photo.file} alt={photo.altText} sizes="200px" />
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted">{photo.altText}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {errors.photoId && (
          <p id="article-photoId-error" className="mt-1 text-sm text-brand">
            {errors.photoId}
          </p>
        )}
      </fieldset>

      <fieldset aria-describedby={errors.tagIds ? "article-tagIds-error" : undefined}>
        <legend className="mb-1 text-sm font-semibold text-ink">Tags</legend>
        <p className="mb-2 text-xs text-muted">Choose up to 5 tags that describe the story.</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
          {options.tags.map((tag) => (
            <li key={tag.id}>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name="tagIds"
                  value={tag.id}
                  defaultChecked={values.tagIds.includes(tag.id)}
                  className="h-4 w-4 accent-brand"
                />
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
        {errors.tagIds && (
          <p id="article-tagIds-error" className="mt-1 text-sm text-brand">
            {errors.tagIds}
          </p>
        )}
      </fieldset>

      <FormField id="article-metaTitle" label="Search engine title (optional)" error={errors.metaTitle}>
        <input type="text" {...fieldProps("metaTitle")} />
        <p id="article-metaTitle-hint" className="mt-1 text-xs text-muted">
          Shown on Google. Leave it empty to use the headline. Up to 70 letters.
        </p>
      </FormField>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row">
        <button
          type="submit"
          name="intent"
          value="submit"
          disabled={pending}
          className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Saving..." : "Send for review"}
        </button>
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={pending}
          className="border border-ink px-6 py-2.5 text-sm font-semibold text-ink hover:bg-surface disabled:opacity-60"
        >
          {draftLabel}
        </button>
      </div>
    </form>
  );
}
