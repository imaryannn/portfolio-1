export const FALLBACK_PROJECTS = [
  {
    name: "Orian",
    category: "AI Platform",
    kind: "orian",
    desc: "Goal-driven multi-agent AI. Input a goal and specialised agents autonomously plan, research, reason and deliver completed work without human intervention.",
    stack: ["Node.js", "React", "Groq API", "BullMQ", "Redis", "Socket.io"],
    link: "https://oriannn.vercel.app",
    ratio: "16 / 10",
  },
  {
    name: "ZyroMeet",
    category: "Video Calling",
    kind: "zyromeet",
    desc: "Browser-based video calling using WebRTC for peer-to-peer media and WebSockets for signalling — real-time connection negotiation with low-latency A/V transport.",
    stack: ["WebRTC", "WebSocket", "React"],
    link: "https://zyromeet.onrender.com/",
    ratio: "4 / 3",
  },
  {
    name: "TelStorage",
    category: "Cloud Storage",
    kind: "telstorage",
    desc: "Free, unlimited cloud storage built on Telegram's infrastructure — a Google Drive-style interface to upload, organise, search and access files from any device.",
    stack: ["Next.js", "TypeScript", "Telegram API"],
    link: "https://telstorage.vercel.app/",
    ratio: "4 / 5",
  },
  {
    name: "NodeChat",
    category: "Real-time Chat",
    kind: "nodechat",
    desc: "Chat built on Node.js and Socket.io — bidirectional WebSocket connections, room-based messaging and live user presence on a persistent Express server.",
    stack: ["Express.js", "MongoDB Streams", "WSS"],
    link: "https://nodechat-aivw.onrender.com/",
    ratio: "4 / 3",
  },
  {
    name: "WPDF Toolkit",
    category: "Browser Utility",
    kind: "wpdf",
    desc: "Client-side PDF processor using Web Workers to compress, encrypt and manipulate PDF binaries entirely in the browser — no uploads, no server.",
    stack: ["Web Workers", "Binary Streams", "PDF.js API"],
    link: "https://imaryannn.github.io/wpdf/",
    ratio: "16 / 10",
  },
  {
    name: "Prioramail",
    category: "Email Client",
    kind: "prioramail",
    desc: "Minimal email platform with OAuth/JWT authentication, full inbox management and Gmail API integration — a clean, distraction-free way to read mail.",
    stack: ["Express", "MongoDB", "OAuth / JWT", "Gmail API"],
    link: "https://prioramail.vercel.app/",
    ratio: "4 / 5",
  },
  {
    name: "Syncyt",
    category: "Watch Together",
    kind: "syncyt",
    desc: "Synchronised media platform — watch YouTube with friends in real time, with live chat and playback presence powered by Socket.io.",
    stack: ["Socket.io", "Node.js", "YouTube API"],
    link: "https://syncyt.onrender.com/",
    ratio: "4 / 3",
  },
];

export const KINDS = new Set(FALLBACK_PROJECTS.map((p) => p.kind));

export const CAPABILITIES = [
  {
    index: "01",
    title: "Full-stack",
    desc: "End-to-end product engineering — API design, data models, state and deployment. From a blank screen to something people can actually use.",
    tags: ["Node.js", "Express", "React", "MongoDB"],
  },
  {
    index: "02",
    title: "Realtime",
    desc: "Systems that move the moment something happens — WebRTC video, WebSocket messaging, live presence and synchronised media playback.",
    tags: ["WebRTC", "Socket.io", "WSS", "Streams"],
  },
  {
    index: "03",
    title: "AI tools",
    desc: "Goal-driven multi-agent pipelines that plan, research and deliver work — wired to LLM APIs, queues and live tooling.",
    tags: ["Groq API", "BullMQ", "Redis", "Agents"],
  },
  {
    index: "04",
    title: "Web craft",
    desc: "Fast, accessible, editorial-grade front-ends. Typography, motion and performance treated as first-class features.",
    tags: ["React", "Next.js", "TypeScript", "CSS"],
  },
  {
    index: "05",
    title: "Data & systems",
    desc: "Storage and auth done properly — MongoDB pipelines, OAuth/JWT, REST APIs and files processed safely on the client.",
    tags: ["MongoDB", "OAuth / JWT", "REST", "Web Workers"],
  },
];

export const SOCIALS = {
  github: "https://github.com/imaryannn",
  linkedin: "https://www.linkedin.com/in/aryan-2064153a0/",
};
