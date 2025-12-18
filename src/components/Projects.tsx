import React from 'react'
import ProjectCard from './ProjectCard'
import type { Project } from '../types'


const demoProjects: Project[] = [
{
id: 1,
title: 'Portfolio Site',
desc: 'This site — built with React and Vite.',
tech: ['React', 'Vite', 'Tailwind'],
link: '#'
},
{
id: 2,
title: 'Todo App',
desc: 'A small todo app with localStorage and animations.',
tech: ['React', 'CSS'],
link: '#'
}
]


const Projects: React.FC = () => {
return (
<section id="projects" className="py-12">
<h2 className="text-2xl font-semibold mb-6">プロジェクト</h2>
<div className="grid gap-6 sm:grid-cols-2">
{demoProjects.map(p => (
<ProjectCard key={p.id} project={p} />
))}
</div>
</section>
)
}


export default Projects