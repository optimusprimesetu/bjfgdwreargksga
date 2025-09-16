import re

ips = []

pattern = r"\d+\.\d+\.\d+\.\d+"

with open("auth_log.txt", 'r') as f:
    for line in f:
        for ip in re.findall(pattern, line):
            ips.append(ip)
        print(line.strip())

print(ips)

unique_ips = set(ips)
print(unique_ips)

with open("unique_ips.txt", 'w') as f:
    for ip in unique_ips:
        f.write(ip + "\n")
