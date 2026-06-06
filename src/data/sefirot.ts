export interface Sefirah {
  id: string;
  number: number;
  name: string;
  hebrewName: string;
  translation: string;
  pillar: 'left' | 'middle' | 'right';
  color: string;
  glowColor: string;
  x: number;
  y: number;
  divineLight: string;
  soulLevel: string;
  godName: string;
  archangel: string;
  description: string;
  baalHaSulamTeaching: string;
  qualities: string[];
  paths: number[];
}

export const SEFIROT: Sefirah[] = [
  {
    id: 'keter',
    number: 1,
    name: 'Keter',
    hebrewName: 'כֶּתֶר',
    translation: 'Crown',
    pillar: 'middle',
    color: '#E8E8FF',
    glowColor: 'rgba(232, 232, 255, 0.6)',
    x: 250,
    y: 55,
    divineLight: 'Yechidah (Unified Essence)',
    soulLevel: 'Yechidah',
    godName: 'Ehyeh (אֶהְיֶה)',
    archangel: 'Metatron',
    description:
      'Keter is the highest sefirah, the Crown of the divine structure. It represents the supreme will (Ratzon) that transcends all understanding. Keter is the first emanation from Or Ein Sof — the Infinite Light — and contains within it the seed of all creation. It is the divine will to bestow, the first manifestation before it takes any defined form.',
    baalHaSulamTeaching:
      'According to Baal HaSulam, Keter corresponds to the first phase (Behinah Aleph) of the desire — the root will that emerges from Or Ein Sof. It contains no desire to receive for itself but is pure bestowing force. Keter is the Kli (vessel) of the highest light, Yechidah. In the structure of the Partzuf, Keter corresponds to the Galgalta (skull), the most sublime spiritual level. Baal HaSulam teaches that Keter\'s essence is the divine thought "to do good to His creatures" — the primordial intention behind all creation.',
    qualities: [
      'Pure divine will',
      'Root of all existence',
      'Beyond comprehension',
      'Timeless and eternal',
      'Pure bestowing force',
    ],
    paths: [11, 12, 13],
  },
  {
    id: 'chokhmah',
    number: 2,
    name: 'Chokhmah',
    hebrewName: 'חָכְמָה',
    translation: 'Wisdom',
    pillar: 'right',
    color: '#C0C8E0',
    glowColor: 'rgba(192, 200, 224, 0.6)',
    x: 390,
    y: 148,
    divineLight: 'Chayah (Living Essence)',
    soulLevel: 'Chayah',
    godName: 'Yah (יָהּ)',
    archangel: 'Raziel',
    description:
      'Chokhmah is the second sefirah, representing pure, undifferentiated wisdom. It is the first point of conscious light after Keter — the divine flash of inspiration that contains all potential wisdom in a unified, undivided state. Chokhmah is the Father principle (Abba), the primordial seed of all thought.',
    baalHaSulamTeaching:
      'Baal HaSulam explains that Chokhmah is the first of the four phases (Behinot) of desire. In Chokhmah, the will to receive begins to take form. The Ohr (Light) of Chokhmah is called Ohr Chayah, corresponding to the soul-level Chayah. Chokhmah is described as the "beginning" (Reishit) — the first that can be grasped by the intellect, though its root in Keter remains hidden. In Talmud Eser Sefirot, Baal HaSulam identifies Chokhmah with the Ohr Hozer (Reflected Light) that rises and becomes the essence of the vessel.',
    qualities: [
      'Flash of divine inspiration',
      'Pure undivided knowledge',
      'Father principle (Abba)',
      'Seed of all creation',
      'Right Pillar of Mercy',
    ],
    paths: [11, 14, 15, 16],
  },
  {
    id: 'binah',
    number: 3,
    name: 'Binah',
    hebrewName: 'בִּינָה',
    translation: 'Understanding',
    pillar: 'left',
    color: '#4040A0',
    glowColor: 'rgba(64, 64, 160, 0.6)',
    x: 110,
    y: 148,
    divineLight: 'Neshamah (Soul-Breath)',
    soulLevel: 'Neshamah',
    godName: 'YHVH Elohim (יְהוָה אֱלֹהִים)',
    archangel: 'Tzaphkiel',
    description:
      'Binah is the great Mother, the divine womb of understanding. She receives the seed of wisdom from Chokhmah and gestates it into fully formed understanding. Binah is where the undivided flash of wisdom is analyzed, structured, and developed into comprehensible thought. She is called Ima Ila\'ah (Supernal Mother) and is the source of all souls.',
    baalHaSulamTeaching:
      'According to Baal HaSulam, Binah corresponds to the second phase (Behinah Bet) of desire, where the will to receive develops further. The light within Binah is Ohr Neshamah. In Talmud Eser Sefirot, Binah is described as the "World of Freedom" (Olam HaChofesh) because it is where souls gain understanding of their spiritual root. Baal HaSulam emphasizes that Binah\'s correction is unique — being the supernal mother, she is already corrected and works to correct the lower sefirot through her influence.',
    qualities: [
      'Mother principle (Ima)',
      'Womb of creation',
      'Structured understanding',
      'Source of all souls',
      'Left Pillar of Severity',
    ],
    paths: [12, 14, 17, 18],
  },
  {
    id: 'chesed',
    number: 4,
    name: 'Chesed',
    hebrewName: 'חֶסֶד',
    translation: 'Loving-Kindness',
    pillar: 'right',
    color: '#2244CC',
    glowColor: 'rgba(34, 68, 204, 0.6)',
    x: 390,
    y: 300,
    divineLight: 'Ruach (Spirit-Wind)',
    soulLevel: 'Ruach',
    godName: 'El (אֵל)',
    archangel: 'Tzadkiel',
    description:
      'Chesed is the sefirah of pure, unlimited giving and loving-kindness. It represents the right arm of the divine body and the quality of grace, mercy, and unconditional love. Chesed flows freely without restriction, bestowing infinite bounty. It is the first of the emotional sefirot (Midot), expressing the pure desire to give.',
    baalHaSulamTeaching:
      'In Baal HaSulam\'s framework, Chesed represents the highest expression of the attribute of bestowal within the emotional sefirot. He teaches that the study of Chesed helps us understand the nature of the Creator\'s desire — pure giving without any condition of return. The light of Chesed is Ohr Ruach. In Talmud Eser Sefirot, Chesed corresponds to the quality of unconditional love that the Creator has toward creation, and spiritual work involves developing this quality within ourselves.',
    qualities: [
      'Unlimited giving',
      'Unconditional love',
      'Grace and mercy',
      'Right arm of divine body',
      'First emotional sefirah',
    ],
    paths: [16, 19, 20, 21],
  },
  {
    id: 'gevurah',
    number: 5,
    name: 'Gevurah',
    hebrewName: 'גְּבוּרָה',
    translation: 'Strength / Judgment',
    pillar: 'left',
    color: '#CC2222',
    glowColor: 'rgba(204, 34, 34, 0.6)',
    x: 110,
    y: 300,
    divineLight: 'Ruach (Spirit-Wind)',
    soulLevel: 'Ruach',
    godName: 'Elohim Gibor (אֱלֹהִים גִּבּוֹר)',
    archangel: 'Khamael',
    description:
      'Gevurah (also called Din — Judgment) is the sefirah of divine strength, power, and judgment. It represents the left arm of the divine body and provides the necessary restriction and boundary to Chesed\'s unlimited flow. Gevurah is not harsh or cruel — rather, it provides the precise limitation needed to create vessels that can receive and contain divine light.',
    baalHaSulamTeaching:
      'Baal HaSulam teaches that Gevurah corresponds to the Tzimtzum (restriction) principle within the emotional realm. Just as the primordial Tzimtzum was necessary for creation, Gevurah\'s restriction is necessary within the structure of the sefirot. The balance between Chesed and Gevurah creates Tiferet. In Talmud Eser Sefirot, Gevurah is associated with the quality of judgment that measures exactly how much light each vessel can receive without breaking. This connects to the concept of the "breaking of the vessels" (Shevirat HaKelim) when Gevurah is absent.',
    qualities: [
      'Divine strength and power',
      'Precise judgment',
      'Protective limitation',
      'Left arm of divine body',
      'Necessary restriction',
    ],
    paths: [18, 19, 22, 23],
  },
  {
    id: 'tiferet',
    number: 6,
    name: 'Tiferet',
    hebrewName: 'תִּפְאֶרֶת',
    translation: 'Beauty / Harmony',
    pillar: 'middle',
    color: '#D4AF37',
    glowColor: 'rgba(212, 175, 55, 0.6)',
    x: 250,
    y: 390,
    divineLight: 'Nefesh (Soul of Body)',
    soulLevel: 'Nefesh',
    godName: 'YHVH (יְהוָה)',
    archangel: 'Michael',
    description:
      'Tiferet is the heart of the Tree of Life, the central sefirah that harmonizes and balances all the forces above and below it. Called the "Son" (Ze\'ir Anpin or Ben), Tiferet unites the mercy of Chesed and the judgment of Gevurah into perfect beauty. It is the primary divine name (YHVH) and the central channel through which divine light flows.',
    baalHaSulamTeaching:
      'According to Baal HaSulam, Tiferet occupies the most central position in spiritual structure. In Talmud Eser Sefirot, Ze\'ir Anpin (the Small Face) — which Tiferet represents — is the main Partzuf that interacts with Malkhut (the Nukva). Baal HaSulam explains that the relationship between Ze\'ir Anpin (Tiferet) and Nukva (Malkhut) mirrors the relationship between the Creator and the created being — the Giver and the Receiver. Tiferet\'s correction involves learning to balance giving and receiving in perfect harmony, which is the essential spiritual work.',
    qualities: [
      'Perfect harmony and balance',
      'Heart of the Tree',
      'Son (Ze\'ir Anpin)',
      'Central channel of light',
      'Beauty through integration',
    ],
    paths: [13, 15, 17, 20, 22, 24, 25, 26],
  },
  {
    id: 'netzach',
    number: 7,
    name: 'Netzach',
    hebrewName: 'נֵצַח',
    translation: 'Victory / Eternity',
    pillar: 'right',
    color: '#228B22',
    glowColor: 'rgba(34, 139, 34, 0.6)',
    x: 390,
    y: 472,
    divineLight: 'Nefesh (Soul of Body)',
    soulLevel: 'Nefesh',
    godName: 'YHVH Tzvaot (יְהוָה צְבָאוֹת)',
    archangel: 'Haniel',
    description:
      'Netzach represents victory, endurance, and the divine spark within the emotional and instinctual realm. It is the right hip and leg of the divine body, controlling emotions, desires, nature, and artistic inspiration. Netzach is the realm of the raw divine energy that flows into the world through the natural and instinctual realms.',
    baalHaSulamTeaching:
      'Baal HaSulam connects Netzach to the quality of overcoming spiritual obstacles — hence "victory." In Talmud Eser Sefirot, Netzach is part of Ze\'ir Anpin\'s lower structure. Baal HaSulam teaches that the spiritual qualities associated with Netzach include the endurance and perseverance needed in spiritual work. When a person continues despite difficulties, they are exercising the quality of Netzach. This sefirah also connects to the divine desire that continuously flows without cessation, hence "eternity."',
    qualities: [
      'Victory and perseverance',
      'Eternal flow of divine energy',
      'Emotional intelligence',
      'Natural and instinctual forces',
      'Artistic inspiration',
    ],
    paths: [21, 24, 27, 28, 30],
  },
  {
    id: 'hod',
    number: 8,
    name: 'Hod',
    hebrewName: 'הוֹד',
    translation: 'Splendor / Glory',
    pillar: 'left',
    color: '#CC6600',
    glowColor: 'rgba(204, 102, 0, 0.6)',
    x: 110,
    y: 472,
    divineLight: 'Nefesh (Soul of Body)',
    soulLevel: 'Nefesh',
    godName: 'Elohim Tzvaot (אֱלֹהִים צְבָאוֹת)',
    archangel: 'Raphael',
    description:
      'Hod represents splendor, glory, and the divine echo. It is the left hip and leg of the divine body. While Netzach represents the raw emotional energy, Hod is where that energy is refined, communicated, and expressed. Hod is associated with prophecy, communication, and the ability to receive divine messages through repetition and practice.',
    baalHaSulamTeaching:
      'According to Baal HaSulam, Hod corresponds to the quality of submission (Hoda\'ah means both "glory" and "acknowledgment/submission"). In spiritual work, Hod teaches the importance of humility and acknowledgment before the divine. Baal HaSulam explains that Hod and Netzach together form the "kidneys" of the spiritual body — they process and refine spiritual energy. In Talmud Eser Sefirot, Hod is where the lower spiritual worlds receive the refined energy from above, making it crucial for the flow between the higher and lower realms.',
    qualities: [
      'Splendor and glory',
      'Submission and humility',
      'Prophetic communication',
      'Refinement of energy',
      'Resonance and echo',
    ],
    paths: [23, 26, 27, 29, 31],
  },
  {
    id: 'yesod',
    number: 9,
    name: 'Yesod',
    hebrewName: 'יְסוֹד',
    translation: 'Foundation',
    pillar: 'middle',
    color: '#7B2FBE',
    glowColor: 'rgba(123, 47, 190, 0.6)',
    x: 250,
    y: 553,
    divineLight: 'Nefesh (Soul of Body)',
    soulLevel: 'Nefesh',
    godName: 'Shaddai / El Chai (שַׁדַּי / אֵל חַי)',
    archangel: 'Gabriel',
    description:
      'Yesod is the Foundation — the great conduit that channels all divine energy from the upper sefirot to Malkhut. It is the reproductive principle of the divine body, the channel through which the divine blessing and vitality flow into the world. Yesod collects and filters all the energy from Netzach, Hod, and Tiferet, then transmits it in a unified, coherent form to Malkhut.',
    baalHaSulamTeaching:
      'Baal HaSulam places special emphasis on Yesod\'s role as the essential connector between the upper spiritual worlds and our physical reality. In Talmud Eser Sefirot, Yesod corresponds to the Brit (covenant) — the connection point between Creator and creation. Baal HaSulam teaches that Yesod represents the aspect of faith (Emunah) as a practical channel — it is the foundation upon which all spiritual structures rest. The spiritual work connected to Yesod involves maintaining the purity of intention (Kavvanah) as the channel through which our prayers and deeds rise upward.',
    qualities: [
      'Foundation of all structure',
      'Central conduit of divine energy',
      'Channel of blessing',
      'Covenant (Brit)',
      'Pure intention',
    ],
    paths: [25, 28, 29, 32],
  },
  {
    id: 'malkhut',
    number: 10,
    name: 'Malkhut',
    hebrewName: 'מַלְכוּת',
    translation: 'Kingdom',
    pillar: 'middle',
    color: '#8B4513',
    glowColor: 'rgba(139, 69, 19, 0.6)',
    x: 250,
    y: 645,
    divineLight: 'None — The Pure Receiver',
    soulLevel: 'Nefesh (lowest aspect)',
    godName: 'Adonai (אֲדֹנָי)',
    archangel: 'Sandalphon',
    description:
      'Malkhut is the Kingdom — the divine presence manifest in the world. It is the feminine, receptive principle (the Shekhinah) and corresponds to our physical reality. Malkhut has no light of its own but reflects and expresses all the light it receives from above. It is the final vessel, the throne of the divine, and the interface between the spiritual and physical worlds.',
    baalHaSulamTeaching:
      'Malkhut holds the most central place in Baal HaSulam\'s teaching on Talmud Eser Sefirot. He explains that Malkhut is the original desire to receive (Ratzon LeKabel) — the soul of creation. The entire purpose of creation is expressed through Malkhut: the created being (which corresponds to Malkhut) receives divine goodness and eventually, through spiritual work, learns to transform receiving into bestowing. Baal HaSulam teaches that the Tzimtzum occurred within Malkhut — Malkhut restricted its desire to receive, creating the spiritual space for development. The correction (Tikkun) of Malkhut — learning to receive in order to bestow — is the ultimate purpose of all creation.',
    qualities: [
      'The Shekhinah (divine presence)',
      'Physical reality',
      'Pure receptive vessel',
      'Throne of the divine',
      'Final expression of creation',
    ],
    paths: [30, 31, 32],
  },
];

