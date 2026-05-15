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
  // ─────────────────────────────────────────────
  // LESSON 1 — Greetings (12 exercises)
  // Arc: single-word recognition → polite forms → full greeting exchanges
  // ─────────────────────────────────────────────
  {
    id: "greetings",
    title: "Greetings",
    titleJp: "あいさつ",
    description: "Learn how to say hello, goodbye, and thank you in Japanese.",
    icon: "👋",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does こんにちは mean?",
        choices: ["Goodbye", "Good morning", "Hello / Good afternoon", "Good evening"],
        correctIndex: 2,
        explanation: "こんにちは (konnichiwa) is the standard daytime greeting — 'Hello' or 'Good afternoon'.",
      },
      {
        type: "listening",
        text: "こんにちは",
        romaji: "Konnichiwa",
        translation: "Hello / Good afternoon",
      },
      {
        type: "multiple-choice",
        question: "What does おはようございます mean?",
        choices: ["Good evening", "Goodbye", "Good night", "Good morning"],
        correctIndex: 3,
        explanation: "おはようございます (ohayou gozaimasu) is the formal morning greeting.",
      },
      {
        type: "fill-blank",
        sentence: "おはよう ___。",
        choices: ["さようなら", "ございます", "いただきます", "ありがとう"],
        correctIndex: 1,
        explanation: "おはようございます = おはよう + ございます. Adding ございます makes it polite.",
      },
      {
        type: "multiple-choice",
        question: "What does こんばんは mean?",
        choices: ["Good morning", "Hello", "Good night", "Good evening"],
        correctIndex: 3,
        explanation: "こんばんは (konbanwa) is the evening greeting — 'Good evening'.",
      },
      {
        type: "listening",
        text: "こんばんは",
        romaji: "Konbanwa",
        translation: "Good evening",
      },
      {
        type: "fill-blank",
        sentence: "___ 、はじめまして。",
        choices: ["さようなら", "おやすみ", "こんにちは", "ありがとう"],
        correctIndex: 2,
        explanation: "こんにちは、はじめまして = Hello, nice to meet you. はじめまして follows a greeting.",
      },
      {
        type: "multiple-choice",
        question: "Which phrase means 'Goodbye'?",
        choices: ["ありがとう", "さようなら", "おはよう", "こんばんは"],
        correctIndex: 1,
        explanation: "さようなら (sayounara) means Goodbye — used for longer or more formal partings.",
      },
      {
        type: "fill-blank",
        sentence: "また ___ ね。",
        choices: ["きのう", "あした", "いま", "ここ"],
        correctIndex: 1,
        explanation: "またあした means 'See you tomorrow'. あした = tomorrow.",
      },
      {
        type: "multiple-choice",
        question: "What does ありがとうございます mean?",
        choices: ["You're welcome", "Excuse me", "Thank you very much", "I'm sorry"],
        correctIndex: 2,
        explanation: "ありがとうございます is the formal 'Thank you very much'. ありがとう alone is casual.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'Thank you very much'",
        words: ["ございます", "ありがとう"],
        answer: ["ありがとう", "ございます"],
      },
      {
        type: "word-bank",
        prompt: "Build: 'Nice to meet you, pleased to work with you'",
        words: ["よろしく", "はじめまして、", "おねがいします。"],
        answer: ["はじめまして、", "よろしく", "おねがいします。"],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 2 — Self-Introduction (12 exercises)
  // Arc: わたし → name → copula → age → origin → full intro
  // ─────────────────────────────────────────────
  {
    id: "self-introduction",
    title: "Self-Introduction",
    titleJp: "じこしょうかい",
    description: "Introduce yourself — your name, age, and where you are from.",
    icon: "🙋",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does わたし mean?",
        choices: ["You", "He / She", "I / Me", "We"],
        correctIndex: 2,
        explanation: "わたし (watashi) is the standard word for 'I' or 'Me' in Japanese.",
      },
      {
        type: "multiple-choice",
        question: "What does です mean?",
        choices: ["Because", "But", "Is / Am / Are", "And"],
        correctIndex: 2,
        explanation: "です (desu) is the polite copula — like 'am / is / are' in English. It ends many sentences.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは がくせい ___ 。",
        choices: ["か", "は", "を", "です"],
        correctIndex: 3,
        explanation: "わたしは がくせいです = I am a student. です comes at the end of the sentence.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I am a student'",
        words: ["です", "わたしは", "がくせい"],
        answer: ["わたしは", "がくせい", "です"],
      },
      {
        type: "multiple-choice",
        question: "How do you ask 'What is your name?' in Japanese?",
        choices: [
          "どこから きましたか？",
          "なんさいですか？",
          "おなまえは なんですか？",
          "なにを たべますか？",
        ],
        correctIndex: 2,
        explanation: "おなまえは なんですか？ = What is your name? おなまえ = (your) name, なん = what.",
      },
      {
        type: "fill-blank",
        sentence: "わたしの なまえは さくら ___ 。",
        choices: ["か", "は", "を", "です"],
        correctIndex: 3,
        explanation: "わたしのなまえは さくらです = My name is Sakura. です ends the statement politely.",
      },
      {
        type: "multiple-choice",
        question: "What does なんさいですか mean?",
        choices: [
          "What is your name?",
          "Where are you from?",
          "How old are you?",
          "What do you do?",
        ],
        correctIndex: 2,
        explanation: "なんさいですか = How old are you? なんさい = how many years old.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは にじゅうさい ___ 。",
        choices: ["か", "を", "です", "が"],
        correctIndex: 2,
        explanation: "わたしは にじゅうさいです = I am 20 years old. にじゅう = 20, さい = years old.",
      },
      {
        type: "multiple-choice",
        question: "What does どこから きましたか mean?",
        choices: [
          "What is your name?",
          "How old are you?",
          "Where are you going?",
          "Where are you from?",
        ],
        correctIndex: 3,
        explanation: "どこから きましたか = Where are you from? どこ = where, から = from, きました = came.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I came from Japan'",
        words: ["きました。", "にほんから", "わたしは"],
        answer: ["わたしは", "にほんから", "きました。"],
      },
      {
        type: "fill-blank",
        sentence: "わたしは すこし にほんごが ___ 。",
        choices: ["たべます", "いきます", "はなせます", "みます"],
        correctIndex: 2,
        explanation: "はなせます = can speak. わたしは すこし にほんごが はなせます = I can speak a little Japanese.",
      },
      {
        type: "word-bank",
        prompt: "Build a full intro: 'Nice to meet you, I am a student'",
        words: ["です。", "わたしは", "はじめまして、", "がくせい"],
        answer: ["はじめまして、", "わたしは", "がくせい", "です。"],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 3 — Food & Eating (12 exercises)
  // Arc: eat/drink verbs → food vocab → particles → like/dislike → full sentences
  // ─────────────────────────────────────────────
  {
    id: "food",
    title: "Food & Eating",
    titleJp: "たべもの",
    description: "Talk about Japanese foods, drinks, and express your preferences.",
    icon: "🍣",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does たべます mean?",
        choices: ["I drink", "I eat", "I cook", "I buy"],
        correctIndex: 1,
        explanation: "たべます (tabemasu) is the polite present form of 'to eat'.",
      },
      {
        type: "multiple-choice",
        question: "What does のみます mean?",
        choices: ["I eat", "I cook", "I drink", "I buy"],
        correctIndex: 2,
        explanation: "のみます (nomimasu) is the polite form of 'to drink'.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは すしを ___ 。",
        choices: ["のみます", "みます", "たべます", "いきます"],
        correctIndex: 2,
        explanation: "すしをたべます = I eat sushi. を is the object particle marking what you eat.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I eat sushi'",
        words: ["たべます。", "わたしは", "すしを"],
        answer: ["わたしは", "すしを", "たべます。"],
      },
      {
        type: "listening",
        text: "いただきます",
        romaji: "Itadakimasu",
        translation: "Said before eating (a meal blessing / 'let's eat')",
      },
      {
        type: "multiple-choice",
        question: "What is おちゃ?",
        choices: ["Coffee", "Water", "Green tea", "Juice"],
        correctIndex: 2,
        explanation: "おちゃ (ocha) = green tea. It is the most common hot drink in Japan.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは みずを ___ 。",
        choices: ["たべます", "のみます", "みます", "かいます"],
        correctIndex: 1,
        explanation: "みずをのみます = I drink water. みず = water, のみます = drink.",
      },
      {
        type: "multiple-choice",
        question: "What does すき mean?",
        choices: ["Delicious", "Spicy", "Like / To like", "Dislike"],
        correctIndex: 2,
        explanation: "すき (suki) means 'like' or 'to like'. It follows が: 〜がすきです = I like 〜.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは らーめんが ___ です。",
        choices: ["きらい", "すき", "たかい", "からい"],
        correctIndex: 1,
        explanation: "らーめんがすきです = I like ramen. すき follows the が particle.",
      },
      {
        type: "multiple-choice",
        question: "What does きらい mean?",
        choices: ["Like", "Delicious", "Pretty", "Dislike"],
        correctIndex: 3,
        explanation: "きらい (kirai) means 'dislike'. わたしは なっとうが きらいです = I dislike natto.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I drink green tea'",
        words: ["のみます。", "わたしは", "おちゃを"],
        answer: ["わたしは", "おちゃを", "のみます。"],
      },
      {
        type: "word-bank",
        prompt: "Build: 'I like tempura, I dislike natto'",
        words: ["きらいです。", "てんぷらが すきで、", "わたしは", "なっとうが"],
        answer: ["わたしは", "てんぷらが すきで、", "なっとうが", "きらいです。"],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 4 — Numbers (10 exercises)
  // Arc: 1–10 → tens → counting objects → age → price
  // ─────────────────────────────────────────────
  {
    id: "numbers",
    title: "Numbers",
    titleJp: "かず",
    description: "Count in Japanese and use numbers for age, price, and quantity.",
    icon: "🔢",
    exercises: [
      {
        type: "multiple-choice",
        question: "What is いち in English?",
        choices: ["2", "3", "1", "4"],
        correctIndex: 2,
        explanation: "いち = 1. The number sequence starts: いち (1)、に (2)、さん (3)、し/よん (4)、ご (5).",
      },
      {
        type: "multiple-choice",
        question: "What is ご in English?",
        choices: ["3", "4", "6", "5"],
        correctIndex: 3,
        explanation: "ご = 5. Remember: いち、に、さん、し、ご = 1, 2, 3, 4, 5.",
      },
      {
        type: "fill-blank",
        sentence: "いち、に、さん、___、ご。",
        choices: ["ろく", "しち", "し", "はち"],
        correctIndex: 2,
        explanation: "し (or よん) = 4. The sequence: いち、に、さん、し、ご = 1, 2, 3, 4, 5.",
      },
      {
        type: "listening",
        text: "ろく、しち、はち",
        romaji: "Roku, shichi, hachi",
        translation: "6, 7, 8",
      },
      {
        type: "multiple-choice",
        question: "What is じゅう?",
        choices: ["8", "9", "10", "7"],
        correctIndex: 2,
        explanation: "じゅう = 10. く/きゅう = 9, はち = 8, しち/なな = 7.",
      },
      {
        type: "fill-blank",
        sentence: "にじゅう、さんじゅう、___、ごじゅう。",
        choices: ["ろくじゅう", "じゅう", "よんじゅう", "はちじゅう"],
        correctIndex: 2,
        explanation: "よんじゅう = 40. Tens are formed by multiplying: に+じゅう=20, さん+じゅう=30, よん+じゅう=40.",
      },
      {
        type: "multiple-choice",
        question: "How do you say 'one thing' when counting general objects?",
        choices: ["いちまい", "ひとつ", "いっぽん", "いちまい"],
        correctIndex: 1,
        explanation: "ひとつ = one thing (general counter). ふたつ = 2, みっつ = 3, よっつ = 4, いつつ = 5.",
      },
      {
        type: "fill-blank",
        sentence: "ひとつ、ふたつ、みっつ、___。",
        choices: ["いつつ", "むっつ", "よっつ", "ななつ"],
        correctIndex: 2,
        explanation: "よっつ = 4 things. General counters: ひとつ(1)、ふたつ(2)、みっつ(3)、よっつ(4).",
      },
      {
        type: "word-bank",
        prompt: "Build: 'Three please' (ordering at a shop)",
        words: ["おねがいします。", "みっつ"],
        answer: ["みっつ", "おねがいします。"],
      },
      {
        type: "multiple-choice",
        question: "What does いくらですか mean?",
        choices: [
          "How many do you have?",
          "How much does it cost?",
          "How old are you?",
          "Where is it?",
        ],
        correctIndex: 1,
        explanation: "いくらですか = How much is it? Used when asking the price of something.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 5 — Daily Actions (10 exercises)
  // Arc: go/come → see/listen → speak/read → study → full daily-routine sentences
  // ─────────────────────────────────────────────
  {
    id: "daily-actions",
    title: "Daily Actions",
    titleJp: "まいにちのどうし",
    description: "Use everyday Japanese verbs to describe your daily routine.",
    icon: "📅",
    exercises: [
      {
        type: "multiple-choice",
        question: "What does いきます mean?",
        choices: ["to come", "to return", "to go", "to run"],
        correctIndex: 2,
        explanation: "いきます (ikimasu) = to go. Pair with に: がっこうにいきます = I go to school.",
      },
      {
        type: "fill-blank",
        sentence: "がっこうに ___ 。",
        choices: ["のみます", "みます", "きます", "いきます"],
        correctIndex: 3,
        explanation: "がっこうにいきます = I go to school. に marks the destination.",
      },
      {
        type: "multiple-choice",
        question: "What does きます mean?",
        choices: ["to go", "to come", "to buy", "to listen"],
        correctIndex: 1,
        explanation: "きます (kimasu) = to come. うちにきます = (someone) comes to my house.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I go to school'",
        words: ["いきます。", "わたしは", "がっこうに"],
        answer: ["わたしは", "がっこうに", "いきます。"],
      },
      {
        type: "multiple-choice",
        question: "What does みます mean?",
        choices: ["to listen", "to speak", "to read", "to watch / to see"],
        correctIndex: 3,
        explanation: "みます (mimasu) = to watch / to see. テレビをみます = I watch TV.",
      },
      {
        type: "fill-blank",
        sentence: "テレビを ___ 。",
        choices: ["よみます", "はなします", "みます", "かきます"],
        correctIndex: 2,
        explanation: "テレビをみます = I watch TV. を marks the object (what you watch).",
      },
      {
        type: "multiple-choice",
        question: "What does はなします mean?",
        choices: ["to listen", "to speak", "to write", "to read"],
        correctIndex: 1,
        explanation: "はなします (hanashimasu) = to speak / to talk. にほんごをはなします = I speak Japanese.",
      },
      {
        type: "fill-blank",
        sentence: "わたしは にほんごを ___ 。",
        choices: ["のみます", "みます", "たべます", "はなします"],
        correctIndex: 3,
        explanation: "にほんごをはなします = I speak Japanese. を marks the language being spoken.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'Every day I study Japanese'",
        words: ["べんきょうします。", "まいにち", "にほんごを"],
        answer: ["まいにち", "にほんごを", "べんきょうします。"],
      },
      {
        type: "listening",
        text: "まいにち にほんごを べんきょうします",
        romaji: "Mainichi nihongo wo benkyou shimasu",
        translation: "Every day I study Japanese",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 6 — Places & Directions (10 exercises)
  // Arc: place names → going there → asking where → left/right → full directions
  // ─────────────────────────────────────────────
  {
    id: "places",
    title: "Places & Directions",
    titleJp: "ばしょとほうこう",
    description: "Name Japanese places, ask for directions, and get around town.",
    icon: "🗺️",
    exercises: [
      {
        type: "multiple-choice",
        question: "What is がっこう?",
        choices: ["Hospital", "Station", "School", "Park"],
        correctIndex: 2,
        explanation: "がっこう (gakkou) = school. コンビニ = convenience store, えき = station.",
      },
      {
        type: "multiple-choice",
        question: "What is えき?",
        choices: ["Library", "Train station", "Airport", "Hotel"],
        correctIndex: 1,
        explanation: "えき (eki) = train station. Japan's train network is extensive — knowing this word is essential.",
      },
      {
        type: "fill-blank",
        sentence: "___ に いきます。(I go to school)",
        choices: ["びょういん", "コンビニ", "がっこう", "ゆうびんきょく"],
        correctIndex: 2,
        explanation: "がっこうにいきます = I go to school. に marks the destination.",
      },
      {
        type: "word-bank",
        prompt: "Build: 'I go to the station'",
        words: ["いきます。", "えきに", "わたしは"],
        answer: ["わたしは", "えきに", "いきます。"],
      },
      {
        type: "listening",
        text: "ゆうびんきょくは どこですか",
        romaji: "Yuubinkyoku wa doko desu ka",
        translation: "Where is the post office?",
      },
      {
        type: "multiple-choice",
        question: "What does みぎ mean?",
        choices: ["Left", "Straight ahead", "Right", "Behind"],
        correctIndex: 2,
        explanation: "みぎ = right. ひだり = left. まっすぐ = straight ahead. Remember: みぎ / ひだり.",
      },
      {
        type: "multiple-choice",
        question: "What does ひだり mean?",
        choices: ["Right", "Behind", "Straight ahead", "Left"],
        correctIndex: 3,
        explanation: "ひだり = left. みぎ = right. Practice: みぎ (right) sounds like 'migi', ひだり (left) like 'hidari'.",
      },
      {
        type: "fill-blank",
        sentence: "まっすぐ いって、みぎに ___ ください。",
        choices: ["いきます", "まがって", "きます", "とまって"],
        correctIndex: 1,
        explanation: "まがってください = Please turn. まがって is the te-form of まがります (to turn).",
      },
      {
        type: "word-bank",
        prompt: "Build: 'The convenience store is nearby'",
        words: ["ちかくに あります。", "コンビニは"],
        answer: ["コンビニは", "ちかくに あります。"],
      },
      {
        type: "fill-blank",
        sentence: "えきは ___ ですか？",
        choices: ["なに", "だれ", "どこ", "いつ"],
        correctIndex: 2,
        explanation: "えきはどこですか = Where is the station? どこ = where. なに = what, だれ = who, いつ = when.",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
