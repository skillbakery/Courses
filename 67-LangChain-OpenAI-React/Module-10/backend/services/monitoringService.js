const logs = [];

export function logInteraction(data) {

  logs.push({
    ...data,
    timestamp: new Date(),
  });
}

export function getLogs() {
  return logs;
}