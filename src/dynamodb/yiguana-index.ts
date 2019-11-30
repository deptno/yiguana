export enum EIndexName {
  posts = 'posts',
  postsByCategory = 'postsByCategory',
  comments = 'comments',
  byUser = 'byUser',
  reports = 'reports',
}

export enum EEntityStatus {
  requestedBlock = 'requestedBlock',
  blockedBySystem = 'blockedBySystem',
  deletedByUser = 'deletedByUser',
  deletedByAdmin = 'deletedByAdmin',
  deletedBySystem = 'deletedBySystem',
  innocent = 'innocent',
  inAudit = 'inAudit',
}
