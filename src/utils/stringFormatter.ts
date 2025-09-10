export function toKebabCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function fromKebabCase(value: string) {
  return value
    ?.split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
}
