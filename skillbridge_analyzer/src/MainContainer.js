import React, { useState } from "react";

/**
 * Colors and Theme
 * primary: #4F8A8B
 * secondary: #FBD46D
 * accent: #F76B8A
 * light: #FFFFFF
 */

/**
 * PUBLIC_INTERFACE
 * MainContainer: The main SkillBridge Analyzer container component.
 */
function MainContainer() {
  // Wizard steps: 0-Skill, 1-Job Role, 2-Gap, 3-Resources, 4-Progress
  const [step, setStep] = useState(0);

  // Dummy Data & State
  const [skills, setSkills] = useState([
    { name: "JavaScript", level: 3 },
    { name: "React", level: 2 },
    { name: "CSS", level: 4 }
  ]);
  const [editingSkill, setEditingSkill] = useState("");
  const [editingLevel, setEditingLevel] = useState(1);
  const [jobQuery, setJobQuery] = useState("");
  const [jobRole, setJobRole] = useState("");
  const jobRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Data Scientist",
    "DevOps Engineer"
  ];

  // Simulated required skills profiles
  const requiredSkills = {
    "Frontend Developer": [
      { name: "HTML", level: 4 },
      { name: "CSS", level: 4 },
      { name: "JavaScript", level: 4 },
      { name: "React", level: 4 },
      { name: "Testing", level: 3 }
    ],
    "Backend Developer": [
      { name: "Python", level: 4 },
      { name: "Databases", level: 3 },
      { name: "APIs", level: 4 },
      { name: "Docker", level: 3 }
    ],
    "Full Stack Engineer": [
      { name: "HTML", level: 3 },
      { name: "CSS", level: 3 },
      { name: "JavaScript", level: 4 },
      { name: "React", level: 3 },
      { name: "Node.js", level: 3 },
      { name: "Databases", level: 3 }
    ],
    "Data Scientist": [
      { name: "Python", level: 4 },
      { name: "Statistics", level: 3 },
      { name: "Machine Learning", level: 3 },
      { name: "SQL", level: 3 }
    ],
    "DevOps Engineer": [
      { name: "Linux", level: 4 },
      { name: "CI/CD", level: 3 },
      { name: "AWS", level: 3 },
      { name: "Docker", level: 4 }
    ]
  };

  // Compute gap analysis (map skill to {current, required, gap})
  function getGapResults() {
    if (!jobRole) return [];
    const reqs = requiredSkills[jobRole] || [];
    return reqs.map(req => {
      const current = skills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
      const currentLvl = current ? current.level : 0;
      return {
        ...req,
        current: currentLvl,
        gap: req.level - currentLvl
      };
    });
  }

  // Dummy recommended resources
  function getResourceSuggestionsForGap(skillName) {
    const resources = {
      "JavaScript": [
        { title: "JavaScript.info", type: "Article", link: "https://javascript.info/" },
        { title: "ES6 for Everyone", type: "Course", link: "https://es6.io/" }
      ],
      "React": [
        { title: "React Official Docs", type: "Article", link: "https://reactjs.org/" },
        { title: "Scrimba React Course", type: "Course", link: "https://scrimba.com/learn/learnreact" }
      ],
      "CSS": [
        { title: "CSS Tricks", type: "Article", link: "https://css-tricks.com/" },
        { title: "Flexbox Froggy", type: "Game", link: "https://flexboxfroggy.com/" }
      ]
      // Add more mock mappings if desired
    };
    return resources[skillName] || [
      { title: `Learn ${skillName} Basics`, type: "Course", link: "#" },
      { title: `${skillName} Crash Course`, type: "Video", link: "#" }
    ];
  }

  // Progress simulation
  const completedCount = getGapResults().filter(r => r.gap <= 0).length;
  const totalCount = getGapResults().length > 0 ? getGapResults().length : 1;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  // ----- UI Pieces -----
  function renderHeader() {
    return (
      <header style={{
        background: "#fff",
        borderBottom: "5px solid #FBD46D",
        padding: "0 0 0 0",
        position: "sticky",
        top: 0,
        zIndex: 5,
        boxShadow: "0 4px 16px 0 rgba(79,138,139,0.04)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          height: 70,
          maxWidth: 1040,
          margin: "0 auto",
          padding: "0 32px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            fontWeight: 700,
            fontSize: "2rem",
            color: "#4F8A8B",
            letterSpacing: "1px"
          }}>
            <span style={{
              marginRight: 10,
              color: "#F76B8A",
              fontSize: "2.1rem"
            }}>★</span>
            SkillBridge <span style={{ color: "#F76B8A", marginLeft: 8 }}>Analyzer</span>
          </div>
          <span style={{
            fontWeight: 500,
            background: "#FBD46D",
            color: "#113D3C",
            borderRadius: 20,
            fontSize: 17,
            padding: "5px 18px"
          }}>
            Demo
          </span>
        </div>
      </header>
    );
  }

  function renderWizard() {
    const steps = [
      { name: "Skills", color: "#4F8A8B" },
      { name: "Job Role", color: "#FBD46D" },
      { name: "Gap Analysis", color: "#F76B8A" },
      { name: "Resources", color: "#4F8A8B" },
      { name: "Progress", color: "#FBD46D" }
    ];
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "32px 0 36px 0",
        gap: 0
      }}>
        {steps.map((s, idx) => (
          <div key={s.name} style={{
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{
              minWidth: 98,
              padding: "10px 0",
              background: idx === step ? s.color : "#EAEAEA",
              color: idx === step ? (idx % 2 ? "#113D3C" : "#FFF") : "#888",
              fontWeight: 600,
              fontSize: 16,
              borderRadius: "18px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: idx === step ? "0 2px 12px 0 rgba(79,138,139,0.06)" : undefined,
              transition: "background 0.2s"
            }}
              onClick={() => setStep(idx)}
            >
              {s.name}
            </div>
            {idx !== steps.length - 1 && (
              <span style={{
                width: 30,
                height: 3,
                background: idx < step ? "#4F8A8B" : "#F0F0F0",
                margin: "0 5px",
                borderRadius: 2,
                display: "inline-block"
              }} />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Step 1: Skill Assessment
  function renderSkillAssessment() {
    function handleAddSkill(e) {
      e.preventDefault();
      if (!editingSkill.trim()) return;
      setSkills(s => [...s, { name: editingSkill, level: editingLevel }]);
      setEditingSkill("");
      setEditingLevel(1);
    }
    function handleSkillLevelChange(idx, newLevel) {
      setSkills(s =>
        s.map((sk, i) =>
          i === idx ? { ...sk, level: newLevel } : sk
        )
      );
    }
    function handleRemoveSkill(idx) {
      setSkills(s => s.filter((_, i) => i !== idx));
    }
    return (
      <div>
        <h2 style={styles.heading}>1. Assess Your Skills</h2>
        <p style={styles.stepDesc}>Add your current skills and rate your proficiency (1 = Beginner, 5 = Expert).</p>
        <div style={styles.cardFlex}>
          <form style={styles.card} onSubmit={handleAddSkill}>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <input
                type="text"
                value={editingSkill}
                required
                placeholder="Skill (e.g. JavaScript)"
                style={styles.input}
                onChange={e => setEditingSkill(e.target.value)}
              />
              <select
                value={editingLevel}
                style={{ ...styles.input, width: 90 }}
                onChange={e => setEditingLevel(Number(e.target.value))}
              >
                {[1,2,3,4,5].map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <button type="submit" style={styles.accentBtn}>Add</button>
            </div>
          </form>
        </div>
        <div style={styles.cardFlex}>
          {skills.map((skill, idx) => (
            <div key={skill.name + idx} style={styles.skillCard}>
              <span style={{ fontWeight: 600 }}>{skill.name}</span>
              <SkillLevelBar level={skill.level} />
              <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                <label style={{ fontSize: 14 }}>Level:</label>
                <select
                  value={skill.level}
                  style={styles.skillLevelSelect}
                  onChange={e => handleSkillLevelChange(idx, Number(e.target.value))}
                >
                  {[1,2,3,4,5].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <button
                  type="button"
                  style={styles.delBtn}
                  aria-label="Remove Skill"
                  onClick={() => handleRemoveSkill(idx)}
                >✕</button>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.stepNav}>
          <button
            style={styles.wizBtnDisabled}
            disabled
          >Back</button>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(1)}
          >Next: Job Role →</button>
        </div>
      </div>
    );
  }

  // Step 2: Job Role Selection
  function renderJobRoleSelection() {
    const filteredRoles = jobRole
      ? [jobRole]
      : (jobQuery.trim()
          ? jobRoles.filter(j => j.toLowerCase().includes(jobQuery.toLowerCase()))
          : jobRoles
      );
    return (
      <div>
        <h2 style={styles.heading}>2. Select a Job Role</h2>
        <p style={styles.stepDesc}>Choose a career or job role to compare your skills.</p>
        <div style={styles.cardFlex}>
          <div style={styles.card}>
            <input
              type="text"
              style={styles.input}
              placeholder="Search for a job role..."
              value={jobQuery}
              onChange={e => {
                setJobQuery(e.target.value);
                setJobRole("");
              }}
              autoFocus
            />
            <div style={{ marginTop: 14 }}>
              {filteredRoles.length > 0 ? (
                filteredRoles.map(r => (
                  <button
                    key={r}
                    style={{
                      ...styles.roleBtn,
                      background: jobRole === r ? "#4F8A8B" : "#FBD46D",
                      color: jobRole === r ? "#fff" : "#113D3C"
                    }}
                    onClick={() => setJobRole(r)}
                    type="button"
                  >
                    {r}
                  </button>
                ))
              ) : (
                <span style={{ color: "#888", fontStyle: "italic" }}>No roles found.</span>
              )}
            </div>
          </div>
        </div>
        <div style={styles.stepNav}>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(0)}
          >← Back</button>
          <button
            style={jobRole ? styles.wizBtn : styles.wizBtnDisabled}
            onClick={() => jobRole && setStep(2)}
            disabled={!jobRole}
          >Next: Analyze your Gap →</button>
        </div>
      </div>
    );
  }

  // Step 3: Gap Analysis Report
  function renderGapAnalysis() {
    const gaps = getGapResults();
    function getBarPercent(req, curr) {
      return Math.min(100, Math.round((curr / req) * 100));
    }
    return (
      <div>
        <h2 style={styles.heading}>3. Gap Analysis Report</h2>
        <p style={styles.stepDesc}>
          Here's how your skills match the requirements for <span style={{ color: "#F76B8A", fontWeight: 600 }}>{jobRole}</span>.
        </p>
        <div style={styles.cardFlex}>
          <div style={styles.reportCard}>
            <div>
              <div style={{ marginBottom: 18 }}>
                {gaps.map(gap => (
                  <div key={gap.name} style={{ marginBottom: 20 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>
                      {gap.name}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", margin: "6px 0" }}>
                      <div style={{
                        flex: 1,
                        background: "#EAEAEA",
                        borderRadius: 7,
                        height: 22,
                        position: "relative",
                        marginRight: 14
                      }}>
                        <div style={{
                          background: gap.gap <= 0 ? "#4F8A8B" : "#F76B8A",
                          width: getBarPercent(gap.level, gap.current) + "%",
                          height: "100%",
                          borderRadius: 7,
                          transition: "width 0.4s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}>
                          <span style={{
                            color: "#FFF",
                            padding: "0 10px",
                            fontWeight: 500,
                            fontSize: 13
                          }}>
                            {gap.current}/{gap.level}
                          </span>
                        </div>
                      </div>
                      {gap.gap > 0 ? (
                        <span style={{ color: "#F76B8A", fontWeight: 600, fontSize: 15 }}>
                          -{gap.gap}
                        </span>
                      ) : (
                        <span style={{ color: "#4F8A8B", fontWeight: 600, fontSize: 15 }}>
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ margin: "20px 0 0 0"}}>
                <span style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: (gaps.every(g => g.gap <= 0) ? "#4F8A8B" : "#F76B8A")
                }}>
                  Gap Summary:&nbsp;
                  {gaps.every(g => g.gap <= 0) ? (
                    "You meet or exceed all required skills!"
                  ) : (
                    `${gaps.filter(g => g.gap > 0).length} skill${gaps.filter(g => g.gap > 0).length > 1 ? "s" : ""} below required level`
                  )}
                </span>
              </div>
            </div>
          </div>
          <div style={styles.card}>
            <PieChart
              skillResults={gaps}
              primary="#4F8A8B"
              accent="#F76B8A"
              secondary="#FBD46D"
            />
          </div>
        </div>
        <div style={styles.stepNav}>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(1)}
          >← Back</button>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(3)}
          >Next: Learning Resources →</button>
        </div>
      </div>
    );
  }

  // Step 4: Learning Resource Suggestions
  function renderLearningResources() {
    const gaps = getGapResults().filter(s => s.gap > 0);
    return (
      <div>
        <h2 style={styles.heading}>4. Suggested Learning Resources</h2>
        <p style={styles.stepDesc}>
          Personalized recommendations to help you bridge the skill gap for <span style={{ color: "#F76B8A", fontWeight: 500 }}>{jobRole}</span>.
        </p>
        <div style={styles.cardFlex}>
          {gaps.length === 0 && (
            <div style={styles.card}>
              <p style={{ fontWeight: 600, fontSize: 20, color: "#4F8A8B" }}>
                🎉 Congratulations! No skill gaps identified.
              </p>
            </div>
          )}
          {gaps.map(gap => (
            <div style={styles.resourceCard} key={gap.name}>
              <span style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#4F8A8B",
                letterSpacing: "0.5px"
              }}>{gap.name}</span>
              <div style={{
                margin: "10px 0 6px 0",
                fontSize: 14,
                color: "#676767"
              }}>
                Required Level: <b>{gap.level}</b>, Your Level: <b style={{color:"#F76B8A"}}>{gap.current}</b>
              </div>
              <ul style={{ paddingLeft: 20 }}>
                {getResourceSuggestionsForGap(gap.name).map(res => (
                  <li key={res.title}>
                    <a href={res.link} target="_blank" rel="noopener noreferrer" style={{
                      fontWeight: 500,
                      color: "#F76B8A"
                    }}>
                      {res.title}
                    </a>
                    <span style={{
                      background: "#FBD46D",
                      color: "#113D3C",
                      borderRadius: "11px",
                      marginLeft: "8px",
                      padding: "1px 10px",
                      fontSize: 14
                    }}>
                      {res.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={styles.stepNav}>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(2)}
          >← Back</button>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(4)}
          >Next: Track Progress →</button>
        </div>
      </div>
    );
  }

  // Step 5: Progress Tracking
  function renderProgressTracking() {
    const gaps = getGapResults();
    return (
      <div>
        <h2 style={styles.heading}>5. Progress Tracking</h2>
        <p style={styles.stepDesc}>Your Skill Progress Overview</p>
        <div style={styles.cardFlex}>
          <div style={styles.progressCard}>
            <span style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#F76B8A"
            }}>
              Progress for {jobRole}
            </span>
            <div style={{ margin: "20px 0 30px" }}>
              <CircularProgressBar percent={overallProgress} label={`${overallProgress}%`} />
            </div>
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {gaps.map(gap => (
                <li key={gap.name} style={{
                  margin: "13px 0",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <span style={{
                    width: 110,
                    display: "inline-block",
                    fontWeight: 500,
                    color: "#4F8A8B"
                  }}>
                    {gap.name}
                  </span>
                  <div style={{
                    flex: 1,
                    height: 13,
                    borderRadius: 8,
                    position: "relative",
                    background: "#EAEAEA",
                  }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        borderRadius: 8,
                        background: (gap.gap <= 0 ? "#FBD46D" : "#F76B8A"),
                        width: Math.min(100, Math.round((gap.current / gap.level) * 100)) + "%",
                        transition: "width 0.25s"
                      }}
                    />
                  </div>
                  <span style={{
                    width: 40,
                    display: "inline-block",
                    textAlign: "right",
                    fontWeight: 600,
                    color: gap.gap <= 0 ? "#FBD46D" : "#F76B8A",
                    fontSize: 13
                  }}>
                    {gap.current}/{gap.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={styles.stepNav}>
          <button
            style={styles.wizBtn}
            onClick={() => setStep(3)}
          >← Back</button>
          <button
            style={styles.primaryBtn}
            onClick={() => setStep(0)}
          >Restart</button>
        </div>
      </div>
    );
  }

  // ===== RENDER ===== //
  return (
    <div style={{ background: "#fcfcfc", minHeight: "100vh" }}>
      {renderHeader()}
      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "35px 8px 80px" }}>
        <div style={{
          margin: "35px 0",
          textAlign: "center"
        }}>
          <h1 style={{
            fontWeight: 800,
            color: "#4F8A8B",
            letterSpacing: "1.5px",
            fontSize: "2.1em",
            marginBottom: 10
          }}>SkillBridge Analyzer</h1>
          <div style={{
            color: "#113D3C",
            fontWeight: 500,
            fontSize: 17,
            marginBottom: 10
          }}>
            Uncover your skill gaps, bridge them, and land your ideal job!
          </div>
          <div style={{
            color: "#F76B8A",
            fontWeight: 500,
            fontSize: 14,
            marginBottom: 6
          }}>
            Start with your core skills, then follow each step to get personalized recommendations.
          </div>
        </div>
        {renderWizard()}
        <section>
          {step === 0 && renderSkillAssessment()}
          {step === 1 && renderJobRoleSelection()}
          {step === 2 && renderGapAnalysis()}
          {step === 3 && renderLearningResources()}
          {step === 4 && renderProgressTracking()}
        </section>
      </main>
    </div>
  );
}

// --- Skill Level Bar Component ---
function SkillLevelBar({ level }) {
  const color = level >= 4 ? "#4F8A8B" : (level === 3 ? "#FBD46D" : "#F76B8A");
  return (
    <div style={{
      width: "100%",
      height: 10,
      background: "#EAEAEA",
      borderRadius: 7,
      marginTop: 8
    }}>
      <div style={{
        width: `${level * 20}%`,
        height: "100%",
        borderRadius: 7,
        background: color,
        transition: "width 0.3s"
      }}/>
    </div>
  );
}

// --- Simple Pie Chart Component ---
/**
 * PieChart: Draws a "filled" donut chart for skills coverage (using SVG).
 * @param {Array} skillResults: Array of {name, level, current, gap}
 */
function PieChart({ skillResults, primary, accent, secondary }) {
  const total = skillResults.length;
  const covered = skillResults.filter(s => s.gap <= 0).length;
  const percent = total > 0 ? covered / total : 1;
  // Pie chart: covered = primary/secondary, uncovered = accent
  const radius = 46, stroke = 17, c = 2 * Math.PI * radius;
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <svg width={120} height={120}>
        <circle
          cx="60" cy="60" r={radius}
          stroke="#EAEAEA" strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="60" cy="60" r={radius}
          stroke={percent === 1 ? secondary : primary}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c * percent} ${c*(1-percent)}`}
          strokeDashoffset={0}
          style={{transition: "stroke-dasharray 0.4s"}}
        />
        {percent < 1 && (
          <circle
            cx="60" cy="60" r={radius}
            stroke={accent}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${c * (1 - percent)} ${c * percent}`}
            strokeDashoffset={c * percent * -1}
            style={{transition: "stroke-dasharray 0.4s"}}
          />
        )}
        <text x="50%" y="54%" textAnchor="middle" fontSize="25" fill="#4F8A8B" fontWeight="700" dy=".3em">
          {Math.round(percent * 100)}%
        </text>
      </svg>
      <div style={{
        marginTop: 12,
        fontWeight: 500,
        color: "#4F8A8B"
      }}>
        Skills Matched
      </div>
    </div>
  );
}

// --- Circular Progress Bar for Progress Page ---
function CircularProgressBar({ percent, label }) {
  const radius = 49, stroke = 12, c = 2 * Math.PI * radius;
  return (
    <svg width={120} height={120} style={{display:"block", margin:"0 auto"}}>
      <circle
        cx="60" cy="60" r={radius}
        stroke="#EAEAEA" strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="60" cy="60" r={radius}
        stroke="#FBD46D"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${c * (percent/100)} ${c*(1-(percent/100))}`}
        strokeDashoffset={0}
        style={{transition: "stroke-dasharray 0.4s"}}
      />
      <text x="50%" y="53%" textAnchor="middle" fontSize="27" fill="#4F8A8B" fontWeight="700" dy=".3em">
        {label}
      </text>
    </svg>
  );
}

// --- Styling ---
const styles = {
  heading: {
    fontWeight: 800,
    color: "#4F8A8B",
    fontSize: "1.50em",
    marginBottom: 2,
    marginTop: 3
  },
  stepDesc: {
    color: "#444",
    fontSize: 16,
    marginBottom: 17,
    marginTop: 6
  },
  cardFlex: {
    display: "flex",
    gap: "28px",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 26,
    minHeight: 55
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 3px 16px 0 rgba(79,138,139,0.08)",
    padding: "28px 34px 26px 34px",
    minWidth: 280,
    flex: "1 0 278px",
    maxWidth: 385
  },
  skillCard: {
    background: "#fff",
    borderRadius: 11,
    boxShadow: "0 1.5px 10px 0 rgba(79,138,139,0.05)",
    padding: "17px 25px",
    minWidth: 175,
    flex: "1 0 170px",
    maxWidth: 220,
    marginBottom: 10
  },
  resourceCard: {
    background: "#fff",
    borderRadius: 15,
    boxShadow: "0 0px 12px 0 rgba(79,138,139,0.08)",
    padding: "20px 32px 18px 25px",
    minWidth: 235,
    maxWidth: 314,
    flex: "1 0 215px",
    marginBottom: 17
  },
  reportCard: {
    background: "#fff",
    borderRadius: 17,
    boxShadow: "0 3px 14px 0 rgba(249,180,157,0.09)",
    padding: "28px 36px",
    minWidth: 330,
    flex: "2 0 320px",
    maxWidth: 470,
    marginBottom: 2
  },
  progressCard: {
    background: "#fff",
    borderRadius: 17,
    boxShadow: "0 3px 14px 0 rgba(249,180,157,0.10)",
    padding: "31px 40px 34px 40px",
    minWidth: 312,
    maxWidth: 410,
    flex: "1 0 312px",
    marginBottom: 7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    border: "1.6px solid #E0E0E0",
    background: "#fafbfb",
    borderRadius: 5,
    fontSize: 15,
    padding: "7px 11px",
    outline: "none",
    minWidth: 100,
    width: 176,
    color: "#3a474d",
    marginRight: 9
  },
  accentBtn: {
    background: "#F76B8A",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "7px 22px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.14s"
  },
  primaryBtn: {
    background: "#4F8A8B",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "7px 22px",
    fontWeight: 600,
    fontSize: 15,
    marginLeft: 14,
    cursor: "pointer"
  },
  roleBtn: {
    border: "none",
    borderRadius: 18,
    padding: "8px 28px",
    fontWeight: 600,
    fontSize: 17,
    marginBottom: 9,
    marginRight: 8,
    marginTop: 2,
    cursor: "pointer",
    boxShadow: "0 1px 5px #efefef",
    transition: "background 0.14s"
  },
  skillLevelSelect: {
    border: "1px solid #E0E0E0",
    borderRadius: 3,
    fontSize: 14,
    padding: "2px 8px",
    color: "#263d43",
    background: "#f6f6f6"
  },
  delBtn: {
    border: "none",
    background: "#F76B8A",
    color: "#fff",
    borderRadius: "50%",
    width: 22,
    height: 22,
    fontWeight: 700,
    cursor: "pointer",
    marginLeft: 5
  },
  wizBtn: {
    background: "#4F8A8B",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: 16,
    marginRight: 17,
    cursor: "pointer"
  },
  wizBtnDisabled: {
    background: "#EDEDED",
    color: "#B0B0B0",
    border: "none",
    borderRadius: 7,
    padding: "10px 28px",
    fontWeight: 600,
    fontSize: 16,
    marginRight: 17,
    cursor: "not-allowed"
  },
  stepNav: {
    marginTop: 8,
    display: "flex",
    justifyContent: "flex-end",
    gap: 8
  }
};

export default MainContainer;
