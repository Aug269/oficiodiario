import { BookmarkItem } from '../types/bookmark';

const STORAGE_KEY = 'oficio_reb_bookmarks';

export function getBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookmark(item: BookmarkItem): void {
  try {
    const current = getBookmarks();
    const existingIndex = current.findIndex(b => b.id === item.id);
    let updated: BookmarkItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bookmarks_updated'));
  } catch (err) {
    console.error('Error saving bookmark:', err);
  }
}

export function removeBookmark(id: string): void {
  try {
    const current = getBookmarks();
    const updated = current.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bookmarks_updated'));
  } catch (err) {
    console.error('Error removing bookmark:', err);
  }
}

export function isBookmarked(id: string): boolean {
  const current = getBookmarks();
  return current.some(b => b.id === id);
}

export function updateBookmarkNote(id: string, note: string): void {
  try {
    const current = getBookmarks();
    const updated = current.map(b => b.id === id ? { ...b, note } : b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bookmarks_updated'));
  } catch (err) {
    console.error('Error updating bookmark note:', err);
  }
}
