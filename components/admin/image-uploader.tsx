"use client";

import { ChangeEvent, useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { watch, setValue } = useFormContext();

  const files = (watch("images") as File[]) || [];

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    setValue("images", [...files, ...selected], {
      shouldValidate: true,
    });
  }

  function remove(index: number) {
    setValue(
      "images",
      files.filter((_, i) => i !== index),
      {
        shouldValidate: true,
      }
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Product Images
      </h2>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 transition hover:border-black hover:bg-neutral-50"
      >
        <ImagePlus
          size={40}
          className="mb-3 text-neutral-500"
        />

        <p className="font-medium">
          Upload Images
        </p>

        <span className="text-sm text-neutral-500">
          Click to browse
        </span>
      </button>

      <input
        hidden
        multiple
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFiles}
      />

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border"
            >
              <img
                src={URL.createObjectURL(file)}
                className="h-36 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute right-2 top-2 rounded-lg bg-black/80 p-2 text-white opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}