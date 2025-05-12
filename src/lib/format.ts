function formatTimeRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };

  const startTime = start.toLocaleTimeString("th-TH", options);
  const endTime = end.toLocaleTimeString("th-TH", options);

  return `${startTime} - ${endTime}`;
}

export { formatTimeRange };
