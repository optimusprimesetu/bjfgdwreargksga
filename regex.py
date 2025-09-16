import re

pattern = r"at"
text = "The cat sat on the mat."

matches = re.findall(pattern, text)
print(matches)


pattern = r"\d+"
text = "Order 123 was placed on 2023-05-01."

print(re.findall(pattern, text))

pattern = r"\d+\.\d+\.\d+\.\d+"
text = "Failed login from 192.168.0.1 at 10:30"

print(re.findall(pattern, text))