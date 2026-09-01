import {
  ConversationData,
  EssentialQuestion,
  WeddingRiteStep,
  DiscussionArea,
  ReadinessCheckItem,
  FAQItem,
  RuleOfLifeItem,
} from '../types';

export const PARISH_INFO = {
  title: 'Preparing for Our Marriage',
  subtitle: 'A Catholic preparation book for engaged couples',
  motto: 'Your wedding is one day. Your marriage is for life.',
  parishes: "St Mary's | St John Bosco | St Edward's Parish",
  edition: 'Couple preparation parish edition | 2026',
  formspreeEndpoint: 'https://formspree.io/f/xvkoozdo',
};

export const CONVERSATIONS: ConversationData[] = [
  {
    id: 1,
    number: 1,
    romanNumeral: 'I',
    title: "God's Plan for Marriage",
    purpose: 'Covenant, vocation, unity, permanence, the good of spouses and openness to life.',
    estimatedMinutes: '20-30 mins',
    remember:
      'Marriage is a covenant in which a man and a woman establish a partnership of the whole of life. It is ordered to the good of the spouses and to the generation and education of children. Between baptised persons, a valid marriage is a sacrament.',
    teachingParagraphs: [
      'God is the author of marriage. Scripture begins with man and woman created for communion, and Jesus points back to the beginning when he teaches that the two become one flesh and that what God has joined must not be separated. Christian marriage therefore is more than a private arrangement or a contract for as long as both people are satisfied.',
      'A covenant means a gift of persons. You do not merely exchange services, property or affection; you give and receive one another in a lifelong communion of life and love. Marriage has an objective shape: it is exclusive, faithful and enduring. It is also naturally open to the gift of children and to their education.',
      'For baptised spouses, Christ raises marriage to a sacrament. Married love becomes a sign of his faithful love for the Church. The vocation is not simply to stay together but to help one another become holy and, if children are given, to receive and form them in faith.',
      'Three words are useful to remember: unity — one husband and one wife in exclusive fidelity; permanence — a bond intended for life; fruitfulness — a love open to life and generous beyond itself. These belong with the good of the spouses: marriage is meant to be a true communion in which each seeks the other’s good.',
    ],
    threeWords: {
      unity: 'One husband and one wife in exclusive fidelity',
      permanence: 'A bond intended for life',
      fruitfulness: 'A love open to life and generous beyond itself',
    },
    talkAboutItPrompt:
      'When you say that you want to marry for life, what do you believe you are actually promising the other person — especially on a day when love feels difficult?',
    essentials: [
      {
        id: 'c1-q1',
        number: 1,
        question: 'What is marriage?',
        answer:
          'A covenant between a man and a woman establishing a partnership of the whole of life, ordered to their good and to the procreation and education of children.',
        conversationNumber: 1,
      },
      {
        id: 'c1-q2',
        number: 2,
        question: 'When is marriage a sacrament?',
        answer:
          'A valid marriage between two baptised persons is, by that fact, a sacrament.',
        conversationNumber: 1,
      },
      {
        id: 'c1-q3',
        number: 3,
        question: 'What are the essential properties of marriage?',
        answer:
          'Unity and indissolubility; married love is also naturally open to life.',
        conversationNumber: 1,
      },
      {
        id: 'c1-q4',
        number: 4,
        question: 'Why is marriage a vocation?',
        answer:
          'Because spouses are called to love faithfully, help one another towards holiness and build a Christian household.',
        conversationNumber: 1,
      },
      {
        id: 'c1-q5',
        number: 5,
        question: 'Why is openness to children part of marriage?',
        answer:
          'Because married love is naturally ordered to the gift of life and to the loving education of children, even though not every couple will be able to conceive.',
        conversationNumber: 1,
      },
    ],
    prayer:
      'Lord Jesus, teach us to love with truth, fidelity and generosity. Help us to understand the covenant we are preparing to make and to seek one another’s holiness as well as happiness. Amen.',
    togetherThisWeekPrompt:
      'Each of you write one sentence beginning: “When I promise you my whole life, I mean…” Read your sentences to each other and talk about any difference you notice.',
    togetherThisWeekPrefix: 'When I promise you my whole life, I mean...',
  },
  {
    id: 2,
    number: 2,
    romanNumeral: 'II',
    title: 'Consent and the Sacrament',
    purpose: 'Freedom, consent, validity, sacramentality, grace and the role of the Church.',
    estimatedMinutes: '20-30 mins',
    remember:
      'Consent makes marriage. Each person must be free to marry and must freely give and receive the other in an irrevocable covenant. Catholics ordinarily marry according to the Church’s canonical form unless a lawful dispensation applies.',
    teachingParagraphs: [
      'No priest can manufacture your marriage for you. The indispensable human act is your consent: each of you freely chooses the other and gives yourself in marriage. Consent cannot be supplied by parents, family expectations, a wedding booking, pregnancy, money, fear of embarrassment or pressure from the other person.',
      'Before a Catholic marriage, the Church establishes that both parties are free to marry and that no impediment or prior bond stands in the way. A Catholic is ordinarily bound to marry before an authorised priest or deacon and two witnesses unless the competent authority has lawfully dispensed from that form.',
      'The intention expressed in consent must be truly marital. A person cannot validly consent while positively excluding marriage itself or an essential element or property — for example, intending from the outset never to be faithful, never to accept the permanence of marriage, or absolutely excluding children from the marriage.',
      'When both spouses are baptised, a valid marriage is sacramental. In the Latin Church the baptised spouses confer the sacrament on each other through their consent; the priest or deacon receives that consent in the name of the Church and blesses the union. Christ gives spouses a special grace to perfect their love, strengthen their unity, forgive, persevere and help one another towards holiness.',
    ],
    talkAboutItPrompt:
      'Is there anything about fidelity, permanence, children, faith, or freedom to marry that either of you feels unable to promise, uncertain about, or pressured to agree to? If yes, speak honestly now and bring it to the priest.',
    essentials: [
      {
        id: 'c2-q1',
        number: 6,
        question: 'What makes the marriage?',
        answer:
          'The free and lawful consent of the man and woman who mutually give and accept one another in marriage.',
        conversationNumber: 2,
      },
      {
        id: 'c2-q2',
        number: 7,
        question: 'What does freedom mean?',
        answer:
          'No coercion or grave fear, and no legal or canonical obstacle that makes a person unable to marry.',
        conversationNumber: 2,
      },
      {
        id: 'c2-q3',
        number: 8,
        question: 'What form does a Catholic ordinarily observe?',
        answer:
          'Marriage before an authorised priest or deacon and two witnesses, unless the Church lawfully dispenses from the form.',
        conversationNumber: 2,
      },
      {
        id: 'c2-q4',
        number: 9,
        question: 'Who are the ministers of the sacrament in the Latin Church?',
        answer:
          'When both spouses are baptised, the spouses themselves confer the sacrament on each other by their consent.',
        conversationNumber: 2,
      },
      {
        id: 'c2-q5',
        number: 10,
        question: 'What grace does Matrimony give?',
        answer:
          'Grace to perfect married love, strengthen unity and fidelity, forgive, carry burdens together, welcome family life and grow in holiness.',
        conversationNumber: 2,
      },
    ],
    prayer:
      'Lord, give us freedom of heart and honesty of speech. Remove fear, pretence and hidden reservations. May the consent we give be truthful, generous and faithful. Amen.',
    togetherThisWeekPrompt:
      'Tell each other, without interruption, what you understand by “faithful for life”. Then ask: “Is there anything you need to know from me before you can promise this freely?”',
  },
  {
    id: 3,
    number: 3,
    romanNumeral: 'III',
    title: 'Living Catholic Marriage',
    purpose: 'Prayer, Mass, forgiveness, communication, marital intimacy, responsible parenthood and family faith.',
    estimatedMinutes: '20-30 mins',
    remember:
      'The sacrament is lived after the wedding through prayer, worship, fidelity, forgiveness, honest communication, marital self-gift, openness to life, responsible parenthood and the ordinary holiness of family life.',
    teachingParagraphs: [
      'Marriage joins two real people, not ideal versions of them. You will bring different habits, families, expectations, wounds, strengths and ways of handling stress. The grace of Matrimony does not remove the need for communication, patience or repair; it gives you Christ’s help to practise them faithfully.',
      'A Catholic home needs a spiritual rhythm. Pray together, even briefly. Keep Sunday Mass at the centre of life. Catholic spouses should make regular use of Confession and approach Holy Communion worthily. When children come, they learn what faith means first by watching what their parents actually do.',
      'Forgiveness is not pretending harm did not happen. Healthy married communication tells the truth without humiliation, listens before defending, apologises without excuses, and seeks repair rather than victory. Serious problems should be brought for help early rather than hidden until resentment becomes normal.',
      'Marital intimacy is part of the total gift of husband and wife. The Church teaches that sexual union belongs within marriage and should express faithful, mutual self-giving while remaining open to life. Responsible parenthood may include periodic abstinence and fertility-awareness methods for just reasons. Deliberate contraception is not in accord with Catholic teaching because it separates the unitive and procreative meanings of the marital act. If this teaching is new or difficult, bring the question honestly to the priest rather than avoiding it.',
      'Children are gifts, not entitlements, and infertility does not make a marriage less real. Spouses who do not receive children are still called to a fruitful love expressed in hospitality, service, charity and shared holiness. When children are given, parents become their first educators in faith.',
    ],
    talkAboutItPrompt:
      'If someone watched the way you pray, spend money, handle conflict, use your phones, speak about sex, treat family members and make decisions, what kind of marriage would they expect you to have in ten years?',
    essentials: [
      {
        id: 'c3-q1',
        number: 11,
        question: 'What is the domestic church?',
        answer:
          'The Christian household: a community of grace and prayer where faith is first learned and lived.',
        conversationNumber: 3,
      },
      {
        id: 'c3-q2',
        number: 12,
        question: 'What habits strengthen Catholic marriage?',
        answer:
          'Prayer, Sunday Mass, the sacraments, honest communication, forgiveness, fidelity and service.',
        conversationNumber: 3,
      },
      {
        id: 'c3-q3',
        number: 13,
        question: 'What does marital intimacy express?',
        answer:
          'The faithful and total self-gift of husband and wife, with the unitive and procreative meanings of marriage held together.',
        conversationNumber: 3,
      },
      {
        id: 'c3-q4',
        number: 14,
        question: 'What is responsible parenthood?',
        answer:
          'Generous and prudent discernment about family life in accordance with God’s law, including moral fertility-awareness methods when there are just reasons to space births.',
        conversationNumber: 3,
      },
      {
        id: 'c3-q5',
        number: 15,
        question: 'What should you do when a serious problem appears?',
        answer:
          'Seek truth, safety, pastoral help and appropriate professional support early; do not hide serious problems simply to keep the wedding or marriage looking successful.',
        conversationNumber: 3,
      },
    ],
    prayer:
      'Lord Jesus, make our future home a place of prayer, truth, tenderness and mercy. Teach us to forgive, to be faithful in body and heart, and to welcome your will with generosity. Amen.',
    togetherThisWeekPrompt:
      'Choose two ordinary habits you want from the first month of marriage: for example Sunday Mass, a nightly prayer, one technology-free meal, a weekly money check-in, or a regular time to talk without phones.',
  },
  {
    id: 4,
    number: 4,
    romanNumeral: 'IV',
    title: 'The Wedding Rite and the Vows',
    purpose: 'Questions of intention, consent, rings, nuptial blessing and living the vows after the day.',
    estimatedMinutes: '20-30 mins',
    remember:
      'The wedding liturgy is not a performance added to your relationship. It is the public celebration in which the Church receives your consent, prays for you and sends you to live what you have promised.',
    teachingParagraphs: [
      'The celebration normally includes the Liturgy of the Word, questions before the consent, the exchange of consent, the reception of the consent by the Church’s minister, the blessing and giving of rings, intercessions and the nuptial blessing. When the marriage is celebrated within Mass, the Eucharistic liturgy follows.',
      'Before consent you are asked, in the approved form, about freedom, your intention to enter a lifelong marriage, and openness to children and their upbringing. These are not ceremonial warm-up questions. They express the kind of marriage you are about to undertake.',
      'The exchange of consent is the heart of the celebration. Do not worry about performing it perfectly. The priest or deacon will guide you. What matters is that the words truthfully express your free act of will. The approved liturgical book, not a wedding website or this booklet, governs the exact wording used on the day.',
      'The rings are signs of the covenant you have made; the nuptial blessing asks God to strengthen the marriage. If both of you are Catholic, celebration within Mass is ordinarily fitting. In mixed marriages or other circumstances, the priest will advise which approved form is pastorally appropriate.',
    ],
    talkAboutItPrompt:
      'Read the form of consent or vows the parish gives you. Which words feel easiest to say now, and which words do you think will demand the most of you twenty years from now?',
    essentials: [
      {
        id: 'c4-q1',
        number: 16,
        question: 'What is the heart of the wedding celebration?',
        answer: 'The exchange of matrimonial consent.',
        conversationNumber: 4,
      },
      {
        id: 'c4-q2',
        number: 17,
        question: 'Why are there questions before consent?',
        answer:
          'To make clear the freedom and intentions with which you enter marriage.',
        conversationNumber: 4,
      },
      {
        id: 'c4-q3',
        number: 18,
        question: 'What do the rings mean?',
        answer: 'They are signs of the faithful covenant you have entered.',
        conversationNumber: 4,
      },
      {
        id: 'c4-q4',
        number: 19,
        question: 'What is the nuptial blessing?',
        answer:
          'The Church’s solemn prayer asking God to bless, strengthen and sanctify your married life.',
        conversationNumber: 4,
      },
      {
        id: 'c4-q5',
        number: 20,
        question: 'Do you have to memorise the whole rite?',
        answer:
          'No. The priest or deacon guides the celebration; you should understand what you are doing and know the essential responses and consent.',
        conversationNumber: 4,
      },
    ],
    prayer:
      'Lord Jesus, may the words we speak on our wedding day be true in our hearts and faithful in our life. Write our promises into our daily choices and keep us close to you all our days. Amen.',
    togetherThisWeekPrompt:
      'Read the parish’s approved form of consent aloud to each other slowly. Do not rehearse it as a performance; use it as a prayer and ask what each promise will require in ordinary life.',
  },
];

