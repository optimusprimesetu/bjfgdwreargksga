import re

emails = []

with open("emails.txt", 'r') as f:
    emails = [email.strip() for email in f.readlines()]

validated_emails = []

# pattern = r"[a-z0-9]+@[a-z]{1,}\.[a-z]{2,}"
pattern = r"[a-z0-9]+@(?:gmail\.com|setu\.ie)"

validated_emails = re.findall(pattern, str(emails))
print(validated_emails)