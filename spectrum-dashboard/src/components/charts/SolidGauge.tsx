import { Box } from '@chakra-ui/react'
import React from 'react'
import { useGauge } from 'use-gauge'

interface SolidGaugeProps {
  value: number
}

const START_ANGLE = 90
const END_ANGLE = 270

export function SolidGauge(props: SolidGaugeProps) {
  const { value } = props
  const gauge = useGauge({
    domain: [0, value >= 100 ? value : value < 0 ? 0.001 : 100],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 21,
    diameter: 250,
  })

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2,
  })

  const valueColors =
    value === 0 && value < 10
      ? '#F93C00'
      : value < 20
      ? '#F95200'
      : value < 30
      ? '#F96800'
      : value < 40
      ? '#F97E00'
      : value < 50
      ? '#F99500'
      : value < 60
      ? '#BAD226'
      : value < 70
      ? '#8FAF4C'
      : value < 80
      ? '#84BC72'
      : value < 90
      ? '#5DC998'
      : value <= 100
      ? '#35D6C0'
      : '#35D6C0'

  const baseCx = isNaN(needle?.base?.cx) ? 0 : needle.base.cx
  const baseCy = isNaN(needle?.base?.cy) ? 0 : needle.base.cy
  const tipCx = isNaN(needle?.tip?.cx) ? 0 : needle.tip.cx
  const tipCy = isNaN(needle?.tip?.cy) ? 0 : needle.tip.cy
  return (
    <Box
      w={['60%', '60%', '55%', '55%', '90%']}
      ml={['25%', '25%', '27%', '25%', '12%']}
    >
      <svg
        style={{
          width: '80%',
          height: '100%',
          overflow: 'visible',
          padding: 4,
        }}
        {...gauge?.getSVGProps()}
      >
        <g id="arcs">
          <path
            {...gauge?.getArcProps({
              offset: -32,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE,
            })}
            fill="none"
            strokeWidth={24}
            stroke={'#E7E7E7'}
          />
          {gauge?.valueToAngle(value) && (
            <path
              {...gauge?.getArcProps({
                offset: -32,
                startAngle: START_ANGLE,
                endAngle: gauge?.valueToAngle(value),
              })}
              strokeWidth={24}
              fill="transparent"
              stroke={valueColors}
            />
          )}
        </g>
        <g id="needle">
          <line
            strokeWidth={8}
            transform={'scale(0.9)'}
            stroke={'white'}
            style={{
              filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25))',
            }}
            x1={baseCx}
            x2={tipCx}
            y1={baseCy}
            y2={tipCy}
          />
          <line
            strokeWidth={2.5}
            stroke={valueColors}
            transform={'scale(0.9)'}
            x1={baseCx}
            x2={tipCx}
            y1={baseCy}
            y2={tipCy}
          />
          <circle fill="white" {...needle?.base} r={73} />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={40}
            fontWeight="bold"
            fill={'#2C88FD'}
            z={100}
            y={35}
          >
            {isNaN(value)
              ? 0
              : value}
          </text>
        </g>
      </svg>
    </Box>
  )
}

export default SolidGauge
