"use client";

import React, { useEffect, useRef } from "react";

interface CodePreviewProps {
    code: string; // full HTML string
}

const CodePreviewDialog: React.FC<CodePreviewProps> = ({ code }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            
            // Create a blob URL instead of writing directly to iframe
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            iframe.src = url;
            
            // Clean up the blob URL when component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [code]);

    return (
        <div className="w-full h-[70vh] border rounded-lg overflow-hidden shadow">
            <iframe
                ref={iframeRef}
                sandbox="allow-scripts"    
                title="Code Preview"
                className="w-full h-full bg-white"
            />
        </div>
    );
};

export default CodePreviewDialog;