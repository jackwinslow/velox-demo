from PIL import Image
import os

# Open the image file
img = Image.open('athens.jpeg')

# Get the dimensions of the image
width, height = img.size

# Calculate the size of each tile
tile_size = int(width / 10)

# Create a directory to store the tile images
if not os.path.exists('tiles'):
    os.makedirs('tiles')

# Loop over the tiles and save them as individual images
for i in range(0, width, tile_size):
    for j in range(0, height, tile_size):
        box = (i, j, i+tile_size, j+tile_size)
        tile = img.crop(box)
        tile.save(f'tiles/tile_{i//290}_{j//290}.jpg')
