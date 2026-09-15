import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import type { PortfolioCategory, PortfolioItem } from '@/lib/supabaseClient';
import {
  createPortfolioItem,
  deletePortfolioItem,
  listPortfolioItems,
  removePortfolioImages,
  updatePortfolioItem,
  uploadPortfolioImage,
} from '@/lib/portfolioAdmin';

const CATEGORY_OPTIONS: { value: PortfolioCategory; label: string }[] = [
  { value: 'tint', label: 'Tint' },
  { value: 'ppf', label: 'PPF' },
  { value: 'wrap', label: 'Wrap' },
];

const emptyForm = {
  title: '',
  category: 'tint' as PortfolioCategory,
  description: '',
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function categoryBadge(_category: string) {
  return 'border border-black bg-black text-white';
}

export default function AdminDashboardPage() {
  const { user, accessToken, signOut } = useAdminAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [title, setTitle] = useState(emptyForm.title);
  const [category, setCategory] = useState<PortfolioCategory>(emptyForm.category);
  const [description, setDescription] = useState(emptyForm.description);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setListError(null);
    setLoading(true);
    try {
      const rows = await listPortfolioItems();
      setItems(rows);
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  function openCreate() {
    setEditing(null);
    setTitle('');
    setCategory('tint');
    setDescription('');
    setBeforeFile(null);
    setAfterFile(null);
    setFormError(null);
    setStatus(null);
    setFormOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditing(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description ?? '');
    setBeforeFile(null);
    setAfterFile(null);
    setFormError(null);
    setStatus(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setBeforeFile(null);
    setAfterFile(null);
    setFormError(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!accessToken) {
      setFormError('Not authenticated');
      return;
    }

    setFormError(null);
    setStatus(null);
    setSaving(true);

    try {
      let beforeUrl = editing?.before_image_url ?? null;
      let afterUrl = editing?.after_image_url ?? null;

      if (beforeFile) {
        setStatus('Uploading before image…');
        beforeUrl = await uploadPortfolioImage(beforeFile);
        if (editing?.before_image_url) {
          await removePortfolioImages([editing.before_image_url]);
        }
      }

      if (afterFile) {
        setStatus('Uploading after image…');
        afterUrl = await uploadPortfolioImage(afterFile);
        if (editing?.after_image_url) {
          await removePortfolioImages([editing.after_image_url]);
        }
      }

      if (!editing && !beforeUrl) {
        throw new Error('Before image is required for new items');
      }

      setStatus('Saving…');

      if (editing) {
        await updatePortfolioItem(accessToken, {
          id: editing.id,
          title: title.trim(),
          category,
          before_image_url: beforeUrl,
          after_image_url: afterUrl,
          description: description.trim() || null,
        });
        setStatus('Item updated successfully.');
      } else {
        await createPortfolioItem(accessToken, {
          title: title.trim(),
          category,
          before_image_url: beforeUrl,
          after_image_url: afterUrl,
          description: description.trim() || null,
        });
        setStatus('Item created successfully.');
      }

      setTitle('');
      setCategory('tint');
      setDescription('');
      setBeforeFile(null);
      setAfterFile(null);
      setEditing(null);
      setFormOpen(false);
      await refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed');
      setStatus(null);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(item: PortfolioItem) {
    if (!accessToken) return;
    const ok = window.confirm(`Delete “${item.title}”? This cannot be undone.`);
    if (!ok) return;

    try {
      await deletePortfolioItem(accessToken, item.id);
      await removePortfolioImages([item.before_image_url, item.after_image_url]);
      setItems((prev) => prev.filter((row) => row.id !== item.id));
      setStatus('Item deleted.');
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const fieldClass =
    'mt-1 w-full rounded-none border border-neutral-300 bg-white px-3 py-2 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black';
  const labelClass = 'text-sm font-medium text-neutral-700';
  const btnSecondary =
    'text-sm font-medium text-black border border-black rounded-none px-3 py-1.5 hover:bg-neutral-100';
  const btnPrimary =
    'rounded-none bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50';

  return (
    <div className="admin-shell min-h-screen bg-white text-black">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-black">
              Portfolio admin
            </h1>
            <p className="truncate text-xs text-neutral-500">{user?.email}</p>
          </div>
          <button type="button" onClick={() => void signOut()} className={btnSecondary}>
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-black">
            Items ({items.length})
          </h2>
          <button type="button" onClick={openCreate} className={btnPrimary}>
            Add new portfolio item
          </button>
        </div>

        {status && !formOpen && (
          <p className="rounded-none border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-black">
            {status}
          </p>
        )}

        {listError && (
          <p className="rounded-none border border-black bg-black px-3 py-2 text-sm text-white">
            {listError}
          </p>
        )}

        {formOpen && (
          <section className="rounded-none border border-neutral-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-black">
                {editing ? 'Edit portfolio item' : 'Add new portfolio item'}
              </h3>
              <button
                type="button"
                onClick={closeForm}
                className="text-sm text-neutral-500 hover:text-black"
                disabled={saving}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
              <label className="block">
                <span className={labelClass}>Title</span>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
                  className={fieldClass}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>
                  Before image {editing ? '(leave empty to keep current)' : ''}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  required={!editing}
                  onChange={(e) => setBeforeFile(e.target.files?.[0] ?? null)}
                  className="mt-1 block w-full text-sm text-neutral-700"
                />
                {editing?.before_image_url && !beforeFile && (
                  <img
                    src={editing.before_image_url}
                    alt=""
                    className="mt-2 h-20 w-28 border border-neutral-300 object-cover"
                  />
                )}
              </label>

              <label className="block">
                <span className={labelClass}>After image (optional)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setAfterFile(e.target.files?.[0] ?? null)}
                  className="mt-1 block w-full text-sm text-neutral-700"
                />
                {editing?.after_image_url && !afterFile && (
                  <img
                    src={editing.after_image_url}
                    alt=""
                    className="mt-2 h-20 w-28 border border-neutral-300 object-cover"
                  />
                )}
              </label>

              <label className="block">
                <span className={labelClass}>Description</span>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={fieldClass}
                />
              </label>

              {status && saving && (
                <p className="text-sm text-neutral-600">{status}</p>
              )}
              {formError && (
                <p className="text-sm font-medium text-black" role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" disabled={saving} className={`w-fit ${btnPrimary}`}>
                {saving ? 'Working…' : editing ? 'Save changes' : 'Create item'}
              </button>
            </form>
          </section>
        )}

        {loading ? (
          <p className="text-sm text-neutral-500">Loading items…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-neutral-500">No portfolio items yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-none border border-neutral-200 bg-white"
              >
                <div className="aspect-[4/3] bg-neutral-100">
                  {item.before_image_url || item.after_image_url ? (
                    <img
                      src={item.after_image_url || item.before_image_url || ''}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium leading-snug text-black">
                      {item.title}
                    </h3>
                    <span
                      className={`shrink-0 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${categoryBadge(item.category)}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {formatDate(item.created_at)}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className={btnSecondary}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(item)}
                      className="rounded-none border border-black bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
