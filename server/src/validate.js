// Simple, dependency-free validation. Never trust the client.

export function validateContact(body) {
  const errors = [];
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const type = (body.type || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2) errors.push("Name is required.");
  if (name.length > 120) errors.push("Name is too long.");

  // basic but effective email shape check
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) errors.push("A valid email is required.");

  if (message.length < 5) errors.push("Message is too short.");
  if (message.length > 5000) errors.push("Message is too long.");

  const allowedTypes = ["Website", "Web app / MVP", "CMS / custom system", "Redesign", "Something else"];
  const safeType = allowedTypes.includes(type) ? type : "Something else";

  return {
    valid: errors.length === 0,
    errors,
    data: { name, email, type: safeType, message },
  };
}
