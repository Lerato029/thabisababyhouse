/* ==============================================Module for fetch request to Cloudinary API=========================== */
//module passing pictures from client 
export const imageUpload = async (pics) => {
  //array storing each image uploaded to API
  let picsArray = [];

  //loop through array of images
  for (const item of pics) {
    //create empty object
    const formData = new FormData();

    //append key value pairs to object essential for API request
    formData.append("file", item);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPDATE);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

    //make post request to API to upload image
    const res = await fetch(process.env.NEXT_PUBLIC_CLOUD_API,
      {
        method: "POST",
        body: formData,
      }
    );

    //parse result
    const data = await res.json();

    //push to array the id and url of image
    picsArray.push({ public_id: data.public_id, url: data.secure_url });
  }

  //on completion of loop return array
  return picsArray;
};