export const WEDDING_RITE_STEPS: WeddingRiteStep[] = [
  {
    step: 1,
    part: 'Welcome / Entrance',
    whatItMeans:
      'The couple and assembly are gathered for the Church’s liturgy. The exact entrance form depends on the approved rite and local planning.',
  },
  {
    step: 2,
    part: 'Liturgy of the Word',
    whatItMeans:
      'Sacred Scripture is proclaimed and the homily opens the meaning of Christian marriage.',
  },
  {
    step: 3,
    part: 'Questions before Consent',
    whatItMeans:
      'The couple publicly expresses freedom and the intentions required for marriage, including lifelong fidelity and openness to children according to the approved form.',
  },
  {
    step: 4,
    part: 'Consent',
    whatItMeans:
      'The couple gives and receives one another in marriage. This is the indispensable element that makes the marriage.',
  },
  {
    step: 5,
    part: 'Reception of Consent',
    whatItMeans:
      'The priest or deacon receives the consent in the name of the Church and the assembly gives thanks to God.',
  },
  {
    step: 6,
    part: 'Rings',
    whatItMeans:
      'The rings are blessed and exchanged as signs of love and fidelity.',
  },
  {
    step: 7,
    part: 'Intercessions',
    whatItMeans:
      'The Church prays for the couple, their families, the Church and the world.',
  },
  {
    step: 8,
    part: 'Nuptial Blessing',
    whatItMeans:
      'The Church asks God’s blessing and grace upon the spouses and their married life.',
  },
  {
    step: 9,
    part: 'Eucharist, when celebrated within Mass',
    whatItMeans:
      'The newly married couple joins the Church at the altar; Catholics who are properly disposed receive Holy Communion.',
  },
  {
    step: 10,
    part: 'Final Blessing',
    whatItMeans:
      'The couple is blessed and sent to live the covenant in family, Church and society.',
  },
];

