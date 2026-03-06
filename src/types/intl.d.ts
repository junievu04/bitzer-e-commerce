type FormatMessage = {
  (key: string, values?: Record<string, string | number>): string
  (
    key: string,
    values: Record<string, string | number | React.ReactNode>,
  ): React.ReactNode
}
