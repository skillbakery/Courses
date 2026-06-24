import {
  generateCareerAdvice,
} from "../services/careerService.js";

(async () => {

  const result =
    await generateCareerAdvice(
      "How do I become a React developer?"
    );

  if (
    !result.response ||
    result.response.length < 50
  ) {
    throw new Error(
      "AI response failed"
    );
  }

  console.log(
    "Career Coach Test Passed"
  );
})();