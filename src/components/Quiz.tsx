import { useState, useCallback } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What does the word "Kabbalah" (קַבָּלָה) mean in Hebrew?',
    options: ['To give', 'To receive', 'To understand', 'To create'],
    correct: 1,
    explanation: 'Kabbalah comes from the Hebrew root "לְקַבֵּל" (to receive), reflecting its core concern with understanding what we receive from the Creator and how to refine that receiving.',
    topic: 'Fundamentals',
  },
  {
    id: 2,
    question: 'According to Baal HaSulam, what was the primordial thought of creation?',
    options: [
      'To create the Torah',
      'To form the ten sefirot',
      'To do good to His creatures',
      'To restrict the Infinite Light',
    ],
    correct: 2,
    explanation: '"To do good to His creatures" (LeHeitiv LeVruav) is the foundational principle Baal HaSulam identifies as the divine motivation behind all creation. Everything in the spiritual structure exists to fulfill this purpose.',
    topic: 'Purpose of Creation',
  },
  {
    id: 3,
    question: 'What is "Or Ein Sof"?',
    options: [
      'The Tree of Life diagram',
      'The highest sefirah',
      'The Infinite Light that emanated from Ein Sof',
      'The first restriction of light',
    ],
    correct: 2,
    explanation: 'Or Ein Sof (אוֹר אֵין סוֹף) is the Infinite Light — the divine illumination that emanated from the Infinite (Ein Sof) and filled all existence before the Tzimtzum.',
    topic: 'Or Ein Sof',
  },
  {
    id: 4,
    question: 'What does "Tzimtzum" mean?',
    options: ['Expansion', 'Restriction/Contraction', 'Wisdom', 'Kingdom'],
    correct: 1,
    explanation: 'Tzimtzum (צִמְצוּם) means restriction or contraction — the primordial act by which the Ratzon LeKabel restricted itself from receiving the Infinite Light, creating the Chalal (empty space) within which creation could unfold.',
    topic: 'Tzimtzum',
  },
  {
    id: 5,
    question: 'What is the "Lechem DeKissufa" (Bread of Shame)?',
    options: [
      'A ritual food used in Kabbalistic ceremony',
      'The discomfort of receiving without giving anything in return',
      'The spiritual darkness of sin',
      'A teaching from the Talmud',
    ],
    correct: 1,
    explanation: 'Bread of Shame (Lechem DeKissufa) refers to the deep discomfort of receiving endlessly without contributing anything. The created being, receiving all from the Creator with nothing to give back, could not fully enjoy the gift — this is why Tzimtzum was necessary.',
    topic: 'Purpose of Creation',
  },
  {
    id: 6,
    question: 'How many Sefirot form the Tree of Life?',
    options: ['7', '8', '10', '22'],
    correct: 2,
    explanation: 'There are ten sefirot (עֶשֶׂר סְפִירוֹת): Keter, Chokhmah, Binah, Chesed, Gevurah, Tiferet, Netzach, Hod, Yesod, and Malkhut. The 22 are the paths connecting them (corresponding to Hebrew letters).',
    topic: 'Ten Sefirot',
  },
  {
    id: 7,
    question: 'Which sefirah is called the "heart of the Tree" and represents divine beauty/harmony?',
    options: ['Keter', 'Yesod', 'Tiferet', 'Binah'],
    correct: 2,
    explanation: 'Tiferet (תִּפְאֶרֶת) — meaning Beauty or Harmony — is the central sefirah of the Tree. It balances the mercy of Chesed with the judgment of Gevurah and is called the "heart" of the Tree of Life.',
    topic: 'Ten Sefirot',
  },
  {
    id: 8,
    question: 'What is the "Reshimu"?',
    options: [
      'The highest divine name',
      'The residual impression left after Tzimtzum',
      'A type of Kabbalistic prayer',
      'The fifth Partzuf',
    ],
    correct: 1,
    explanation: 'The Reshimu (רְשִׁימוּ) is the residual impression or trace of Or Ein Sof that remained in the Chalal after Tzimtzum — like a fragrance remaining in an empty bottle. It provides the soul\'s connection to its divine source.',
    topic: 'Tzimtzum',
  },
  {
    id: 9,
    question: 'The Four Worlds in order from highest to lowest are:',
    options: [
      'Assiyah, Yetzirah, Beriah, Atzilut',
      'Atzilut, Beriah, Yetzirah, Assiyah',
      'Beriah, Atzilut, Assiyah, Yetzirah',
      'Yetzirah, Atzilut, Beriah, Assiyah',
    ],
    correct: 1,
    explanation: 'The Four Worlds descend from Atzilut (Emanation — closest to Or Ein Sof) through Beriah (Creation), Yetzirah (Formation), and finally Assiyah (Action — our physical world).',
    topic: 'Four Worlds',
  },
  {
    id: 10,
    question: 'What is the "Masach" in Kabbalistic teaching?',
    options: [
      'A type of spiritual garment',
      'The spiritual screen or curtain that regulates how light is received',
      'The fifth world above Atzilut',
      'The name for the divine throne',
    ],
    correct: 1,
    explanation: 'The Masach (מָסָך — screen) is the spiritual force that allows the vessel to intentionally manage how much divine light it receives and for what purpose. It is the technical means of "receiving in order to bestow."',
    topic: 'Or and Kli',
  },
  {
    id: 11,
    question: 'What does "Dvekut" mean?',
    options: [
      'Restriction of the light',
      'Adhesion or clinging to the Creator',
      'The lowest sefirah',
      'A type of Hebrew prayer',
    ],
    correct: 1,
    explanation: 'Dvekut (דְּבֵקוּת) means adhesion or clinging to the Creator — the ultimate goal of all spiritual work in Kabbalah. It is achieved through equivalence of form: developing the Creator\'s quality of unconditional bestowal.',
    topic: 'Tikkun',
  },
  {
    id: 12,
    question: 'Which sefirah represents the divine presence (Shekhinah) in the world?',
    options: ['Keter', 'Tiferet', 'Yesod', 'Malkhut'],
    correct: 3,
    explanation: 'Malkhut (מַלְכוּת — Kingdom) is the Shekhinah, the divine feminine presence in the world. It has no inherent light of its own — it only receives from above — and it corresponds to our physical reality and the soul\'s direct interface with the divine.',
    topic: 'Ten Sefirot',
  },
  {
    id: 13,
    question: 'What is the "Ohr Hozer" (Reflected Light)?',
    options: [
      'The Direct Light descending from above',
      'The light of the Infinite',
      'The light that rises upward after the Masach reflects incoming light',
      'The light of the physical world',
    ],
    correct: 2,
    explanation: 'Ohr Hozer (אוֹר חוֹזֵר) is the Reflected or Returning Light — created when the Masach meets the Ohr Yashar (Direct Light) and reflects it upward. It forms the actual Kli (vessel) of each sefirah and represents the soul\'s active spiritual contribution.',
    topic: 'Or and Kli',
  },
  {
    id: 14,
    question: 'The five main Partzufim (spiritual personalities) include all EXCEPT:',
    options: ['Arikh Anpin', 'Ze\'ir Anpin', 'Malkhut', 'Ima'],
    correct: 2,
    explanation: 'The five Partzufim are: Arikh Anpin (Keter), Abba (Chokhmah), Ima (Binah), Ze\'ir Anpin (Tiferet), and Nukva/Malkhut. Malkhut as a sefirah corresponds to the Partzuf called Nukva, not Malkhut as a Partzuf name.',
    topic: 'Partzufim',
  },
  {
    id: 15,
    question: 'What are the five levels of the soul from lowest to highest?',
    options: [
      'Nefesh, Ruach, Neshamah, Chayah, Yechidah',
      'Yechidah, Chayah, Neshamah, Ruach, Nefesh',
      'Neshamah, Nefesh, Ruach, Yechidah, Chayah',
      'Ruach, Nefesh, Chayah, Neshamah, Yechidah',
    ],
    correct: 0,
    explanation: 'The five soul levels from lowest to highest are: Nefesh (body-soul), Ruach (spirit/emotions), Neshamah (intellectual soul), Chayah (living essence), Yechidah (unified essence). They correspond to Malkhut, Ze\'ir Anpin, Binah, Chokhmah, and Keter respectively.',
    topic: 'Soul',
  },
  {
    id: 16,
    question: 'How many paths connect the sefirot in the Tree of Life?',
    options: ['10', '12', '22', '32'],
    correct: 2,
    explanation: 'There are 22 paths connecting the ten sefirot, corresponding to the 22 letters of the Hebrew alphabet. Together with the 10 sefirot, they make 32 — the Lamed-Bet (32) Paths of Wisdom described in Sefer Yetzirah.',
    topic: 'Tree of Life',
  },
  {
    id: 17,
    question: 'Which pillar of the Tree of Life contains Binah, Gevurah, and Hod?',
    options: [
      'Right Pillar of Mercy',
      'Middle Pillar of Equilibrium',
      'Left Pillar of Severity',
      'There is no such pillar',
    ],
    correct: 2,
    explanation: 'The Left Pillar of Severity contains Binah (Understanding), Gevurah (Judgment), and Hod (Splendor). The Right Pillar of Mercy contains Chokhmah, Chesed, and Netzach. The Middle Pillar contains Keter, Tiferet, Yesod, and Malkhut.',
    topic: 'Tree of Life',
  },
  {
    id: 18,
    question: 'What is "Tikkun" in Kabbalah?',
    options: [
      'The name for the divine light',
      'The process of correcting the soul\'s Ratzon LeKabel',
      'A type of Kabbalistic ritual',
      'The highest sefirah',
    ],
    correct: 1,
    explanation: 'Tikkun (תִּקּוּן) means correction or repair — the process by which the soul transforms its desire to receive for itself into the desire to receive in order to bestow. It is the purpose of every soul\'s descent into this world.',
    topic: 'Tikkun',
  },
  {
    id: 19,
    question: 'What does "Kav" refer to in Lurianic Kabbalah?',
    options: [
      'The ten sefirot as a unit',
      'The ray/line of light that entered the Chalal after Tzimtzum',
      'The highest divine name',
      'The feminine aspect of the divine',
    ],
    correct: 1,
    explanation: 'The Kav (קַו — Line or Ray) is the thin, measured ray of divine light that extended from Or Ein Sof into the Chalal (empty space) after Tzimtzum. The Kav is the connection between the infinite and the finite, and all the sefirot form along it.',
    topic: 'Tzimtzum',
  },
  {
    id: 20,
    question: 'According to Baal HaSulam, what is the ultimate purpose of studying Kabbalah?',
    options: [
      'To accumulate esoteric knowledge',
      'To perform mystical rituals',
      'To attain Dvekut — complete adhesion with the Creator through equivalence of qualities',
      'To gain supernatural powers',
    ],
    correct: 2,
    explanation: 'Baal HaSulam taught that the purpose of Kabbalah study is not intellectual knowledge but Dvekut — actual spiritual experience of divine unity achieved when the soul develops equivalence of form with the Creator (the quality of unconditional bestowal).',
    topic: 'Purpose',
  },
];

