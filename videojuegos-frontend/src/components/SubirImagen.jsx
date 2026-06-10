import { useState, useEffect } from "react";

const SubirImagen = ({ onImageUploaded, imagen }) => {
    const VITE_CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
    const VITE_CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!imagen) {
            setImageUrl("");
        }
    }, [imagen]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            const signRes = await fetch(`${VITE_API_URL}/cloudinary/signature`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const signData = await signRes.json();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signData.apiKey);
            formData.append("timestamp", signData.timestamp);
            formData.append("signature", signData.signature);
            formData.append("folder", signData.folder);

            const uploadRes = await fetch(
                `${VITE_CLOUDINARY_URL}/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error(uploadData.error?.message || "Error subiendo imagen");
            }

            const imageData = {
                imageUrl: uploadData.secure_url,
                imagePublicId: uploadData.public_id,
            };

            setImageUrl(imageData.imageUrl);
            onImageUploaded?.(imageData);

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
            e.target.value = "";
        }
    };

    return (
        <div>
            <label style={{ cursor: "pointer", padding: "8px", background: "#222", color: "#fff", borderRadius: "4px" }}>
                {loading ? "Subiendo..." : "Subir imagen"}
                <input type="file" accept="image/*" onChange={handleUpload} hidden disabled={loading} />
            </label>

            {imageUrl && (
                <img src={imageUrl} alt="Imagen subida" style={{ width: "60px", marginLeft: "8px", borderRadius: "4px" }} />
            )}
        </div>
    );
};

export default SubirImagen;