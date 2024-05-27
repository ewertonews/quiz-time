export interface Alternative {
    key: string;
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    id: number;
    text: string;
    alternatives: Alternative[];
  }
  