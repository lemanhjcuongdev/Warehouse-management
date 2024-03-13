interface iUser {
  id: number
  name: string
  email: string
  gender: 'M' | 'F' | 'O'
  phone: string
  start_date: Date
  username: string
  password: string
  login_status: 1 | 0
  id_created: number
  disabled: 1 | 0
}
