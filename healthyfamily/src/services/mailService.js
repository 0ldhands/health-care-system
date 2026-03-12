// simple wrapper for contact endpoint

export async function sendContactForm(data) {
  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials:'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Unable to send message');
  }

  return res.json();
}
