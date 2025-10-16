export async function fetchWellnessData(userId: string) {
  const res = await fetch(`/api/wellness/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch wellness data");
  return res.json();
}

export async function saveWellnessData(userId: string, data: any) {
  const res = await fetch(`/api/wellness/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save wellness data");
  return res.json();
}