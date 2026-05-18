import {
  Sparkles,
  Clock3,
  Share2,
  MoreHorizontal,
  Wand2,
  Save,
  Brain,
  MessageSquare,
} from "lucide-react";

export default function NoteDetailPage() {
  return (
    <>
      {/* Head */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-6">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-3">
                <Brain className="h-6 w-6 text-violet-400" />
              </div>

              <div>
                <h1 className="text-lg font-bold">AI SaaS Product Roadmap</h1>

                <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    Edited 2 hours ago
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    12 comments
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
              <Share2 className="h-5 w-5" />
            </button>

            <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
              <MoreHorizontal className="h-5 w-5" />
            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500">
              <Save className="h-5 w-5" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_350px]">
        {/* Editor */}
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
          {/* AI Banner */}
          <div className="mb-8 flex items-center justify-between rounded-3xl border border-violet-500/20 bg-violet-500/10 p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-violet-400" />

              <div>
                <h3 className="font-semibold">AI Assistant Active</h3>

                <p className="text-sm text-zinc-400">
                  Generate summaries, rewrite content, and more.
                </p>
              </div>
            </div>

            <button className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500">
              Open AI Tools
            </button>
          </div>

          {/* Editor */}
          <div className="prose prose-invert max-w-none">
            <textarea
              defaultValue={`# AI SaaS Product Roadmap

## Goals

- Improve onboarding flow
- Add AI workspace assistant
- Launch billing dashboard
- Optimize note editor performance

## AI Features

The AI assistant should support:
- Note summarization
- Task extraction
- Smart tagging
- Content rewriting

## Technical Stack

- Next.js
- Tailwind CSS
- Drizzle ORM
- PostgreSQL
- Better Auth

## Future Plans

We will add realtime collaboration, AI agents, and advanced workspace analytics.`}
              className="min-h-[700px] w-full resize-none bg-transparent text-lg leading-8 text-zinc-200 outline-none"
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <aside className="space-y-6">
          {/* AI Tools */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Wand2 className="h-6 w-6 text-violet-400" />

              <div>
                <h2 className="text-xl font-bold">AI Tools</h2>

                <p className="text-sm text-zinc-400">
                  Smart productivity actions
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <AIToolButton label="Summarize Note" />

              <AIToolButton label="Rewrite Content" />

              <AIToolButton label="Generate Tasks" />

              <AIToolButton label="Improve Grammar" />

              <AIToolButton label="Create Blog Draft" />
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <h2 className="text-xl font-bold">AI Insights</h2>

            <div className="mt-6 space-y-4">
              <InsightCard title="Estimated Reading Time" value="4 min" />

              <InsightCard title="Detected Tasks" value="12 tasks" />

              <InsightCard
                title="AI Summary"
                value="Roadmap planning document"
              />
            </div>
          </div>

          {/* Collaborators */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <h2 className="text-xl font-bold">Collaborators</h2>

            <div className="mt-6 space-y-4">
              <Collaborator name="Alex Johnson" />

              <Collaborator name="Sarah Kim" />

              <Collaborator name="Michael Chen" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function AIToolButton({ label }: { label: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-white/10">
      <span>{label}</span>

      <Sparkles className="h-4 w-4 text-violet-400" />
    </button>
  );
}

function InsightCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-zinc-400">{title}</p>

      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

function Collaborator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-semibold">
        {name.charAt(0)}
      </div>

      <div>
        <p className="font-medium">{name}</p>

        <p className="text-sm text-zinc-400">Active now</p>
      </div>
    </div>
  );
}
