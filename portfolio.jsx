import { useState, useEffect, useRef } from "react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Top" },
    { id: "about", label: "自己紹介" },
    { id: "works", label: "作品" },
    { id: "services", label: "対応業務" },
    { id: "tools", label: "使用ツール" },
    { id: "flow", label: "ご依頼" },
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
      challenge:
        "審美医療は自費診療のため単価が高く、患者は複数の医院を比較検討してから来院を判断します。しかし現場では、診療・受付の忙しさにより審美医療の説明に十分な時間が取れず、さらに営業時間外・休診日の問い合わせにも対応できないことで、月間10〜20件の相談機会を逃失しています。",
      loss: "推定損失：月31.5万円／年間約380万円",
      features: [
        "24時間365日の審美医療相談対応",
        "4ステップの構造化ヒアリングによるパーソナライズ回答",
        "5つの用件別自動ルーティング",
        "医療安全設計（診断行為を行わず、危険サイン検出時は電話案内）",
        "「売り込まない」設計思想",
      ],
      tech: [
        "Dify Chatflow",
        "GPT-4o-mini × 2ノード",
        "RAG × 2ナレッジベース",
        "環境変数による医院別カスタマイズ",
        "IF/ELSE × 11の条件分岐",
        "会話変数 × 10の状態管理",
      ],
      effects: [
        { label: "営業時間外の取りこぼし回収", value: "年間約380万円" },
        { label: "スタッフの説明時間", value: "70%削減" },
        { label: "人材採用比コスト削減", value: "年間180〜350万円" },
      ],
    },
    {
      id: "realestate",
      num: "02",
      title: "不動産チャットボット\n夜間反響・内見機会損失防止",
      tag: "不動産",
      color: "#D4A574",
      summary: "営業時間外の反響を自動対応し、内見予約まで完結",
      challenge:
        "不動産業界では、ポータルサイト経由の反響の約40%が営業時間外に発生します。しかし多くの仲介会社では翌営業日まで対応できず、その間にユーザーは競合他社へ流れてしまいます。",
      loss: "推定損失：月30〜50万円相当の機会損失",
      features: [
        "物件検索の即時回答（24時間365日）",
        "FAQ自動応答（20件以上の定型質問）",
        "内見予約の自動受付 → Google Sheets記録 ＋ メール通知",
        "一括入力・段階入力の両対応",
      ],
      tech: [
        "Dify Advanced Chat",
        "GPT-4o / GPT-4o-mini",
        "LLMによる3分岐ルーティング",
        "ハイブリッド検索（セマンティック70% + キーワード30%）",
        "Google Apps Script連携",
        "JavaScript Widget埋め込み",
      ],
      effects: [
        { label: "夜間・休日の反響ロス削減", value: "月20〜30件" },
        { label: "定型質問の対応時間", value: "約70%削減" },
        { label: "テスト合格率", value: "92.3%" },
      ],
    },
    {
      id: "school",
      num: "03",
      title: "学習塾の退塾防止＆\n成績向上支援チャットボット",
      tag: "学習塾",
      color: "#9BB5D6",
      summary: "週1回のチェックインで退塾リスクを早期発見",
      challenge:
        "退塾理由の約8割は「モチベーション低下」「成績が上がらない」「講師との相性」「宿題負担」の4パターンに分類されるが、現状では退塾を申し出られて初めて問題に気づくケースが大半。",
      loss: "推定損失：年間500万円（退塾による機会損失324万円＋新規獲得コストの未回収180万円）",
      features: [
        "週1回のチェックイン（5項目×3段階、所要時間2〜3分）",
        "退塾リスクの自動判定（賞賛パス/深掘りパス）",
        "時期別バージョン切替（通常・試験前・試験後・夏休み・受験期）",
        "Googleスプレッドシート自動記録",
        "月次保護者レポート支援",
      ],
      tech: [
        "Dify Chatflow（5段階ワークフロー）",
        "GPT-4o-mini",
        "IF/ELSE条件分岐",
        "7変数の構造化データ収集",
        "Google Apps Script連携",
      ],
      effects: [
        { label: "3ヶ月継続率", value: "70%→85%に改善" },
        { label: "平均継続期間", value: "6ヶ月→9ヶ月（LTV 50%向上）" },
        { label: "年間売上増加", value: "推定1,080万円" },
      ],
    },
  ];

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
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        }}
      >
        {children}
      </div>
    );
  };

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
              fontSize: 18,
              color: "#5B8C7E",
              cursor: "pointer",
            }}
            onClick={() => scrollTo("hero")}
          >
            Keisuke
          </span>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              gap: 6,
            }}
          >
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
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
        </div>
      </nav>

      {/* Hero */}
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

        <div style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
          {/* Avatar placeholder */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7EBAB5 0%, #5B8C7E 100%)",
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "white",
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontWeight: 700,
              boxShadow: "0 8px 32px rgba(91, 140, 126, 0.25)",
            }}
          >
            K
          </div>

          <p
            style={{
              fontSize: 13,
              letterSpacing: 4,
              color: "#5B8C7E",
              fontWeight: 500,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            AI Agent Developer
          </p>

          <h1
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 700,
              lineHeight: 1.7,
              color: "#2D2D2D",
              marginBottom: 20,
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
              fontSize: 14,
              color: "#999",
              fontWeight: 400,
            }}
          >
            Keisuke ｜ AIエージェント開発 × 業務効率化
          </p>

          <div
            style={{
              marginTop: 48,
              cursor: "pointer",
              animation: "bounce 2s infinite",
            }}
            onClick={() => scrollTo("about")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BBB"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
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

      {/* About */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current.about = el)}
        style={{
          padding: "100px 24px",
          maxWidth: 800,
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
            ABOUT
          </p>
          <h2
            style={{
              fontFamily: "'Zen Maru Gothic', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            自己紹介
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "40px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              lineHeight: 2,
              fontSize: 15,
            }}
          >
            <p style={{ marginBottom: 20 }}>
              プロフィールをご覧いただきありがとうございます。Keisukeです。
            </p>
            <p style={{ marginBottom: 20 }}>
              元中学校の理科教員で、現在はインフラエンジニアとして働きながら、AIチャットボットの開発を行っています。
            </p>
            <p style={{ marginBottom: 20 }}>
              教員時代、子どもと向き合う時間よりも、授業準備・テスト採点・保護者対応といった業務に時間を取られる日々を過ごしていました。「本当にやりたいことに時間が使えない」——その違和感が、今の仕事の原点です。
            </p>
            <p style={{ marginBottom: 20 }}>
              インフラエンジニアとしてテクノロジーの現場に身を置く中で、AIの進化を目の当たりにし、確信しました。「この技術があれば、あの頃の自分のように"時間を奪われている人"を助けられる」と。
            </p>
            <p style={{ marginBottom: 0 }}>
              今は、不動産・歯科医院・学習塾など、業種ごとの現場課題に合わせたAIチャットボットを開発しています。目指しているのは、皆さんが本当にやるべき仕事に集中できる環境をつくることです。
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Works */}
      <section
        id="works"
        ref={(el) => (sectionRefs.current.works = el)}
        style={{
          padding: "100px 24px",
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
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 48,
              color: "#2D2D2D",
            }}
          >
            作品・実績紹介
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {works.map((work, i) => (
            <FadeIn key={work.id} delay={i * 0.1}>
              <div
                onClick={() =>
                  setActiveWork(activeWork === work.id ? null : work.id)
                }
                style={{
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: activeWork === work.id ? `2px solid ${work.color}` : "2px solid transparent",
                }}
              >
                {/* Card Header */}
                <div style={{ padding: "32px 36px" }}>
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
                        fontSize: 36,
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
                          fontSize: 19,
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

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 16,
                      fontSize: 12,
                      color: work.color,
                      fontWeight: 500,
                    }}
                  >
                    {activeWork === work.id ? "閉じる" : "詳しく見る"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={work.color}
                      strokeWidth="2"
                      style={{
                        transform: activeWork === work.id ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Detail */}
                <div
                  style={{
                    maxHeight: activeWork === work.id ? 2000 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 36px 36px",
                      borderTop: `1px solid ${work.color}20`,
                    }}
                  >
                    {/* Challenge */}
                    <div style={{ marginTop: 28 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: work.color,
                          marginBottom: 10,
                          letterSpacing: 1,
                        }}
                      >
                        解決する課題
                      </h4>
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.9,
                          color: "#555",
                        }}
                      >
                        {work.challenge}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: work.color,
                          fontWeight: 600,
                          marginTop: 8,
                          background: `${work.color}10`,
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: 8,
                        }}
                      >
                        {work.loss}
                      </p>
                    </div>

                    {/* Features */}
                    <div style={{ marginTop: 28 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: work.color,
                          marginBottom: 12,
                          letterSpacing: 1,
                        }}
                      >
                        主な機能
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {work.features.map((f, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: 13,
                              background: "#F5F5F0",
                              padding: "8px 14px",
                              borderRadius: 10,
                              color: "#555",
                              lineHeight: 1.5,
                            }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech */}
                    <div style={{ marginTop: 28 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: work.color,
                          marginBottom: 12,
                          letterSpacing: 1,
                        }}
                      >
                        使用技術
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {work.tech.map((t, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: 12,
                              background: `${work.color}12`,
                              color: work.color,
                              padding: "6px 12px",
                              borderRadius: 8,
                              fontWeight: 500,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Effects */}
                    <div style={{ marginTop: 28 }}>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: work.color,
                          marginBottom: 12,
                          letterSpacing: 1,
                        }}
                      >
                        想定される効果
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: 12,
                        }}
                      >
                        {work.effects.map((e, j) => (
                          <div
                            key={j}
                            style={{
                              background: `${work.color}08`,
                              borderRadius: 12,
                              padding: "16px 18px",
                              borderLeft: `3px solid ${work.color}`,
                            }}
                          >
                            <p
                              style={{
                                fontSize: 11,
                                color: "#888",
                                marginBottom: 4,
                              }}
                            >
                              {e.label}
                            </p>
                            <p
                              style={{
                                fontSize: 16,
                                fontWeight: 700,
                                color: work.color,
                                fontFamily: "'Zen Maru Gothic', sans-serif",
                              }}
                            >
                              {e.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
          padding: "100px 24px",
          maxWidth: 800,
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
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            対応可能な業務
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "40px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
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
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#2D2D2D",
                }}
              >
                AIチャットボット構築（Dify）
              </h3>
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 2,
                color: "#555",
                marginBottom: 24,
              }}
            >
              お客様の業種・課題に合わせたAIチャットボットを構築します。ヒアリングをもとに、業務フローに合った設計・開発を行います。24時間対応の問い合わせ・予約受付・FAQ応答など、用途に応じて柔軟に対応。Google
              スプレッドシート連携やメール通知など、既存の業務ツールとの接続も可能です。納品後の動作確認・修正対応も含めて丁寧にサポートします。
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                padding: "20px 0 0",
                borderTop: "1px solid #F0F0EA",
              }}
            >
              {[
                { label: "料金", value: "ご相談ください", sub: "ご予算に応じて柔軟に対応" },
                { label: "納期目安", value: "2〜4週間", sub: "要件の規模により変動" },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#5B8C7E",
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    {item.value}
                  </p>
                  <p style={{ fontSize: 11, color: "#AAA" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Tools */}
      <section
        id="tools"
        ref={(el) => (sectionRefs.current.tools = el)}
        style={{
          padding: "100px 24px",
          maxWidth: 800,
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
              fontSize: 26,
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
                  padding: "28px 32px",
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
          padding: "100px 24px",
          maxWidth: 800,
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
              fontSize: 26,
              fontWeight: 700,
              marginBottom: 40,
              color: "#2D2D2D",
            }}
          >
            ご依頼の進め方
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { step: "01", title: "ヒアリング", desc: "現在の課題・ご要望をお聞きします" },
            { step: "02", title: "ご提案・お見積り", desc: "要件を整理し、内容・料金・スケジュールをご提示します" },
            { step: "03", title: "設計・開発", desc: "合意いただいた内容をもとに構築を進めます" },
            { step: "04", title: "テスト・フィードバック", desc: "動作確認いただき、修正・調整を行います" },
            { step: "05", title: "納品・サポート", desc: "納品後も動作に問題がないかフォローいたします" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  paddingBottom: i < 4 ? 0 : 0,
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
          padding: "100px 24px",
          maxWidth: 800,
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
              fontSize: 26,
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
          padding: "100px 24px",
          maxWidth: 800,
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
              fontSize: 26,
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
              padding: "40px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              lineHeight: 2,
              fontSize: 15,
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
          padding: "100px 24px 60px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <div
            style={{
              background:
                "linear-gradient(135deg, #5B8C7E 0%, #7EBAB5 50%, #9BB5D6 100%)",
              borderRadius: 24,
              padding: "56px 40px",
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
                padding: "24px 32px",
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
                ○○○@○○○
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
          © 2025 Keisuke — AI Agent Developer
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
