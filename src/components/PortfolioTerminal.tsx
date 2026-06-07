import { useState, useRef } from "react"
import { Play } from "lucide-react"

type TabId = "01" | "02" | "03" | "04" | "05"

type Skill = { name: string; proficiency: number }

const initialSkills: Skill[] = [
  { name: "SQL", proficiency: 90 },
  { name: "Python", proficiency: 90 },
  { name: "Power BI", proficiency: 85 },
  { name: "dbt", proficiency: 75 },
]

function CapabilityBar({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-200">
        <span>{skill.name}</span>
        <span className="font-semibold">{skill.proficiency}%</span>
      </div>
      <div className="h-3 rounded-full bg-black border border-teal-500/20 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 shadow-[0_0_18px_rgba(56,189,248,0.4)]"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  )
}

function TimelineCard({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="rounded-[20px] border border-teal-500/20 bg-white/5 p-4">
      <p className="text-xs text-teal-300/70 uppercase">{year}</p>
      <h4 className="mt-2 text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  )
}

export default function PortfolioTerminal() {
  const [activeTab, setActiveTab] = useState<TabId>("01")
  const [isBriefingStarted, setIsBriefingStarted] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [skills, setSkills] = useState<Skill[]>(() => initialSkills.map(s => ({ ...s })))
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startAudioBriefing = async () => {
    if (!videoRef.current) return
    videoRef.current.muted = false
    try {
      await videoRef.current.play()
      setIsBriefingStarted(true)
    } catch (e) {
      console.warn('play blocked', e)
    }
  }

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setSkills(prev => prev.map(s => ({ ...s, proficiency: Math.max(50, Math.min(100, s.proficiency + (Math.floor(Math.random()*9)-4))) })))
      setIsSyncing(false)
    }, 500)
  }

  const projects = [
    {
      name: 'LogiMind AI // Jai Logistics Command Centre',
      description: 'An intelligent risk mitigation engine tracking transit behaviors and predicting route delivery delays.',
      badges: ['Python', 'Random Forest', 'PostgreSQL', 'Predictive Analytics'],
      callout: '94.2% Predictive Accuracy Validation',
      tags: ['PIPELINE','ML']
    },
    {
      name: 'Smart Fridge Food Freshness Monitor',
      description: 'An automated, rule-based computer vision pipeline classifying food quality based on structural color profiling and texture analysis.',
      badges: ['Python', 'OpenCV', 'NumPy', 'Image Processing'],
      callout: 'Real-time Texture Quality Metrics',
      tags: ['PIPELINE']
    }
  ]

  const funnelStages = [
    { label: '1. Views (100%)', widthClass: 'w-full', badgeClass: 'bg-teal-400', text: 'Top of funnel reach across the commerce platform.' },
    { label: '2. Cart Adds (68%)', widthClass: 'w-[68%]', badgeClass: 'bg-cyan-400', text: 'Intent signals measured by add-to-cart activation.' },
    { label: '3. Checkout Initiated (42%)', widthClass: 'w-[42%]', badgeClass: 'bg-amber-400', text: 'Prospects engaging with the checkout workflow.' },
    { label: '4. Completed Conversion (32%)', widthClass: 'w-[32%]', badgeClass: 'bg-emerald-400', text: 'Final conversion completion validated in real time.' },
  ]

  return (
    <div className="min-h-screen bg-black text-slate-100">
      {/* Banner */}
      <div className="relative h-[min(60vh,560px)] w-full overflow-hidden bg-black">
        <video ref={videoRef} src="/intro-video.mp4" loop playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]/95" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300/80">Premium Data Analyst Terminal</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">RITHIKA L</h1>
          <p className="mt-2 text-slate-300">DATA ANALYST & ENGINEER</p>

          {!isBriefingStarted ? (
            <button onClick={startAudioBriefing} className="mt-6 inline-flex items-center gap-3 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950">
              <Play className="h-5 w-5" /> START AUDIO BRIEFING
            </button>
          ) : (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-end gap-1">
                <span className="block h-2 w-1 bg-cyan-300 animate-[pulse_800ms_infinite]"></span>
                <span className="block h-3 w-1 bg-cyan-300 animate-[pulse_700ms_infinite]"></span>
                <span className="block h-2 w-1 bg-cyan-300 animate-[pulse_900ms_infinite]"></span>
              </div>
              <div className="text-sm font-mono text-cyan-200">// DATA STREAM INITIALIZED</div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <main className="grid gap-8 lg:grid-cols-[0.9fr_0.85fr]">
          <aside className="sticky top-8 rounded-2xl border border-teal-500/20 bg-white/5 p-5">
            <div className="space-y-3">
              {[
                { id: '01', label: 'The Human Journey' },
                { id: '02', label: 'Capabilities Matrix' },
                { id: '03', label: 'Operational Impact' },
                { id: '04', label: 'Production Case Studies' },
                { id: '05', label: 'Credentials' },
              ].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id as TabId)} className={`flex w-full items-center justify-between px-4 py-3 rounded-2xl text-sm ${activeTab===t.id? 'bg-cyan-500/10 text-cyan-100':'text-slate-300'}`}>
                  <div className="text-left">
                    <div className="font-semibold">{t.label}</div>
                    <div className="text-xs text-slate-400">Panel {t.id}</div>
                  </div>
                  {activeTab===t.id && <span className="h-3 w-3 rounded-full bg-cyan-300" />}
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-3xl border border-teal-500/20 bg-white/5 p-8">
            {activeTab === '01' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Story-driven career timeline</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <TimelineCard
                    year="2022 // RECRUITMENT FOUNDATION"
                    title="St. Anne's Matriculation Higher Secondary School"
                    desc="Completed schooling in Chennai, discovering a deep passion for logical problem solving and technical architectures."
                  />
                  <TimelineCard
                    year="2022 – 2026 // ENGINEERING CORE"
                    title="PERI Institute of Technology"
                    desc="Pursued a professional Bachelor of Engineering degree in Computer Science and Engineering, mapping enterprise data structures and optimizing analytical matrices."
                  />
                  <TimelineCard
                    year="2026 // PIPELINE ACTIVATED"
                    title="Official Course Completion"
                    desc="Graduated and locked down foundational enterprise concepts. Ready to launch into a corporate environment as an elite Data Analyst & Engineer."
                  />
                </div>
              </div>
            )}

            {activeTab === '02' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">Capabilities Matrix</h2>
                    <p className="text-slate-300">Live skill telemetry</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleSync} className="rounded-full bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100">
                      {isSyncing ? <svg className="h-4 w-4 animate-spin text-teal-300" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/></svg> : '⚡ SYNC LIVE METRICS'}
                    </button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {skills.map(s => <CapabilityBar key={s.name} skill={s} />)}
                  </div>
                  <div className="rounded-2xl border border-teal-500/20 bg-black/90 p-4">
                    <p className="text-xs uppercase text-teal-300/70">Dashboard</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">SQL + Python</h3>
                    <p className="mt-2 text-slate-400 text-sm">Expertise in query engineering and analytics scripting.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === '03' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">MNC-Level Operational Impact</p>
                  <h2 className="text-3xl font-semibold text-white">Jai Logistics Internship — Logistics Data Analyst</h2>
                  <p className="max-w-3xl text-slate-300">June 2025 to July 2025 at Jai Logistics. Delivered enterprise-grade logistics analytics by synthesizing telemetry, quality automation, and executive grade decision support.</p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-teal-500/20 bg-black/95 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Records Cleaned & Processed</p>
                    <p className="mt-4 text-3xl font-semibold text-white">520K+ Datasets / Day</p>
                    <p className="mt-3 text-sm text-slate-400">Maintained high volume cleansing and transformation throughput for operational data pipelines.</p>
                  </div>
                  <div className="rounded-3xl border border-teal-500/20 bg-black/95 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Supply Chain Optimization</p>
                    <p className="mt-4 text-3xl font-semibold text-white">Isolated & resolved active shipping delivery bottlenecks</p>
                    <p className="mt-3 text-sm text-slate-400">Built deterministic workflows to pinpoint the most impactful delivery risk factors.</p>
                  </div>
                  <div className="rounded-3xl border border-teal-500/20 bg-black/95 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Pipeline Efficiency</p>
                    <p className="mt-4 text-3xl font-semibold text-white">Automated repetitive logging actions via specialized Python scripts</p>
                    <p className="mt-3 text-sm text-slate-400">Reduced manual monitoring overhead by deploying script-driven operational automation.</p>
                  </div>
                  <div className="rounded-3xl border border-teal-500/20 bg-black/95 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Executive Visibility</p>
                    <p className="mt-4 text-3xl font-semibold text-white">Constructed end-to-end functional Power BI KPI dashboards for business operations</p>
                    <p className="mt-3 text-sm text-slate-400">Enabled senior stakeholders to track operational health and logistics performance in real time.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === '04' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Interactive Production Case Studies</p>
                  <h2 className="text-3xl font-semibold text-white">Advanced technical engineering dashboards</h2>
                  <p className="max-w-3xl text-slate-300">Two major engineering initiatives with predictive analytics, computer vision, and operational pipeline systems, shown in a formal production case study layout.</p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  {projects.map((project) => (
                    <div key={project.name} className="rounded-3xl border border-teal-500/20 bg-black/95 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">{project.name.split(' // ')[0]}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                          <p className="mt-3 text-slate-300 text-sm leading-6">{project.description}</p>
                        </div>
                        <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100">{project.callout}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.badges.map((badge) => (
                          <span key={badge} className="rounded-full border border-teal-500/20 bg-white/5 px-3 py-2 text-xs text-slate-200">{badge}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-teal-500/20 bg-white/5 p-6 shadow-[0_0_30px_rgba(20,184,166,0.07)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-teal-300/70">Analytical Funnel</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">E-Commerce Conversion Funnel</h3>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100">Visual funnel analysis</span>
                  </div>
                  <div className="mt-6 space-y-5">
                    {funnelStages.map((stage) => (
                      <div key={stage.label} className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span>{stage.label}</span>
                          <span className="font-semibold text-white">{stage.label.match(/\(([^)]+)\)/)?.[1] ?? ''}</span>
                        </div>
                        <div className="h-4 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                          <div className={`${stage.widthClass} ${stage.badgeClass} h-full rounded-full shadow-[0_0_18px_rgba(56,189,248,0.25)]`}></div>
                        </div>
                        <p className="text-xs text-slate-400">{stage.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === '05' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Credentials</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-teal-500/20 bg-white/5 p-4">IBM Skills Network</div>
                  <div className="rounded-2xl border border-teal-500/20 bg-white/5 p-4">Tata Group Virtual Exp</div>
                  <div className="rounded-2xl border border-teal-500/20 bg-white/5 p-4">Coursera Specialization</div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <a
                    href="mailto:rithirithika1230@gmail.com"
                    className="flex flex-col items-start w-full break-all overflow-hidden p-4 bg-slate-900/50 border border-slate-800"
                  >
                    rithirithika1230@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/rithika-l"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-start w-full break-all overflow-hidden p-4 bg-slate-900/50 border border-slate-800"
                  >
                    linkedin.com/in/rithika-l
                  </a>
                  <a
                    href="https://github.com/rithika-l"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-start w-full break-all overflow-hidden p-4 bg-slate-900/50 border border-slate-800"
                  >
                    github.com/rithika-l
                  </a>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
