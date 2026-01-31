export const usePostgres = () => {
  return process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('postgres');
}