import React, { useState, useEffect } from "react";
import "./StayHealthy.css";
import { fetchWellnessData, saveWellnessData } from "../services/wellnessService";

type StayHealthyProps = {
  embedded?: boolean;
  userId?: string; // Pass userId from parent or context
};

const initialData = {
  water: 6,
  yoga: 15,
  sleep: 7.2,
  meals: 3,
  healthGoals: 3,
  totalGoals: 5,
  streak: 12,
};

function calculateWellnessScore(data: typeof initialData) {
  let score = 0;
  score += (data.water / 8) * 20;
  score += (data.yoga / 30) * 20;
  score += (data.sleep / 8) * 20;
  score += (data.meals / 3) * 20;
  score += (data.healthGoals / data.totalGoals) * 20;
  return Math.round(score);
}

const StayHealthy: React.FC<StayHealthyProps> = ({ embedded, userId }) => {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(true);

  // Fetch from backend on mount
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchWellnessData(userId)
      .then((d) => {
        setData({ ...initialData, ...d });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleEdit = () => {
    setForm(data);
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  const handleSave = async () => {
    if (!userId) return;
    setData(form);
    setEditing(false);
    await saveWellnessData(userId, form);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`stay-healthy-dashboard${embedded ? " embedded" : ""}`}>
      <h2>
        Stay Healthy <span role="img" aria-label="leaf">🌿</span>
        <button className="edit-btn" onClick={handleEdit}>Edit</button>
      </h2>
      <p>Your daily Ayurvedic wellness dashboard.</p>
      <div className="dashboard-bars">
        <div>
          <strong>Water</strong>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(data.water / 8) * 100}%` }} />
          </div>
          <span>{data.water}/8 glasses</span>
        </div>
        <div>
          <strong>Yoga</strong>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(data.yoga / 30) * 100}%` }} />
          </div>
          <span>{data.yoga}/30 mins</span>
        </div>
        <div>
          <strong>Sleep</strong>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(data.sleep / 8) * 100}%` }} />
          </div>
          <span>{data.sleep}/8 hrs</span>
        </div>
        <div>
          <strong>Meals</strong>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(data.meals / 3) * 100}%` }} />
          </div>
          <span>{data.meals}/3 meals</span>
        </div>
      </div>
      <div className="dashboard-info">
        <div>
          <strong>Health Goals</strong>
          <span>{data.healthGoals} of {data.totalGoals} completed</span>
        </div>
        <div>
          <strong>Daily Streak</strong>
          <span>{data.streak} days</span>
        </div>
        <div>
          <strong>Wellness Score</strong>
          <span className="wellness-score">{calculateWellnessScore(data)}</span>
        </div>
      </div>
      <div className="dashboard-quote">
        <em>"The greatest wealth is health." – Virgil</em>
      </div>
      {editing && (
        <div className="edit-modal">
          <h3>Edit Dashboard</h3>
          <label>
            Water (glasses):
            <input type="number" name="water" value={form.water} min={0} max={8} onChange={handleChange} />
          </label>
          <label>
            Yoga (mins):
            <input type="number" name="yoga" value={form.yoga} min={0} max={30} onChange={handleChange} />
          </label>
          <label>
            Sleep (hrs):
            <input type="number" name="sleep" value={form.sleep} min={0} max={8} onChange={handleChange} />
          </label>
          <label>
            Meals:
            <input type="number" name="meals" value={form.meals} min={0} max={3} onChange={handleChange} />
          </label>
          <label>
            Health Goals Completed:
            <input type="number" name="healthGoals" value={form.healthGoals} min={0} max={form.totalGoals} onChange={handleChange} />
          </label>
          <label>
            Daily Streak (days):
            <input type="number" name="streak" value={form.streak} min={0} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StayHealthy;

// ...existing code...

// export async function saveWellnessData(userId: string, data: any) {
//   const res = await fetch(`/api/wellness/${userId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Failed to save wellness data");
//   return res.json();
// }