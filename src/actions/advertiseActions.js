"use server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s-]{8,20}$/;

function readText(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendAdvertiserInquiry(previousState, formData) {
  const values = {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    message: readText(formData, "message"),
  };

  if (readText(formData, "website") !== "") {
    return { status: "sent", errors: {}, values: {} };
  }

  const errors = {};
  if (values.name.length < 2) errors.name = "Please write your name or company name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please write a valid email address.";
  if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Please write a valid phone number.";
  if (values.message.length < 20) errors.message = "Please tell us a little more (at least 20 characters).";
  if (values.message.length > 2000) errors.message = "Your message must be shorter than 2000 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  return { status: "sent", errors: {}, values: {} };
}
