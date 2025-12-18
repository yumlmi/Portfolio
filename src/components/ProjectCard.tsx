import React from 'react'
import type { Project } from '../types'


type Props = { project: Project }


const ProjectCard: React.FC<Props> = ({ project }) => {
return (
<article className="
  bg-neutral-900
  border border-neutral-800
  rounded-2xl
  p-6
  transition
  hover:-translate-y-1
  hover:border-blue-500
">
  <h3 className="text-lg font-medium">{project.title}</h3>

  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
    {project.desc}
  </p>

  <div className="mt-4 flex flex-wrap gap-2">
    {project.tech.map(t => (
      <span
        key={t}
        className="text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-300"
      >
        {t}
      </span>
    ))}
  </div>
</article>

)
}


export default ProjectCard