/// <reference types="next" />
/// <reference types="next/types/global" />

declare var Quill
declare module '*.graphql' {
  const resource: any
  export = resource
}

