export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionCreateParams {
  id: string;
  text: string;
  options: Option[];
  explanation: string;
}

export class Question {
  private constructor(
    private readonly _id: string,
    private readonly _text: string,
    private readonly _options: readonly Option[],
    private readonly _explanation: string
  ) {}

  static create(params: QuestionCreateParams): Question {
    if (!params.id || params.id.trim() === '') {
      throw new Error('Question id cannot be empty');
    }
    if (!params.text || params.text.trim() === '') {
      throw new Error('Question text cannot be empty');
    }
    if (!params.options || params.options.length < 2) {
      throw new Error('Question must have at least 2 options');
    }
    const correctOptions = params.options.filter((o) => o.isCorrect);
    if (correctOptions.length !== 1) {
      throw new Error('Question must have exactly one correct option');
    }
    if (!params.explanation || params.explanation.trim() === '') {
      throw new Error('Question explanation cannot be empty');
    }

    return new Question(
      params.id.trim(),
      params.text.trim(),
      [...params.options],
      params.explanation.trim()
    );
  }

  get id(): string {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  get options(): readonly Option[] {
    return this._options;
  }

  get explanation(): string {
    return this._explanation;
  }

  get correctOptionId(): string {
    const correctOption = this._options.find((o) => o.isCorrect);
    return correctOption!.id;
  }

  isCorrect(selectedOptionId: string): boolean {
    return this.correctOptionId === selectedOptionId;
  }
}
