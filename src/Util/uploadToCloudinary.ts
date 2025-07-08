export const uploadToCoudinary = async (pics:any) => {
    const cloud_name = "daugfzmze"
    const upload_preset="fyp_upload_image"

    if(pics){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/daugfzmze/image/upload`, {
                method: "POST",
                body: data,
            });
            const file = await res.json();
            return file.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        } 
    }
}