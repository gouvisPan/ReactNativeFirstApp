interface User {
  name: string | null;
  email: string | null;
  id: string;
  authProvider: string;
}

export default User;
