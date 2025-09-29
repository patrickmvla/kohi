// src/components/admin/PostForm.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostInput, type PostOutput } from '@/lib/schemas/post'
import { slugify } from '@/lib/slug'
import { useRouter } from 'next/navigation'

type Props = {
  mode: 'create' | 'edit'
  initial?: Partial<PostOutput> & { id?: number }
}

export default function PostForm({ mode, initial }: Props) {
  const router = useRouter()
  const [serverErr, setServerErr] = useState<string | null>(null)
  const defaults = useMemo<PostInput>(() => ({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    readingTime: initial?.readingTime ?? 6,
    cover: initial?.cover ?? '',
    tags: initial?.tags ?? [],
    featured: initial?.featured ?? false,
    published: initial?.published ?? false,
    publishedAt: initial?.publishedAt ? new Date(initial.publishedAt) : undefined,
  }), [initial])

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } =
    useForm<PostInput, any, PostOutput>({
      resolver: zodResolver(postSchema),
      defaultValues: defaults,
      mode: 'onTouched',
    })

  const title = watch('title')
  useEffect(() => {
    if (mode === 'create') {
      const s = slugify(title || '')
      if (s && !watch('slug')) setValue('slug', s)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, mode])

  const [tagsInput, setTagsInput] = useState((defaults.tags || []).join(', '))

  const onSubmit: SubmitHandler<PostOutput> = async (values) => {
    setServerErr(null)
    const payload = { ...values, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      const res = await fetch(
        mode === 'create' ? '/api/admin/posts' : `/api/admin/posts/${initial?.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Failed to save')
      }
      router.push('/admin/posts')
      router.refresh()
    } catch (e: any) {
      setServerErr(e.message || 'Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs text-zinc-500">Title</label>
          <input {...register('title')} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </div>
        <div>
          <label className="text-xs text-zinc-500">Slug</label>
          <input {...register('slug')} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2 lowercase" />
          {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs text-zinc-500">Excerpt</label>
        <textarea {...register('excerpt')} rows={3} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
      </div>

      <div>
        <label className="text-xs text-zinc-500">Content (Markdown)</label>
        <textarea {...register('content')} rows={12} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2 font-mono" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="text-xs text-zinc-500">Cover URL</label>
          <input {...register('cover')} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Reading time (min)</label>
          <input type="number" {...register('readingTime', { valueAsNumber: true })} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Tags (comma‑separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-transparent px-3 py-2" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" {...register('featured')} className="h-4 w-4" />
          Featured
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" {...register('published')} className="h-4 w-4" />
          Published
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isSubmitting} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
          {isSubmitting ? 'Saving…' : 'Save post'}
        </button>
        {serverErr && <p className="text-sm text-red-400">{serverErr}</p>}
      </div>
    </form>
  )
}