export const FREEDOM_TO_MARRY_ITEMS = [
  'Either of you has ever been married before — civilly, religiously or in another country. Do not assume a previous marriage “does not count”.',
  'Either of you is unsure whether or where you were baptised, or belongs to another Christian community or religion.',
  'One of you is unbaptised.',
  'You are related by blood or marriage, or there may be another canonical impediment.',
  'Either of you feels pressured, afraid to say no, or unable to consent freely.',
  'There is a known medical issue concerning the ability to consummate the marriage; infertility is a different question and should not be confused with this.',
  'You hope to marry outside a Catholic church or need a form of celebration involving another Christian minister.',
  'There is anything about permanence, fidelity or children that one of you intends to exclude.',
];

export const ALL_ESSENTIALS_15: EssentialQuestion[] = [
  {
    id: 'ess-1',
    number: 1,
    question: 'What is marriage?',
    answer:
      'A covenant between a man and a woman establishing a partnership of the whole of life, ordered to the good of the spouses and the procreation and education of children.',
    conversationNumber: 1,
  },
  {
    id: 'ess-2',
    number: 2,
    question: 'Who instituted marriage?',
    answer:
      'God established marriage in creation; Christ restored its original dignity and raised marriage between the baptised to a sacrament.',
    conversationNumber: 1,
  },
  {
    id: 'ess-3',
    number: 3,
    question: 'When is marriage sacramental?',
    answer:
      'When a valid marriage exists between two baptised persons.',
    conversationNumber: 1,
  },
  {
    id: 'ess-4',
    number: 4,
    question: 'What are the essential properties of marriage?',
    answer: 'Unity and indissolubility.',
    conversationNumber: 1,
  },
  {
    id: 'ess-5',
    number: 5,
    question: 'What does married love require?',
    answer:
      'Exclusive fidelity, permanence, mutual self-gift, and openness to life.',
    conversationNumber: 1,
  },
  {
    id: 'ess-6',
    number: 6,
    question: 'What makes marriage?',
    answer:
      'The free consent of the parties, lawfully manifested by persons who are free and capable of marrying.',
    conversationNumber: 2,
  },
  {
    id: 'ess-7',
    number: 7,
    question: 'Can another person supply consent?',
    answer:
      'No. No human power can replace the consent of either spouse.',
    conversationNumber: 2,
  },
  {
    id: 'ess-8',
    number: 8,
    question: 'Who are the ministers in the Latin Church?',
    answer:
      'When both spouses are baptised, the spouses confer the sacrament on each other through consent.',
    conversationNumber: 2,
  },
  {
    id: 'ess-9',
    number: 9,
    question: 'What does the priest or deacon do?',
    answer:
      'He receives the consent in the name of the Church, witnesses the marriage according to Church law and gives the Church’s blessing.',
    conversationNumber: 2,
  },
  {
    id: 'ess-10',
    number: 10,
    question: 'What grace does Matrimony give?',
    answer:
      'Grace to perfect love, strengthen unity and fidelity, forgive, persevere, welcome family life and grow together in holiness.',
    conversationNumber: 2,
  },
  {
    id: 'ess-11',
    number: 11,
    question: 'Why are children part of marriage?',
    answer:
      'Marriage is naturally ordered to the generation and education of children, who are received as gifts rather than possessions.',
    conversationNumber: 3,
  },
  {
    id: 'ess-12',
    number: 12,
    question: 'Does infertility make marriage invalid?',
    answer:
      'No. Sterility by itself neither prohibits nor invalidates marriage.',
    conversationNumber: 3,
  },
  {
    id: 'ess-13',
    number: 13,
    question: 'What is the domestic church?',
    answer:
      'The Christian family as a community of grace, prayer, virtue and the first handing-on of faith.',
    conversationNumber: 3,
  },
  {
    id: 'ess-14',
    number: 14,
    question: 'What should sustain married life?',
    answer:
      'Prayer, Sunday Mass, the sacraments, forgiveness, honest communication, fidelity, charity and service.',
    conversationNumber: 3,
  },
  {
    id: 'ess-15',
    number: 15,
    question: 'What should a Catholic do if serious difficulties arise?',
    answer:
      'Seek truth, prayer, pastoral help and appropriate professional support early, while protecting the safety and dignity of everyone involved.',
    conversationNumber: 3,
  },
];

