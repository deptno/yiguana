export type Author = {
  id: string
  name: string
  thumbnail: string
  authorId: Author['id'] // GSI PK
}
