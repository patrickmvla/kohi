'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormInput, type ContactFormOutput } from '@/lib/schemas/contact'

export default function ContactRHF() {
  const [serverMsg, setServerMsg] = useState<string | null>(null)
  const [serverErr, setServerErr] = useState<string | null>(null)

  const started = useMemo(() => Date.now(), [])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormInput, any, ContactFormOutput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      hp: '',
      started, // number
    },
    mode: 'onTouched',
  })

  const msg = watch('message') ?? ''
  const msgChars = msg.length

  useEffect(() => {
    if (isSubmitSuccessful) {
      // keep defaults for a fresh time trap after success
    }
  }, [isSubmitSuccessful])

  const onSubmit: SubmitHandler<ContactFormOutput> = async (values) => {
    setServerMsg(null)
    setServerErr(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to send')
      setServerMsg(data?.message || 'Sent. Thank you!')
      reset({ name: '', email: '', message: '', hp: '', started: Date.now() })
    } catch (e: any) {
      setServerErr(e.message || 'Failed to send')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid max-w-md gap-4" noValidate>
          {/* Honeypot */}
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('hp')} />
          {/* Time trap */}
          <input type="hidden" {...register('started', { value: started, valueAsNumber: true })} />

          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              placeholder="Name"
              className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 outline-none ring-brand-600 focus:ring-2"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 outline-none ring-brand-600 focus:ring-2"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Message"
              className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 outline-none ring-brand-600 focus:ring-2"
              aria-invalid={!!errors.message}
              {...register('message')}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? (
                <p className="text-xs text-red-400">{errors.message.message}</p>
              ) : (
                <span className="text-xs text-zinc-500">{msgChars}/5000</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-500 disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : 'Send'}
            </button>
            {serverErr && <p className="text-sm text-red-400">{serverErr}</p>}
            {serverMsg && <p className="text-sm text-brand-300">{serverMsg}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}