export const DISCUSSION_AREAS: DiscussionArea[] = [
  {
    id: 'faith-worship',
    area: 'Faith and worship',
    prompt:
      'What place will Sunday Mass, prayer and the Catholic faith actually have in our week? If we differ in faith, how will we protect the Catholic party’s practice and speak about faith with children?',
  },
  {
    id: 'conflict-repair',
    area: 'Conflict and repair',
    prompt:
      'What do I do when angry — pursue, withdraw, shout, become sarcastic, go silent? What helps me return to a conversation safely and honestly?',
  },
  {
    id: 'money-work',
    area: 'Money and work',
    prompt:
      'What do we believe about debt, saving, generosity, spending, careers and financial transparency? What financial information have we not yet shared?',
  },
  {
    id: 'children-fertility',
    area: 'Children and fertility',
    prompt:
      'Do we both intend a marriage open to children? How do we feel about timing, fertility difficulties, adoption, family size and Catholic teaching on responsible parenthood?',
  },
  {
    id: 'sex-intimacy',
    area: 'Sex and intimacy',
    prompt:
      'Can we speak respectfully and without pressure about expectations, boundaries, past experiences, pornography, fertility, affection and the Church’s teaching on marital sexuality?',
  },
  {
    id: 'family-boundaries',
    area: 'Family and boundaries',
    prompt:
      'How involved will parents, siblings and friends be? What happens at Christmas, with childcare, with difficult relatives, or when one family expects more than the other?',
  },
  {
    id: 'home-responsibilities',
    area: 'Home and responsibilities',
    prompt:
      'Who will do what in ordinary life — cooking, cleaning, childcare, appointments, prayer, finances, care of relatives? Are our expectations realistic and mutually respectful?',
  },
  {
    id: 'health-habits',
    area: 'Health and habits',
    prompt:
      'Have we been honest about physical or mental health, medication, addiction, gambling, alcohol/drugs, significant debt, legal problems or other matters that could affect married life?',
  },
  {
    id: 'technology-privacy',
    area: 'Technology and privacy',
    prompt:
      'What boundaries will we have around phones, social media, private messaging, pornography, location sharing and time online?',
  },
  {
    id: 'safety-freedom',
    area: 'Safety and freedom',
    prompt:
      'Can each of us disagree or say no without fear? Is there controlling behaviour, threats, intimidation, isolation, forced sex, violence or financial control? If yes, this is not ordinary conflict: speak privately to the priest and seek appropriate help before proceeding.',
    isSafetyWarning: true,
  },
];

