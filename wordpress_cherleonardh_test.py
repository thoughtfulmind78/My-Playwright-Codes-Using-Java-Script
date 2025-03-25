import requests
from bs4 import BeautifulSoup
import pyperclip

def test_wordpress_site(url):
    """
    Tests the given WordPress site for specific content and copies it to the clipboard.

    Args:
        url (str): The URL of the WordPress site.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)

        soup = BeautifulSoup(response.content, 'html.parser')

        # Test for the title
        title_element = soup.find('title')
        if title_element and "teacher leonard short blog" in title_element.text.lower():
            print("Title test: PASSED")
            pyperclip.copy(title_element.text)
            print("Title copied to clipboard.")
            title_content = title_element.text
        else:
            print("Title test: FAILED")
            title_content = None

        # Test for the article content (cleaning kitchen with essential tools)
        article_elements = soup.find_all('article')
        article_found = False
        article_content = None

        for article in article_elements:
            article_text = article.get_text(separator=' ', strip=True).lower()
            if "cleaning kitchen with essential tools" in article_text:
                print("Article test: PASSED")
                article_found = True
                article_content = article.get_text(separator=' ', strip=True)
                pyperclip.copy(article_content)
                print("Article content copied to clipboard.")
                break

        if not article_found:
            print("Article test: FAILED")
            article_content = None

        return title_content, article_content

    except requests.exceptions.RequestException as e:
        print(f"Error accessing the website: {e}")
        return None, None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None, None

# Example usage:
website_url = "https://cherleonardh.wordpress.com"
title, article = test_wordpress_site(website_url)

if title is not None:
    print(f"Title: {title}")
if article is not None:
    print(f"Article: {article}")