import { generateCallApi } from "ui-helpers";
import { API_BASE_URL } from "@/services";

export const callApiThunk = generateCallApi({API_BASE_URL})