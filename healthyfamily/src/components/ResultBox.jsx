function ResultBox({ result }) {
  return (
    <div
      className={`mt-6 p-4 rounded-xl text-white bg-${result.color}-500`}
    >
      <h3 className="text-lg font-bold">
        Result: {result.level}
      </h3>
      <p className="mt-2">
        {result.level === "High Risk"
          ? "Please consult a gynecologist"
          : "Maintain healthy lifestyle"}
      </p>
    </div>
  );
}

export default ResultBox;
