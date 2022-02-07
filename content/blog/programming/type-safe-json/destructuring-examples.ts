// types
type Contact = {
  email: string,
  phone: string
}

type User = {
  id: number,
  name: string,
  contact: Contact
}

// raw data
const json = {
  "id": 1,
  "name": "joe",
  "contact": {
    "email": "joe@bloggs.com",
    "phone": "020 0000 0000"
  }
}

// ways to type
function using_declarations (data: any) {
  const id: number = data.id
  const name: string = data.name
  const contact: Contact = data.contact
}

function using_destructing (data: any) {
  const { id, name, contact }: { id: number, name: string, contact: Contact } = data
}

function using_parameters (user: User) {
  const { id, name, contact } = user
}

function using_destructuring_with_types_1 (data: any) {
  const { id, name, contact } = data as User
}

function using_destructuring_with_types_2 (data: any) {
  const { id, name, contact }: User = data
}
