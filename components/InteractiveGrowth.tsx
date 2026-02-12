'use client'

import { useMemo, useState } from 'react'

const WIDTH = 520
const HEIGHT = 220
const PADDING = 24

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function InteractiveGrowth() {
  const [rate, setRate] = useState(0.8)

  const points = useMemo(() => {
    const steps = 60
    const data: Array<[number, number]> = []
    let x = 0.1
    for (let i = 0; i <= steps; i += 1) {
      x = clamp(x + rate * x * (1 - x), 0, 1)
      data.push([i / steps, x])
    }
    return data
  }, [rate])

  const path = useMemo(() => {
    return points
      .map(([t, value], index) => {
        const x = PADDING + t * (WIDTH - PADDING * 2)
        const y = HEIGHT - PADDING - value * (HEIGHT - PADDING * 2)
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [points])

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        background: '#fff'
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>
          成長率 r: {rate.toFixed(2)}
        </label>
        <input
          type="range"
          min={0.1}
          max={1.6}
          step={0.05}
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          style={{ width: '100%', marginTop: 6 }}
        />
      </div>
      <svg width={WIDTH} height={HEIGHT} role="img" aria-label="成長モデルの軌跡">
        <rect
          x={PADDING}
          y={PADDING}
          width={WIDTH - PADDING * 2}
          height={HEIGHT - PADDING * 2}
          fill="#f8fafc"
          stroke="#e2e8f0"
        />
        <path d={path} fill="none" stroke="#0f766e" strokeWidth={3} />
        <text x={PADDING} y={PADDING - 8} fontSize={12} fill="#475569">
          Population
        </text>
        <text
          x={WIDTH - PADDING - 40}
          y={HEIGHT - 6}
          fontSize={12}
          fill="#475569"
        >
          Time
        </text>
      </svg>
      <p style={{ marginTop: 8, fontSize: 13, color: '#475569' }}>
        スライダーで成長率を変えると、ロジスティック成長の軌跡が即時に更新されます。
      </p>
    </div>
  )
}