export const READINESS_CHECKLIST: ReadinessCheckItem[] = [
  {
    id: 'chk-freedom',
    label: 'Freedom',
    statement:
      'We are each choosing marriage freely, without coercion, grave fear or a hidden reservation.',
  },
  {
    id: 'chk-freedom-marry',
    label: 'Freedom to marry',
    statement:
      'We have told the priest about every previous marriage and any fact that could affect our freedom to marry.',
  },
  {
    id: 'chk-meaning',
    label: 'Meaning of marriage',
    statement:
      'We understand marriage as a lifelong covenant of one man and one woman, ordered to the good of the spouses and open to life.',
  },
  {
    id: 'chk-fidelity',
    label: 'Fidelity',
    statement:
      'We intend exclusive fidelity and are not entering marriage while intending another sexual or romantic relationship.',
  },
  {
    id: 'chk-permanence',
    label: 'Permanence',
    statement:
      'We intend marriage for life and are not treating divorce as a pre-planned exit if the relationship becomes difficult.',
  },
  {
    id: 'chk-children',
    label: 'Children',
    statement:
      'We do not positively exclude children from the marriage and have discussed Catholic teaching on their baptism and formation.',
  },
  {
    id: 'chk-faith',
    label: 'Faith',
    statement:
      'The Catholic party intends to remain faithful to the Church; as a couple we have honestly discussed Mass, prayer and the religious life of the household.',
  },
  {
    id: 'chk-sacramental',
    label: 'Sacramental life',
    statement:
      'Catholic parties understand the value of Confession before the wedding and of Sunday Mass and the Eucharist in married life.',
  },
  {
    id: 'chk-practical',
    label: 'Practical honesty',
    statement:
      'We have discussed money, debt, work, health, family, sex, fertility, addictions, technology and expectations of home life.',
  },
  {
    id: 'chk-safety',
    label: 'Safety',
    statement:
      'Neither of us is afraid of the other or being coerced. We know that threats, violence, forced sex, controlling behaviour and isolation require help, not simply better communication.',
  },
  {
    id: 'chk-rite',
    label: 'Wedding rite',
    statement:
      'We know the basic shape of the celebration and will use the texts, music and readings approved for the parish.',
  },
  {
    id: 'chk-questions',
    label: 'Questions',
    statement:
      'We have brought unresolved questions to the priest rather than hiding them.',
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do we both have to be Catholic?',
    answer:
      'No. A Catholic can marry a baptised non-Catholic with the required permission, and can marry an unbaptised person if the required dispensation is granted. The priest will guide you through what applies.',
    category: 'canonical',
  },
  {
    id: 'faq-2',
    question: 'If one of us is unbaptised, is the marriage a sacrament?',
    answer:
      'A valid marriage between two baptised persons is sacramental. If one spouse is unbaptised, the valid marriage is not sacramental unless and until both spouses are baptised.',
    category: 'sacramental',
  },
  {
    id: 'faq-3',
    question: 'We are already living together. Can we still marry in the Church?',
    answer:
      'Yes. Be honest with the priest. Preparation is a chance to bring the relationship into full accord with the Gospel, including chastity before marriage and, for Catholics, a good Confession before the wedding when appropriate.',
    category: 'pastoral',
  },
  {
    id: 'faq-4',
    question: 'What if one of us has been married before?',
    answer:
      'Tell the priest immediately, even if the marriage was only civil, took place outside the Catholic Church or ended years ago. A new wedding cannot be arranged until freedom to marry has been established.',
    category: 'canonical',
  },
  {
    id: 'faq-5',
    question: 'Is an annulment Catholic divorce?',
    answer:
      'No. A declaration of nullity is a judgement that, after investigation, a valid marriage bond was not brought into being at the time of consent. The tribunal, not the couple, makes that judgement.',
    category: 'canonical',
  },
  {
    id: 'faq-6',
    question: 'Can we marry somewhere other than a Catholic church?',
    answer:
      'Sometimes, but permission or dispensation may be needed depending on the circumstances. Do not book another venue until the priest has confirmed what is possible.',
    category: 'canonical',
  },
  {
    id: 'faq-7',
    question: 'Do we have to marry during Mass?',
    answer:
      'Not always. When both parties are Catholic, marriage within Mass is ordinarily fitting. In mixed marriages or other circumstances, the rite outside Mass may be pastorally more appropriate. The priest will advise.',
    category: 'pastoral',
  },
  {
    id: 'faq-8',
    question: 'What about readings and music?',
    answer:
      'The wedding is a liturgy of the Church. Readings are chosen from the approved biblical texts and music must be suitable for sacred worship. The parish will help you choose.',
    category: 'practical',
  },
  {
    id: 'faq-9',
    question: 'Do we need Confession before the wedding?',
    answer:
      'Catholic spouses are strongly encouraged to prepare spiritually, including the Sacrament of Penance, so that they approach marriage and Holy Communion in a state of grace.',
    category: 'sacramental',
  },
  {
    id: 'faq-10',
    question: 'What if we are older or cannot have children?',
    answer:
      'Infertility does not invalidate marriage. Openness to life means not excluding the procreative meaning of marriage; it does not mean that every couple must be biologically able to conceive.',
    category: 'pastoral',
  },
  {
    id: 'faq-11',
    question: 'What is the difference between infertility and impotence?',
    answer:
      'Church law distinguishes inability to conceive from antecedent and perpetual inability to consummate marriage. Sterility does not invalidate marriage; a known concern about consummation should be discussed privately with the priest.',
    category: 'canonical',
  },
  {
    id: 'faq-12',
    question: 'What if we disagree about contraception or Natural Family Planning?',
    answer:
      'Do not hide the disagreement. Catholic teaching asks spouses to respect both the unitive and procreative meanings of marital intimacy. Ask the priest for clear teaching and, if helpful, support in learning fertility awareness/Natural Family Planning.',
    category: 'pastoral',
  },
  {
    id: 'faq-13',
    question: 'What if one of us is not very religious?',
    answer:
      'Say so honestly. In a mixed marriage the Church does not ask the non-Catholic spouse to pretend to be Catholic, but both should understand the nature of marriage and the Catholic party’s obligations concerning faith and the Catholic upbringing of children.',
    category: 'pastoral',
  },
  {
    id: 'faq-14',
    question: 'What if we discover a serious problem during preparation?',
    answer:
      'That is one reason preparation exists. Bring it to the priest. A difficult truth faced before the wedding is safer than a hidden truth carried into marriage.',
    category: 'pastoral',
  },
];

