interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  joinDate?: string;
  avatar?: null;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

interface RecoveryResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const validateLogin = (identifier: string, password: string): AuthResult => {
  if (!identifier?.trim()) return { success: false, error: "Please enter your email or username" };
  if (!password?.trim()) return { success: false, error: "Please enter your password" };
  if (identifier === "testuser" && password === "password123") {
    return {
      success: true,
      user: { id: "usr_001", username: "testuser", name: "Test User", email: "testuser@example.com", phone: "+977 98765 43210", joinDate: "2026-01-15", avatar: null },
    };
  }
  return { success: false, error: "Invalid credentials. Use testuser / password123" };
};

export const validateRegistration = (formData: {
  name: string; email: string; phone: string; password: string; confirmPassword: string;
}): AuthResult => {
  const { name, email, phone, password, confirmPassword } = formData;
  if (!name || name.trim().length < 2) return { success: false, error: "Name must be at least 2 characters" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return { success: false, error: "Please enter a valid email address" };
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) return { success: false, error: "Please enter a valid 10-digit phone number" };
  if (!password || password.length < 6) return { success: false, error: "Password must be at least 6 characters" };
  if (password !== confirmPassword) return { success: false, error: "Passwords do not match" };
  return {
    success: true,
    user: { id: "usr_new", username: email.split("@")[0], name: name.trim(), email: email.trim(), phone: phone.trim(), joinDate: new Date().toISOString().split("T")[0], avatar: null },
  };
};

export const validatePasswordRecovery = (email: string): RecoveryResult => {
  if (!email?.trim()) return { success: false, error: "Please enter your email address" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { success: false, error: "Please enter a valid email address" };
  return { success: true, message: "Password reset link sent to your email" };
};
