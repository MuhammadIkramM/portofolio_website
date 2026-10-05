import { useState, useRef } from 'react';
import { PROJECTS } from '@/data/projects';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectModal } from './ProjectModal';
import styles from './Projects.module.css';

export function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const cardRefs = useRef({});
  const preloadedImagesRef = useRef(new Set());

  const preloadThumbnail = (thumbnail) => {
    if (!thumbnail || preloadedImagesRef.current.has(thumbnail)) return;
    preloadedImagesRef.current.add(thumbnail);
    const img = new Image();
    img.src = thumbnail;
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    const closedId = selectedProject?.id;
    setSelectedProject(null);
    if (closedId && cardRefs.current[closedId]) {
      cardRefs.current[closedId].focus();
    }
  };

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <SectionHeader
        kicker={<><span>03</span> PROJECTS</>}
        title="Selected"
        accent="Projects"
        subtitle="Things I have designed and built."
      />

      <div className={styles.grid}>
        {PROJECTS.map((project, i) => {
          const isOdd = i % 2 === 0; // 0-indexed: index 0 (1st card) is odd-numbered card
          const indexNum = `(${String(i + 1).padStart(2, '0')})`;
          const displayedStack = project.stack ? project.stack.slice(0, 3) : [];
          const remainingCount = project.stack ? project.stack.length - 3 : 0;

          return (
            <Reveal key={project.id} delay={i * 0.05}>
              <button
                ref={(el) => (cardRefs.current[project.id] = el)}
                type="button"
                className={`${styles.card} ${isOdd ? styles.cardOdd : styles.cardEven}`}
                onClick={() => handleCardClick(project)}
                onPointerEnter={() => preloadThumbnail(project.thumbnail)}
                onFocus={() => preloadThumbnail(project.thumbnail)}
                aria-haspopup="dialog"
              >
                <div className={styles.cardHeader}>
                  <span className={styles.index}>{indexNum}</span>
                  <span className={styles.meta}>
                    {project.period && <span>{project.period}</span>}
                    {project.period && project.category && <span> • </span>}
                    {project.category && <span>{project.category}</span>}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                {project.subtitle && (
                  <p className={styles.cardSubtitle}>{project.subtitle}</p>
                )}

                {project.summary && (
                  <p className={styles.cardSummary}>{project.summary}</p>
                )}

                <div className={styles.stackRow}>
                  {displayedStack.map((tech) => (
                    <span key={tech} className={styles.chip}>
                      {tech}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className={styles.chipMore}>+{remainingCount}</span>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleModalClose} />
      )}
    </section>
  );
}
