export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
  const res = await fetch(`${base}/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  return res.json()
}
