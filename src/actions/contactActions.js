"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(previousState, formData) {
  const values = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    subject: readText(formData, "subject"),
    message: readText(formData, "message"),
  };

  if (readText(formData, "website") !== "") {
    return { status: "sent", errors: {}, values: {} };
  }

  const errors = {};
  if (values.name.length < 2) errors.name = "Please write your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please write a valid email address.";
  if (values.subject.length < 3) errors.subject = "Please write a subject.";
  if (values.message.length < 20) errors.message = "Your message must be at least 20 characters long.";
  if (values.message.length > 2000) errors.message = "Your message must be shorter than 2000 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  return { status: "sent", errors: {}, values: {} };
}
