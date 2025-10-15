export function formatDate(dateString: string | null) {
  if (!dateString) {
    return "...";
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'numeric',
  }).format(date);
}