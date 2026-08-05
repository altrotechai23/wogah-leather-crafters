"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProductDetails() {
  const [details, setDetails] = useState<string[]>([""]);

  function addDetail() {
    setDetails([...details, ""]);
  }

  function removeDetail(index: number) {
    setDetails(details.filter((_, i) => i !== index));
  }

  function update(index: number, value: string) {
    const updated = [...details];
    updated[index] = value;
    setDetails(updated);
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          Product Features
        </h2>

        <button
          type="button"
          onClick={addDetail}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <Plus size={16} />
          Add Feature
        </button>

      </div>

      <div className="space-y-3">

        {details.map((detail, index) => (

          <div
            key={index}
            className="flex gap-3"
          >

            <input
              value={detail}
              onChange={(e) => update(index, e.target.value)}
              placeholder="e.g. Full Grain Leather"
              className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-black"
            />

            <button
              type="button"
              onClick={() => removeDetail(index)}
              className="rounded-xl border border-neutral-300 p-3 text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}