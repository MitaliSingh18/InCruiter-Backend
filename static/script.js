document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotForm = document.getElementById('forgot-form');
  const messageDiv = document.getElementById('message');
  const profileDiv = document.getElementById('profile');
  const logoutBtn = document.getElementById('logout-btn');
  const usernameSpan = document.getElementById('username');
  const emailSpan = document.getElementById('email');
  
  // Check if user is logged in
  checkAuthStatus();
  
  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // Clear message
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    });
  });
  
  // Login Form Submit
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        showMessage('Login successful!', 'success');
        
        // Get user data
        await getUserData();
      } else {
        showMessage(data.error || 'Login failed', 'error');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.', 'error');
      console.error(error);
    }
  });
  
  // Register Form Submit
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (password !== confirmPassword) {
      return showMessage('Passwords do not match', 'error');
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        showMessage('Registration successful!', 'success');
        
        // Get user data
        await getUserData();
      } else {
        showMessage(data.error || 'Registration failed', 'error');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.', 'error');
      console.error(error);
    }
  });
  
  // Forgot Password Form Submit
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    try {
      const response = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('Password reset email sent!', 'success');
      } else {
        showMessage(data.error || 'Failed to send reset email', 'error');
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.', 'error');
      console.error(error);
    }
  });
  
  // Logout Button Click
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    showAuthForms();
    showMessage('Logged out successfully', 'success');
  });
  
  // Helper Functions
  async function getUserData() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return showAuthForms();
    }
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show profile
        usernameSpan.textContent = data.data.username;
        emailSpan.textContent = data.data.email;
        showProfile();
      } else {
        // Token invalid, show login
        localStorage.removeItem('token');
        showAuthForms();
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      showAuthForms();
    }
  }
  
  function checkAuthStatus() {
    const token = localStorage.getItem('token');
    
    if (token) {
      getUserData();
    } else {
      showAuthForms();
    }
  }
  
  function showProfile() {
    document.querySelector('.tabs').style.display = 'none';
    document.querySelector('.tab-content').style.display = 'none';
    profileDiv.style.display = 'block';
  }
  
  function showAuthForms() {
    document.querySelector('.tabs').style.display = 'flex';
    document.querySelector('.tab-content').style.display = 'block';
    profileDiv.style.display = 'none';
  }
  
  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    }, 5000);
  }
});