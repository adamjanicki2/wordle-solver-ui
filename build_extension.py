def replace_index():
    with open('build/index.html', 'r') as index_file:
        content = index_file.read().replace('/wordle-solver-ui/', '')
    with open('build/index.html', 'w') as index_file:
        index_file.write(content)


def main():
    replace_index()

if __name__ == '__main__':
    main()