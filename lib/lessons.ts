export type WordBankExercise = {
  type: "word-bank";
  prompt: string;
  words: string[];
  answer: string[];
};

export type MultipleChoiceExercise = {
  type: "multiple-choice";
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type FillBlankExercise = {
  type: "fill-blank";
  sentence: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type ListeningExercise = {
  type: "listening";
  text: string;
  romaji: string;
  translation: string;
};

export type Exercise =
  | WordBankExercise
  | MultipleChoiceExercise
  | FillBlankExercise
  | ListeningExercise;

export type Lesson = {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  icon: string;
  exercises: Exercise[];
};

export const LESSONS: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    titleJp: "挨拶",
    description: "Learn how to say hello, goodbye, and thank you in Japanese.",
    icon: "👋",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does こんにちは mean?",
        choices: ["Goodbye", "Good morning", "Hello", "Thank you"],
        correctIndex: 2,
        explanation: "こんにちは (Konnichiwa) means Hello and is used during the day.",
      },
      {
        type: "multiple-choice",
        question: "How do you say 'Good morning' in Japanese?",
        choices: ["おやすみなさい", "おはようございます", "さようなら", "ありがとう"],
        correctIndex: 1,
        explanation: "おはようございます (Ohayou gozaimasu) means Good morning.",
      },
      {
        type: "fill-blank",
        sentence: "___、はじめまして。",
        choices: ["さようなら", "こんにちは", "おやすみ", "いいえ"],
        correctIndex: 1,
        explanation: "こんにちは, はじめまして means Hello, nice to meet you.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'Thank you very much'",
        words: ["ございます", "ありがとう"],
        answer: ["ありがとう", "ございます"],
      },
      {
        type: "listening",
        text: "さようなら",
        romaji: "Sayounara",
        translation: "Goodbye",
      },
    ],
  },
  {
    id: "self-introduction",
    title: "Self-Introduction",
    titleJp: "自己紹介",
    description: "Introduce yourself — your name, where you're from, and more.",
    icon: "🙋",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does 私 (わたし) mean?",
        choices: ["You", "He / She", "I / Me", "We"],
        correctIndex: 2,
        explanation: "私 (わたし) is the standard word for 'I' or 'Me' in Japanese.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I am a student'",
        words: ["です", "私は", "学生"],
        answer: ["私は", "学生", "です"],
      },
      {
        type: "fill-blank",
        sentence: "私の名前は さくら ___ 。",
        choices: ["か", "は", "です", "を"],
        correctIndex: 2,
        explanation: "です (desu) is the polite copula, like 'am/is/are' in English.",
      },
      {
        type: "multiple-choice",
        question: "How do you ask 'What is your name?' in Japanese?",
        choices: [
          "どこから来ましたか？",
          "お名前は何ですか？",
          "いくつですか？",
          "何語を話しますか？",
        ],
        correctIndex: 1,
        explanation: "お名前は何ですか？ (Onamae wa nan desu ka?) means 'What is your name?'",
      },
      {
        type: "word-bank",
        prompt: "Build: 'Nice to meet you'",
        words: ["よろしく", "はじめまして、", "お願いします。"],
        answer: ["はじめまして、", "よろしく", "お願いします。"],
      },
    ],
  },
  {
    id: "food",
    title: "Food & Eating",
    titleJp: "食べ物",
    description: "Talk about your favourite Japanese foods and express preferences.",
    icon: "🍣",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does 食べます (たべます) mean?",
        choices: ["I drink", "I eat", "I cook", "I buy"],
        correctIndex: 1,
        explanation: "食べます (tabemasu) is the polite present form of 'to eat'.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I eat sushi'",
        words: ["食べます。", "私は", "寿司を"],
        answer: ["私は", "寿司を", "食べます。"],
      },
      {
        type: "fill-blank",
        sentence: "私は ラーメン が ___ です。",
        choices: ["きらい", "すき", "たかい", "からい"],
        correctIndex: 1,
        explanation: "好き (すき) means 'like'. ラーメンが好きです = I like ramen.",
      },
      {
        type: "multiple-choice",
        question: "What does いただきます mean?",
        choices: [
          "The food is delicious",
          "I am hungry",
          "Said before eating a meal",
          "Thank you for the food",
        ],
        correctIndex: 2,
        explanation:
          "いただきます is said before eating. It expresses gratitude for the meal.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I drink water'",
        words: ["水を", "私は", "飲みます。"],
        answer: ["私は", "水を", "飲みます。"],
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
