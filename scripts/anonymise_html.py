"""
File to create an anonymised version of the HTML index file by removing all names and email addresses.
"""

import re
import os

def anonymise_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Regular expressions to match names and email addresses (including apostrophe)
    name_pattern = re.compile(r'\b[A-Z][a-zA-Z\'-]+ [A-Z][a-zA-Z\'-]+\b')
    email_pattern = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')

    # URLS where names should be replaced
    URLs = [
        "https://www.linkedin.com/in/USERNAME",
        "https://safeandtrustedai.org/person/USERNAME",
        "https://orcid.org/USERNAME",
        "https://kclpure.kcl.ac.uk/USERNAME",
        "https://USERNAME.ac.uk",
        "https://USERNAME.github.io/",
        "https://scholar.google.co.uk/USERNAME",
        "https://www.USERNAME.org/"
    ]

    # Anonymise usernames in URLs
    for url_pattern in URLs:
        # Escape the URL pattern for regex, but keep USERNAME as a group
        regex_pattern = re.escape(url_pattern).replace("USERNAME", r"([\w\-]+)")
        html_content = re.sub(regex_pattern, lambda m: m.group(0).replace(m.group(1), "anonymous"), html_content)

    # Replace names and email addresses with placeholders
    html_content = name_pattern.sub('Anonymous', html_content)
    html_content = email_pattern.sub('anonymous@example.com', html_content)

    # Write the anonymised content to the output HTML file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(html_content)

if __name__ == "__main__":
    input_html = 'index.html'
    output_html = 'anonymised_index.html'
    
    if os.path.exists(input_html):
        anonymise_html(input_html, output_html)
        print(f"Anonymised HTML file created: {output_html}")
    else:
        print(f"Input file '{input_html}' does not exist.")