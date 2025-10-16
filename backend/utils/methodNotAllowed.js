
export const methodNotAllowed = (req, res) => {
  return res.status(405).json({message: 'Method not allowed'})
}