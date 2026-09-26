'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star, Users, BookOpen } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

interface GHUser {
  name: string; login: string; bio: string; avatar_url: string;
  public_repos: number; followers: number; following: number;
}
interface GHRepo {
  id: number; name: string; description: string;
  language: string; stargazers_count: number; forks_count: number;
  html_url: string; fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
  HTML: '#E34F26', CSS: '#1572B6', default: '#8A8896',
};

export default function GitHubSection() {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const gh = PERSONAL.githubUser;
    const userUrl = 'https://api.github.com/users/' + gh;
    const repoUrl = 'https://api.github.com/users/' + gh + '/repos?sort=updated&per_page=6';
    Promise.all([
      fetch(userUrl).then(r => r.json()),
      fetch(repoUrl).then(r => r.json()),
    ])
      .then(([u, r]) => {
        setUser(u);
        setRepos(Array.isArray(r) ? r.filter((x: GHRepo) => !x.fork).slice(0, 6) : []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="py-32 relative" style={{ background: '#060a14' }}>
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 07</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            LIVE DEV /<br />
            <span className="gradient-text">FEED</span>
          </h2>
        </motion.div>

        {loading && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin mx-auto mb-4" />
            <div className="sys-label">CONNECTING TO GITHUB API...</div>
          </div>
        )}

        {error && (
          <div className="glass rounded-2xl p-12 text-center">
            <Github size={32} className="text-[var(--text-sub)] mx-auto mb-4" />
            <div className="font-medium mb-4">GitHub API unavailable</div>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-ghost text-sm">
              VIEW PROFILE DIRECTLY
            </a>
          </div>
        )}

        {!loading && !error && user && (
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar_url} alt={user.name || user.login} width={56} height={56} className="rounded-full border-2 border-[var(--border-glow)]" />
                <div>
                  <div className="font-semibold">{user.name || user.login}</div>
                  <div className="mono text-xs text-[var(--accent)]">@{user.login}</div>
                </div>
              </div>
              {user.bio && <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">{user.bio}</p>}

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: BookOpen, val: user.public_repos, label: 'REPOS' },
                  { icon: Users,    val: user.followers,    label: 'FOLLOWERS' },
                  { icon: Users,    val: user.following,    label: 'FOLLOWING' },
                ].map(({ icon: Icon, val, label }) => (
                  <div key={label} className="glass rounded-lg p-3 text-center">
                    <div className="mono text-lg font-bold text-[var(--accent)]">{val}</div>
                    <div className="sys-label mt-1">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-ghost text-xs w-full justify-center">
                  <Github size={13} /> OPEN GITHUB
                </a>
              </div>
            </motion.div>

            <div>
              <div className="sys-label mb-4">RECENT REPOSITORIES</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="glass rounded-xl p-4 block hover:border-[var(--border-glow)] transition-colors group"
                  >
                    <div className="font-semibold text-sm text-[var(--accent)] group-hover:underline mb-1">{repo.name}</div>
                    {repo.description && (
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-4 mono text-[10px] text-[var(--text-sub)]">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}