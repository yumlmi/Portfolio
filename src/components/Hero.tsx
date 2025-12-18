import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-reading mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serifen mb-8">
          小さな物語の集積
        </h1>

        <p className="text-lg leading-relaxed dropcap">
          コードを書くという行為は、短い文章を積み重ねることに似ている。
          意味を持たせ、読みやすくし、必要なところだけを強調する。
        </p>
      </div>
    </section>
  )
}


export default Hero