export const RULE_OF_LIFE_ITEMS: RuleOfLifeItem[] = [
  {
    id: 'rule-daily',
    rhythm: 'Daily',
    practice:
      'Pray together briefly; speak one word of gratitude; show ordinary affection; tell the truth kindly.',
  },
  {
    id: 'rule-meals',
    rhythm: 'At meals',
    practice:
      'Say grace when you are together; let meals sometimes be free of phones and other screens.',
  },
  {
    id: 'rule-weekly',
    rhythm: 'Weekly',
    practice:
      'Keep Sunday Mass at the centre of the week; make time for an unhurried conversation about how each of you is doing.',
  },
  {
    id: 'rule-money',
    rhythm: 'Money',
    practice:
      'Look at finances together regularly. Keep no secret debt, account or spending pattern that affects the household.',
  },
  {
    id: 'rule-conflict',
    rhythm: 'Conflict',
    practice:
      'Do not use contempt, threats, intimidation or silence as punishment. Pause when needed, then return to the issue and seek repair.',
  },
  {
    id: 'rule-sacraments',
    rhythm: 'Sacraments',
    practice:
      'Catholic spouses receive the Eucharist worthily and use Confession regularly; let mercy become normal rather than exceptional.',
  },
  {
    id: 'rule-intimacy',
    rhythm: 'Marriage and intimacy',
    practice:
      'Protect fidelity in body, imagination, messages and online life. Speak honestly and respectfully about sexual intimacy and fertility.',
  },
  {
    id: 'rule-children',
    rhythm: 'Children',
    practice:
      'If children are given, pray with them, bring them to Sunday Mass, teach them the faith and let them see adults apologise and forgive.',
  },
  {
    id: 'rule-family-friends',
    rhythm: 'Family and friends',
    practice:
      'Build healthy boundaries while honouring parents and keeping friendships that strengthen, rather than undermine, your marriage.',
  },
  {
    id: 'rule-difficulties',
    rhythm: 'When things go wrong',
    practice:
      'Begin again. Ask for help early from the priest and from appropriate professional support. Serious danger or abuse requires safety and specialist help, not endurance in silence.',
  },
  {
    id: 'rule-anniversary',
    rhythm: 'Anniversary',
    practice:
      'Thank God for the covenant, pray for each other and remember what you promised — not as nostalgia, but as a renewed choice.',
  },
];

