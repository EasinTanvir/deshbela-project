"use client";

import { useActionState } from "react";
import { uploadMedia } from "@/actions/mediaActions";
import FormField from "@/components/common/FormField";

const fieldClass = "w-full border bg-paper px-3 py-2 text-base text-ink outline-none focus:border-ink";

export default function MediaUploadForm() {
  const [state, formAction, pending] = useActionState(uploadMedia, {
    status: "idle",
    round: 0,
    errors: {},
    values: { altText: "", caption: "" },
  });
  const { errors, values } = state;

  function fieldProps(field) {
    return {
      id: `media-${field}`,
      name: field,
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `media-${field}-error` : undefined,
      className: `${fieldClass} ${errors[field] ? "border-brand" : "border-line"}`,
    };
  }

  return (
    <form key={state.round} action={formAction} noValidate className="space-y-5">
      {state.status === "saved" && (
        <p role="status" className="border border-line bg-surface px-3 py-2 text-sm text-ink">
          The photo has been uploaded. You can now use it in your articles.
        </p>
      )}
      {errors.form && (
        <p role="alert" className="border border-brand px-3 py-2 text-sm text-brand">
          {errors.form}
        </p>
      )}

      <FormField id="media-file" label="Photo" error={errors.file}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...fieldProps("file")}
          className={`${fieldProps("file").className} file:mr-3 file:border-0 file:bg-surface file:px-3 file:py-1 file:text-sm file:font-semibold file:text-ink`}
        />
        <p className="mt-1 text-xs text-muted">JPG, PNG or WebP, up to 2 MB.</p>
      </FormField>

      <FormField id="media-altText" label="What does the photo show?" error={errors.altText}>
        <input type="text" defaultValue={values.altText} {...fieldProps("altText")} />
        <p className="mt-1 text-xs text-muted">Read out to blind readers and shown if the photo does not load.</p>
      </FormField>

      <FormField id="media-caption" label="Caption (optional)" error={errors.caption}>
        <input type="text" defaultValue={values.caption} {...fieldProps("caption")} />
      </FormField>

      <button
        type="submit"
        disabled={pending}
        className="bg-brand px-6 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Uploading..." : "Upload photo"}
      </button>
    </form>
  );
}