export interface Path {
  number: number;
  from: string;
  to: string;
  hebrewLetter: string;
  letterName: string;
  letterValue: number;
}

export const PATHS: Path[] = [
  { number: 11, from: 'keter', to: 'chokhmah', hebrewLetter: 'א', letterName: 'Aleph', letterValue: 1 },
  { number: 12, from: 'keter', to: 'binah', hebrewLetter: 'ב', letterName: 'Bet', letterValue: 2 },
  { number: 13, from: 'keter', to: 'tiferet', hebrewLetter: 'ג', letterName: 'Gimel', letterValue: 3 },
  { number: 14, from: 'chokhmah', to: 'binah', hebrewLetter: 'ד', letterName: 'Dalet', letterValue: 4 },
  { number: 15, from: 'chokhmah', to: 'tiferet', hebrewLetter: 'ה', letterName: 'Heh', letterValue: 5 },
  { number: 16, from: 'chokhmah', to: 'chesed', hebrewLetter: 'ו', letterName: 'Vav', letterValue: 6 },
  { number: 17, from: 'binah', to: 'tiferet', hebrewLetter: 'ז', letterName: 'Zayin', letterValue: 7 },
  { number: 18, from: 'binah', to: 'gevurah', hebrewLetter: 'ח', letterName: 'Chet', letterValue: 8 },
  { number: 19, from: 'chesed', to: 'gevurah', hebrewLetter: 'ט', letterName: 'Tet', letterValue: 9 },
  { number: 20, from: 'chesed', to: 'tiferet', hebrewLetter: 'י', letterName: 'Yod', letterValue: 10 },
  { number: 21, from: 'chesed', to: 'netzach', hebrewLetter: 'כ', letterName: 'Kaf', letterValue: 20 },
  { number: 22, from: 'gevurah', to: 'tiferet', hebrewLetter: 'ל', letterName: 'Lamed', letterValue: 30 },
  { number: 23, from: 'gevurah', to: 'hod', hebrewLetter: 'מ', letterName: 'Mem', letterValue: 40 },
  { number: 24, from: 'tiferet', to: 'netzach', hebrewLetter: 'נ', letterName: 'Nun', letterValue: 50 },
  { number: 25, from: 'tiferet', to: 'yesod', hebrewLetter: 'ס', letterName: 'Samech', letterValue: 60 },
  { number: 26, from: 'tiferet', to: 'hod', hebrewLetter: 'ע', letterName: 'Ayin', letterValue: 70 },
  { number: 27, from: 'netzach', to: 'hod', hebrewLetter: 'פ', letterName: 'Peh', letterValue: 80 },
  { number: 28, from: 'netzach', to: 'yesod', hebrewLetter: 'צ', letterName: 'Tzadi', letterValue: 90 },
  { number: 29, from: 'hod', to: 'yesod', hebrewLetter: 'ק', letterName: 'Kuf', letterValue: 100 },
  { number: 30, from: 'netzach', to: 'malkhut', hebrewLetter: 'ר', letterName: 'Resh', letterValue: 200 },
  { number: 31, from: 'hod', to: 'malkhut', hebrewLetter: 'ש', letterName: 'Shin', letterValue: 300 },
  { number: 32, from: 'yesod', to: 'malkhut', hebrewLetter: 'ת', letterName: 'Tav', letterValue: 400 },
];
