export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-cooked-border border-t-cooked-amber rounded-full animate-spin" />
      {message && (
        <p className="text-sm text-cooked-text-secondary">{message}</p>
      )}
    </div>
  );
}
