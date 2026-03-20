export default function AdminDashboardPage() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>
        API quản trị đã sẵn sàng. Dùng token JWT của admin trong header{" "}
        <code>Authorization: Bearer &lt;token&gt;</code> để gọi các route quản
        lý.
      </p>
    </main>
  );
}
