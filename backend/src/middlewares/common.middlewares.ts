export const isLength = ({ name, field, min, max }: { name: string; field: string; min: number; max: number }) => {
  return {
    options: {
      min,
      max
    },
    errorMessage: `The ${field} ${name} must have a length between ${min} and ${max}`
  }
}
