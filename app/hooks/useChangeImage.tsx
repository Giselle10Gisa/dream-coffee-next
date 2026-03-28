"use client";

import { useState } from "react";

export default function useChangeImage () {
    const [headerImage, setHeaderImage] = useState('');

    return { headerImage, setHeaderImage };
}