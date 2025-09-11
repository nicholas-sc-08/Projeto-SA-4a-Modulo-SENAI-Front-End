"use client";

import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_PORT, headers: { "Content-Type": "application/json" }});

export default api;