export const COUPLES_PRAYER =
  'Lord Jesus, be at the centre of our marriage. Teach us to be faithful, truthful, tender and forgiving. Give us courage in difficulty, gratitude in joy, generosity in family life and perseverance in faith. Lead us together towards eternal life. Amen.';

export const SOURCES_AND_REFERENCES = [
  'Sacred Scripture: Genesis 1-2; Matthew 19:3-6; John 2:1-11; 1 Corinthians 7 and 13; Ephesians 5:21-33; Colossians 3:12-17.',
  'Catechism of the Catholic Church: nos. 1601-1666 (Matrimony), with nos. 2331-2400 especially on chastity, conjugal love and responsible parenthood.',
  'Code of Canon Law: canons 1055-1165, especially consent, impediments, canonical form and mixed marriages.',
  'Order of Celebrating Matrimony: the approved liturgical book currently in force for the parish.',
  'Joseph Deharbe, S.J., A Full Catechism of the Catholic Religion. Current diocesan policy, civil law and the directions of the parish priest govern local documents, permissions, records and particular pastoral cases.',
];

export const FINAL_REMINDER =
  'The aim of preparation is not to produce a perfect wedding or a perfect couple. It is to help two people enter marriage freely, truthfully, sacramentally when applicable, and with the habits and grace needed to live the covenant for life.';
