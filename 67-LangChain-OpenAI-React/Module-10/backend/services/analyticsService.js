const analytics = {
  A: {
    requests: 0,
    likes: 0,
  },

  B: {
    requests: 0,
    likes: 0,
  },
};

export function recordRequest(version) {

  analytics[version].requests++;
}

export function recordLike(version) {

  analytics[version].likes++;
}

export function getAnalyticsData() {

  return analytics;
}