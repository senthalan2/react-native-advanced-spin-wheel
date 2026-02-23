import React, { memo } from "react";
import { Path, G, Text as SvgText, Image as SvgImage } from "react-native-svg";
import { SpinWheelSection } from "../types";
import { createSlicePath } from "../utils/math";

interface Props {
  section: SpinWheelSection;
  index: number;
  radius: number;
  startAngle: number;
  sliceAngle: number;
  strokeWidth: number;
}

const Slice = ({
  section,
  radius,
  startAngle,
  sliceAngle,
  strokeWidth,
}: Props) => {
  const endAngle = startAngle + sliceAngle;
  const path = createSlicePath(startAngle, endAngle, radius);

  // Calculate text center point (middle of the slice, 65% out from center)
  const textRadius = radius * 0.65;
  const midAngle = startAngle + sliceAngle / 2;
  const textX = radius + textRadius * Math.cos((midAngle * Math.PI) / 180);
  const textY = radius + textRadius * Math.sin((midAngle * Math.PI) / 180);

  // Rotate text to face outwards naturally
  const textRotation = midAngle + 90;

  return (
    <G>
      <Path
        d={path}
        fill={section.backgroundColor}
        stroke="#ffffff"
        strokeWidth={strokeWidth}
      />

      {/* Centered Text / Image Wrapper */}
      <G x={textX} y={textY} rotation={textRotation} origin="0,0">
        {section.image ? (
          <SvgImage
            href={section.image}
            x={-15}
            y={-15}
            width={30}
            height={30}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <>
            <SvgText
              fill={section.textColor || "#ffffff"}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {section.title}
            </SvgText>
            {section.description && (
              <SvgText
                y={15}
                fill={section.textColor || "#ffffff"}
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="middle"
                opacity={0.8}
              >
                {section.description}
              </SvgText>
            )}
          </>
        )}
      </G>
    </G>
  );
};

export const SpinWheelSlice = memo(Slice);
