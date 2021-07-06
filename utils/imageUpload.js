export const imageUpload = async (pics) => {
  console.log("image upload called!");
  
  let picsArray = [];
  for (const item of pics) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPDATE);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

    const res = await fetch(process.env.NEXT_PUBLIC_CLOUD_API,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    picsArray.push({ public_id: data.public_id, url: data.secure_url });
  }
  return picsArray;
};
