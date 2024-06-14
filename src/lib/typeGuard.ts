export interface ErrorResponse {
  non_field_errors?: string[];
  detail?: string;
}

export const isErrorResponse = (data): data is ErrorResponse => {
  return (
    data &&
    typeof data === "object" &&
    ("non_field_errors" in data || "detail" in data)
  );
};
