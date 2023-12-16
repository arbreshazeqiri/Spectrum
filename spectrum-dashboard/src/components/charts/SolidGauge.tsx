import React from 'react';
import { Box } from '@chakra-ui/react';
import { useGauge } from 'use-gauge';

interface SolidGaugeProps {
  value: number;
}

const START_ANGLE = 90;
const END_ANGLE = 270;

const SolidGauge: React.FC<SolidGaugeProps> = ({ value }) => {
  const gauge = useGauge({
    domain: [-30, 30],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 21,
    diameter: 250,
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2,
  });

  const blues = ['#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B'];
  const reds = ['#FB6A4A', '#EF3B2C', '#CB181D', '#A50F15', '#67000D'];

  const valueColors =
    value < 0
      ? blues[Math.floor(Math.abs(value) / 6)]
      : value === 0
      ? 'white'
      : reds[Math.floor(value / 6)];

  const baseCx = isNaN(needle?.base?.cx) ? 0 : needle.base.cx;
  const baseCy = isNaN(needle?.base?.cy) ? 0 : needle.base.cy;
  const tipCx = isNaN(needle?.tip?.cx) ? 0 : needle.tip.cx;
  const tipCy = isNaN(needle?.tip?.cy) ? 0 : needle.tip.cy;

  return (
    <Box width="80%">
      <svg
        style={{
          width: '100%',
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
          <circle fill="#31363C" {...needle?.base} r={73} />
        </g>
      </svg>
    </Box>
  );
};

export default SolidGauge;
