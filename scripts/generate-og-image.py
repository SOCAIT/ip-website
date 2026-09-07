#!/usr/bin/env python3
"""
Generate public/og-image.png — the 1200x630 card that LinkedIn, X, Slack and
WhatsApp render when the site is shared.

Re-run after changing the tagline or proof points:
    python3 scripts/generate-og-image.py
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = "public/og-image.png"
PHOTO = "public/ipastellas_hero.webp"
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"
REGULAR, BOLD, MEDIUM = 0, 1, 10

# Palette lifted from src/app/globals.css :root
BG_TOP, BG_BOTTOM = (26, 26, 26), (13, 13, 13)
TEXT_PRIMARY = (232, 232, 232)
TEXT_SECONDARY = (138, 138, 138)
ACCENT = (184, 188, 198)
WHITE = (255, 255, 255)

EYEBROW = "MACHINE LEARNING ENGINEER"
NAME = "IOANNIS PASTELLAS"
TAGLINE = ["I work on reinforcement learning", "and multi-agent systems."]
PROOF = ["5 peer-reviewed papers", "Offline RL @ Wargaming", "MSc AI · 8.94/10"]

MARGIN = 76
COL_W = 640


def font(size, index=REGULAR):
    return ImageFont.truetype(FONT, size, index=index)


def text_width(draw, s, f, tracking=0):
    if not tracking:
        return draw.textlength(s, font=f)
    return sum(draw.textlength(c, font=f) for c in s) + tracking * max(len(s) - 1, 0)


def draw_tracked(draw, xy, s, f, fill, tracking=0):
    """PIL has no letter-spacing, so advance manually."""
    x, y = xy
    if not tracking:
        draw.text((x, y), s, font=f, fill=fill)
        return
    for c in s:
        draw.text((x, y), c, font=f, fill=fill)
        x += draw.textlength(c, font=f) + tracking


def vertical_gradient(size, top, bottom):
    w, h = size
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return grad.resize((w, h), Image.BILINEAR)


def fade_mask(size, fade_in=0.08, solid_until=0.75):
    """Reproduce the hero's CSS mask-image: transparent -> black -> transparent."""
    w, h = size
    mask = Image.new("L", (1, h))
    px = mask.load()
    a, b = fade_in * h, solid_until * h
    for y in range(h):
        if y < a:
            v = y / a
        elif y < b:
            v = 1.0
        else:
            v = max(0.0, 1 - (y - b) / (h - b))
        px[0, y] = round(255 * v)
    return mask.resize((w, h), Image.BILINEAR)


img = vertical_gradient((W, H), BG_TOP, BG_BOTTOM)
draw = ImageDraw.Draw(img)

# --- Ghost "IP" watermark, echoing .hero-ghost-text -------------------------
ghost = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(ghost).text((W * 0.82, H * 0.44), "IP", font=font(520, BOLD),
                           fill=(255, 255, 255, 6), anchor="mm")
img = Image.alpha_composite(img.convert("RGBA"), ghost)

# --- Photo, right side, same fade treatment as the hero ---------------------
photo = Image.open(PHOTO).convert("RGBA")
ph = 600
pw = round(photo.width * ph / photo.height)
photo = photo.resize((pw, ph), Image.LANCZOS)
alpha = photo.getchannel("A").point(lambda v: v)
photo.putalpha(Image.composite(alpha, Image.new("L", photo.size, 0), fade_mask(photo.size)))
img.alpha_composite(photo, (W - pw - 46, H - ph))

img = img.convert("RGB")
draw = ImageDraw.Draw(img)

# --- Eyebrow: accent rule + tracked small caps ------------------------------
y = 128
draw.line([(MARGIN, y + 8), (MARGIN + 28, y + 8)], fill=ACCENT, width=1)
draw_tracked(draw, (MARGIN + 42, y), EYEBROW, font(16, MEDIUM), ACCENT, tracking=2.4)

# --- Name, auto-fitted to the column ----------------------------------------
size = 74
while size > 40 and text_width(draw, NAME, font(size, BOLD), -1.6) > COL_W:
    size -= 2
y = 168
draw_tracked(draw, (MARGIN, y), NAME, font(size, BOLD), WHITE, tracking=-1.6)

# --- Tagline -----------------------------------------------------------------
y += size + 30
for line in TAGLINE:
    draw.text((MARGIN, y), line, font=font(25, REGULAR), fill=TEXT_SECONDARY)
    y += 36

# --- Hairline + proof row ----------------------------------------------------
y += 30
draw.line([(MARGIN, y), (MARGIN + COL_W - 60, y)], fill=(46, 46, 46), width=1)
y += 26

f_proof = font(17, MEDIUM)
f_sep = font(17, REGULAR)
x = MARGIN
for i, item in enumerate(PROOF):
    if i:
        draw.text((x, y), "·", font=f_sep, fill=(80, 80, 80))
        x += draw.textlength("·", font=f_sep) + 16
    draw.text((x, y), item, font=f_proof, fill=TEXT_PRIMARY)
    x += draw.textlength(item, font=f_proof) + 16

img.save(OUT, "PNG", optimize=True)
print(f"wrote {OUT}  ({W}x{H})")
