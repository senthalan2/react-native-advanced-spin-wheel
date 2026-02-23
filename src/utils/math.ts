// Converts degrees to radians
export const degToRad = (deg: number) => (deg * Math.PI) / 180;

// Gets Cartesian coordinates for a given angle and radius
export const getCoordinatesForAngle = (angle: number, radius: number) => {
    return {
        x: radius + radius * Math.cos(degToRad(angle)),
        y: radius + radius * Math.sin(degToRad(angle)),
    };
};

// Generates an SVG path for a wheel slice
export const createSlicePath = (
    startAngle: number,
    endAngle: number,
    radius: number,
) => {
    const start = getCoordinatesForAngle(startAngle, radius);
    const end = getCoordinatesForAngle(endAngle, radius);

    // Flag for arcs > 180 degrees
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${radius} ${radius} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};