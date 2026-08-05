"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { deleteProduct } from "@/actions/product.actions";
import { toast } from "sonner";

export default function DeleteProductButton({
  id,
}: {
  id: string;
}) {
  const [open, setOpen] = useState(false);

  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteProduct(id);

        toast.success("Product deleted");

        setOpen(false);
      } catch {
        toast.error("Failed to delete product");
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-zinc-200 p-2 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: .9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: .9,
                y: 20,
              }}
              transition={{
                duration: .2,
              }}
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

                <Trash2
                  className="text-red-600"
                  size={28}
                />

              </div>

              <h2 className="text-center text-2xl font-bold">
                Delete Product
              </h2>

              <p className="mt-3 text-center text-zinc-500">
                This action cannot be undone.
                <br />
                The product and all its images will be permanently deleted.
              </p>

              <div className="mt-8 flex gap-3">

                <button
                  disabled={pending}
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-2xl border py-3 font-medium transition hover:bg-zinc-100"
                >
                  Cancel
                </button>

                <button
                  disabled={pending}
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >

                  {pending ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete
                    </>
                  )}

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}