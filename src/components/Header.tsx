import React from 'react'


const Header: React.FC = () => {
return (
<header className="bg-white shadow">
<div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
<div className="font-semibold">ポートフォリオ</div>
<nav className="space-x-4 text-sm text-gray-600">
<a href="#projects" className="hover:underline">Projects</a>
<a href="#about" className="hover:underline">About</a>
<a href="#contact" className="hover:underline">Contact</a>
</nav>
</div>
</header>
)
}


export default Header