export interface CollectionItem {
  _id: string
  _modified: number
  _created: number
}

export interface Photo extends CollectionItem {
  photo: {
    path: string
  }
  description: string
  alt: string
}

export interface Position extends CollectionItem {
  company: string
  title: string
  date_start: string
  date_end: string
  location: string
  description: string
  company_url: string
  company_icon: {
    path: string
  }
  current: boolean
}

export interface Skill extends CollectionItem {
  name: string
  slug: string
  date_started: string
}

export interface Education extends CollectionItem {
  school: string
  date_graduation: string
  major: string
  type: string
}
