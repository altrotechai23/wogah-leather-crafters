"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Color = {
  name: string;
  hex: string;
  stock: number;
};

export default function ProductColors() {
  const [colors, setColors] = useState<Color[]>([
    {
      name: "",
      hex: "#000000",
      stock: 0,
    },
  ]);

  function addColor() {
    setColors([
      ...colors,
      {
        name: "",
        hex: "#000000",
        stock: 0,
      },
    ]);
  }

  function removeColor(index: number) {
    setColors(colors.filter((_, i) => i !== index));
  }

  function update(
    index: number,
    field: keyof Color,
    value: string | number
  ) {
    const updated = [...colors];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setColors(updated);
  }

  return (
    <div className="rounded-2xl border bg-white p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          Leather Colors
        </h2>

        <button
          type="button"
          onClick={addColor}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={16} />

          Add Color
        </button>

      </div>

      <div className="space-y-4">

        {colors.map((color, index) => (

          <div
            key={index}
            className="grid grid-cols-12 gap-3 rounded-xl border p-4"
          >

            <input
              className="col-span-5 rounded-xl border px-3 py-2"
              placeholder="Chocolate Brown"
              value={color.name}
              onChange={(e) =>
                update(index, "name", e.target.value)
              }
            />

            <input
              type="color"
              className="col-span-2 h-11 w-full rounded-xl border"
              value={color.hex}
              onChange={(e) =>
                update(index, "hex", e.target.value)
              }
            />

            <input
              type="number"
              className="col-span-3 rounded-xl border px-3 py-2"
              placeholder="Stock"
              value={color.stock}
              onChange={(e) =>
                update(index, "stock", Number(e.target.value))
              }
            />

            <button
              type="button"
              onClick={() => removeColor(index)}
              className="col-span-2 flex items-center justify-center rounded-xl border text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}