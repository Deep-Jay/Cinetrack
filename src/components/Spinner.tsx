interface SpinnerProps {
  fullScreen?: boolean;
}

const styles = {
  bars: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  bar: {
    width: "8px",
    height: "40px",
    borderRadius: "6px",
    animation: "wave 0.8s infinite ease-in-out",
  },
};

const BarsWave = () => {
  const barCount = 5;

  return (
    <div style={styles.bars}>
      {[...Array(barCount)].map((_, i) => (
        <span
          key={i}
          className="bg-indigo-500"
          style={{
            ...styles.bar,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Spinner({ fullScreen = false }: SpinnerProps) {
  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarsWave />
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <BarsWave />
    </div>
  );
}
