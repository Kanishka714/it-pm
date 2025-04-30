import asyncio
import aiohttp
import sqlite3
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

# Database setup
conn = sqlite3.connect("articles.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title TEXT)")
conn.commit()

# Async function to fetch a single page
async def fetch(session, url):
    try:
        async with session.get(url, timeout=10) as response:
            return await response.text()
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return None

