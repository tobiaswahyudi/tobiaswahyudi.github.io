export const formatDate: (date: Date) => string =
  (date: Date) => {
    return new Date(date).toLocaleString('en-us', { month: 'short', year: 'numeric' })
  }