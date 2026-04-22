"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] font-sans text-[#2d1b45]">
      <NavbarShell />
      <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-[2rem] border border-[#4B2E76]/10 bg-white p-8 shadow-[0_20px_50px_rgba(75,46,118,0.08)]"
        >
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#4B2E76]/70 transition hover:text-[#4B2E76]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="mb-2 text-2xl font-bold tracking-[-0.04em] text-[#4B2E76] sm:text-3xl">
                Reset your password
              </h1>
              <p className="mb-8 text-sm leading-7 text-[#4B2E76]/70">
                Enter your email and we will send a reset link. (Demo UI — no email is sent.)
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#4B2E76]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B2E76]/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-[#4B2E76]/15 pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4B2E76]/10">
                <CheckCircle className="h-8 w-8 text-[#4B2E76]" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-[#4B2E76] sm:text-3xl">Check your email</h1>
              <p className="mb-8 text-sm text-[#4B2E76]/70">
                We have prepared a reset link for <strong className="text-[#4B2E76]">{email}</strong> (demo only).
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-[#4B2E76]/30 text-[#4B2E76] hover:bg-[#4B2E76]/5"
              >
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-[#4B2E76]/60">
                Wrong email?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#4B2E76] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
