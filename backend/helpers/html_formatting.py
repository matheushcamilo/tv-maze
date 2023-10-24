import re


def remove_html_tags(text):
    """
        Remove HTML tags from a string
    """
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)
