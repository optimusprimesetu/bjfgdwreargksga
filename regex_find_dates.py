import re

dates = ""

with open("dates.txt", 'r') as f:
    dates = f.read()

pattern = r"\d{4}-\d{2}-\d{2}"

print(re.findall(pattern, dates))