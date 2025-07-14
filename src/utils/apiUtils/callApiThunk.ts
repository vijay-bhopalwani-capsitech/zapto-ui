// import { generateCallApi } from "ui-helpers";
import { API_BASE_URL } from "@/services";
import { generateCallApi } from "../../../packages/ui-helpers";

export const callApiThunk = generateCallApi({API_BASE_URL})