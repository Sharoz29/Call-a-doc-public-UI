import * as _axios from "axios";

export const axios = _axios.default.create({
  baseURL:
    import.meta.env.VITE_BASE_URL || "https://web.pega23.lowcodesol.co.uk",
});