type QuizState = 'intro' | 'playing' | 'complete';

export default function Quiz() {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const question = QUESTIONS[currentQ];
  const selectedAnswer = answers[currentQ];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correct;
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  const selectAnswer = useCallback((optionIdx: number) => {
    if (isAnswered) return;
    setAnswers(prev => {
      const next = [...prev];
      next[currentQ] = optionIdx;
      return next;
    });
    setShowExplanation(true);
  }, [isAnswered, currentQ]);

  const nextQuestion = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setShowExplanation(false);
    } else {
      setState('complete');
    }
  }, [currentQ]);

  const restart = useCallback(() => {
    setState('intro');
    setCurrentQ(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowExplanation(false);
  }, []);

  if (state === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-mystic p-8 text-center">
          <div className="text-5xl mb-4">✍️</div>
          <h2 className="text-2xl font-serif text-divine-400 glow-text mb-2">Kabbalah Study Quiz</h2>
          <p className="text-mystic-400 mb-6">Test your understanding of Baal HaSulam's teachings</p>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
            <div className="bg-void-900 border border-mystic-900 rounded-lg p-4">
              <p className="text-2xl font-bold text-divine-400">{QUESTIONS.length}</p>
              <p className="text-xs text-gray-500 mt-1">Questions</p>
            </div>
            <div className="bg-void-900 border border-mystic-900 rounded-lg p-4">
              <p className="text-2xl font-bold text-mystic-400">8</p>
              <p className="text-xs text-gray-500 mt-1">Topics</p>
            </div>
            <div className="bg-void-900 border border-mystic-900 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-400">∞</p>
              <p className="text-xs text-gray-500 mt-1">Retries</p>
            </div>
          </div>

          <div className="text-left bg-void-900 border border-mystic-900 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-mystic-300 mb-2">Topics covered:</h3>
            <div className="flex flex-wrap gap-2">
              {[...new Set(QUESTIONS.map(q => q.topic))].map(topic => (
                <span key={topic} className="text-xs px-2 py-1 rounded border border-mystic-800 text-mystic-400">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setState('playing')}
            className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #5b21b6, #d4af37)' }}
          >
            Begin Study →
          </button>
        </div>
      </div>
    );
  }

  if (state === 'complete') {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const grade =
      pct >= 90 ? { label: 'Excellent!', color: '#d4af37', emoji: '🌟' }
      : pct >= 75 ? { label: 'Very Good!', color: '#22c55e', emoji: '✓' }
      : pct >= 60 ? { label: 'Good Start', color: '#f59e0b', emoji: '📖' }
      : { label: 'Keep Studying', color: '#ef4444', emoji: '💪' };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-mystic p-8 text-center mb-6">
          <div className="text-6xl mb-4">{grade.emoji}</div>
          <h2 className="text-2xl font-serif mb-2" style={{ color: grade.color }}>{grade.label}</h2>
          <p className="text-divine-400 text-4xl font-bold mb-1">{score} / {QUESTIONS.length}</p>
          <p className="text-gray-500 text-sm mb-6">{pct}% correct</p>

          <div className="h-3 bg-void-900 rounded-full border border-mystic-900 overflow-hidden mb-6">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${grade.color}80, ${grade.color})`,
              }}
            />
          </div>

          <button
            onClick={restart}
            className="px-8 py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #5b21b6, #d4af37)' }}
          >
            Try Again
          </button>
        </div>

        {/* Answer review */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-mystic-400 px-1">Answer Review</h3>
          {QUESTIONS.map((q, i) => {
            const a = answers[i];
            const correct = a === q.correct;
            return (
              <div key={q.id} className="card-mystic p-4">
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    correct ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {correct ? '✓' : '✗'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200">{q.question}</p>
                    {!correct && (
                      <p className="text-xs text-green-400 mt-1">
                        Correct: {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="card-mystic p-4 mb-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span className="text-divine-400">{question.topic}</span>
        </div>
        <div className="h-1.5 bg-void-900 rounded-full border border-mystic-900 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentQ + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100}%`,
              background: 'linear-gradient(90deg, #5b21b6, #d4af37)',
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="card-mystic p-6 mb-4">
        <h3 className="text-lg font-serif text-gray-100 mb-6 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let style = 'border-mystic-800 text-gray-300 hover:border-mystic-600 hover:bg-mystic-900/30';

            if (isAnswered) {
              if (idx === question.correct) {
                style = 'border-green-500/50 bg-green-500/10 text-green-300';
              } else if (idx === selectedAnswer && !isCorrect) {
                style = 'border-red-500/50 bg-red-500/10 text-red-300';
              } else {
                style = 'border-mystic-900 text-gray-500 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${style} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="font-medium mr-3 text-mystic-500">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
                {isAnswered && idx === question.correct && <span className="float-right">✓</span>}
                {isAnswered && idx === selectedAnswer && !isCorrect && <span className="float-right">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`mt-4 p-4 rounded-lg border ${
            isCorrect
              ? 'border-green-500/30 bg-green-500/5'
              : 'border-red-500/30 bg-red-500/5'
          }`}>
            <p className={`text-xs font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #5b21b6, #d4af37)' }}
          >
            {currentQ < QUESTIONS.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  );
}
