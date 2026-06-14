import { useState, useCallback, useEffect } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { QUIZ_BEST_KEY } from '../lib/storage';

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

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz() {
  const [state, setState]         = useState<QuizState>('intro');
  const [currentQ, setCurrentQ]   = useState(0);
  const [answers, setAnswers]     = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showExp, setShowExp]     = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [best, setBest]           = usePersistentState<number>(QUIZ_BEST_KEY, 0);

  const question       = QUESTIONS[currentQ];
  const selectedAnswer = answers[currentQ];
  const isAnswered     = selectedAnswer !== null;
  const isCorrect      = selectedAnswer === question.correct;
  const score          = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const progressPct    = ((currentQ + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100;

  const selectAnswer = useCallback((idx: number) => {
    if (isAnswered) return;
    setAnswers(prev => { const n = [...prev]; n[currentQ] = idx; return n; });
    setShowExp(true);
  }, [isAnswered, currentQ]);

  const nextQuestion = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) { setCurrentQ(q => q + 1); setShowExp(false); }
    else {
      setIsNewBest(score > best);
      setBest(prev => Math.max(prev, score));
      setState('complete');
    }
  }, [currentQ, score, best, setBest]);

  const restart = useCallback(() => {
    setState('intro'); setCurrentQ(0);
    setAnswers(Array(QUESTIONS.length).fill(null)); setShowExp(false);
    setIsNewBest(false);
  }, []);

  // Keyboard play: number keys 1–4 to answer, Enter to advance.
  useEffect(() => {
    if (state !== 'playing') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= String(question.options.length)) {
        selectAnswer(Number(e.key) - 1);
      } else if (e.key === 'Enter' && isAnswered) {
        nextQuestion();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, question, isAnswered, selectAnswer, nextQuestion]);

  /* ── Intro ── */
  if (state === 'intro') {
    const topics = [...new Set(QUESTIONS.map(q => q.topic))];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-mystic p-8 sm:p-10 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 font-cinzel text-2xl"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.18), rgba(91,33,182,0.1))',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 0 32px rgba(212,175,55,0.12)',
            }}
          >
            ✦
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl glow-text mb-2" style={{ color: '#d4af37' }}>
            Kabbalah Study Quiz
          </h2>
          <p className="font-crimson italic text-mystic-400 text-base mb-6">
            Test your understanding of Baal HaSulam's teachings
          </p>

          {best > 0 && (
            <p className="font-cinzel text-[11px] tracking-wider text-mystic-400 mb-6">
              YOUR BEST: <span style={{ color: '#d4af37' }}>{best}/{QUESTIONS.length}</span>
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
            {[
              { n: QUESTIONS.length, label: 'Questions' },
              { n: 8,                label: 'Topics'    },
              { n: best > 0 ? `${best}` : '∞', label: best > 0 ? 'Best' : 'Retries' },
            ].map(({ n, label }) => (
              <div key={label} className="rounded-xl p-4" style={{ background: 'rgba(10,6,24,0.7)', border: '1px solid rgba(91,33,182,0.2)' }}>
                <p className="font-cinzel text-2xl font-bold glow-text" style={{ color: '#d4af37' }}>{n}</p>
                <p className="font-cinzel text-[10px] tracking-wider text-gray-500 mt-1">{label.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div className="text-left rounded-xl p-4 mb-8" style={{ background: 'rgba(10,6,24,0.6)', border: '1px solid rgba(91,33,182,0.2)' }}>
            <p className="font-cinzel text-[11px] tracking-wider text-mystic-500 mb-3">TOPICS COVERED</p>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <span key={t} className="font-cinzel text-[11px] tracking-wide px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(91,33,182,0.14)', border: '1px solid rgba(91,33,182,0.25)', color: 'rgba(160,120,240,0.8)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button onClick={() => setState('playing')} className="btn-primary px-10 py-3 text-sm">
            Begin Study →
          </button>
        </div>
      </div>
    );
  }

  /* ── Complete ── */
  if (state === 'complete') {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const grade =
      pct >= 90 ? { label: 'Excellent!',    color: '#d4af37', mark: '✦' }
    : pct >= 75 ? { label: 'Very Good!',    color: '#22c55e', mark: '✓' }
    : pct >= 60 ? { label: 'Good Start',    color: '#f59e0b', mark: '◉' }
    :             { label: 'Keep Studying', color: '#ef4444', mark: '◈' };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-mystic p-8 text-center mb-5">
          <div className="font-cinzel text-5xl mb-4" style={{ color: grade.color }}>{grade.mark}</div>
          <h2 className="font-cinzel text-2xl mb-1" style={{ color: grade.color }}>{grade.label}</h2>
          <p className="font-cinzel text-5xl font-bold glow-text my-2" style={{ color: '#d4af37' }}>
            {score}<span className="text-2xl text-mystic-600">/{QUESTIONS.length}</span>
          </p>
          <p className="font-crimson italic text-gray-500 mb-3">{pct}% correct</p>

          {isNewBest && score > 0 && (
            <p className="font-cinzel text-[11px] tracking-widest mb-5" style={{ color: '#d4af37' }}>
              ✦ NEW PERSONAL BEST ✦
            </p>
          )}

          {/* Result bar */}
          <div className="h-2 rounded-full overflow-hidden mb-6"
            style={{ background: 'rgba(91,33,182,0.15)', border: '1px solid rgba(91,33,182,0.2)' }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${grade.color}60, ${grade.color})` }} />
          </div>

          <button onClick={restart} className="btn-primary">Try Again</button>
        </div>

        {/* Answer review */}
        <p className="font-cinzel text-[11px] tracking-wider text-mystic-600 mb-3 px-1">ANSWER REVIEW</p>
        <div className="space-y-2">
          {QUESTIONS.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <div key={q.id} className="card-mystic p-4 flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-cinzel"
                  style={{
                    background: correct ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                    border: `1px solid ${correct ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    color:  correct ? '#4ade80' : '#f87171',
                  }}
                >
                  {correct ? '✓' : '✗'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-crimson text-sm text-gray-300">{q.question}</p>
                  {!correct && (
                    <p className="font-crimson text-xs text-green-400/80 mt-1">
                      ✓ {q.options[q.correct]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Playing ── */
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="card-mystic px-5 py-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-cinzel text-xs tracking-wider text-mystic-500">
            QUESTION {currentQ + 1} / {QUESTIONS.length}
          </span>
          <span className="font-cinzel text-xs tracking-wider" style={{ color: 'rgba(212,175,55,0.7)' }}>
            {question.topic.toUpperCase()}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(91,33,182,0.15)', border: '1px solid rgba(91,33,182,0.2)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #5b21b6, #d4af37)' }} />
        </div>
      </div>

      {/* Question */}
      <div className="card-mystic p-6 sm:p-7 mb-4 view-enter">
        <h3 className="font-crimson text-[18px] text-gray-100 mb-6 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isCorrectOption = idx === question.correct;
            const isSelectedWrong = idx === selectedAnswer && !isCorrect;

            let bg      = 'rgba(10,6,24,0.5)';
            let border  = 'rgba(91,33,182,0.25)';
            let color   = 'rgba(220,210,240,0.8)';
            let opacity = '1';

            if (isAnswered) {
              if (isCorrectOption) {
                bg = 'rgba(34,197,94,0.08)'; border = 'rgba(34,197,94,0.4)'; color = '#86efac';
              } else if (isSelectedWrong) {
                bg = 'rgba(239,68,68,0.08)';  border = 'rgba(239,68,68,0.4)';  color = '#fca5a5';
              } else {
                opacity = '0.35';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                disabled={isAnswered}
                className="w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200"
                style={{
                  background: isAnswered ? bg : undefined,
                  border: `1px solid ${border}`,
                  color,
                  opacity,
                  cursor: isAnswered ? 'default' : 'pointer',
                  ...((!isAnswered) ? {} : {}),
                }}
                onMouseEnter={e => { if (!isAnswered) e.currentTarget.style.borderColor = 'rgba(139,92,246,0.55)'; }}
                onMouseLeave={e => { if (!isAnswered) e.currentTarget.style.borderColor = border; }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-cinzel text-xs font-bold"
                  style={{
                    background: isAnswered && isCorrectOption ? 'rgba(34,197,94,0.2)'
                              : isAnswered && isSelectedWrong ? 'rgba(239,68,68,0.2)'
                              : 'rgba(91,33,182,0.2)',
                    border: `1px solid ${border}`,
                    color,
                  }}
                >
                  {isAnswered && isCorrectOption ? '✓' : isAnswered && isSelectedWrong ? '✗' : OPTION_LETTERS[idx]}
                </span>
                <span className="font-crimson text-[15px] leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExp && (
          <div
            className="mt-5 p-4 rounded-xl view-enter"
            style={{
              background: isCorrect ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
              border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
            }}
          >
            <p className="font-cinzel text-[11px] tracking-wider mb-2"
              style={{ color: isCorrect ? '#4ade80' : '#f87171' }}>
              {isCorrect ? '✓ CORRECT' : '✗ NOT QUITE'}
            </p>
            <p className="font-crimson text-[15px] text-gray-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next */}
      {isAnswered && (
        <div className="flex justify-end view-enter">
          <button onClick={nextQuestion} className="btn-primary">
            {currentQ < QUESTIONS.length - 1 ? 'Next →' : 'See Results →'}
          </button>
        </div>
      )}

      {/* Keyboard hint */}
      <p className="text-center font-cinzel text-[10px] tracking-wider text-mystic-700 mt-5">
        TIP: PRESS <span style={{ color: 'rgba(160,120,240,0.7)' }}>1–{question.options.length}</span> TO ANSWER
        {isAnswered && <> · <span style={{ color: 'rgba(160,120,240,0.7)' }}>ENTER</span> TO CONTINUE</>}
      </p>
    </div>
  );
}
