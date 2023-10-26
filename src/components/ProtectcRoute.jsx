export default function ProtectcRoute({ children }) {
  if (localStorage.getItem("user_token") === null) {
    window.location.href = "/";
  }
  return children;
}
