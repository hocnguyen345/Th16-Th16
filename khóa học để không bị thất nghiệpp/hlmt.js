// Danh sách tài khoản mẫu (sau này thay bằng gọi API hoặc server)
const userDB = [
  { username: "admin", password: "123456" },
  { username: "guest", password: "abc123" }
];

// Hàm login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Kiểm tra rỗng
  if (!username || !password) {
    return alert("Vui lòng nhập đầy đủ Username và Password.");
  }

  // Kiểm tra tài khoản có trong DB không
  const userFound = userDB.find(
    user => user.username === username && user.password === password
  );

  if (userFound) {
    alert("🎉 Đăng nhập thành công! Chào mừng " + username);
    // Lưu thông tin vào localStorage nếu muốn giữ trạng thái
    localStorage.setItem("loggedInUser", username);
    window.location.href = "about.html"; // chuyển sang trang tiếp theo
  } else {
    alert("❌ Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
  }
}

// Hàm giả lập chuyển đến trang đăng ký
function register() {
  alert("Chuyển sang trang đăng ký...");
  window.location.href = "register.html";
}
