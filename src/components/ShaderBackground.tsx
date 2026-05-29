import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  variant?: 'default' | 'dark' | 'gradient'
}

export default function ShaderBackground({ variant = 'default' }: ShaderBackgroundProps) {
  const colorSchemes = {
    default: ["#0f172a", "#1e1b4b", "#312e81", "#6366f1"] as const,
    dark: ["#000000", "#0a0a0a", "#1a1a1a", "#333333"] as const,
    gradient: ["#0a0a0a", "#0f172a", "#1e1b4b", "#0891b2"] as const,
  }

  return (
    <>
      {/* Capa base oscura */}
      <div className="fixed inset-0 bg-black -z-50" />
      {/* Shader */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        <MeshGradient
          className="w-full h-full"
          colors={colorSchemes[variant]}
          speed={0.25}
          backgroundColor="transparent"
        />
      </div>
    </>
  )
}
