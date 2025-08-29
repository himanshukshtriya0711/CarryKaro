# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # Update this with your SMTP server
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'  # Update this with your email
EMAIL_HOST_PASSWORD = 'your-app-password'  # Update this with your app password
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Frontend URL for password reset
FRONTEND_URL = 'http://localhost:5173'  # Update this with your frontend URL
