import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * MainContainer: The main SkillBridge Analyzer container component.
 * Step-by-step process:
 *   1 - Job selection
 *   2 - Required skills display
 *   3 - User enters own skills/levels
 *   4 - Analyzer compares, calculates percentage match
 *   5 - UI displays summary and visual
 */
const DEMO_JOBS = [
  {
    title: "Data Analyst",
    requiredSkills: [
      { name: "Data Cleaning", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
      { name: "Python", level: "Intermediate" },
      { name: "Excel", level: "Beginner" },
      { name: "Statistics", level: "Intermediate" },
    ]
  },
  {
    title: "UX Designer",
    requiredSkills: [
      { name: "Wireframing", level: "Intermediate" },
      { name: "User Research", level: "Beginner" },
      { name: "Prototyping", level: "Intermediate" },
      { name: "Visual Design", level: "Intermediate" },
      { name: "Communication", level: "Expert" }
    ]
  },
  {
    title: "Frontend Developer",
    requiredSkills: [
      { name: "JavaScript", level: "Intermediate" },
      { name: "React", level: "Intermediate" },
      { name: "CSS", level: "Intermediate" },
      { name: "HTML", level: "Intermediate" }
    ]
  },
  {
    title: "DevOps Engineer",
    requiredSkills: [
      { name: "Linux", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "CI/CD", level: "Intermediate" },
      { name: "Docker", level: "Intermediate" }
    ]
  }
];

 // For consistent color theme:
const THEME = {
  primary: "#4F8A8B",
  secondary: "#FBD46D",
  accent: "#F76B8A",
  light: "#fff",
  accent2: "#E87A41",        // Kavia orange
  accent3: "#B388EB",        // Extra violet
  accent4: "#1A1A1A",        // Kavia dark
  secondary2: "#FFC93C"
};
const LEVELS = ["Beginner", "Intermediate", "Expert"];
const LEVEL_TO_NUM = { Beginner: 1, Intermediate: 2, Expert: 3 };
const NUM_TO_LEVEL = { 1: "Beginner", 2: "Intermediate", 3: "Expert" };

function MainContainer() {
  // Step index: 0-select job, 1-show required, 2-user input,
  // 3-matching, 4-summary/visual
  const [step, setStep] = useState(0);

  // Step 1: job selection
  const [jobIdx, setJobIdx] = useState(null);

  // Step 2: nothing to enter
  // Step 3: user skills management
  const [userSkills, setUserSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Beginner");
  const [editingIdx, setEditingIdx] = useState(null);

  // Find selected job object
  const selectedJob = jobIdx !== null ? DEMO_JOBS[jobIdx] : null;
  const requiredSkills = selectedJob ? selectedJob.requiredSkills : [];

  // Methods for user skill management
  function handleAddSkill(e) {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    // avoid duplicates
    if (userSkills.some(s => s.name.trim().toLowerCase() === newSkillName.trim().toLowerCase())) return;
    setUserSkills([
      ...userSkills,
      { name: newSkillName.trim(), level: newSkillLevel }
    ]);
    setNewSkillName("");
    setNewSkillLevel("Beginner");
  }

  function handleDeleteSkill(idx) {
    setUserSkills(userSkills.filter((_, i) => i !== idx));
  }

  function handleEditSkill(idx) {
    setEditingIdx(idx);
    setNewSkillName(userSkills[idx].name);
    setNewSkillLevel(userSkills[idx].level);
  }
  function handleUpdateSkill(e) {
    e.preventDefault();
    setUserSkills(userSkills.map((s, i) =>
      i === editingIdx ? { name: newSkillName.trim(), level: newSkillLevel } : s
    ));
    setNewSkillName("");
    setNewSkillLevel("Beginner");
    setEditingIdx(null);
  }
  function handleCancelEdit() {
    setNewSkillName("");
    setNewSkillLevel("Beginner");
    setEditingIdx(null);
  }

  // Step 4: calculation
  function getSkillMatchResults() {
    // For each required skill, see if user has it at the expected level or higher
    if (!requiredSkills.length) return [];
    // Level-to-number for easier comparison
    return requiredSkills.map(req => {
      const user = userSkills.find(
        s => s.name.trim().toLowerCase() === req.name.trim().toLowerCase()
      );
      const userLevel = user ? LEVEL_TO_NUM[user.level] : 0;
      const reqLevel = LEVEL_TO_NUM[req.level];
      const matched = userLevel >= reqLevel;
      return {
        ...req,
        requiredLevel: req.level,
        requiredNum: reqLevel,
        userLevel: user ? user.level : "None",
        userNum: userLevel,
        matched
      };
    });
  }

  function getMatchPercent() {
    const list = getSkillMatchResults();
    if (!list.length) return 0;
    const matchedCount = list.filter(result => result.matched).length;
    return Math.round((matchedCount / list.length) * 100);
  }

  // Render step-by-step UI as required

  // Step 1: job selection
  function renderJobSelect() {
    return (
      <div style={{...styles.cardBlock, background: "linear-gradient(109deg,#21242a 70%,#252a31 120%)"}}>
        <h2 style={styles.heading}>Step 1: Choose Your Desired Job</h2>
        <p style={styles.stepDesc}>Pick a career to analyze skill fit.</p>
        <div style={styles.jobList}>
          {DEMO_JOBS.map((j, idx) => (
            <button
              key={j.title}
              onClick={() => setJobIdx(idx)}
              style={{
                ...styles.jobBtn,
                background: jobIdx === idx ? THEME.primary : "#272E33",
                color: jobIdx === idx ? "#fff" : "#abb4be"
              }}
            >
              {j.title}
            </button>
          ))}
        </div>
        <div style={styles.actionsRow}>
          <button
            style={{ ...styles.navBtn, ...styles.btnDisabled }}
            disabled
          >Back</button>
          <button
            style={jobIdx !== null ? styles.navBtn : { ...styles.navBtn, ...styles.btnDisabled }}
            disabled={jobIdx === null}
            onClick={() => setStep(1)}
          >Next</button>
        </div>
      </div>
    );
  }

  // Step 2: show required skills/levels
  function renderJobRequirements() {
    if (!selectedJob) return null;
    // Highlight step with accent color if applicable
    return (
      <div style={{
        ...styles.cardBlock,
        background: "linear-gradient(109deg,#232733 80%, #181a20 120%)",
      }}>
        <h2 style={{
          ...styles.heading,
          color: selectedJob.title === "Frontend Developer"
            ? THEME.accent
            : styles.heading.color,
          marginBottom: 12,
          display: "flex",
          gap: 10,
          alignItems: "center"
        }}>
          {selectedJob.title === "Frontend Developer" && <span role="img" aria-label="frontend" style={{fontSize: 26}}>💻</span>}
          Step 2: Required Skills for {selectedJob.title}
        </h2>
        <p style={{
          ...styles.stepDesc,
          color: "#FCDDB3"
        }}>
          {selectedJob.title === "Frontend Developer"
            ? <>Below are the core skill requirements and expected proficiency for a Frontend Developer.<br />
              Skills marked with <span style={{color: THEME.primary}}>color pills</span> indicate their importance and expected level!</>
            : "Review the typical skills and expected levels for this job."}
        </p>
        <table style={{
          ...styles.skillsTable,
          background: "#21262a",
          boxShadow: "0 1px 8px 0 #181a2041",
          borderRadius: 12,
          color: "#fafaff"
        }}>
          <thead>
            <tr style={{
              background: "#39404a"
            }}>
              <th style={{color: "#FBD46D"}}>Skill</th>
              <th style={{color: "#FBD46D"}}>Required Level</th>
            </tr>
          </thead>
          <tbody>
            {selectedJob.requiredSkills.map((s, i) => (
              <tr key={s.name}
                style={{background: i % 2 === 0 ? "#232a2744" : "#191B24" }}>
                <td style={{fontWeight: 600, color: "#FBD46D" }}>{s.name}</td>
                <td>
                  <LevelPill level={s.level} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.actionsRow}>
          <button
            style={styles.navBtn}
            onClick={() => setStep(0)}
          >Back</button>
          <button
            style={styles.navBtn}
            onClick={() => setStep(2)}
          >Next</button>
        </div>
      </div>
    );
  }

  // Step 3: user enters their own skills
  function renderUserSkillsForm() {
    return (
      <div style={{...styles.cardBlock, background: "#232C38"}}>
        <h2 style={styles.heading}>Step 3: Enter Your Current Skills</h2>
        <p style={{...styles.stepDesc, color: "#fae39d"}}>
          Add relevant skills and assign your proficiency level.
        </p>
        <form onSubmit={editingIdx !== null ? handleUpdateSkill : handleAddSkill} style={styles.skillFormRow}>
          <input
            placeholder="Skill (e.g. SQL)"
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            style={{
              ...styles.input,
              background: "#191D21",
              border: "1.5px solid #232c37",
              color: "#F4F4F7"
            }}
            required
            autoFocus
          />
          <select
            value={newSkillLevel}
            onChange={e => setNewSkillLevel(e.target.value)}
            style={{
              ...styles.input,
              background: "#191D21",
              border: "1.5px solid #232c37",
              color: "#F4F4F7"
            }}
            required
          >
            {LEVELS.map(l => (
              <option value={l} key={l}>{l}</option>
            ))}
          </select>
          {editingIdx === null ? (
            <button type="submit" style={styles.actionBtn}>Add Skill</button>
          ) : (
            <>
              <button type="submit" style={styles.actionBtn}>Update</button>
              <button type="button" style={{ ...styles.actionBtn, background: THEME.accent, color:'#fff' }} onClick={handleCancelEdit}>Cancel</button>
            </>
          )}
        </form>
        <div style={styles.userSkillListBlock}>
          {userSkills.length === 0 ? (
            <div style={{ fontStyle: "italic", color: "#666", marginTop: 16 }}>
              No skills added yet.
            </div>
          ) : (
            <table style={{...styles.skillsTable, background:'#21232c', color:'#F4F4F7'}}>
              <thead>
                <tr style={{background:'#262F33'}}>
                  <th>Your Skill</th>
                  <th>Level</th>
                  <th style={{ width: 120 }}></th>
                </tr>
              </thead>
              <tbody>
                {userSkills.map((s, i) => (
                  <tr key={s.name + i} style={{background: i % 2 === 0 ? "#2B303B" : "#22252c" }}>
                    <td>{s.name}</td>
                    <td><LevelPill level={s.level} /></td>
                    <td>
                      <button
                        style={styles.tblBtn}
                        title="Edit"
                        onClick={() => handleEditSkill(i)}
                        type="button"
                      >✎</button>
                      <button
                        style={styles.tblBtn}
                        title="Delete"
                        onClick={() => handleDeleteSkill(i)}
                        type="button"
                      >✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={styles.actionsRow}>
          <button
            style={styles.navBtn}
            onClick={() => setStep(1)}
          >Back</button>
          <button
            style={userSkills.length ? styles.navBtn : { ...styles.navBtn, ...styles.btnDisabled }}
            disabled={userSkills.length === 0}
            onClick={() => setStep(3)}
          >Next</button>
        </div>
      </div>
    );
  }

  // --- Skill resource links for learning ---
  // PUBLIC_INTERFACE
  function getSkillResourceLinks(skill) {
    // Map popular skills to demo resources.
    const resourceDb = {
      "JavaScript": [
        { label: "freeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
        { label: "MDN JS", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { label: "Codecademy JS", url: "https://www.codecademy.com/learn/introduction-to-javascript" },
      ],
      "React": [
        { label: "React Docs", url: "https://react.dev/learn" },
        { label: "freeCodeCamp React", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/react/" },
        { label: "Codecademy React", url: "https://www.codecademy.com/learn/react-101" }
      ],
      "CSS": [
        { label: "freeCodeCamp CSS", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
        { label: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { label: "CSS Tricks", url: "https://css-tricks.com/guides/" }
      ],
      "HTML": [
        { label: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { label: "W3Schools HTML", url: "https://www.w3schools.com/html/" },
        { label: "freeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/" }
      ],
      "SQL": [
        { label: "W3Schools SQL", url: "https://www.w3schools.com/sql/" },
        { label: "Khan Academy SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql" }
      ],
      "Python": [
        { label: "Python.org", url: "https://docs.python.org/3/tutorial/" },
        { label: "Real Python", url: "https://realpython.com/" }
      ],
      "Linux": [
        { label: "Linux Journey", url: "https://linuxjourney.com/" }
      ],
      "AWS": [
        { label: "AWS Tutorials", url: "https://aws.amazon.com/getting-started/hands-on/" }
      ],
      "Docker": [
        { label: "Docker Getting Started", url: "https://docs.docker.com/get-started/" }
      ],
      // Add more as needed, fallback to general
      "default": [
        { label: "Search Google", url: "https://www.google.com/search?q=learn+SKILL" }
      ]
    };
    return resourceDb[skill] || [ ...resourceDb["default"].map(link => ({...link, url: link.url.replace("SKILL", encodeURIComponent(skill))})) ];
  }

  // Step 4: Percentage match
  function renderMatchResults() {
    const results = getSkillMatchResults();
    const percent = getMatchPercent();

    // For vibrant row highlighting/status, and adding a "Resources" column for missing or weak skills.
    return (
      <div style={{
        ...styles.cardBlock,
        background: "linear-gradient(90deg, #ffffff 75%, #FFF4F2 100%)"
      }}>
        <h2 style={{
          ...styles.heading,
          color: THEME.accent,
          textShadow: "0 2px 5px #ffd1e8bd"
        }}>Step 4: Skill Match Analysis</h2>
        <p style={styles.stepDesc}>
          See your match for <b>{selectedJob.title}</b>. <span style={{color:"#e27041",fontWeight:600}}>For skills marked 'Missing' or 'Level too low', click a course link to quickly learn/improve!</span>
        </p>
        <div style={styles.resultsRow}>
          <div style={{
            ...styles.resultsLeft,
            background: "linear-gradient(135deg,#f6e3e2 50%,#fffae2 100%)",
            boxShadow: "0 6px 16px 0 #FCB6BE33"
          }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, color: THEME.primary }}>
              Percentage Match
            </div>
            <PercentCircle percent={percent} />
            <div style={{
              margin: "16px 0 10px",
              color: percent === 100 ? THEME.primary : THEME.accent,
              fontWeight: 500
            }}>
              {percent === 100
                ? "Perfect! All required skills matched."
                : percent === 0
                  ? "No matches yet. Add more skills!"
                  : `${percent}% of required skills are matched.`}
            </div>
          </div>
          <div style={styles.resultsTableBlock}>
            <table style={{
              ...styles.skillsTable,
              background: "#f6fdff",
              borderRadius: 15,
              overflow: "hidden",
              boxShadow: "0 2px 20px 0 #F5F0DD33"
            }}>
              <thead>
                <tr style={{ background: THEME.secondary }}>
                  <th style={{color:"#385e5d"}}>Required Skill</th>
                  <th style={{color:"#385e5d"}}>Required Level</th>
                  <th style={{color:"#385e5d"}}>Your Level</th>
                  <th style={{color:THEME.primary}}>Status</th>
                  <th style={{color:THEME.accent}}>Resources</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => {
                  // Determine if to show resources
                  const needsHelp = !r.matched;
                  let rowBg = "";
                  if (r.userLevel === "None") rowBg = "#fff8f9";
                  else if (!r.matched) rowBg = "#fffbe9";
                  else rowBg = "#f7fff7";
                  return (
                    <tr key={r.name + i} style={{
                      background: rowBg,
                      borderLeft: needsHelp
                        ? `6px solid ${THEME.accent}`
                        : `6px solid ${THEME.primary}`,
                      fontWeight: needsHelp ? 600 : 400
                    }}>
                      <td style={{color: needsHelp ? THEME.accent : THEME.primary}}>{r.name}</td>
                      <td><LevelPill level={r.requiredLevel} /></td>
                      <td>
                        {r.userLevel !== "None"
                          ? <LevelPill level={r.userLevel} />
                          : <span style={{ color: "#bbb", fontStyle:"italic" }}>---</span>}
                      </td>
                      <td>
                        {r.userLevel === "None" ? (
                          <span style={{ color: THEME.accent, fontWeight: "bold" }}>Missing</span>
                        ) : r.matched ? (
                          <span style={{ color: THEME.primary, fontWeight: "bold" }}>Matched</span>
                        ) : (
                          <span style={{ color: THEME.secondary, fontWeight: "bold" }}>Level too low</span>
                        )}
                      </td>
                      <td>
                        {needsHelp ? (
                          <div style={{display:"flex", flexDirection:"column", gap:3}}>
                            {getSkillResourceLinks(r.name).slice(0,2).map(link =>
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  background: "#fff",
                                  border: `1.5px solid ${THEME.accent}`,
                                  borderRadius: 5,
                                  color: THEME.accent,
                                  fontWeight: 500,
                                  fontSize: 13,
                                  padding: "2.5px 8px",
                                  marginTop: 1,
                                  textDecoration: "none",
                                  boxShadow: "0 1px 4px #fdbaca44"
                                }}
                              >
                                {link.label} <span style={{
                                  fontWeight:900,
                                  fontSize:13,
                                  verticalAlign:"middle"
                                }}>↗</span>
                              </a>
                            )}
                          </div>
                        ) : (
                          <span style={{
                            color: "#B3B3B3",
                            fontSize:12
                          }}>
                            -
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={styles.actionsRow}>
          <button
            style={styles.navBtn}
            onClick={() => setStep(2)}
          >Back</button>
          <button
            style={styles.navBtn}
            onClick={() => setStep(4)}
          >Finish</button>
        </div>
      </div>
    );
  }

  // Step 5: summary and visual
  function renderSummary() {
    const percent = getMatchPercent();
    const results = getSkillMatchResults();
    const missing = results.filter(r => !r.matched);
    return (
      <div style={styles.cardBlock}>
        <h2 style={styles.heading}>Step 5: Summary</h2>
        <p style={styles.stepDesc}>Your analysis is complete!</p>
        <div style={{ marginBottom: 30 }}>
          <PercentCircle percent={percent} />
        </div>
        <div style={{
          margin: "20px 0 30px",
          fontWeight: 500,
          color: percent === 100 ? THEME.primary : THEME.accent,
          fontSize: 20
        }}>
          {percent === 100
            ? `Excellent! You match all skills for ${selectedJob.title}.`
            : <>
                You match <b>{percent}%</b> of the required skills for <b>{selectedJob.title}</b>.<br/>
                {missing.length > 0 &&
                  <>
                    <span style={{ color: THEME.accent }}>
                      Improve these skills for a perfect fit:
                    </span>
                    <ul>
                      {missing.map((r, i) =>
                        <li key={r.name + i}>
                          {r.name} ({r.userLevel === "None" ? "missing" : `your level: ${r.userLevel}; required: ${r.requiredLevel}`})
                        </li>
                      )}
                    </ul>
                  </>
                }
              </>
          }
        </div>
        <div style={styles.actionsRow}>
          <button
            style={styles.navBtn}
            onClick={() => {
              setStep(0);
              setJobIdx(null);
              setUserSkills([]);
            }}
          >Restart</button>
        </div>
      </div>
    );
  }

  // === Main render === //
  return (
    <div style={{ background: "linear-gradient(120deg, #181A20 60%, #22242c 100%)", minHeight: "100vh", paddingBottom: 50 }}>
      <header style={{...styles.header, background:'#191d22'}}>
        <div style={styles.headerLogo}>
          <span style={{ color: THEME.accent, fontSize: 30, marginRight: 10 }}>★</span>
          SkillBridge <span style={{ color: THEME.accent, marginLeft: 5 }}>Analyzer</span>
        </div>
      </header>
      <main style={styles.mainBlock}>
        <div style={{ ...styles.hero, marginTop: 10, background:'#23272e' }}>
          <div style={styles.sectionTitle}>
            Skill Gap Analyzer - Step by Step
          </div>
          <div style={styles.heroSubtitle}>
            Select a job, compare required skills, analyze your fit!
          </div>
        </div>
        <div style={styles.stepperRow}>
          <StepBubble active={step === 0} text="Job" done={step > 0} />
          <StepArrow />
          <StepBubble active={step === 1} text="Required" done={step > 1} />
          <StepArrow />
          <StepBubble active={step === 2} text="You" done={step > 2} />
          <StepArrow />
          <StepBubble active={step === 3} text="Match" done={step > 3} />
          <StepArrow />
          <StepBubble active={step === 4} text="Summary" done={false} />
        </div>
        <section>
          {step === 0 && renderJobSelect()}
          {step === 1 && renderJobRequirements()}
          {step === 2 && renderUserSkillsForm()}
          {step === 3 && renderMatchResults()}
          {step === 4 && renderSummary()}
        </section>
      </main>
    </div>
  );
}

// --- Stepper UI ---
function StepBubble({ text, active, done }) {
  return (
    <div style={{
      minWidth: 76,
      borderRadius: 25,
      background: active
        ? THEME.primary
        : (done ? THEME.secondary : "#ededed"),
      color: active
        ? "#fff"
        : (done ? "#333" : "#bbb"),
      padding: "9px 19px",
      textAlign: "center",
      fontWeight: 700,
      fontSize: 16,
      position: "relative",
    }}>{text}</div>
  );
}
function StepArrow() {
  return (
    <span style={{
      fontSize: 36,
      color: "#bbb",
      margin: "0 8px 0 8px",
      fontWeight: 900
    }}>{'>'}</span>
  );
}
 // --- LevelPill small component ---
function LevelPill({ level }) {
  // More vibrant color mapping with subtle outline for visual pop.
  const map = {
    Beginner: "linear-gradient(87deg,#ffe7ba,#ffe7a5 60%,#FFC4A1)",
    Intermediate: "linear-gradient(87deg,#FFF176,#FFD25A 70%,#FBD46D 99%)",
    Expert: "linear-gradient(87deg,#c0e1d7,#4F8A8B 90%,#accac6)"
  };
  const outline = {
    Beginner: "1.3px solid #fc9081",
    Intermediate: "1.4px solid #cf9f00aa",
    Expert: "1.6px solid #399780"
  };
  const txtCol = {
    Beginner: "#FF642E",
    Intermediate: "#BB8900",
    Expert: "#2E856E"
  };
  return (
    <span style={{
      padding: "4px 13px 3px 13px",
      borderRadius: 13,
      background: map[level] || "#eee",
      color: txtCol[level] || "#333",
      fontSize: 14,
      fontWeight: 700,
      border: outline[level] || "1px solid #eee",
      boxShadow: level === "Expert"
        ? "0 0 4px #A5ECC0,inset 0 2px 8px #e3f8f3"
        : level === "Intermediate"
        ? "0 0 3px #fff1a7,0 2px 6px #ffe8b5"
        : "0 1px 7px #ffe5e5,inset 0 3px 6px #f7b59c22"
    }}>{level}</span>
  );
}

// --- PercentCircle visual (simple donut) ---
function PercentCircle({ percent }) {
  // Adapted simple circular progress for visual
  const sz = 112, r = 48, st = 12, PI = Math.PI, C = 2 * PI * r;
  const arc = percent / 100 * C;
  return (
    <svg width={sz} height={sz} style={{ display: "block", margin: "0 auto" }}>
      {/* Back circle */}
      <circle
        cx={sz / 2}
        cy={sz / 2}
        r={r}
        fill="none"
        stroke="#eee"
        strokeWidth={st}
      />
      {/* Value arc */}
      <circle
        cx={sz / 2}
        cy={sz / 2}
        r={r}
        fill="none"
        stroke={percent === 100 ? THEME.primary : THEME.secondary}
        strokeWidth={st}
        strokeDasharray={`${arc} ${C - arc}`}
        strokeDashoffset={0}
        style={{ transition: "stroke-dasharray 0.5s" }}
      />
      {/* Accent for low match */}
      {percent < 66 &&
        <circle
          cx={sz / 2}
          cy={sz / 2}
          r={r}
          fill="none"
          stroke={THEME.accent}
          strokeWidth={st}
          strokeDasharray={`${(100 - percent) / 100 * C} ${percent / 100 * C}`}
          strokeDashoffset={arc * -1}
          style={{ transition: "stroke-dasharray 0.5s" }}
        />
      }
      {/* Center label */}
      <text
        x="50%" y="54%" textAnchor="middle"
        fontSize="29" fill={THEME.primary} fontWeight="700" dy=".3em"
      >{percent}%</text>
    </svg>
  );
}

const styles = {
  header: {
    background: "#fff",
    borderBottom: `4px solid ${THEME.secondary}`,
    padding: "0 0 0 0",
    position: "sticky",
    top: 0,
    zIndex: 5,
    boxShadow: "0 4px 16px 0 rgba(79,138,139,0.04)"
  },
  headerLogo: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "21px 40px 12px 20px",
    fontWeight: 800,
    fontSize: "2rem",
    color: THEME.primary,
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center"
  },
  mainBlock: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "15px 5px 60px 5px"
  },
  hero: {
    margin: "30px 0 5px 0",
    textAlign: "center"
  },
  sectionTitle: {
    fontWeight: 800,
    color: THEME.primary,
    letterSpacing: "1.5px",
    fontSize: "2em",
    marginBottom: 6,
    marginTop: 3
  },
  heroSubtitle: {
    color: THEME.accent,
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 6
  },
  stepperRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    margin: "20px 0 34px"
  },
  cardBlock: {
    background: "#fff",
    borderRadius: 15,
    boxShadow: "0 4px 14px 0 rgba(79,138,139,0.07)",
    padding: "26px 29px 22px 29px",
    maxWidth: 460,
    margin: "0 auto 30px auto",
    minWidth: 290,
    minHeight: 230
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 8
  },
  navBtn: {
    background: THEME.primary,
    color: "#fff",
    border: "none",
    borderRadius: 7,
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer"
  },
  btnDisabled: {
    background: "#ededed",
    color: "#9e9e9e",
    cursor: "not-allowed"
  },
  jobList: {
    margin: "15px 0 6px 0",
    display: "flex",
    flexDirection: "column",
    gap: 13
  },
  jobBtn: {
    border: "none",
    borderRadius: 18,
    padding: "12px 2px",
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 1,
    cursor: "pointer",
    transition: "background 0.13s"
  },
  heading: {
    fontWeight: 800,
    color: THEME.primary,
    fontSize: "1.42em",
    marginBottom: 2,
    marginTop: 3,
    letterSpacing: "0.5px"
  },
  stepDesc: {
    color: "#535151",
    fontSize: 15,
    marginBottom: 14,
    marginTop: 5
  },
  skillsTable: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "12px 0",
    fontSize: 15,
    textAlign: "left"
  },
  skillFormRow: {
    display: "flex",
    gap: 11,
    margin: "10px 0",
    alignItems: "center"
  },
  input: {
    border: "1.5px solid #E0E0E0",
    background: "#fafafa",
    borderRadius: 4,
    fontSize: 15,
    padding: "7px 10px",
    outline: "none",
    width: 130,
    color: "#3a474d"
  },
  actionBtn: {
    background: THEME.secondary,
    color: "#333",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    borderRadius: 5,
    padding: "7px 16px",
    cursor: "pointer"
  },
  userSkillListBlock: {
    margin: "18px 0 0 0"
  },
  tblBtn: {
    marginRight: 6,
    border: "none",
    background: "#eee",
    color: "#888",
    borderRadius: 5,
    padding: "4px 9px",
    cursor: "pointer"
  },
  resultsRow: {
    display: "flex",
    gap: 19,
    flexWrap: "wrap"
  },
  resultsLeft: {
    minWidth: 160,
    flex: "0 0 160px",
    background: "#faf8f8",
    borderRadius: 13,
    padding: "15px 22px 20px 18px",
    marginBottom: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 1.5px 10px 0 rgba(249,180,157,0.06)"
  },
  resultsTableBlock: {
    flex: "1 0 230px"
  }
};

export default MainContainer;
