import React, { useState } from "react";

// Set VITE_API_URL in a .env file (e.g. http://localhost:5000 locally,
// your Render URL in production). Falls back to localhost for dev.
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", type: "Website", message: "", company_website: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [note, setNote] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setNote("// please fill in name, email and message");
      return;
    }
    setStatus("sending");
    setNote("// sending…");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        setNote("// thanks — your message is on its way. I'll be in touch.");
        setForm({ name: "", email: "", type: "Website", message: "", company_website: "" });
      } else {
        setStatus("error");
        setNote("// " + (data.errors ? data.errors.join(" ") : data.error || "something went wrong"));
      }
    } catch {
      setStatus("error");
      setNote("// couldn't reach the server. Try again, or email directly.");
    }
  };

  return (
    <div>
      <div className="field">
        <label>Your name</label>
        <input type="text" value={form.name} onChange={update("name")} placeholder="Jane Doe" />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" value={form.email} onChange={update("email")} placeholder="jane@company.com" />
      </div>
      <div className="field">
        <label>Project type</label>
        <select value={form.type} onChange={update("type")}>
          <option>Website</option>
          <option>Web app / MVP</option>
          <option>CMS / custom system</option>
          <option>Redesign</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label>Tell me about it</label>
        <textarea value={form.message} onChange={update("message")} placeholder="What are you building, and what do you need?" />
      </div>

      {/* Honeypot — hidden from humans, bots fill it. Don't remove. */}
      <input
        type="text"
        tabIndex="-1"
        autoComplete="off"
        value={form.company_website}
        onChange={update("company_website")}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <button className="submit" onClick={handleSubmit} disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND ENQUIRY →"}
      </button>
      <div className="form-note">{note}</div>
    </div>
  );
}
