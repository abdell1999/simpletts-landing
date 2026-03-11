from PIL import Image
import os

directory = 'assets/images'
max_width = 1200

for filename in os.listdir(directory):
    if filename.endswith(".webp"):
        filepath = os.path.join(directory, filename)
        with Image.open(filepath) as img:
            width, height = img.size
            if width > max_width:
                # Calculate new height to maintain aspect ratio
                new_height = int((max_width / width) * height)
                resized_img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

                # Save it back, overwriting
                resized_img.save(filepath, 'WEBP', quality=85)
                print(f"Resized {filename} from {width}x{height} to {max_width}x{new_height}")
            else:
                print(f"Skipped {filename} (already small enough: {width}x{height})")
