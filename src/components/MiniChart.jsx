import { useRef, useEffect } from "react";

const MiniChart = ({ data, trend }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values for scaling
    const min = Math.min(...data) * 0.95;
    const max = Math.max(...data) * 1.05;
    const range = max - min;

    // Set line style
    ctx.strokeStyle = trend >= 0 ? "#10B981" : "#EF4444"; // Tailwind green-500 and red-500
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Draw line
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle =
      trend >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"; // Tailwind green-500 and red-500 with opacity
    ctx.fill();
  }, [data, trend]);

  return (
    <div className="w-[150px] h-[50px]">
      <canvas ref={canvasRef} width={150} height={50} />
    </div>
  );
};

export default MiniChart;
