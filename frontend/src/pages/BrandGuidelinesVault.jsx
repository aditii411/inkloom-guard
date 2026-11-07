import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpenCheck, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  ExternalLink, 
  X, 
  Database,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function BrandGuidelinesVault() {
  const { 
    guidelines, 
    addGuideline, 
    updateGuideline, 
    deleteGuideline, 
    toggleGuidelineStatus,
    activeRole,
    permissions,
    notify
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [isRAGUploadOpen, setIsRAGUploadOpen] = useState(false);
  const [ragTestQuery, setRagTestQuery] = useState('');
  const [ragTestResults, setRagTestResults] = useState(null);
  const [isRetrievingRAG, setIsRetrievingRAG] = useState(false);

  // Form state for Add/Edit Rule
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tone & Messaging',
    severity: 'MEDIUM',
    description: '',
    source: '',
    section: '',
    tags: ''
  });

  // Categories list
  const categories = [
    'ALL',
    'Tone & Messaging',
    'Terminology & Glossary',
    'Factual Claims',
    'Visual Identity',
    'Accessibility',
    'Legal & Compliance'
  ];

  // Filtered guidelines
  const filteredGuidelines = guidelines.filter((g) => {
    if (selectedCategory !== 'ALL' && g.category !== selectedCategory) return false;
    if (selectedSeverity !== 'ALL' && g.severity !== selectedSeverity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchSource = g.source.toLowerCase().includes(q);
      const matchTags = g.tags && g.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchSource && !matchTags) return false;
    }
    return true;
  });

  // Handle open add modal
  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Tone & Messaging',
      severity: 'MEDIUM',
      description: '',
      source: 'Brand Policy Handbook §1.0',
      section: 'General Policy',
      tags: 'Brand, Tone, Compliance'
    });
    setEditingRule(null);
    setIsAddModalOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (rule) => {
    setFormData({
      title: rule.title,
      category: rule.category,
      severity: rule.severity,
      description: rule.description,
      source: rule.source,
      section: rule.section || '',
      tags: rule.tags ? rule.tags.join(', ') : ''
    });
    setEditingRule(rule);
    setIsAddModalOpen(true);
  };

  // Handle Save
  const handleSaveRule = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      notify('Missing Fields', 'Title and description are required.', 'error');
      return;
    }

    const tagsArray = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingRule) {
      updateGuideline({
        ...editingRule,
        title: formData.title,
        category: formData.category,
        severity: formData.severity,
        description: formData.description,
        source: formData.source,
        section: formData.section,
        tags: tagsArray
      });
    } else {
      addGuideline({
        title: formData.title,
        category: formData.category,
        severity: formData.severity,
        description: formData.description,
        source: formData.source,
        section: formData.section,
        tags: tagsArray
      });
    }

    setIsAddModalOpen(false);
  };

  // Handle RAG Semantic Retrieval Test Simulation
  const handleRunRAGTest = () => {
    if (!ragTestQuery.trim()) return;
    setIsRetrievingRAG(true);
    setRagTestResults(null);

    setTimeout(() => {
      // Simulate vector similarity search across guidelines
      const queryLower = ragTestQuery.toLowerCase();
      const scored = guidelines.map((g) => {
        let score = 0.65;
        if (queryLower.includes('fast') || queryLower.includes('speed') || queryLower.includes('best') || queryLower.includes('competitor') || queryLower.includes('guarantee')) {
          if (g.category === 'Factual Claims' || g.category === 'Tone & Messaging') score = 0.94;
        } else if (queryLower.includes('color') || queryLower.includes('logo') || queryLower.includes('red') || queryLower.includes('violet')) {
          if (g.category === 'Visual Identity') score = 0.96;
        } else if (queryLower.includes('alt') || queryLower.includes('image') || queryLower.includes('accessible')) {
          if (g.category === 'Accessibility') score = 0.98;
        } else if (queryLower.includes('deal') || queryLower.includes('insane') || queryLower.includes('omg')) {
          if (g.category === 'Tone & Messaging' || g.category === 'Terminology & Glossary') score = 0.91;
        }
        return {
          ...g,
          similarity: score,
          retrievedChunk: `[Chunk #04]: "${g.description.substring(0, 120)}..."`
        };
      });

      scored.sort((a, b) => b.similarity - a.similarity);
      setRagTestResults(scored.slice(0, 3));
      setIsRetrievingRAG(false);
    }, 800);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-[#111827] border border-violet-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpenCheck className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Brand Guidelines Vault</h1>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              RAG Vector Index
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Centralized source of truth for brand policies, approved glossaries, and factual verification rules. 
            All policies are indexed for retrieval-augmented generation during pre-publication scans.
          </p>
          <div className="mt-2 text-[11px] font-mono text-slate-400">
            * Note: Demo workspace policies for CTRL+ She Brand Governance, not statutory external legislation.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Upload Guideline Document (RAG) */}
          <button
            onClick={() => setIsRAGUploadOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>Upload Policy Doc</span>
          </button>

          {/* Add New Rule */}
          <button
            onClick={handleOpenAdd}
            disabled={!permissions.canManageGuidelines}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-glow-violet ${
              permissions.canManageGuidelines
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white cursor-pointer'
                : 'bg-slate-800 text-slate-400 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand Rule</span>
          </button>
        </div>
      </div>

      {/* RAG Vector Retrieval Playground Card */}
      <div className="rounded-2xl bg-[#111827] border border-cyan-500/20 p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">RAG Semantic Retrieval & Grounding Playground</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Vector Search Simulation
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {guidelines.length} Policy Chunks Embedded
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ragTestQuery}
              onChange={(e) => setRagTestQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunRAGTest()}
              placeholder="Test semantic retrieval: e.g. '100% guaranteed to beat every competitor' or 'unauthorized neon color'..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={handleRunRAGTest}
            disabled={isRetrievingRAG || !ragTestQuery.trim()}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-glow-cyan flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRetrievingRAG ? 'Searching Embeddings...' : 'Retrieve Policy Chunks'}</span>
          </button>
        </div>

        {/* Semantic Search Results Preview */}
        {ragTestResults && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2 animate-fade-in">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center justify-between">
              <span>Top Grounding Policy Passages Retrieved:</span>
              <span>Cosine Similarity Threshold: &gt; 0.70</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ragTestResults.map((res, i) => (
                <div key={res.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-violet-300 font-bold truncate max-w-[140px]">{res.title}</span>
                    <span className="text-emerald-400 font-bold">{(res.similarity * 100).toFixed(0)}% Match</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-serif italic">
                    "{res.description.substring(0, 90)}..."
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{res.source}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters Strip */}
      <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, keywords, citations..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Severity Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
          >
            <option value="ALL">All Severities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGuidelines.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#111827] border border-slate-800">
            <BookOpenCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No Guidelines Found</h3>
            <p className="text-xs text-slate-400 mt-1">Try broadening your search query or category filters.</p>
          </div>
        ) : (
          filteredGuidelines.map((rule) => {
            const isActive = rule.status === 'Active';

            return (
              <div
                key={rule.id}
                className={`rounded-2xl bg-[#111827] border ${
                  isActive ? 'border-slate-800 hover:border-violet-500/50' : 'border-slate-800/60 opacity-60'
                } p-5 flex flex-col justify-between shadow-xl transition-all duration-200 group`}
              >
                <div>
                  {/* Card Header: Category & Severity */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-950/40 text-violet-300 font-semibold border border-violet-800/40 truncate">
                      {rule.category}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        rule.severity === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : rule.severity === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {rule.severity}
                    </span>
                  </div>

                  {/* Rule Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {rule.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {rule.description}
                  </p>

                  {/* Tags */}
                  {rule.tags && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {rule.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-slate-900 rounded text-[10px] font-mono text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Strip: Source, Status, Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-slate-400 truncate max-w-[160px]" title={rule.source}>
                    {rule.source}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Active toggle */}
                    <button
                      onClick={() => toggleGuidelineStatus(rule.id)}
                      disabled={!permissions.canManageGuidelines}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {isActive ? 'ACTIVE' : 'INACTIVE'}
                    </button>

                    {/* Edit button */}
                    {permissions.canManageGuidelines && (
                      <button
                        onClick={() => handleOpenEdit(rule)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Rule"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Delete button */}
                    {permissions.canManageGuidelines && (
                      <button
                        onClick={() => deleteGuideline(rule.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D1321] border border-violet-500/40 shadow-2xl p-6 relative animate-scale-up">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              {editingRule ? 'Modify Brand Guideline Rule' : 'Add New Brand Guideline Rule'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Changes will immediately ground pre-publish AI audit evaluations across the workspace.
            </p>

            <form onSubmit={handleSaveRule} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rule Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. RULE 09: Regional Pricing Transparency"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Tone & Messaging">Tone & Messaging</option>
                    <option value="Terminology & Glossary">Terminology & Glossary</option>
                    <option value="Factual Claims">Factual Claims</option>
                    <option value="Visual Identity">Visual Identity</option>
                    <option value="Accessibility">Accessibility</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Severity</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="HIGH">HIGH (Blocks Publication)</option>
                    <option value="MEDIUM">MEDIUM (Requires Review)</option>
                    <option value="LOW">LOW (Advisory)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rule Description & Rationale</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explicitly describe what is permitted, what is prohibited, and the standard to uphold..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Source Document</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g. Brand Style Guide §3.4"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Pricing, Clarity, Region"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-glow-violet"
                >
                  Save Guideline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RAG Upload Modal */}
      {isRAGUploadOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0D1321] border border-cyan-500/40 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsRAGUploadOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <UploadCloud className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Upload Brand Policy Document</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Upload PDF, DOCX, or Markdown guideline documents. The RAG pipeline will extract text, chunk paragraphs, and index vector embeddings.
            </p>

            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-900/40">
              <FileText className="w-10 h-10 text-cyan-400 mx-auto mb-2 opacity-80" />
              <div className="text-xs font-semibold text-slate-200">Drag and drop file here, or browse</div>
              <div className="text-[10px] text-slate-400 mt-1">Supports PDF, DOCX, TXT, MD (Max 25MB)</div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end space-x-2 text-xs">
              <button
                onClick={() => setIsRAGUploadOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  notify('RAG Index Updated', 'Sample Brand Policy document parsed into 14 vector chunks.', 'success');
                  setIsRAGUploadOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-glow-cyan"
              >
                Simulate Ingestion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
