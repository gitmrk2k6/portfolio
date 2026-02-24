import { useState, useEffect, useRef } from "react";
import ChatbotDemo from "./components/ChatbotDemo";

const NAV_HEIGHT = 60;

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Hash ↔ detailPage key mapping
const hashToDetail = {
  "#dental": "dental",
  "#real-estate": "realestate",
  "#school": "school",
};
const detailToHash = {
  dental: "#dental",
  realestate: "#real-estate",
  school: "#school",
};

const getDetailFromHash = () => {
  return hashToDetail[window.location.hash] || null;
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailPage, setDetailPage] = useState(getDetailFromHash);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, menuOpen]);

  // Handle hash changes (back/forward, direct URL edit)
  useEffect(() => {
    const handleHashChange = () => {
      const detail = getDetailFromHash();
      setDetailPage(detail);
      if (detail) {
        window.scrollTo(0, 0);
      } else {
        setTimeout(() => {
          const el = sectionRefs.current.works;
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
            window.scrollTo({ top, behavior: "auto" });
          }
        }, 50);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const openDetailPage = (workId) => {
    window.location.hash = detailToHash[workId];
  };

  const closeDetailPage = () => {
    history.back();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px`,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
    isScrollingRef.current = true;

    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }

    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const navItems = [
    { id: "hero", label: "Top" },
    { id: "hero", label: "自己紹介" },
    { id: "works", label: "制作プロジェクト" },
    { id: "services", label: "対応可能な業務" },
    { id: "tools", label: "使用ツール" },
    { id: "flow", label: "ご依頼について" },
    { id: "timeline", label: "経歴" },
    { id: "vision", label: "ビジョン" },
    { id: "contact", label: "連絡先" },
  ];

  const works = [
    {
      id: "dental",
      num: "01",
      title: "歯科医院向け\n審美医療相談チャットボット",
      tag: "歯科医院",
      color: "#7EBAB5",
      summary: "審美医療の相談機会を24時間365日逃さない",
    },
    {
      id: "realestate",
      num: "02",
      title: "不動産チャットボット\n夜間反響・内見機会損失防止",
      tag: "不動産",
      color: "#D4A574",
      summary: "営業時間外の反響を自動対応し、内見予約まで完結",
    },
    {
      id: "school",
      num: "03",
      title: "学習塾の退塾防止＆\n成績向上支援チャットボット",
      tag: "学習塾",
      color: "#9BB5D6",
      summary: "週1回のチェックインで退塾リスクを早期発見",
    },
  ];

  const workDetails = {
    dental: {
      color: "#7EBAB5",
      title: "歯科医院向け 審美医療相談チャットボット",
      sections: [
        {
          heading: "対象業種",
          content: "審美医療（ホワイトニング・矯正・審美修復）に力を入れている歯科医院向けチャットボット",
        },
        {
          heading: "解決する課題",
          content: "審美医療は自費診療のため単価が高く、患者は複数の医院を比較検討してから来院を判断します。しかし現場では、診療・受付の忙しさにより審美医療の説明に十分な時間が取れず、さらに営業時間外・休診日の問い合わせにも対応できないことで、月間10〜20件の相談機会を逃失しています（推定損失：月31.5万円／年間約380万円）。加えて、スタッフごとに説明内容が異なり、医院の強みや方針が患者へ統一して伝わらないという課題もあります。\n\n患者側にも「料金・痛み・効果が分からず判断できない」「電話で聞くほどではないが、Web情報だけでは足りない」「あとで予約しようと思ったまま離脱してしまう」といった心理的ハードルがあり、検討段階での離脱が自費売上の取りこぼしに直結しています。",
        },
        {
          heading: "主な機能",
          list: [
            "24時間365日の審美医療相談対応：営業時間外・休診日でも即座に相談可能。比較検討中の患者を逃しません",
            "4ステップの構造化ヒアリング：「関心のある施術 → 重視する点 → 不安に感じること → 既往歴・参考情報」を段階的に収集し、患者一人ひとりに合わせたパーソナライズ回答を生成します",
            "医療安全設計：診断行為・治療判断は一切行わず、危険サイン（強い腫れ・発熱・出血等）検出時は即座に電話連絡を案内。医療広告ガイドラインに準拠した安全な情報提供に徹します",
            "5つの用件別ルーティング：審美歯科相談・初診予約・予約変更/キャンセル・医院案内・その他を自動振り分け。新規患者/既存患者の判別も自動で行います",
            "自然な予約・カウンセリング誘導：説明と不安解消の後、心理的ハードルを下げる案内（「まずは相談だけでもOK」「即決不要」）とともにWeb予約フォームや電話番号を自然に提示します",
          ],
        },
        {
          heading: "使用した技術",
          list: [
            "プラットフォーム：Dify（Chatflow形式 / advanced-chat）",
            "LLMモデル：GPT-4o-mini × 2ノード構成（審美医療専用LLM ＋ 一般問い合わせ用LLM）",
            "RAG機能：ナレッジベース × 2（審美医療専用 ＋ 一般医院情報）と text-embedding-3-large を用いた高精度な情報検索",
            "環境変数：医院名・住所・診療時間・駐車場・支払い方法・電話番号・予約フォームURL・メニュー項目など13項目以上を環境変数として外出し。医院ごとのカスタマイズをコード変更なしで実現",
            "会話変数による状態管理：patient_type（新規/既存）、cosmetic_status（ヒアリング進捗）、booking_status（予約状況）、answer_1〜4（ヒアリング回答蓄積）など10種類の会話変数で、複数ターンにわたる対話の文脈を正確に制御",
            "条件分岐ロジック：IF/ELSEノード × 11を用いた精密なフロー制御。初回/2回目以降の判別、メニュー選択ルーティング、ヒアリングステップ管理、予約状態による分岐など",
          ],
        },
        {
          heading: "設計上の工夫",
          list: [
            "「売り込まない」設計思想：LLMプロンプトに「目的は売り込むことではなく、安心して相談できそうと感じてもらうこと」を明記。医院方針（やりすぎない・無理にすすめない・相談だけでもOK）を回答に自然に織り込む設計としました",
            "受付スタッフの会話品質を再現：箇条書きの多用・見出しラベルの使用・情報の羅列を禁止し、「受付スタッフが口頭で説明するような自然でやわらかい日本語」を実現。ナレッジベースの情報を必ず会話文に翻訳するルールを設けています",
            "「できること／できないこと」の明示：各施術について改善できる範囲と限界を必ず説明し、患者の期待値を適切に調整。治療後の不満を未然に防ぐ構成としました",
            "ボタンUIによるガイド型対話：各ステップでHTMLボタンによる選択肢を提示し、患者の入力負荷を軽減。自由記述にも対応する柔軟な設計です",
          ],
        },
        {
          heading: "想定される効果",
          effects: [
            { label: "営業時間外の取りこぼし回収", value: "月31.5万円（年間約380万円）" },
            { label: "スタッフの審美医療説明時間", value: "70%削減" },
            { label: "審美医療の月間相談数", value: "100件以上（チャットボット経由）" },
            { label: "カウンセリング予約への遷移率", value: "30%以上" },
            { label: "年間コスト比較", value: "人材採用比 年間180〜350万円のコスト削減" },
          ],
        },
      ],
    },
    realestate: {
      color: "#D4A574",
      title: "不動産チャットボット — 夜間反響・内見機会損失防止システム",
      sections: [
        {
          heading: "対象業種",
          content: "従業員5〜30名規模の不動産仲介会社（賃貸メイン）向けチャットボット",
        },
        {
          heading: "解決する課題",
          content: "不動産業界では、ポータルサイト経由の反響の約40%が営業時間外（18時以降・休日）に発生します。しかし、多くの仲介会社では翌営業日まで対応できず、その間にユーザーは競合他社へ流れてしまいます。\n\n具体的には以下の機会損失が発生しています：\n・夜間・休日の物件問い合わせに即応できないことによる離脱 → 推定 月20〜30件の反響ロス（月30〜50万円相当の機会損失）\n・「初期費用は？」「ペット可？」「審査基準は？」といった定型質問への対応に、スタッフが1日あたり約1.5〜2時間を消費 → 追客・内見対応など売上に直結する業務の時間が圧迫される\n・内見予約の電話対応ができない時間帯に、見込み客の検討熱が冷めてしまう → 来店率・成約率の低下",
        },
        {
          heading: "主な機能",
          list: [
            "物件検索の即時回答（24時間365日）：営業時間外でも、ユーザーが「渋谷区でペット可の2LDK」と入力するだけで、条件に合った物件を最大3件まで比較形式で即座に提示。地域・予算・間取り・設備など、複数条件の掛け合わせ検索に対応",
            "FAQ自動応答：「初期費用はいくら？」「保証人は必要？」「契約期間は？」など、頻出する定型質問20件以上に即座に回答。スタッフが繰り返し答えていた質問をチャットボットが肩代わりし、対応工数を大幅に削減",
            "内見予約の自動受付 → Google Sheets記録 ＋ メール通知：ユーザーが「内見したい」と入力すると、物件名・氏名・電話番号・メールアドレス・希望日時を会話形式で収集。すべての情報を一括入力した場合は即座に予約確認を返答し、不足情報がある場合は段階的にヒアリング。翌朝出社した時点で予約一覧が揃っている状態を実現",
          ],
        },
        {
          heading: "使用した技術",
          list: [
            "プラットフォーム：Dify（Advanced Chatモード）",
            "LLM：GPT-4o / GPT-4o-mini（用途に応じて使い分け）",
            "意図分類：LLMノードによる3分岐ルーティング（物件検索 / FAQ / 内見予約）",
            "RAG検索：物件データ：ハイブリッド検索（セマンティック70% + キーワード30%）、FAQデータ：セマンティック検索",
            "埋め込みモデル：text-embedding-3-large",
            "会話状態管理：Conversation Variable（予約フロー中の文脈保持）",
            "条件分岐：IF/ELSEノードによるインテント＋状態ベースの分岐制御",
            "外部連携：Google Apps Script → Google Sheets記録 ＋ Gmail通知",
            "埋め込み：JavaScript Widgetによる既存Webサイトへの設置",
          ],
        },
        {
          heading: "設計上の工夫",
          list: [
            "意図分類の精度向上：LLMにカテゴリごとの具体例を明示し、temperature 0.3の低温設定で分類のブレを抑制",
            "検索精度の最適化：物件検索では多様な表現に対応するためハイブリッド検索を採用し、FAQでは意味的な一致を重視するセマンティック検索を採用。それぞれスコア閾値を設定し、関連性の低い結果を除外",
            "予約フローの文脈維持：Conversation Variableで予約ステータスを管理し、情報収集の途中でもユーザーの入力を正しく予約フローに振り分ける",
            "一括入力・段階入力の両対応：「物件名＋名前＋電話＋メール＋日時」を一度に入力した場合は即座に確認を返し、部分的な入力には不足情報のみを質問するUX設計",
          ],
        },
        {
          heading: "想定される効果",
          effects: [
            { label: "夜間・休日の反響対応", value: "反響ロス月20〜30件を削減" },
            { label: "定型質問の対応時間", value: "約70%削減" },
            { label: "内見予約の受付漏れ", value: "夜間予約の取りこぼしゼロ" },
            { label: "テスト合格率", value: "92.3%（13件中12件合格）" },
          ],
        },
      ],
    },
    school: {
      color: "#9BB5D6",
      title: "学習塾の退塾防止＆成績向上支援チャットボット",
      sections: [
        {
          heading: "対象業種",
          content: "小学5年生〜中学3年生を対象とする個別指導・集団指導の学習塾向けチャットボット（月商200万円以上、在籍生徒数50名以上の塾を想定）",
        },
        {
          heading: "解決する課題",
          content: "退塾理由の約8割は「モチベーション低下」「成績が上がらない」「講師との相性」「宿題負担」の4パターンに分類されるが、現状では退塾を申し出られて初めて問題に気づくケースが大半。生徒が講師に本音を言えないまま退塾に至り、年間推定500万円（退塾による機会損失324万円＋新規獲得コストの未回収180万円）の損失が発生している。また、講師が個別フォローに十分な時間を割けず、生徒の小さな変化や成長を見逃してしまう構造的な問題がある。",
        },
        {
          heading: "主な機能",
          list: [
            "週1回のチェックイン機能：生徒がWeb画面から「今週の調子」「やる気」「成績」「先生」「宿題」の5項目を3段階で回答し、自由コメントを入力。所要時間2〜3分で心理的負担が低い設計",
            "退塾リスクの自動判定：IF/ELSE条件分岐により、全項目「問題なし」の生徒には成長を承認する「賞賛パス」、1つでも懸念がある生徒には悩みを受け止める「深掘りパス」へ自動ルーティング",
            "時期別バージョン切替（5種類）：通常版・試験前版・試験後版・夏休み版・受験期版を用意し、「試験前の焦り」「試験後の落ち込み」「夏休みの中だるみ」「受験期のプレッシャー」など、時期特有の心理状態に最適化した対話を実現",
            "Googleスプレッドシート自動記録：HTTP通信でGoogle Apps Scriptと連携し、生徒名・学年・回答内容・コメントを全件自動保存。講師が時系列でモチベーション推移を確認でき、退塾予兆の早期発見に活用可能",
            "月次保護者レポート支援：蓄積データをもとに、子供の学習状況やモチベーション推移を保護者に可視化するレポートの作成を支援",
          ],
        },
        {
          heading: "設計上のこだわり",
          list: [
            "「先輩トーン」のプロンプト設計：教師的な上から目線ではなく、年齢の近い先輩が寄り添うカジュアルなトーンを徹底。「〜くん」「〜さん」と呼びかけ、「わかるよ」「あるよね」など自然な共感表現を使用",
            "「解決しない」という設計思想：チャットボットの役割は「聞いてもらえた安心感」に限定し、具体的な学習指導は講師に委ねる。AI×人間のハイブリッド設計により、講師の専門性を活かしながらフォローの抜け漏れを防止",
            "禁止ルールの明確化：「先生に伝えるね」（生徒の信頼を損なう）、「休むのも大事」（退塾リスク）、「頑張れ！」（プレッシャー）など、教育現場で逆効果になりやすい表現をプロンプトレベルで制御",
            "悩み別の対応分岐：やる気低下・成績不安・講師への不満・宿題負担それぞれに対して、共感→視点の提示→締めくくりの応答構成を最適化",
          ],
        },
        {
          heading: "使用した技術",
          list: [
            "Dify Chatflow（Advanced Chat モード）：開始ノード → IF/ELSE条件分岐 → 2つのLLMノード（賞賛パス/深掘りパス） → HTTPリクエストノード → 回答ノードの5段階ワークフロー",
            "開始ノードの変数設計：テキスト入力（名前）＋ セレクト入力（学年・調子・各懸念項目）の7変数で構造化データを収集",
            "LLMモデル：GPT-4o-mini（低コスト・高速応答・十分な対話品質のバランスを考慮して選定）",
            "Google Apps Script（GAS）：DifyからのHTTPリクエストを受け取り、Googleスプレッドシートへデータを書き込むWebhookとして機能",
            "条件分岐ロジック：5つの入力項目すべてが「良好」の場合のみ賞賛パスへルーティングし、1つでも懸念があれば深掘りパスへ。AND条件による厳密な判定で、小さなサインも見逃さない設計",
          ],
        },
        {
          heading: "想定される効果",
          effects: [
            { label: "3ヶ月継続率", value: "70%→85%に改善" },
            { label: "平均継続期間", value: "6ヶ月→9ヶ月（LTV 50%向上）" },
            { label: "年間売上増加", value: "推定1,080万円" },
            { label: "退塾予兆の早期検知率", value: "80%以上（目標）" },
          ],
        },
      ],
    },
  };

  const chatbotDemos = {
    dental: {
      title: "デモ（歯科：取りこぼし防止ボット）",
      src: "https://udify.app/chatbot/XVdt8RzVoFLWKWmC",
    },
    realestate: {
      title: "デモ（不動産：内見予約ボット）",
      src: "https://udify.app/chatbot/EaDPdiAuOblUfomq",
    },
    school: {
      title: "デモ（学習塾：アンケート/退塾防止ボット）",
      src: "https://udify.app/chatbot/ciNWedbcsFQ9ZkBE",
    },
  };

  // Detail page for each work
  if (detailPage && workDetails[detailPage]) {
    const detail = workDetails[detailPage];
    const demo = chatbotDemos[detailPage];
    return (
      <div
        style={{
          fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
          color: "#3D3D3D",
          background: "#FAFAF7",
          minHeight: "100vh",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Detail Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(250, 250, 247, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            padding: "14px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <button
              onClick={closeDetailPage}
              style={{
                background: "none",
                border: `1px solid ${detail.color}40`,
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 13,
                color: detail.color,
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={detail.color} strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              戻る
            </button>
            <h1
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: isMobile ? 13 : 16,
                fontWeight: 700,
                color: "#2D2D2D",
              }}
            >
              {detail.title}
            </h1>
          </div>
        </div>

        {/* Detail Content */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
          {detail.sections.map((section, i) => (
            <div
              key={i}
              style={{
                marginBottom: 36,
                background: "white",
                borderRadius: 16,
                padding: isMobile ? "24px 18px" : "32px 32px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: detail.color,
                  marginBottom: 18,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${detail.color}20`,
                }}
              >
                {section.heading}
              </h2>

              {section.content && (
                <p style={{ fontSize: 14, lineHeight: 2, color: "#555", whiteSpace: "pre-line" }}>
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.list.map((item, j) => {
                    const colonIdx = item.indexOf("：");
                    const hasLabel = colonIdx > 0 && colonIdx < 30;
                    return (
                      <li
                        key={j}
                        style={{
                          fontSize: 14,
                          lineHeight: 1.9,
                          color: "#555",
                          padding: "10px 0",
                          borderBottom: j < section.list.length - 1 ? "1px solid #F5F5F0" : "none",
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            color: detail.color,
                            fontWeight: 700,
                            fontSize: 10,
                            marginTop: 6,
                            flexShrink: 0,
                          }}
                        >
                          ●
                        </span>
                        <span>
                          {hasLabel ? (
                            <>
                              <strong style={{ color: "#2D2D2D" }}>{item.slice(0, colonIdx)}</strong>
                              {"："}
                              {item.slice(colonIdx + 1)}
                            </>
                          ) : (
                            item
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {section.effects && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 12,
                  }}
                >
                  {section.effects.map((e, j) => (
                    <div
                      key={j}
                      style={{
                        background: `${detail.color}08`,
                        borderRadius: 12,
                        padding: "16px 18px",
                        borderLeft: `3px solid ${detail.color}`,
                      }}
                    >
                      <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{e.label}</p>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: detail.color,
                          fontFamily: "'Zen Maru Gothic', sans-serif",
                        }}
                      >
                        {e.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {demo && (
            <ChatbotDemo title={demo.title} src={demo.src} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
        color: "#3D3D3D",
        background: "#FAFAF7",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250, 250, 247, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 14 : 18,
              color: "#5B8C7E",
              cursor: "pointer",
            }}
            onClick={() => scrollTo("hero")}
          >
            小西 啓介 | ポートフォリオ
          </span>

          {/* Desktop Nav */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id + item.label}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    background:
                      activeSection === item.id
                        ? "rgba(91, 140, 126, 0.1)"
                        : "transparent",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 20,
                    fontSize: 12.5,
                    fontWeight: activeSection === item.id ? 600 : 400,
                    color:
                      activeSection === item.id ? "#5B8C7E" : "#888",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile hamburger button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                color: "#5B8C7E",
                cursor: "pointer",
                padding: "4px 8px",
                lineHeight: 1,
              }}
              aria-label="メニュー"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.15)",
                zIndex: 98,
              }}
            />
            {/* Dropdown */}
            <div
              style={{
                position: "absolute",
                top: NAV_HEIGHT - 4,
                right: 16,
                background: "white",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                zIndex: 99,
                padding: "10px 6px",
                minWidth: 180,
              }}
            >
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id + item.label}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    background: activeSection === item.id ? "rgba(91, 140, 126, 0.1)" : "transparent",
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: activeSection === item.id ? 600 : 400,
                    color: activeSection === item.id ? "#5B8C7E" : "#555",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Hero + About combined */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current.hero = el)}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: isMobile ? NAV_HEIGHT + 20 : 0,
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(126, 186, 181, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 24 : 60,
            padding: isMobile ? "0 16px" : "0 40px",
            position: "relative",
            zIndex: 1,
            maxWidth: 1100,
            width: "100%",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
          }}
        >
          {/* Left: Hero message */}
          <div style={{ textAlign: "center", flex: isMobile ? "1 1 auto" : "1 1 400px", maxWidth: 520 }}>
            {/* Avatar */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                margin: "0 auto 20px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(91, 140, 126, 0.25)",
                border: "3px solid rgba(91, 140, 126, 0.2)",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/icon.png`}
                alt="小西啓介"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <p
              style={{
                fontSize: 12,
                letterSpacing: 4,
                color: "#5B8C7E",
                fontWeight: 500,
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              AI Agent Developer
            </p>

            <h1
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: "clamp(20px, 3.5vw, 32px)",
                fontWeight: 700,
                lineHeight: 1.7,
                color: "#2D2D2D",
                marginBottom: 16,
                letterSpacing: 1,
              }}
            >
              元教師が気づいた、
              <br />
              <span style={{ color: "#5B8C7E" }}>"時間を奪う構造"</span>。
              <br />
              AIで、あなたの本業に
              <br />
              時間を取り戻します。
            </h1>

            <p
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: 13,
                color: "#999",
                fontWeight: 400,
              }}
            >
              AIエージェント開発 × 業務効率化
            </p>
          </div>

          {/* Right: About */}
          <div
            style={{
              flex: isMobile ? "1 1 auto" : "1 1 360px",
              maxWidth: isMobile ? "100%" : 440,
              background: "white",
              borderRadius: 20,
              padding: isMobile ? "24px 20px" : "32px 28px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              lineHeight: 1.9,
              fontSize: 13.5,
              color: "#555",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "#5B8C7E",
                fontWeight: 600,
                letterSpacing: 3,
                marginBottom: 14,
              }}
            >
              ABOUT
            </p>
            <p style={{ marginBottom: 14 }}>
              ご覧いただきありがとうございます。小西啓介（こにしけいすけ）と申します。
            </p>
            <p style={{ marginBottom: 14 }}>
              元中学校の理科教員で、現在はインフラエンジニアとして働きながら、AIチャットボットの開発を行っています。
            </p>
            <p style={{ marginBottom: 14 }}>
              教員時代、子どもと向き合う時間よりも、授業準備・テスト採点・保護者対応といった業務に時間を取られる日々。「本当にやりたいことに時間が使えない」——その違和感が、今の仕事の原点です。
            </p>
            <p style={{ marginBottom: 14 }}>
              AIの進化を目の当たりにし確信しました。「この技術があれば、"時間を奪われている人"を助けられる」と。
            </p>
            <p style={{ marginBottom: 0 }}>
              不動産・歯科医院・学習塾など、業種ごとの現場課題に合わせたAIチャットボットを開発しています。
            </p>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
          }
        `}</style>
      </section>

      {/* Works */}
      <section
        id="works"
        ref={(el) => (sectionRefs.current.works = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            WORKS
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 12,
              color: "#2D2D2D",
            }}
          >
            制作プロジェクト
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#999",
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            業種ごとの課題を分析し、設計・開発したAIチャットボットです。
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {works.map((work, i) => (
            <FadeIn key={work.id} delay={i * 0.1}>
              <div
                style={{
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  border: "2px solid transparent",
                }}
              >
                <div style={{ padding: isMobile ? "24px 20px" : "32px 36px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20,
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Zen Maru Gothic', sans-serif",
                        fontSize: isMobile ? 28 : 36,
                        fontWeight: 700,
                        color: work.color,
                        opacity: 0.4,
                        lineHeight: 1,
                      }}
                    >
                      {work.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          display: "inline-block",
                          background: `${work.color}18`,
                          color: work.color,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "4px 12px",
                          borderRadius: 12,
                          marginBottom: 10,
                        }}
                      >
                        {work.tag}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Zen Maru Gothic', sans-serif",
                          fontSize: isMobile ? 16 : 19,
                          fontWeight: 700,
                          lineHeight: 1.6,
                          color: "#2D2D2D",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {work.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      color: "#777",
                      lineHeight: 1.8,
                    }}
                  >
                    {work.summary}
                  </p>

                  <button
                    onClick={() => openDetailPage(work.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 20,
                      fontSize: 13,
                      color: work.color,
                      fontWeight: 600,
                      background: `${work.color}10`,
                      border: `1px solid ${work.color}30`,
                      borderRadius: 10,
                      padding: "10px 20px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    詳しく見る
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={work.color}
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        ref={(el) => (sectionRefs.current.services = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            SERVICES
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            対応可能な業務
          </h2>
        </FadeIn>

        {/* 説明 */}
        <FadeIn delay={0.1}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: isMobile ? "24px 20px" : "36px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #7EBAB5 0%, #5B8C7E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#2D2D2D",
                  }}
                >
                  AIチャットボット構築
                </h3>
              </div>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 2,
                color: "#555",
              }}
            >
              お客様の業種・課題に合わせたAIチャットボットを設計・構築します。
              問い合わせ対応の自動化、予約受付、FAQ応答など、目的に応じて柔軟に対応。
              LINE・Slack・Webサイトなど、ご利用中のツールへの導入もサポートします。
            </p>
          </div>
        </FadeIn>

        {/* 4カード統一レイアウト */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(440px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {[
            {
              title: "解決できる課題（例）",
              color: "#D4A574",
              items: [
                "問い合わせ対応に追われて、本来の業務に集中できない",
                "営業時間外の問い合わせに対応できず、機会損失が発生している",
                "同じ質問に何度も答えていて非効率",
              ],
            },
            {
              title: "サービス内容",
              color: "#5B8C7E",
              items: [
                "要件ヒアリング・業務フローの整理",
                "チャットボットの設計・構築",
                "LINE / Slack / Webサイトなどへの導入",
                "回答内容の登録・調整",
                "納品後の修正サポート",
              ],
            },
            {
              title: "導入後のサポート",
              color: "#7EBAB5",
              items: [
                "納品後1ヶ月間は無料で修正対応",
                "回答内容の追加・変更もサポート",
                "運用についての質問はいつでもOK",
              ],
            },
            {
              title: "こんな方におすすめ",
              color: "#9BB5D6",
              items: [
                "問い合わせ対応を自動化したい",
                "24時間対応できる仕組みが欲しい",
                "少人数で運営していて手が回らない",
              ],
            },
          ].map((card, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.08}>
              <div
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: isMobile ? "20px 18px" : "28px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  borderTop: `3px solid ${card.color}`,
                  height: "100%",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: card.color,
                    marginBottom: 18,
                  }}
                >
                  {card.title}
                </h4>
                {card.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 14,
                      color: "#555",
                      lineHeight: 1.8,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        color: card.color,
                        fontSize: 8,
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    >
                      ●
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 料金・納期 */}
        <FadeIn delay={0.5}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 20,
              marginBottom: 24,
            }}
          >
            {[
              { label: "料金目安", value: "ご相談ください", sub: "ご予算に応じて柔軟に対応" },
              { label: "納期目安", value: "2週間〜1ヶ月", sub: "要件の規模により変動" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "24px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{item.label}</p>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#5B8C7E",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    marginBottom: 4,
                  }}
                >
                  {item.value}
                </p>
                <p style={{ fontSize: 12, color: "#BBB" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.6}>
          <div
            style={{
              background: "rgba(126, 186, 181, 0.08)",
              borderRadius: 16,
              padding: isMobile ? "24px 20px" : "28px 32px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#5B8C7E",
                fontFamily: "'Zen Maru Gothic', sans-serif",
                marginBottom: 10,
              }}
            >
              まずはお気軽にご相談ください
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#888",
                lineHeight: 1.8,
              }}
            >
              「こんなことできる？」「費用感を知りたい」など、どんな小さなことでも大丈夫です。
              <br />
              お見積りは無料ですので、お気軽にご連絡ください。
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Tools */}
      <section
        id="tools"
        ref={(el) => (sectionRefs.current.tools = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            TOOLS
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            使用ツール
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            {
              category: "AI",
              icon: "✦",
              items: ["Dify", "ChatGPT (OpenAI API)", "Claude (Anthropic API)", "Google Gemini"],
            },
            {
              category: "自動化・データ管理",
              icon: "⚙",
              items: ["Google Apps Script", "Google スプレッドシート", "Gmail", "Notion"],
            },
            {
              category: "インフラ",
              icon: "☁",
              items: ["Linux", "サーバー構築・運用"],
            },
          ].map((group, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: isMobile ? "20px 20px" : "28px 32px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{group.icon}</span>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#5B8C7E",
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.items.map((item, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: 13,
                        padding: "8px 16px",
                        borderRadius: 10,
                        background: "#F5F5F0",
                        color: "#555",
                        fontWeight: 400,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section
        id="flow"
        ref={(el) => (sectionRefs.current.flow = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            FLOW
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            ご依頼について
          </h2>
        </FadeIn>

        {/* 料金・納期・連絡先・対応時間 */}
        <FadeIn delay={0.05}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: isMobile ? 10 : 14,
              marginBottom: 40,
            }}
          >
            {[
              { icon: "¥", label: "料金目安", value: "ご相談ください", sub: "ご予算に応じて柔軟に対応" },
              { icon: "⏱", label: "納期目安", value: "2週間〜1ヶ月", sub: "要件の規模により変動" },
              { icon: "✉", label: "連絡先", value: "konishi.ai.dev@gmail.com", sub: "メールにてお問い合わせ" },
              { icon: "⏰", label: "対応時間", value: "平日19時以降 / 土日", sub: "返信：24時間以内" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 14,
                  padding: isMobile ? "16px 10px" : "20px 20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: 22, display: "block", marginBottom: 8 }}>{item.icon}</span>
                <p style={{ fontSize: 11, color: "#999", marginBottom: 6, fontWeight: 500 }}>{item.label}</p>
                <p
                  style={{
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 700,
                    color: "#5B8C7E",
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                    marginBottom: 4,
                    wordBreak: "break-all",
                  }}
                >
                  {item.value}
                </p>
                <p style={{ fontSize: 11, color: "#BBB" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { step: "01", title: "ヒアリング", desc: "現在の課題・ご要望をお聞きします" },
            { step: "02", title: "ご提案・お見積り", desc: "要件を整理し、内容・料金・スケジュールをご提示します" },
            { step: "03", title: "設計・開発", desc: "合意いただいた内容をもとに構築を進めます" },
            { step: "04", title: "テスト・フィードバック", desc: "動作確認いただき、修正・調整を行います" },
            { step: "05", title: "納品・サポート", desc: "納品後も動作に問題がないかフォローいたします" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08 + 0.1}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #7EBAB5 0%, #5B8C7E 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  {i < 4 && (
                    <div
                      style={{
                        width: 2,
                        height: 40,
                        background: "linear-gradient(to bottom, #7EBAB5, #E8E8E0)",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <h4
                    style={{
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#2D2D2D",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div
            style={{
              marginTop: 36,
              padding: "20px 28px",
              background: "rgba(126, 186, 181, 0.08)",
              borderRadius: 14,
              fontSize: 14,
              color: "#5B8C7E",
              fontWeight: 500,
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            初回のご相談は無料です。
            <br />
            「こんなことできる？」というざっくりしたご相談でも大丈夫です。
          </div>
        </FadeIn>
      </section>

      {/* Timeline */}
      <section
        id="timeline"
        ref={(el) => (sectionRefs.current.timeline = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            CAREER
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            経歴
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            {
              year: "2013.3",
              title: "大学卒業（理学部）",
              color: "#9BB5D6",
            },
            {
              year: "2013.4 — 2024.3",
              title: "中学校 理科教員",
              sub: "約11年間",
              color: "#D4A574",
            },
            {
              year: "2024.4 — 現在",
              title: "インフラエンジニア",
              color: "#5B8C7E",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                    boxShadow: `0 0 0 4px ${item.color}25`,
                  }}
                />
                <div
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "18px 24px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: item.color,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {item.year}
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#2D2D2D",
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    {item.title}
                  </p>
                  {item.sub && (
                    <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        ref={(el) => (sectionRefs.current.vision = el)}
        style={{
          padding: isMobile ? "60px 16px" : "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: 12,
              color: "#5B8C7E",
              fontWeight: 600,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            VISION
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            今後のビジョン
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: isMobile ? "28px 20px" : "40px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              lineHeight: 2,
              fontSize: isMobile ? 14 : 15,
              color: "#555",
            }}
          >
            <p style={{ marginBottom: 20 }}>
              現在はDifyを使ったAIチャットボットの構築を中心に活動していますが、今後はチャットボットに限らず、業務効率化につながるAIソリューション全般に対応の幅を広げていきたいと考えています。
            </p>
            <p style={{ marginBottom: 20 }}>
              対応業種も、不動産・歯科・教育以外に積極的に広げていきます。どの業界にも「本来やるべき仕事に集中できない」という共通の課題があると感じているからです。
            </p>
            <p style={{ marginBottom: 20 }}>
              単発の納品で終わりではなく、導入後の改善や運用も含めて、継続的にお力になれるパートナーでありたいと思っています。
            </p>
            <p
              style={{
                marginBottom: 0,
                color: "#5B8C7E",
                fontWeight: 500,
              }}
            >
              元教師として教育現場の課題を肌で知っているからこそ、いつか教育分野にもAIの力で貢献したい。それが自分の長期的な目標です。
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Closing */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        style={{
          padding: isMobile ? "60px 16px 40px" : "100px 24px 60px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <div
            style={{
              background:
                "linear-gradient(135deg, #5B8C7E 0%, #7EBAB5 50%, #9BB5D6 100%)",
              borderRadius: 24,
              padding: isMobile ? "40px 20px" : "56px 40px",
              color: "white",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              さいごに
            </h2>

            <div
              style={{
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 2.1,
                fontSize: 14,
                opacity: 0.95,
              }}
            >
              <p style={{ marginBottom: 16 }}>
                最後までお読みいただきありがとうございます。
              </p>
              <p style={{ marginBottom: 16 }}>
                教員時代に感じた「本当にやりたいことに時間が使えない」というもどかしさが、今の自分の原動力になっています。AIの力で、一人でも多くの方が本業に集中できる環境をつくりたい。その想いで日々取り組んでいます。
              </p>
              <p style={{ marginBottom: 16 }}>
                まだまだ駆け出しですが、その分一つひとつの案件に全力で向き合います。「この人に頼んでよかった」と思っていただけるよう、丁寧に、誠実に対応することをお約束します。
              </p>
              <p
                style={{
                  marginBottom: 28,
                  opacity: 0.85,
                  fontSize: 13,
                }}
              >
                休日はアコースティックギターを弾いたり、ハイキングやサウナでリフレッシュしています。Mr.Childrenをこよなく愛しています。
              </p>
            </div>

            {/* Contact Info */}
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: isMobile ? "20px 16px" : "24px 32px",
                maxWidth: 400,
                margin: "0 auto 20px",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  opacity: 0.7,
                  marginBottom: 8,
                  letterSpacing: 2,
                }}
              >
                CONTACT
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                konishi.ai.dev@gmail.com
              </p>
              <p
                style={{
                  fontSize: 12,
                  marginTop: 12,
                  opacity: 0.7,
                }}
              >
                対応時間：平日 19時以降 ／ 土日 ｜ 返信：24時間以内
              </p>
            </div>

            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Zen Maru Gothic', sans-serif",
                marginTop: 24,
              }}
            >
              「こんなこと相談していいのかな？」くらいの内容でも大歓迎です。
              <br />
              お気軽にご連絡ください。
            </p>
          </div>
        </FadeIn>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "40px 0 20px",
            fontSize: 12,
            color: "#BBB",
          }}
        >
          © 2025 小西啓介 — AI Agent Developer
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
