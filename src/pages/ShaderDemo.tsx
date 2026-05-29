import { useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"
import ShaderBackground from "../components/ShaderBackground"

export default function ShaderDemo() {
  const [intensity, setIntensity] = useState(0.8)
  const [speed, setSpeed] = useState(0.3)
  const [activeEffect, setActiveEffect] = useState<"mesh" | "dots" | "combined">("mesh")

  return (
    <div className="relative min-h-screen">
      <ShaderBackground variant="dark" />

      <div className="relative z-10 pt-20">
        {/* Header */}
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Shader Backgrounds
            </h1>
            <p className="text-xl text-slate-400">
              Three.js powered animated backgrounds
            </p>
          </div>

          {/* Effect Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveEffect("mesh")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeEffect === "mesh"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Mesh Gradient
            </button>
            <button
              onClick={() => setActiveEffect("dots")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeEffect === "dots"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Dot Orbit
            </button>
            <button
              onClick={() => setActiveEffect("combined")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeEffect === "combined"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Combined
            </button>
          </div>

          {/* Sliders */}
          <div className="max-w-md mx-auto space-y-6 mb-12">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Speed: {speed.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Intensity: {intensity.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.3"
                max="1.5"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Shader Canvas */}
        <div className="fixed inset-0 -z-5 overflow-hidden">
          {activeEffect === "mesh" && (
            <MeshGradient
              className="w-full h-full"
              colors={["#0f172a", "#1e1b4b", "#312e81", "#6366f1"]}
              speed={speed}
              backgroundColor="#000000"
            />
          )}

          {activeEffect === "dots" && (
            <div className="w-full h-full bg-black">
              <DotOrbit
                className="w-full h-full"
                dotColor="#6366f1"
                orbitColor="#312e81"
                speed={speed}
                intensity={intensity}
              />
            </div>
          )}

          {activeEffect === "combined" && (
            <>
              <MeshGradient
                className="w-full h-full"
                colors={["#0f172a", "#1e1b4b", "#312e81", "#6366f1"]}
                speed={speed * 0.5}
                wireframe="true"
                backgroundColor="#000000"
              />
              <div className="absolute inset-0 opacity-60">
                <DotOrbit
                  className="w-full h-full"
                  dotColor="#a855f7"
                  orbitColor="#312e81"
                  speed={speed * 1.5}
                  intensity={intensity * 0.8}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
