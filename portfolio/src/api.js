const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocal
  ? "http://127.0.0.1:3000"
  : "https://backendaryanfolio.vercel.app";

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  const data = await res.json();
  return data.success ? data.projects : [];
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE}/api/skills`);
  const data = await res.json();
  return data.success ? data.skills : [];
}
