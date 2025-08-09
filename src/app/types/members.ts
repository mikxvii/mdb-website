export interface BaseMember {
  name: string
  title: string
  image: string
}

export interface ExecMember extends BaseMember {
  // Executive-specific properties can be added here
}

export interface Member extends BaseMember {
  // General member properties can be added here
}

export interface ProjectManager extends BaseMember {
  // Project manager specific properties can be added here
}
