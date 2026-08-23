import smtplib
from email.mime.text import MIMEText
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def send_contact_email(name: str, sender_email: str, subject: str, message: str) -> bool:
    email_subject = f"Portfolio Contact: {subject or name}"
    body = (
        f"New contact submission received from portfolio site.\n\n"
        f"Name:    {name}\n"
        f"Email:   {sender_email}\n"
        f"Subject: {subject}\n"
        f"Message:\n{message}\n"
    )

    # Fallback sandbox printout if SMTP settings are unconfigured
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        print("\n--- SANDBOX_SMTP_MAIL_FORWARD_SIMULATOR ---")
        print(f"TO:      {settings.SMTP_USER or 'admin@local'}")
        print(f"SUBJECT: {email_subject}")
        print(f"BODY:\n{body}")
        print("-------------------------------------------\n")
        return True

    try:
        msg = MIMEText(body)
        msg["Subject"] = email_subject
        msg["From"] = settings.SMTP_FROM_EMAIL or settings.SMTP_USER
        msg["To"] = settings.SMTP_USER

        # TLS or SSL based on target port configurations
        if settings.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
        else:
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
            server.starttls()

        if settings.SMTP_PASSWORD:
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

        server.sendmail(msg["From"], [msg["To"]], msg.as_string())
        server.quit()
        return True
    except Exception as e:
        logger.error(f"SMTP mail forwarding failure: {e}")
        return False
