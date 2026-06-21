"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-lg w-full bg-white rounded-2xl p-8 shadow-xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Что-то пошло не так</h1>
          <p className="text-gray-500 mb-6 break-all font-mono text-sm bg-gray-50 p-4 rounded-xl text-left">{error.message}</p>
          <button onClick={reset} className="px-6 py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 transition-colors">Попробовать снова</button>
        </div>
      </body>
    </html>
  )
}