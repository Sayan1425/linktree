import toast from "react-hot-toast";

export async function upload(e, callbackfn) {
  const file = e.target.files?.[0];
  if (!file) return;

  const uploadPromise = new Promise((resolve, reject) => {
    const data = new FormData();
    data.set("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Upload failed"));
          return;
        }
        response.json().then((link) => {
          callbackfn(link);
          resolve();
        });
      })
      .catch(reject);
  });

  await toast.promise(uploadPromise, {
    loading: "Uploading...",
    success: "Uploaded",
    error: "Upload error",
  });
}
