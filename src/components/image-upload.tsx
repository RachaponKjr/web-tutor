'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ImageUploadProps {
    label?: string;
    name: string;
    onChange: (file: File, previewUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, onChange }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
        onChange(file, preview);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <div className="relative w-40 h-40 border-2 border-dashed rounded-lg overflow-hidden cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    name={name}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />

                {previewUrl ? (
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 z-0">
                        เลือกหรือถ่ายภาพ
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
