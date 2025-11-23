/**
 * Value object representing a user's answer to a quiz question.
 */
export interface Answer {
  readonly questionId: string;
  readonly selectedOptionId: string;
  readonly isCorrect: boolean;
}

export function createAnswer(
  questionId: string,
  selectedOptionId: string,
  isCorrect: boolean
): Answer {
  if (!questionId || questionId.trim() === '') {
    throw new Error('Answer questionId cannot be empty');
  }
  if (!selectedOptionId || selectedOptionId.trim() === '') {
    throw new Error('Answer selectedOptionId cannot be empty');
  }

  return {
    questionId: questionId.trim(),
    selectedOptionId: selectedOptionId.trim(),
    isCorrect,
  };
}
