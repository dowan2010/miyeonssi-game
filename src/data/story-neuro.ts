import type { Scene } from '../types'

/**
 * 뉴로우 — 활발계 러브 스토리
 * 성격: CSR에 진심인 학교 사회공헌 동아리 부장. 직선적이고 활발함.
 *       감정을 숨기지 못하고 솔직하게 드러내지만, 결정적 순간엔 당황.
 *       대화 중 자연스럽게 CSR 지식이 튀어나옴.
 */
export const neuroScenes: Record<string, Scene> = {

  // ─── 챕터 1: 컴퓨터실의 첫 만남 ─────────────────────────────────
  neuro_01: {
    id: 'neuro_01',
    background: 'black',
    speaker: '나레이터',
    text: '방과 후, 아무도 없는 컴퓨터실로 들어섰다.',
    next: 'neuro_02',
  },
  neuro_02: {
    id: 'neuro_02',
    background: 'classroom',
    speaker: '나레이터',
    text: '조용할 줄 알았는데— 구석에서 키보드 소리가 들렸다. 빠르고 리드미컬하게.',
    next: 'neuro_03',
  },
  neuro_03: {
    id: 'neuro_03',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'surprised',
    text: '앗! 사람이 있었어?! 나 혼자인 줄 알았는데—!!',
    next: 'neuro_04',
  },
  neuro_04: {
    id: 'neuro_04',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'happy',
    text: '야야, 전학생이지? 나는 뉴로우야! 2학년 1반! 사회공헌 동아리 부장— CSR 쪽으로는 나한테 물어보면 다 알아!',
    next: 'neuro_05',
  },
  neuro_05: {
    id: 'neuro_05',
    background: 'classroom',
    speaker: '나레이터',
    text: '갑자기 CSR이라는 단어가 튀어나왔다. 화난 것 같지는 않았다. 오히려 눈이 반짝반짝.',
    next: 'neuro_choice_01',
  },
  neuro_choice_01: {
    id: 'neuro_choice_01',
    background: 'classroom',
    speaker: '나레이터',
    text: '어떻게 반응할까?',
    choices: [
      { text: '"CSR이 뭐야?"', next: 'neuro_01a', affectionDelta: 10 },
      { text: '"뉴로우? 특이한 이름이다."', next: 'neuro_01b', affectionDelta: 10 },
      { text: '조용히 자리를 잡는다.', next: 'neuro_01c', affectionDelta: 0 },
    ],
  },

  neuro_01a: {
    id: 'neuro_01a',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'happy',
    text: '오오! 물어봐줬다! CSR은 기업의 사회적 책임이야— Corporate Social Responsibility! 쉽게 말하면 기업이 돈만 버는 게 아니라 사회랑 환경도 챙기는 거지! 완전 중요한 개념이거든?',
    next: 'neuro_01a2',
    affectionDelta: 5,
  },
  neuro_01a2: {
    id: 'neuro_01a2',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'embarrassed',
    text: '아, 근데 갑자기 너무 설명했나… 미안— 원래 이러면 안 되는데 CSR 얘기 나오면 멈추질 못해.',
    next: 'neuro_lunch_setup',
  },
  neuro_01b: {
    id: 'neuro_01b',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'embarrassed',
    text: '이름이 왜?! 충분히 예쁜 이름이거든?! …사실 우리 할머니가 지어주셨어. CSR 활동하다가 만난 분이라서 더 소중해.',
    next: 'neuro_lunch_setup',
    affectionDelta: 5,
  },
  neuro_01c: {
    id: 'neuro_01c',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'surprised',
    text: '어, 어?! 무시당했어? 야— 야야야, 내 말 들었어?! CSR도 모르는 채로 지나치면 안 되는데!!',
    next: 'neuro_lunch_setup',
  },

  // ─── 점심 제안 ───────────────────────────────────────────────────
  neuro_lunch_setup: {
    id: 'neuro_lunch_setup',
    background: 'classroom',
    speaker: '나레이터',
    text: '얼마 지나지 않아 뉴로우가 키보드에서 손을 뗐다.',
    next: 'neuro_lunch_01',
  },
  neuro_lunch_01: {
    id: 'neuro_lunch_01',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'happy',
    text: '야야야! 나랑 오늘 점심 같이 먹자!! 전학생 환영 겸— 우리 동아리에서 만든 친환경 도시락 싸왔거든, 맛있어!',
    next: 'neuro_lunch_choice',
  },
  neuro_lunch_choice: {
    id: 'neuro_lunch_choice',
    background: 'classroom',
    speaker: '나레이터',
    text: '어떻게 할까?',
    choices: [
      { text: '"좋아. 친환경 도시락이 뭔지 궁금하기도 하고."', next: 'neuro_lunch_yes', affectionDelta: 15 },
      { text: '"오늘은 좀 피곤해서…"', next: 'neuro_lunch_no', affectionDelta: -5 },
    ],
  },

  neuro_lunch_yes: {
    id: 'neuro_lunch_yes',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'happy',
    text: '진짜?! 오, 좋아! 자 그러면 옥상으로 가자— 거기서 먹으면 맛있거든! 이 도시락은 내가 신경 쓴다는 뜻이야, 알지?',
    next: 'neuro_rooftop',
    affectionDelta: 5,
  },
  neuro_lunch_no: {
    id: 'neuro_lunch_no',
    background: 'classroom',
    speaker: '뉴로우',
    expression: 'sad',
    text: '…그래. 뭐, 어쩔 수 없지. …결국에는 나중에 같이 먹게 될 것 같은 느낌이 드는 건 기분 탓이겠지.',
    next: 'neuro_corridor',
  },

  // ─── 복도 (거절 후) ──────────────────────────────────────────────
  neuro_corridor: {
    id: 'neuro_corridor',
    background: 'corridor',
    speaker: '나레이터',
    text: '혼자 복도를 걷는데, 뒤에서 발소리가 들렸다.',
    next: 'neuro_corridor_02',
  },
  neuro_corridor_02: {
    id: 'neuro_corridor_02',
    background: 'corridor',
    speaker: '뉴로우',
    expression: 'normal',
    text: '…저기, 같은 방향이면 같이 걷는 건 괜찮잖아. 여기서 포인트는 내가 포기를 잘 못 한다는 거야.',
    next: 'neuro_rooftop',
    affectionDelta: 5,
  },

  // ─── 옥상 ────────────────────────────────────────────────────────
  neuro_rooftop: {
    id: 'neuro_rooftop',
    background: 'rooftop',
    speaker: '나레이터',
    text: '옥상 문을 열자, 바람이 불어왔다. 뉴로우는 이미 난간 앞에 서서 두 팔을 활짝 벌렸다.',
    next: 'neuro_rooftop_02',
  },
  neuro_rooftop_02: {
    id: 'neuro_rooftop_02',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'happy',
    text: '최고지?! 여기서 보면 학교가 다 보여! 사실 우리 동아리에서 이 옥상에 텃밭 만들자고 제안했는데— 그게 바로 E, 환경(Environmental) 활동이거든!',
    next: 'neuro_rooftop_03',
  },
  neuro_rooftop_03: {
    id: 'neuro_rooftop_03',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'normal',
    text: '…있잖아. 전학 왔을 때 무섭지 않았어? 나는 전학생 보면 항상 궁금해. 어떤 기분일까 하고.',
    next: 'neuro_rooftop_choice',
  },
  neuro_rooftop_choice: {
    id: 'neuro_rooftop_choice',
    background: 'rooftop',
    speaker: '나레이터',
    text: '뭐라고 대답할까?',
    choices: [
      { text: '"솔직히 좀 무서웠어."', next: 'neuro_roof_a', affectionDelta: 15 },
      { text: '"뭐, 그냥 그랬어."', next: 'neuro_roof_b', affectionDelta: 5 },
      { text: '"너 같은 애가 있어서 다행이야."', next: 'neuro_roof_c', affectionDelta: 20 },
    ],
  },

  neuro_roof_a: {
    id: 'neuro_roof_a',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'shy',
    text: '그렇구나… 솔직하게 말해줘서 고마워. 사실 나도 처음 이 학교 왔을 때 엄청 떨었거든. CSR 동아리 없었으면 버텼을지 몰라.',
    next: 'neuro_roof_a2',
    affectionDelta: 5,
  },
  neuro_roof_a2: {
    id: 'neuro_roof_a2',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'happy',
    text: '그래서! 내가 먼저 말 건 거야. 이게 왜 중요하냐면— CSR에서도 제일 중요한 게 S, 사회(Social)잖아. 먼저 다가가야 연결이 되니까!',
    next: 'neuro_evening',
  },

  neuro_roof_b: {
    id: 'neuro_roof_b',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'smug',
    text: '거짓말. 눈빛이 달랐거든. 뭐, 상관없어— 결국에는 내가 말 걸었으니까 이제 이해관계자야, 너는.',
    next: 'neuro_evening',
  },

  neuro_roof_c: {
    id: 'neuro_roof_c',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'embarrassed',
    text: '…어?! 그, 그런 말 갑자기 하면 어떡해!! 이런 거에 반응하면 지는 거라고 생각했는데— 완전 지잖아 나!!',
    next: 'neuro_evening',
    affectionDelta: 5,
  },

  // ─── 저녁 무렵 ───────────────────────────────────────────────────
  neuro_evening: {
    id: 'neuro_evening',
    background: 'rooftop',
    speaker: '나레이터',
    text: '바람이 머리카락을 흩뜨렸다. 뉴로우는 난간에 등을 기대고 하늘을 올려다봤다.',
    next: 'neuro_evening_02',
  },
  neuro_evening_02: {
    id: 'neuro_evening_02',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'normal',
    text: '있잖아— 너랑 있으면 날씨가 다 맑아 보여. 쉽게 말하면… 좋다는 거야. 오늘 하루.',
    next: 'neuro_evening_choice',
  },
  neuro_evening_choice: {
    id: 'neuro_evening_choice',
    background: 'rooftop',
    speaker: '나레이터',
    text: '어떻게 반응할까?',
    choices: [
      { text: '말없이 옆에 선다.', next: 'neuro_end_a', affectionDelta: 15 },
      { text: '"나도."', next: 'neuro_end_b', affectionDelta: 20 },
      { text: '"갑자기 왜 그래."', next: 'neuro_end_c', affectionDelta: 5 },
    ],
  },

  neuro_end_a: {
    id: 'neuro_end_a',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'shy',
    text: '…말 안 해도 알겠어. 됐어. 그걸로 충분해.',
    next: 'neuro_ending',
    affectionDelta: 5,
  },
  neuro_end_b: {
    id: 'neuro_end_b',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'embarrassed',
    text: '…!! 진짜?! 아— 왜 그렇게 간단하게 말해!! 심장 터지잖아— 100번 들어도 직접 들으면 매번 새로운 느낌이야!!',
    next: 'neuro_ending',
    affectionDelta: 5,
  },
  neuro_end_c: {
    id: 'neuro_end_c',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'smug',
    text: '흥— 솔직한 거 좋아하면서. G(지배구조)처럼 투명하게 말해봐. 다음엔 네가 먼저야.',
    next: 'neuro_ending',
  },

  // ─── 엔딩 ────────────────────────────────────────────────────────
  neuro_ending: {
    id: 'neuro_ending',
    background: 'rooftop',
    speaker: '나레이터',
    text: '노을이 지고 있었다. 뉴로우는 여전히 수다스러웠지만, 어느 순간부터 목소리가 좋게 들렸다.',
    next: 'neuro_ending_02',
  },
  neuro_ending_02: {
    id: 'neuro_ending_02',
    background: 'rooftop',
    speaker: '뉴로우',
    expression: 'happy',
    text: '자 그러면 내일도 여기 와— 알겠지? CSR도 관계도, 직접 해보는 게 전부야. 머릿속으로만 생각하면 절대 몰라!',
    next: 'neuro_ending_03',
  },
  neuro_ending_03: {
    id: 'neuro_ending_03',
    background: 'black',
    speaker: '나레이터',
    text: '첫 번째 날이 저물었다.\n\n— Chapter 1 END —',
    next: 'neuro_ending_03',
  },
}
