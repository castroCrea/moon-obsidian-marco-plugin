type Indexable = Record<string, any>

// Function to search into the object using a string path
export const searchObject = ({
  obj,
  path
}: { obj: object, path: string }) => {
  const keys = path.split('.') // Split the path string into an array of keys
  let current: Indexable = obj

  for (const key of keys) {
    if (key in current) {
      current = current[key]
    } else { return undefined } // Key doesn't exist in the object
  }

  return current // Return the value found at the end of the path
}
