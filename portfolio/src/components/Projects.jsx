import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { FALLBACK_PROJECTS, KINDS } from "../data";
import { fetchProjects } from "../api";

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        if (!data.length) return;
        const mapped = data.map((p) => {
          const fallback = FALLBACK_PROJECTS.find((f) => f.name.toLowerCase() === p.name.toLowerCase());
          return {
            name: p.name,
            category: p.category,
            kind: KINDS.has((p.name || "").toLowerCase()) ? p.name.toLowerCase() : fallback?.kind || "orian",
            desc: p.description || fallback?.desc || "",
            stack: Array.isArray(p.techStack) && p.techStack.length ? p.techStack : fallback?.stack || [],
            link: p.link || fallback?.link || "#",
            ratio: fallback?.ratio || "4 / 3",
          };
        });
        setProjects(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "clamp(48px, 7vw, 96px)",
            }}
          >
            <div>
              <p className="label-mono" style={{ marginBottom: 20 }}>( 02 ) — Selected work</p>
              <h2 className="display" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
                Projects
              </h2>
            </div>
            <p className="label-mono" style={{ paddingBottom: 8 }}>
              ( {String(projects.length).padStart(2, "0")} ) shipped &amp; live
            </p>
          </div>
        </Reveal>
      </div>

      <div className="container">
        {projects.map((p, i) => (
          <article className="project-row" key={p.name}>
            <Reveal delay={0.05}>
              <div className="project-row__head">
                <span className="project-row__index">( 0{i + 1} )</span>
                <p className="label-mono" style={{ color: "rgba(17,17,17,0.55)" }}>
                  {p.category}
                </p>
              </div>

              <h3 className="project-title" style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
                {p.name}
              </h3>

              <div className="project-row__meta">
                <div className="project-row__desc">
                  <p className="body-text" style={{ maxWidth: "52ch" }}>
                    {p.desc}
                  </p>
                  <a
                    className="project-link"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    data-cursor-label="OPEN"
                  >
                    View project <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="project-row__tags">
                  {p.stack.map((s) => (
                    <span className="project-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      <div className="container" style={{ marginTop: "clamp(48px, 6vw, 88px)" }}>
        <Reveal>
          <a
            href="https://github.com/imaryannn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="cta-github"
          >
            <span className="label-mono label-mono--lg">More experiments on GitHub</span>
            <span aria-hidden="true" style={{ fontSize: 22 }}>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
