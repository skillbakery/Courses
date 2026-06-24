import {
  recordLike,
} from "./analyticsService.js";

export function saveFeedback({
  version,
  liked,
}) {

  if (liked) {
    recordLike(version);
  }
}