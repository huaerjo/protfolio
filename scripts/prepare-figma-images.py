"""Prepare downloaded Figma exports without changing their artwork."""
from pathlib import Path
from PIL import Image
import json
from concurrent.futures import ThreadPoolExecutor
source = Path('tmp/figma-originals')
target = Path('tmp/figma-ready')
target.mkdir(exist_ok=True)
cover_pages = {3, 23, 37, 42, 47, 51}
def convert(page):
    file = source / f'page-{page:02}.png'
    with Image.open(file) as original:
        original.load()
        image = original.convert('RGB')
        width, height = image.size
        image.save(target / f'page-{page:02}.webp', lossless=True, method=4)
        if page in cover_pages:
            image.thumbnail((1200, 1200))
            image.save(target / f'cover-{page:02}.webp', quality=92, method=6)
        return str(page), {'width': width, 'height': height}
if __name__ == '__main__':
    missing = [n for n in range(1, 62) if not (source / f'page-{n:02}.png').exists()]
    if missing:
        raise SystemExit(f'Missing pages: {missing}')
    with ThreadPoolExecutor(max_workers=4) as pool:
        dimensions = dict(pool.map(convert, range(1, 62)))
    (target / 'dimensions.json').write_text(json.dumps(dimensions, indent=2))
    print(f'Prepared {len(dimensions)} full-resolution lossless images and 6 optimized covers.')
