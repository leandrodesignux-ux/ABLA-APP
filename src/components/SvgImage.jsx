import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SvgImage({ src, alt, className, eager = false }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-100 rounded" />
      )}
      {/* Actual image with fade-in */}
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`${className} ${loaded ? '' : 'invisible'}`}
        draggable="false"
      />
    </div>
  )
}
