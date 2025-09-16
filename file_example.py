with open('sample.txt', 'r') as f:
    for line in f:
        print(line)

with open('sample.txt', 'r') as f:
    for line in f:
        print(line.strip())

with open('output.txt', 'w') as f:
    f.write("This is a new file.\n")
    f.write("It has two lines.\n")