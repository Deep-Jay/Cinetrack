interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-lg text-red-400">⚠️ {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
